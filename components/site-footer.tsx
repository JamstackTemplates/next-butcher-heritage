import { business } from '../content/business';
import { ContactLinks, ShopAddress, WeeklyHours } from './counter';
import { SaltbushSprig, TileBand } from './art/marks';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return <footer className="bg-glass text-chalk [--focus:var(--light-gold)]">
    <TileBand/>
    <div className="wrap grid gap-9 py-12 md:grid-cols-[1.05fr_.85fr_1fr] md:py-16">
      <div>
        <SiteLink href="/" className="font-display text-xl leading-snug text-gold">{business.wordmark}</SiteLink>
        <p className="eyebrow mt-1 text-gold">Butchery · Est. {business.established}</p>
        <SaltbushSprig className="mt-4 w-26"/>
      </div>
      <div>
        <h2 className="eyebrow mb-3 text-gold">The market</h2>
        <ShopAddress/>
        <div className="mt-4"><ContactLinks/></div>
      </div>
      <div className="max-w-xs">
        <h2 className="eyebrow mb-3 text-gold">Shop hours</h2>
        <WeeklyHours compact/>
      </div>
    </div>
  </footer>;
}
