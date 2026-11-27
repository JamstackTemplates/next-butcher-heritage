'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { site } from '../lib/site';
import { SiteLink } from './site-link';

export function ChristmasLink({ children }: { children: ReactNode }) {
  const [inSeason, setInSeason] = useState(false);
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-AU', { month: 'numeric', timeZone: site.timeZone || undefined });
    const update = () => setInSeason(Number(formatter.format(new Date())) >= 11);
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return <SiteLink href="/christmas/" className={`button ${inSeason ? 'season-action' : 'button-quiet'}`}>{children}</SiteLink>;
}
