import { PriceTicket } from './art/marks';

export function priceLabel(cents: number, unit?: 'kg' | 'pack' | 'each') {
  return `$${(cents / 100).toFixed(2)}${unit ? (unit === 'each' ? ' each' : `/${unit}`) : ''}`;
}

export function Price({ cents, unit, className = '' }: {
  cents: number; unit?: 'kg' | 'pack' | 'each'; className?: string;
}) {
  return <PriceTicket className={className}>
    <span className="whitespace-nowrap font-display text-[clamp(1.05rem,2vw,1.65rem)]">{priceLabel(cents)}{unit ? <span className="font-script text-sm">{unit === 'each' ? ' each' : `/${unit}`}</span> : null}</span>
  </PriceTicket>;
}
