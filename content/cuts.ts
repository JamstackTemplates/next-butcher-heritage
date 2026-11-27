export const chartAnimals = ['beef', 'lamb', 'pork'] as const;
export const methods = ['grill', 'roast', 'braise', 'slow', 'pan'] as const;
export type ChartAnimal = typeof chartAnimals[number];
export type Method = typeof methods[number];

export interface Primal {
  id: string;
  animal: ChartAnimal;
  name: string;
  /** ID of the corresponding region in the chart artwork. */
  region: string;
  cuts: readonly { id: string; name: string; method: Method }[];
  /** The cooking guide to show below this primal. */
  guideId: string;
}

export const primals: readonly Primal[] = [
  { id: 'beef-chuck', animal: 'beef', name: 'Chuck', region: 'beef-chuck', guideId: 'slow-braised-chuck', cuts: [
    { id: 'chuck-steak', name: 'Chuck steak', method: 'braise' }, { id: 'blade', name: 'Blade', method: 'slow' }, { id: 'oyster-blade', name: 'Oyster blade', method: 'pan' },
  ] },
  { id: 'beef-rib', animal: 'beef', name: 'Rib', region: 'beef-rib', guideId: 'reverse-seared-rib-eye', cuts: [
    { id: 'rib-eye', name: 'Rib eye', method: 'grill' }, { id: 'standing-rib', name: 'Standing rib roast', method: 'roast' },
  ] },
  { id: 'beef-loin', animal: 'beef', name: 'Loin', region: 'beef-loin', guideId: 'reverse-seared-rib-eye', cuts: [
    { id: 'sirloin', name: 'Sirloin', method: 'grill' }, { id: 'eye-fillet', name: 'Eye fillet', method: 'pan' }, { id: 't-bone', name: 'T-bone', method: 'grill' },
  ] },
  { id: 'beef-brisket', animal: 'beef', name: 'Brisket', region: 'beef-brisket', guideId: 'low-and-slow-brisket', cuts: [
    { id: 'brisket-point', name: 'Point end', method: 'slow' }, { id: 'brisket-flat', name: 'Flat', method: 'slow' },
  ] },
  { id: 'beef-rump', animal: 'beef', name: 'Rump', region: 'beef-rump', guideId: 'reverse-seared-rib-eye', cuts: [
    { id: 'rump-cap', name: 'Rump cap', method: 'roast' }, { id: 'rump-steak', name: 'Rump steak', method: 'grill' },
  ] },
  { id: 'lamb-shoulder', animal: 'lamb', name: 'Shoulder', region: 'lamb-shoulder', guideId: 'slow-roast-lamb-shoulder', cuts: [
    { id: 'bone-in-shoulder', name: 'Bone-in shoulder', method: 'slow' }, { id: 'neck-chops', name: 'Neck chops', method: 'braise' },
  ] },
  { id: 'lamb-rack', animal: 'lamb', name: 'Rack', region: 'lamb-rack', guideId: 'butterflied-lamb-leg', cuts: [
    { id: 'lamb-cutlets', name: 'Cutlets', method: 'grill' }, { id: 'frenched-rack', name: 'Frenched rack', method: 'roast' },
  ] },
  { id: 'lamb-loin', animal: 'lamb', name: 'Loin', region: 'lamb-loin', guideId: 'butterflied-lamb-leg', cuts: [
    { id: 'lamb-loin-chops', name: 'Loin chops', method: 'grill' }, { id: 'lamb-backstrap', name: 'Backstrap', method: 'pan' },
  ] },
  { id: 'lamb-leg', animal: 'lamb', name: 'Leg', region: 'lamb-leg', guideId: 'butterflied-lamb-leg', cuts: [
    { id: 'bone-in-leg', name: 'Bone-in leg', method: 'roast' }, { id: 'butterflied-leg', name: 'Butterflied leg', method: 'grill' },
  ] },
  { id: 'pork-shoulder', animal: 'pork', name: 'Shoulder', region: 'pork-shoulder', guideId: 'crackling-pork-belly', cuts: [
    { id: 'boston-butt', name: 'Boston butt', method: 'slow' }, { id: 'scotch-fillet', name: 'Scotch fillet', method: 'grill' },
  ] },
  { id: 'pork-loin', animal: 'pork', name: 'Loin', region: 'pork-loin', guideId: 'crackling-pork-belly', cuts: [
    { id: 'pork-loin-chops', name: 'Loin chops', method: 'pan' }, { id: 'rack-of-pork', name: 'Rack of pork', method: 'roast' },
  ] },
  { id: 'pork-belly', animal: 'pork', name: 'Belly', region: 'pork-belly', guideId: 'crackling-pork-belly', cuts: [
    { id: 'belly', name: 'Belly', method: 'roast' }, { id: 'spare-ribs', name: 'Spare ribs', method: 'slow' },
  ] },
  { id: 'pork-leg', animal: 'pork', name: 'Leg', region: 'pork-leg', guideId: 'crackling-pork-belly', cuts: [
    { id: 'ham', name: 'Ham', method: 'roast' }, { id: 'pork-leg-roast', name: 'Leg roast', method: 'roast' },
  ] },
];
