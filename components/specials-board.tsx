'use client';

import { useEffect, useState } from 'react';
import { animals, type Animal, type Special } from '../content/specials';
import { Icon } from './art/marks';
import { Price, priceLabel } from './price';

const labels = { all: 'All', beef: 'Beef', lamb: 'Lamb', pork: 'Pork', chicken: 'Chicken', smallgoods: 'Sausages & smallgoods' };
type Filter = Animal | 'all';
const filters: readonly Filter[] = ['all', ...animals];

function fromHash(): Filter {
  return filters.find(filter => `#${filter}` === window.location.hash) ?? 'all';
}

export function SpecialsBoard({ items, filterable = false }: { items: readonly Special[]; filterable?: boolean }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    if (!filterable) return;
    const read = () => setFilter(fromHash());
    read();
    setEnhanced(true);
    window.addEventListener('hashchange', read);
    window.addEventListener('popstate', read);
    return () => {
      window.removeEventListener('hashchange', read);
      window.removeEventListener('popstate', read);
    };
  }, [filterable]);
  const shown = items.filter(item => filter === 'all' || filter === item.animal);

  function choose(value: Filter) {
    setFilter(value);
    const { pathname, search } = window.location;
    const hash = value === 'all' ? '' : `#${value}`;
    if (hash !== window.location.hash) window.history.pushState(null, '', `${pathname}${search}${hash}`);
  }

  return <>
    {enhanced ? <div className="mb-6 no-print">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by animal">
        {filters.map(value => <button type="button" key={value} onClick={() => choose(value)} aria-pressed={filter === value}
          className="flex min-h-11 items-center gap-2 rounded-sm border border-chalk/65 px-3 py-1.5 text-sm font-bold hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-[#231b0d]">
          {value !== 'all' && value !== 'smallgoods' ? <Icon name={value} className="size-5"/> : null}{labels[value]}
        </button>)}
      </div>
      <p role="status" className="mt-3 text-sm text-chalk/85">{shown.length} {shown.length === 1 ? 'special' : 'specials'}</p>
    </div> : null}
    <ul className={`print-list grid gap-x-10 ${filterable ? '' : 'lg:grid-cols-2'}`}>
      {items.map(item => <li key={item.id} data-special={item.id} hidden={filter !== 'all' && filter !== item.animal}
        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 border-b border-dashed border-chalk/40 py-5 sm:gap-x-4">
        <div>
          <h3 className="font-script text-[clamp(1.35rem,3vw,2.1rem)]">{item.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-chalk/85 sm:text-base">{item.description}</p>
          {!item.available ? <span className="sold-stamp mt-2 inline-block px-1.5 text-sm font-black tracking-wider">Sold out</span> :
            item.sellingFast ? <span className="mt-1.5 inline-block text-sm font-semibold text-gold"><span aria-hidden="true">✧ </span>Selling fast</span> : null}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Price cents={item.priceCents} unit={item.unit}/>
          {item.wasCents !== undefined ? <p className="text-xs text-chalk/90 sm:text-sm">Was <s>{priceLabel(item.wasCents, item.unit)}</s></p> : null}
        </div>
      </li>)}
    </ul>
  </>;
}
