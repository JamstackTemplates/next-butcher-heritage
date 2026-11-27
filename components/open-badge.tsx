'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type HoursOverrides, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Neutral static output; browser refreshes in the business zone every minute. */
export function OpenBadge({ hours, overrides }: { hours: readonly OpeningHours[]; overrides?: HoursOverrides }) {
  const [label, setLabel] = useState('See opening hours');
  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone, new Date(), overrides));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, overrides]);
  return <span>{label}</span>;
}
