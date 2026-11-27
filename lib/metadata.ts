import type { Metadata } from 'next';
import { business } from '../content/business';
import { absoluteUrl } from './paths';
import { site } from './site';

export function pageMetadata(path: string, title?: string, summary?: string): Metadata {
  const url = absoluteUrl(path);
  const description = summary ?? (site.description || business.introduction);
  const displayTitle = title ? `${title} — ${business.name}` : business.name;
  const image = site.url ? `${site.url}/og.png` : undefined;
  return {
    title: title ?? { absolute: business.name }, description,
    alternates: { canonical: url },
    openGraph: { type: 'website', locale: 'en_AU', siteName: business.name, title: displayTitle, description, url,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: `${business.wordmark} heritage butcher signboard` }] } : {}) },
    twitter: { card: 'summary_large_image', title: displayTitle, description, ...(image ? { images: [image] } : {}) },
  };
}
