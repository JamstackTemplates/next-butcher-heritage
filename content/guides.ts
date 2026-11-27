import type { Method } from './cuts.ts';

export interface Guide {
  /** ID also forms the guide's URL fragment. */
  id: string;
  title: string;
  method: Method;
  cutIds: readonly string[];
  activeMinutes: number;
  /** Elapsed time including rest and, where applicable, marinating or overnight drying. */
  totalMinutes: number;
  heat: string;
  targetCoreC?: number;
  restMinutes: number;
  steps: readonly string[];
}

export const guides: readonly Guide[] = [
  { id: 'reverse-seared-rib-eye', title: 'Reverse-seared rib eye', method: 'grill', cutIds: ['rib-eye', 'sirloin', 'eye-fillet', 't-bone', 'rump-steak'], activeMinutes: 15, totalMinutes: 65, heat: '110°C oven, then a hot grill', targetCoreC: 63, restMinutes: 8, steps: [
    'Pat a thick rib eye dry and season both sides. Set it on a wire rack over a baking tray.',
    'Roast at 110°C until the centre reaches 52°C. Start checking after about 30 minutes.',
    'Sear in a smoking-hot pan or over a grill for about 60 seconds a side. Sear the edges too, and continue cooking until the centre reaches at least 63°C.',
    'Rest for eight minutes, then slice across the grain.',
  ] },
  { id: 'slow-roast-lamb-shoulder', title: 'Slow-roast saltbush lamb shoulder', method: 'slow', cutIds: ['bone-in-shoulder'], activeMinutes: 20, totalMinutes: 305, heat: '150°C, then 200°C', restMinutes: 20, steps: [
    'Rub the shoulder with olive oil, crushed garlic, rosemary and salt. Set it over sliced onions with a splash of water.',
    'Cover tightly and roast at 150°C for four hours, until the meat pulls easily from the bone.',
    'Uncover and roast at 200°C for another 30 minutes to brown the surface.',
    'Rest for 20 minutes and bring the pan juices to the table.',
  ] },
  { id: 'butterflied-lamb-leg', title: 'Butterflied lamb leg on the grill', method: 'grill', cutIds: ['butterflied-leg'], activeMinutes: 35, totalMinutes: 165, heat: 'Medium-hot grill', targetCoreC: 63, restMinutes: 10, steps: [
    'Coat the lamb with olive oil, garlic, lemon zest and rosemary. Marinate in the fridge for two hours.',
    'Grill for roughly 12 minutes per side, checking the thickest part as it approaches 57°C.',
    'Move the leg to a cooler part of the grill and cook until the thickest part reaches at least 63°C.',
    'Rest for ten minutes, then cut across the grain into wide slices.',
  ] },
  { id: 'low-and-slow-brisket', title: 'Low-and-slow brisket point', method: 'slow', cutIds: ['brisket-point', 'brisket-flat'], activeMinutes: 35, totalMinutes: 540, heat: '120°C smoker or kettle', targetCoreC: 93, restMinutes: 60, steps: [
    'Trim thick, hard fat from the point. Season generously with coarse salt and pepper.',
    'Set the smoker or kettle to 120°C and cook over indirect heat.',
    'At about 70°C in the centre, wrap in unwaxed butcher paper. Return the brisket to the smoker.',
    'Cook until a probe slides in easily at around 93°C. Allow about eight hours for the cook.',
    'Rest for an hour, still wrapped, then slice across the grain.',
  ] },
  { id: 'crackling-pork-belly', title: 'Crackling pork belly', method: 'roast', cutIds: ['belly'], activeMinutes: 15, totalMinutes: 615, heat: '240°C, then 160°C', targetCoreC: 75, restMinutes: 15, steps: [
    'Leave the scored belly uncovered in the fridge overnight, skin side up, to dry the rind.',
    'Pat dry, rub salt into the scores and roast at 240°C for 30 minutes.',
    'Lower the oven to 160°C and roast for about 90 minutes more, until the centre reaches 75°C.',
    'Rest for 15 minutes uncovered so the crackling stays crisp.',
  ] },
  { id: 'slow-braised-chuck', title: 'Red wine braised chuck', method: 'braise', cutIds: ['chuck-steak', 'blade'], activeMinutes: 25, totalMinutes: 220, heat: '150°C oven', restMinutes: 15, steps: [
    'Season the chuck and brown it in batches in a heavy, ovenproof pot.',
    'Soften onion and carrot in the pot, then add red wine, stock and a bay leaf. Return the meat and bring to a simmer.',
    'Cover and braise at 150°C for about three hours, until the meat gives to a spoon.',
    'Rest the chuck in its cooking liquid for 15 minutes before serving.',
  ] },
];
