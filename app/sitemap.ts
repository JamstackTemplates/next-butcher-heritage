import type { MetadataRoute } from 'next';
import { navigation } from '../content/navigation';
import { absoluteUrl } from '../lib/paths';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...navigation.map(item => item.href)].flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
