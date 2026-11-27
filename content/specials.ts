export const animals = ['beef', 'lamb', 'pork', 'chicken', 'smallgoods'] as const;
export type Animal = typeof animals[number];

export interface Special {
  /** Stable, URL-safe ID that stays with the item through weekly edits. */
  id: string;
  name: string;
  animal: Animal;
  description: string;
  /** AUD cents. Optional previous price must be higher. */
  priceCents: number;
  unit: 'kg' | 'each' | 'pack';
  wasCents?: number;
  available: boolean;
  featured: boolean;
  sellingFast?: boolean;
}

export interface SpecialsWeek {
  /** Tuesday and Saturday of the same week, as YYYY-MM-DD. */
  weekOf: string;
  validUntil: string;
  items: readonly Special[];
}

export const specials: SpecialsWeek = {
  weekOf: '2026-11-24',
  validUntil: '2026-11-28',
  items: [
    { id: 'dry-aged-rib-eye', name: '28-day dry-aged rib eye', animal: 'beef', description: 'Grass-fed, aged on the bone in our window room', priceCents: 5490, unit: 'kg', wasCents: 6200, available: true, featured: true },
    { id: 'saltbush-lamb-cutlets', name: 'Saltbush lamb cutlets', animal: 'lamb', description: 'French-trimmed, from the Flinders Ranges', priceCents: 4600, unit: 'kg', available: true, featured: true, sellingFast: true },
    { id: 'butterflied-lamb-leg', name: 'Butterflied lamb leg', animal: 'lamb', description: 'Boned and flattened for the grill, about 1.8 kg', priceCents: 2650, unit: 'kg', wasCents: 2990, available: true, featured: true },
    { id: 'pork-belly-scored', name: 'Free-range pork belly, scored', animal: 'pork', description: 'Skin scored for crackling', priceCents: 2190, unit: 'kg', available: true, featured: false },
    { id: 'chicken-thigh-fillets', name: 'Free-range chicken thigh fillets', animal: 'chicken', description: 'Skin off, bone out', priceCents: 1750, unit: 'kg', wasCents: 1990, available: true, featured: false },
    { id: 'beef-brisket-point', name: 'Brisket point end', animal: 'beef', description: 'Well marbled, for low-and-slow', priceCents: 1890, unit: 'kg', available: true, featured: false },
    { id: 'pork-fennel-snags', name: 'Pork and fennel sausages', animal: 'smallgoods', description: 'House-made, natural casings, gluten-free', priceCents: 1590, unit: 'kg', available: true, featured: true },
    { id: 'smoked-kransky', name: 'Smoked cheese kransky', animal: 'smallgoods', description: 'Smoked in-house over red gum, pack of six', priceCents: 1400, unit: 'pack', available: false, featured: false },
  ],
};
