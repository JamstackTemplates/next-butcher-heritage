import type { OpeningHours } from '../lib/hours.ts';

/** Fictitious gallery business. Update the public name in site.config.json as well. */
export const business = {
  name: 'Saltbush & Cleaver Butchery',
  wordmark: 'Saltbush & Cleaver',
  established: 1928,
  tagline: 'Cut to order since 1928.',
  introduction: 'Heritage butcher at the Adelaide Central Market.',
  story: 'Three generations of our family have worked behind this counter. We buy whole carcasses, break them down by hand and age our beef on the bone in the window room. Our saltbush lamb comes from the South Australian rangelands.',
  email: 'counter@saltbushandcleaver.example',
  phone: '(08) 7010 0472',
  telephone: '+61870100472',
  address: {
    venue: 'Adelaide Central Market', street: '44–60 Gouger Street', locality: 'Adelaide',
    region: 'SA', postcode: '5000', country: 'Australia', countryCode: 'AU',
  },
  geo: { latitude: -34.9298, longitude: 138.5988 },
  mapQuery: 'Adelaide Central Market, 44–60 Gouger Street, Adelaide SA 5000, Australia',
  showMap: true,
  directions: 'On the Grote Street side, by the clock.',
  priceRange: '$$',
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '07:30', closes: '17:30' },
    { day: 'Wednesday', opens: '07:30', closes: '17:30' },
    { day: 'Thursday', opens: '07:30', closes: '17:30' },
    { day: 'Friday', opens: '07:00', closes: '21:00' },
    { day: 'Saturday', opens: '07:00', closes: '15:00' },
    { day: 'Sunday' },
  ] satisfies OpeningHours[],
  enquiries: {
    introduction: 'Ask about barbecue packs, Christmas preorders, larger quantities or a cut for your recipe.',
  },
};
