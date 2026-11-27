export interface ChristmasSeason {
  /** Dates in YYYY-MM-DD. Collection clocks use local HH:MM. */
  enquiriesOpen: string;
  enquiriesClose: string;
  collectionDays: readonly string[];
  collectionHours: Readonly<Record<string, { opens: string; closes: string }>>;
  closedDays: readonly string[];
}

export interface ChristmasItem {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  unit: 'kg' | 'each';
  sizes: string;
  available: boolean;
}

export const christmas: ChristmasSeason = {
  enquiriesOpen: '2026-11-01',
  enquiriesClose: '2026-12-18',
  collectionDays: ['2026-12-22', '2026-12-23', '2026-12-24'],
  collectionHours: {
    '2026-12-22': { opens: '07:00', closes: '18:00' },
    '2026-12-23': { opens: '07:00', closes: '18:00' },
    '2026-12-24': { opens: '06:30', closes: '14:00' },
  },
  closedDays: ['2026-12-25', '2026-12-26'],
};

export const christmasItems: readonly ChristmasItem[] = [
  { id: 'leg-ham-bone-in', name: 'Bone-in leg ham', description: 'Brined and smoked in-house over red gum', priceCents: 3490, unit: 'kg', sizes: '4–9 kg', available: true },
  { id: 'half-ham', name: 'Half leg ham', description: 'Shank or butt end', priceCents: 3690, unit: 'kg', sizes: '2.5–4.5 kg', available: true },
  { id: 'free-range-turkey', name: 'Free-range turkey', description: 'Whole, from the Barossa', priceCents: 2290, unit: 'kg', sizes: '4–7 kg', available: true },
  { id: 'stuffed-turkey-roll', name: 'Stuffed turkey breast roll', description: 'Sage, onion and cranberry stuffing', priceCents: 4200, unit: 'each', sizes: '1.6 kg', available: true },
  { id: 'standing-rib-roast', name: 'Standing rib roast', description: '28-day dry-aged, three to five bones', priceCents: 5600, unit: 'kg', sizes: '2.5–5 kg', available: true },
  { id: 'saltbush-lamb-leg-xmas', name: 'Saltbush lamb leg', description: 'Bone-in, shank frenched', priceCents: 2490, unit: 'kg', sizes: '2–3 kg', available: true },
  { id: 'pork-rack-crackling', name: 'Pork rack, scored', description: 'Six-bone, skin scored for crackling', priceCents: 3200, unit: 'kg', sizes: '2–3 kg', available: true },
  { id: 'glazed-ham-ready', name: 'Glazed ham, ready to carve', description: 'Orange and bush honey glaze', priceCents: 12900, unit: 'each', sizes: '4 kg', available: false },
];
