import type { Pack } from '../content/packs';
import { ButcherParcel, parcelVariants } from './art/marks';
import { Price } from './price';
import { SiteLink } from './site-link';

export function PackShelf({ packs }: { packs: readonly Pack[] }) {
  return <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-4 md:items-end md:gap-6 md:overflow-visible md:px-0">
    {packs.map((pack, index) => <li key={pack.id} className="w-[74%] max-w-66 shrink-0 snap-center md:w-auto md:max-w-none">
      <SiteLink href={`/packs/#${pack.id}`} className="group block">
        <div className={`flex items-end border-b-4 border-double border-gilt ${index % 2 ? 'md:h-44' : 'md:h-36'}`}>
          <ButcherParcel variant={parcelVariants[index % parcelVariants.length]} className="w-full group-hover:-translate-y-1 motion-safe:transition-transform"/>
        </div>
        <div className="pt-3">
          <h3 className="font-display text-lg text-leaf">{pack.name}</h3>
          <p className="mt-1 text-sm text-muted">Serves {pack.serves}</p>
          <Price cents={pack.priceCents} className="mt-3"/>
          {!pack.available ? <span className="sold-stamp ml-2 inline-block px-1.5 text-sm font-bold">Sold out</span> : null}
        </div>
      </SiteLink>
    </li>)}
  </ul>;
}

export function PackDockets({ packs }: { packs: readonly Pack[] }) {
  return <div className="space-y-15">
    {packs.map((pack, index) => <article key={pack.id} id={pack.id}
      className={`counter-reveal grid items-center gap-6 border-b border-line pb-9 md:grid-cols-2 md:gap-12`}>
      <div className={`marble-surface flex min-h-42 items-end justify-center border-b-4 border-double border-gilt px-4 pt-4 md:min-h-70 ${index % 2 ? 'md:order-2' : ''} ${pack.id === 'long-table' ? 'md:order-0 md:col-span-2 md:min-h-0' : ''}`}>
        <ButcherParcel variant={parcelVariants[index % parcelVariants.length]} className={`w-full max-w-[22rem] ${pack.id === 'long-table' ? 'md:max-w-xl' : ''}`}/>
      </div>
      <div className={`docket torn-docket p-5 sm:p-8 ${pack.id === 'long-table' ? 'md:order-3 md:col-span-2 md:mx-auto md:w-full md:max-w-3xl' : ''}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-[clamp(1.35rem,3vw,2.2rem)]">{pack.name}</h2>
          <p className="eyebrow text-muted">Serves {pack.serves}</p>
        </div>
        <p className="mt-2 text-muted">{pack.blurb}</p>
        <ul className="my-4 divide-y divide-line border-y border-line">
          {pack.contents.map((entry, line) => <li key={line} className="flex items-baseline justify-between gap-4 py-2">
            <span><span className="mr-2 font-bold tabular-nums">{entry.quantity} ×</span>{entry.item}</span>
            {entry.weightGrams ? <span className="shrink-0 text-sm text-muted tabular-nums">{entry.weightGrams.toLocaleString('en-AU')} g</span> : null}
          </li>)}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow">Pack total</p>
          <Price cents={pack.priceCents}/>
          {!pack.available ? <span className="sold-stamp inline-block px-2 text-sm font-bold">Sold out</span> : null}
        </div>
      </div>
    </article>)}
  </div>;
}
