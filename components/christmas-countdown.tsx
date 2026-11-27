'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { ChristmasSeason } from '../content/christmas';
import { christmasCountdown } from '../lib/christmas';
import { site } from '../lib/site';

export function ChristmasCountdown({ season, children }: { season: ChristmasSeason; children: ReactNode }) {
  const [label, setLabel] = useState<string>();
  useEffect(() => {
    const update = () => setLabel(christmasCountdown(season, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [season]);
  return <span>{label ?? children}</span>;
}
