import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';
import { site } from './site.ts';

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const { street, locality, region, postcode, countryCode } = business.address;
  return {
    '@context': 'https://schema.org', '@type': 'Store',
    name: business.name, description: site.description || business.introduction,
    email: business.email, telephone: business.telephone, priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress', streetAddress: street, addressLocality: locality, addressRegion: region,
      postalCode: postcode, addressCountry: countryCode,
    },
    geo: { '@type': 'GeoCoordinates', ...business.geo },
    openingHoursSpecification: business.hours.flatMap(entry => entry.opens && entry.closes ? [{
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens, closes: entry.closes,
    }] : []),
    ...(url ? { url } : {}),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
