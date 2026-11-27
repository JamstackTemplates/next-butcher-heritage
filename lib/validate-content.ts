import { business } from '../content/business.ts';
import { chartArt } from '../content/chart-art.ts';
import { christmas, christmasItems } from '../content/christmas.ts';
import { chartAnimals, methods, primals } from '../content/cuts.ts';
import { guides } from '../content/guides.ts';
import { noticeDays, packs } from '../content/packs.ts';
import { animals, specials } from '../content/specials.ts';
import { calendarDate, isCalendarDate } from './dates.ts';
import { validateHours, validateInterval } from './hours.ts';

export const butcherContent = { business, specials, packs, noticeDays, primals, guides, christmas, christmasItems };

function requireField(condition: unknown, label: string): asserts condition {
  if (!condition) throw new Error(label);
}

function requiredText(value: string, label: string) {
  requireField(typeof value === 'string' && value.trim(), `${label}: required text`);
}

function positive(value: number, label: string) {
  requireField(Number.isSafeInteger(value) && value > 0, `${label}: expected a positive integer`);
}

function boolean(value: boolean, label: string) {
  requireField(typeof value === 'boolean', `${label}: expected true or false`);
}

function ids(items: readonly { id: string }[], collection: string) {
  requireField(Array.isArray(items), `${collection}: expected a list`);
  const seen = new Set<string>();
  for (const { id } of items) {
    requireField(typeof id === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id), `${collection}.${id}: use a URL-safe ID`);
    requireField(!seen.has(id), `${collection}.${id}: duplicate ID`);
    seen.add(id);
  }
  requireField(seen.size, `${collection}: add at least one item`);
  return seen;
}

function pricedItem(item: { name: string; priceCents: number; available: boolean }, label: string) {
  requiredText(item.name, `${label}.name`);
  positive(item.priceCents, `${label}.priceCents`);
  boolean(item.available, `${label}.available`);
}

export function validateContent(content = butcherContent) {
  const { business, specials, packs, noticeDays, primals, guides, christmas, christmasItems } = content;
  for (const key of ['name', 'wordmark', 'tagline', 'introduction', 'story', 'directions', 'mapQuery', 'priceRange'] as const) {
    requiredText(business[key], `business.${key}`);
  }
  positive(business.established, 'business.established');
  requireField(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email), 'business.email: valid public email required');
  requiredText(business.phone, 'business.phone');
  requireField(/^\+\d{8,15}$/.test(business.telephone), 'business.telephone: use an international number');
  for (const [key, value] of Object.entries(business.address)) requiredText(value, `business.address.${key}`);
  requireField(Math.abs(business.geo.latitude) <= 90 && Math.abs(business.geo.longitude) <= 180, 'business.geo: invalid coordinates');
  requiredText(business.enquiries.introduction, 'business.enquiries.introduction');
  boolean(business.showMap, 'business.showMap');
  validateHours(business.hours);

  ids(specials.items, 'specials');
  requireField(isCalendarDate(specials.weekOf) && calendarDate(specials.weekOf).getUTCDay() === 2, 'specials.weekOf: use a Tuesday in YYYY-MM-DD');
  requireField(isCalendarDate(specials.validUntil) && +calendarDate(specials.validUntil) - +calendarDate(specials.weekOf) === 4 * 86_400_000, 'specials.validUntil: use the Saturday after weekOf');
  for (const item of specials.items) {
    const label = `specials.${item.id}`;
    pricedItem(item, label);
    requiredText(item.description, `${label}.description`);
    requireField(animals.includes(item.animal), `${label}.animal: unknown category`);
    requireField(['kg', 'each', 'pack'].includes(item.unit), `${label}.unit: use kg, each or pack`);
    if (item.wasCents !== undefined) {
      positive(item.wasCents, `${label}.wasCents`);
      requireField(item.wasCents > item.priceCents, `${label}.wasCents: must exceed priceCents`);
    }
    boolean(item.featured, `${label}.featured`);
    if (item.sellingFast !== undefined) boolean(item.sellingFast, `${label}.sellingFast`);
  }
  const featured = specials.items.filter(item => item.featured);
  requireField(featured.length === 4, `specials.featured: mark exactly four items (currently ${featured.map(item => item.id).join(', ') || 'none'})`);

  ids(packs, 'packs');
  positive(noticeDays, 'packs.noticeDays');
  for (const pack of packs) {
    const label = `packs.${pack.id}`;
    pricedItem(pack, label);
    positive(pack.serves, `${label}.serves`);
    requiredText(pack.blurb, `${label}.blurb`);
    requireField(Array.isArray(pack.contents) && pack.contents.length >= 3, `${label}.contents: add at least three lines`);
    pack.contents.forEach((line, index) => {
      const name = `${label}.contents[${index}]`;
      requiredText(line.item, `${name}.item`);
      positive(line.quantity, `${name}.quantity`);
      if (line.weightGrams !== undefined) positive(line.weightGrams, `${name}.weightGrams`);
    });
  }

  ids(primals, 'primals');
  const cutIds = ids(primals.flatMap(primal => primal.cuts), 'cuts');
  const guideIds = ids(guides, 'guides');
  for (const primal of primals) {
    const label = `primals.${primal.id}`;
    requiredText(primal.name, `${label}.name`);
    requireField(chartAnimals.includes(primal.animal) && Object.hasOwn(chartArt[primal.animal].regions, primal.region), `${label}.region: missing ${primal.region} artwork for ${primal.animal}`);
    requireField(guideIds.has(primal.guideId), `${label}.guideId: missing guide ${primal.guideId}`);
    requireField(Array.isArray(primal.cuts) && primal.cuts.length, `${label}.cuts: add at least one cut`);
    for (const cut of primal.cuts) {
      requiredText(cut.name, `${label}.cuts.${cut.id}.name`);
      requireField(methods.includes(cut.method), `${label}.cuts.${cut.id}.method: unknown method`);
    }
  }
  for (const animal of chartAnimals) {
    for (const region of Object.keys(chartArt[animal].regions)) {
      requireField(primals.filter(primal => primal.animal === animal && primal.region === region).length === 1, `primals.${region}: use this ${animal} artwork region exactly once`);
    }
  }
  for (const guide of guides) {
    const label = `guides.${guide.id}`;
    requiredText(guide.title, `${label}.title`);
    requiredText(guide.heat, `${label}.heat`);
    requireField(methods.includes(guide.method), `${label}.method: unknown method`);
    positive(guide.activeMinutes, `${label}.activeMinutes`);
    positive(guide.totalMinutes, `${label}.totalMinutes`);
    positive(guide.restMinutes, `${label}.restMinutes`);
    requireField(guide.activeMinutes + guide.restMinutes <= guide.totalMinutes, `${label}.totalMinutes: include active and resting time`);
    if (guide.targetCoreC !== undefined) positive(guide.targetCoreC, `${label}.targetCoreC`);
    requireField(Array.isArray(guide.cutIds) && guide.cutIds.length, `${label}.cutIds: link at least one cut`);
    for (const id of guide.cutIds) requireField(cutIds.has(id), `${label}.cutIds: missing cut ${id}`);
    requireField(Array.isArray(guide.steps) && guide.steps.length >= 3 && guide.steps.length <= 6, `${label}.steps: use three to six steps`);
    guide.steps.forEach((step, index) => requiredText(step, `${label}.steps[${index}]`));
  }

  requireField(isCalendarDate(christmas.enquiriesOpen), 'christmas.enquiriesOpen: use YYYY-MM-DD');
  requireField(isCalendarDate(christmas.enquiriesClose) && christmas.enquiriesOpen < christmas.enquiriesClose, 'christmas.enquiriesClose: must be after enquiriesOpen');
  requireField(christmas.collectionDays.length && christmas.closedDays.length, 'christmas: add collectionDays and closedDays');
  let prior = christmas.enquiriesClose;
  for (const date of christmas.collectionDays) {
    requireField(isCalendarDate(date) && prior < date, `christmas.collectionDays.${date}: dates must be unique, ordered and after enquiriesClose`);
    const hours = christmas.collectionHours[date];
    validateInterval(`christmas.collectionHours.${date}`, hours?.opens, hours?.closes);
    prior = date;
  }
  for (const date of Object.keys(christmas.collectionHours)) {
    requireField(christmas.collectionDays.includes(date), `christmas.collectionHours.${date}: missing collection day`);
  }
  for (const date of christmas.closedDays) {
    requireField(isCalendarDate(date) && prior < date, `christmas.closedDays.${date}: dates must be unique, ordered and after collection days`);
    prior = date;
  }
  ids(christmasItems, 'christmasItems');
  for (const item of christmasItems) {
    const label = `christmasItems.${item.id}`;
    pricedItem(item, label);
    requiredText(item.description, `${label}.description`);
    requiredText(item.sizes, `${label}.sizes`);
    requireField(['kg', 'each'].includes(item.unit), `${label}.unit: use kg or each`);
  }
}
