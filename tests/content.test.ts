import assert from 'node:assert/strict';
import { test } from 'node:test';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';
import { butcherContent, validateContent } from '../lib/validate-content.ts';

test('business and owner-editable collections pass validation', () => {
  assert.doesNotThrow(() => validateContent());
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'Store');
  assert.equal(schema.email, butcherContent.business.email);
  assert.equal(schema.openingHoursSpecification.length, butcherContent.business.hours.filter(x => x.opens).length);
});

test('weekly owner edits can change the dates, availability and price together', () => {
  const content = structuredClone(butcherContent);
  content.specials = {
    ...content.specials, weekOf: '2026-12-01', validUntil: '2026-12-05',
    items: content.specials.items.map(item => item.id === 'dry-aged-rib-eye' ? { ...item, priceCents: 5190, wasCents: 6200 }
      : item.id === 'saltbush-lamb-cutlets' ? { ...item, available: false } : item),
  };
  assert.doesNotThrow(() => validateContent(content));
});

test('specials validation names the item or field to fix', () => {
  const initial = butcherContent.specials;
  const first = initial.items.find(item => item.featured)!;
  const rest = initial.items.filter(item => item.id !== first.id);
  const validate = (changes: Partial<typeof initial>) => validateContent({ ...butcherContent, specials: { ...initial, ...changes } });
  assert.throws(() => validate({ items: [first, ...rest, first] }), new RegExp(`specials\\.${first.id}: duplicate ID`));
  assert.throws(() => validate({ items: [{ ...first, priceCents: 0 }, ...rest] }), new RegExp(`specials\\.${first.id}\\.priceCents`));
  assert.throws(() => validate({ items: [{ ...first, wasCents: first.priceCents }, ...rest] }), new RegExp(`specials\\.${first.id}\\.wasCents`));
  assert.throws(() => validate({ items: [{ ...first, featured: false }, ...rest] }), /specials\.featured: mark exactly four/);
  assert.throws(() => validate({ validUntil: initial.weekOf }), /specials\.validUntil/);
});

test('pack contents, guide references and chart regions fail with their IDs', () => {
  const [pack, ...packs] = butcherContent.packs;
  const [primal, ...primals] = butcherContent.primals;
  const [guide, ...guides] = butcherContent.guides;
  const duplicateRegion = primals.find(entry => entry.animal === primal.animal)!.region;
  assert.throws(() => validateContent({ ...butcherContent, packs: [{ ...pack, contents: [] }, ...packs] }), new RegExp(`packs\\.${pack.id}\\.contents`));
  assert.throws(() => validateContent({ ...butcherContent, primals: [{ ...primal, guideId: 'absent' }, ...primals] }), new RegExp(`primals\\.${primal.id}\\.guideId: missing guide absent`));
  assert.throws(() => validateContent({ ...butcherContent, primals: [{ ...primal, region: duplicateRegion }, ...primals] }), /use this .* artwork region exactly once/);
  assert.throws(() => validateContent({ ...butcherContent, guides: [{ ...guide, cutIds: ['absent'] }, ...guides] }), new RegExp(`guides\\.${guide.id}\\.cutIds: missing cut absent`));
});

test('holiday dates and trading intervals fail with the offending date', () => {
  const initial = butcherContent.christmas;
  const validate = (changes: Partial<typeof initial>) => validateContent({ ...butcherContent, christmas: { ...initial, ...changes } });
  const collectionDay = initial.collectionDays[0];
  assert.throws(() => validate({ enquiriesClose: initial.enquiriesOpen }), /christmas\.enquiriesClose/);
  assert.throws(() => validate({ collectionDays: [initial.enquiriesClose] }), /christmas\.collectionDays/);
  assert.throws(() => validate({ collectionHours: { ...initial.collectionHours, [collectionDay]: { opens: '18:00', closes: '01:00' } } }), new RegExp(`christmas\\.collectionHours\\.${collectionDay}`));
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
