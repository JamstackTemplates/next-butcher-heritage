import type { ReactNode } from 'react';
import type { ChristmasItem } from '../content/christmas';
import { Price } from './price';

export function CalendarSlip({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <div className="docket calendar-slip relative min-h-34 border-t-4 border-oxblood px-4 pt-5 pb-4">
    <dt className="eyebrow mb-2 text-muted">{title}</dt>
    <dd className="leading-relaxed">{children}</dd>
  </div>;
}

export function ChristmasLedger({ items }: { items: readonly ChristmasItem[] }) {
  return <ul className="ledger print-list py-2">
    {items.map(item => <li key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-line py-5 pr-2 pl-3 sm:gap-6 sm:pr-5 sm:pl-8">
      <div>
        <h3 className="text-base font-bold sm:font-display sm:text-xl">{item.name}</h3>
        <p className="mt-1 text-sm text-muted sm:text-base">{item.description}</p>
        <p className="mt-1 text-sm font-bold">{item.sizes}</p>
        {!item.available ? <span className="sold-stamp mt-2 inline-block px-1.5 text-sm font-bold">Not this year</span> : null}
      </div>
      <Price cents={item.priceCents} unit={item.unit}/>
    </li>)}
  </ul>;
}
