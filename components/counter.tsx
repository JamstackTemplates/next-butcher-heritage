import type { ReactNode } from 'react';
import { business } from '../content/business';
import { christmas } from '../content/christmas';
import { christmasHours } from '../lib/christmas';
import { mapDirectionsUrl } from '../lib/maps';
import { GoogleMap } from './google-map';
import { OpenBadge } from './open-badge';
import { MarketWindow } from './art/market-window';
import { Icon, PriceTicket } from './art/marks';
import { SiteLink } from './site-link';

type Copy = { children: ReactNode };

export function Heading({ children, className = '' }: Copy & { className?: string }) {
  return <h2 className={`heading ${className}`}>{children}</h2>;
}

export function Subheading({ children, className = '' }: Copy & { className?: string }) {
  return <h3 className={`font-display text-lg sm:text-xl ${className}`}>{children}</h3>;
}

export function Label({ children, className = '' }: Copy & { className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function Paragraph({ children, className = '' }: Copy & { className?: string }) {
  return <p className={`max-w-[65ch] leading-relaxed ${className}`}>{children}</p>;
}

export function CallToAction({ children, href, tone = 'primary', className = '' }: Copy & {
  href: string; tone?: 'primary' | 'gold' | 'quiet'; className?: string;
}) {
  const buttons = { primary: 'button', gold: 'button button-gold', quiet: 'button button-quiet' };
  return <SiteLink href={href} className={`${buttons[tone]} ${className}`}>{children}</SiteLink>;
}

export function OpeningTicket({ className = '' }: { className?: string }) {
  return <PriceTicket caption="At the counter" className={className}>
    <span className="mt-1 flex items-center justify-center gap-2 text-sm font-bold">
      <Icon name="clock" className="size-4"/>
      <OpenBadge hours={business.hours} overrides={christmasHours(christmas)} />
    </span>
  </PriceTicket>;
}

export function WeeklyHours({ compact = false }: { compact?: boolean }) {
  return <dl className={`tabular-nums ${compact ? 'space-y-0.5 text-sm' : 'divide-y divide-line'}`}>
    {business.hours.map(({ day, opens, closes }) => <div key={day} className={`flex justify-between gap-5 ${compact ? '' : 'py-1.5'}`}>
      <dt>{day}</dt><dd className="whitespace-nowrap">{opens && closes ? `${opens}–${closes}` : 'Closed'}</dd>
    </div>)}
  </dl>;
}

export function ShopAddress() {
  const { venue, street, locality, region, postcode, country } = business.address;
  return <address className="not-italic">
    <strong>{venue}</strong><br/>
    {street}<br/>
    {locality} {region} {postcode}, {country}
  </address>;
}

export function DirectionsLink({ children }: Copy) {
  return <a href={mapDirectionsUrl(business.mapQuery)} className="text-link inline-flex items-center gap-2">
    <Icon name="pin" className="size-5"/>{children}
  </a>;
}

export function VisitMap({ children }: Copy) {
  if (!business.showMap) return null;
  return <details className="window-map marble-surface group no-print">
    <summary className="flex min-h-44 list-none flex-col items-center justify-center gap-2 px-4 pt-6 pb-4 text-center font-bold text-leaf hover:underline group-open:min-h-11 group-open:py-3 [&::-webkit-details-marker]:hidden">
      <span className="group-open:hidden"><MarketWindow/></span>
      <span className="inline-flex items-center gap-2"><Icon name="pin" className="size-5"/>{children}<span aria-hidden="true" className="group-open:rotate-180">⌄</span></span>
    </summary>
    <GoogleMap address={business.mapQuery} title={`Map of ${business.address.venue}`}/>
  </details>;
}

export function ContactLinks() {
  return <div className="space-y-3">
    <a href={`mailto:${business.email}`} className="flex items-center gap-2 font-semibold underline underline-offset-4">
      <Icon name="envelope" className="size-5"/><span className="min-w-0 wrap-anywhere">{business.email}</span>
    </a>
    <a href={`tel:${business.telephone}`} className="flex items-center gap-2 font-semibold underline underline-offset-4">
      <Icon name="phone" className="size-5"/>{business.phone}
    </a>
  </div>;
}
