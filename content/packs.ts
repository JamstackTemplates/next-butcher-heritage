export interface Pack {
  id: string;
  name: string;
  /** Number of people served and total price in AUD cents. */
  serves: number;
  priceCents: number;
  available: boolean;
  blurb: string;
  /** Quantity is the number of pieces or containers. Weight, when supplied, is for the line. */
  contents: readonly { item: string; quantity: number; weightGrams?: number }[];
}

export const noticeDays = 2;

export const packs: readonly Pack[] = [
  { id: 'backyard-starter', name: 'Backyard starter', serves: 4, priceCents: 6500, available: true, blurb: 'Sausages, skewers and burgers for an easy Saturday grill.', contents: [
    { item: 'Pork and fennel sausages', quantity: 8, weightGrams: 640 },
    { item: 'Chicken thigh skewers', quantity: 4, weightGrams: 600 },
    { item: 'Beef burgers', quantity: 4, weightGrams: 600 },
  ] },
  { id: 'saltbush-lamb-pack', name: 'Saltbush lamb pack', serves: 6, priceCents: 11800, available: true, blurb: 'Rangelands lamb for the grill, from cutlets to a whole butterflied leg.', contents: [
    { item: 'Lamb cutlets', quantity: 12, weightGrams: 1000 },
    { item: 'Butterflied lamb leg', quantity: 1, weightGrams: 1800 },
    { item: 'Lamb and rosemary sausages', quantity: 6, weightGrams: 480 },
  ] },
  { id: 'steak-night', name: 'Steak night', serves: 4, priceCents: 12900, available: true, blurb: 'Two cuts of beef with a jar of sharp, herby house chimichurri.', contents: [
    { item: 'Dry-aged rib eyes', quantity: 2, weightGrams: 900 },
    { item: 'Sirloin steaks', quantity: 2, weightGrams: 600 },
    { item: 'Jar of house chimichurri', quantity: 1 },
  ] },
  { id: 'long-table', name: 'Long table', serves: 12, priceCents: 24500, available: true, blurb: 'Put the brisket on early, then make room on the grill for everyone.', contents: [
    { item: 'Brisket point', quantity: 1, weightGrams: 2500 },
    { item: 'Mixed sausages', quantity: 24, weightGrams: 1900 },
    { item: 'Chicken thigh skewers', quantity: 12, weightGrams: 1800 },
    { item: 'Butterflied lamb leg', quantity: 1, weightGrams: 1800 },
  ] },
];
