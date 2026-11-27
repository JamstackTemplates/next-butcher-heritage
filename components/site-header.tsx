import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { navigation } from '../content/navigation';
import { Icon } from './art/marks';
import { MobileNav } from './mobile-nav';
import { SiteLink } from './site-link';

const items = navigation.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page"
  className="flex min-h-10 items-center text-[.875rem] font-bold tracking-[.08em] [font-variant:small-caps] hover:text-gold">
  {item.label}
</SiteLink>);

export function SiteHeader() {
  return <header className="signboard tiled-surface">
    <div className="wrap flex min-h-[4.5rem] items-center justify-between gap-3 md:min-h-23">
      <SiteLink href="/" aria-label={`${business.name} home`} className="flex items-center gap-2.5 text-gold no-underline sm:gap-3">
        <Icon name="cleaver" className="hidden size-8 sm:block"/>
        <div>
          <span className="block font-display text-[clamp(.86rem,2.2vw,1.18rem)] leading-tight">{business.wordmark}</span>
          <span className="mt-1 block text-[.7rem] font-bold tracking-[.19em] uppercase sm:text-[.72rem]">Butchery · Est. {business.established}</span>
        </div>
      </SiteLink>
      <nav aria-label="Main" className="hidden flex-wrap items-center gap-x-5 lg:flex xl:gap-x-7">{items}</nav>
      <div className="flex items-center gap-2">
        <MobileNav>{items}</MobileNav>
        <DarkModeToggle />
      </div>
    </div>
    <div className="awning-edge" />
  </header>;
}
