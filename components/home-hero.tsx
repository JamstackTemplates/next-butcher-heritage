import type { ReactNode } from 'react';
import { asset } from '../lib/paths';
import { Icon } from './art/marks';
import { OpeningTicket } from './counter';
import { SiteLink } from './site-link';

type Copy = { children: ReactNode };

const ART_ALT = 'Painted view along the marble counter: dry-aged rib eye, a frenched lamb rack, coiled sausages and scored pork belly in front of green enamel tiles, a brass scale and a cleaver on the block.';
const srcSet = (mode: 'light' | 'dark') =>
  `${asset(`/hero/counter-${mode}-800.webp`)} 800w, ${asset(`/hero/counter-${mode}-1376.webp`)} 1376w`;
const sizes = '(min-width: 48rem) 100vw, 160vw';
const artClass = 'h-full w-full object-cover object-[72%_50%] md:object-[60%_50%] xl:object-center';

/**
 * The counter painting in both themes. The first picture follows the operating-system theme with a
 * single download. The two lazy fallbacks only appear (and so only download) when the visitor has
 * chosen the opposite theme with the toggle, which sets `.light` or `.dark` on the root element.
 */
function HeroArt() {
  return <div className="hero-art relative aspect-[5/4] w-full overflow-hidden sm:aspect-[16/9] md:absolute md:inset-0 md:aspect-auto">
    <picture className="hero-art__auto">
      <source media="(prefers-color-scheme: dark)" srcSet={srcSet('dark')} sizes={sizes} />
      <img src={asset('/hero/counter-light-1376.webp')} srcSet={srcSet('light')} sizes={sizes}
        width={1376} height={768} alt={ART_ALT} fetchPriority="high" decoding="async" className={artClass}/>
    </picture>
    <img className={`hero-art__light ${artClass}`} src={asset('/hero/counter-light-1376.webp')} srcSet={srcSet('light')} sizes={sizes}
      width={1376} height={768} alt="" aria-hidden="true" loading="lazy" decoding="async"/>
    <img className={`hero-art__dark ${artClass}`} src={asset('/hero/counter-dark-1376.webp')} srcSet={srcSet('dark')} sizes={sizes}
      width={1376} height={768} alt="" aria-hidden="true" loading="lazy" decoding="async"/>
    <div aria-hidden="true" className="hero-fade absolute inset-0"/>
  </div>;
}

/** A round gilt shop seal, lettered like the window transfer on the glass. */
function ShopSeal() {
  return <svg aria-hidden="true" viewBox="0 0 120 120" className="hero-seal size-28 xl:size-32">
    <defs><path id="seal-ring" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1-82 0"/></defs>
    <circle cx="60" cy="60" r="57" fill="var(--glass)" stroke="var(--gilt)" strokeWidth="2"/>
    <circle cx="60" cy="60" r="51" fill="none" stroke="var(--gilt)" strokeWidth=".8"/>
    <circle cx="60" cy="60" r="31" fill="none" stroke="var(--gilt)" strokeWidth=".8"/>
    <text fill="var(--light-gold)" fontFamily="var(--font-sans)" fontSize="9.5" fontWeight="700" letterSpacing="2.6">
      <textPath href="#seal-ring" startOffset="0">FAMILY BUTCHERS · CUT TO ORDER ·</textPath>
    </text>
    <text x="60" y="57" textAnchor="middle" fill="var(--light-gold)" fontFamily="var(--font-sans)" fontSize="8" fontWeight="700" letterSpacing="2">EST.</text>
    <text x="60" y="74" textAnchor="middle" fill="var(--light-gold)" fontFamily="var(--font-display)" fontSize="17">1928</text>
    <path d="M44 80h32" stroke="var(--gilt)" strokeWidth=".8"/>
  </svg>;
}

function HeroSection({ children }: Copy) {
  return <section className="hero relative isolate flex flex-col overflow-hidden bg-paper md:block">
    <div className="wrap relative z-10 pt-8 pb-7 md:flex md:min-h-[clamp(560px,50vw,790px)] md:items-center md:py-16">
      <div className="max-w-[36rem] md:max-w-[min(46vw,38rem)]">{children}</div>
    </div>
    <HeroArt/>
    <div className="absolute bottom-10 left-[44%] z-10 hidden lg:block"><ShopSeal/></div>
  </section>;
}

function Location({ children }: Copy) {
  return <p className="eyebrow mb-3 flex items-center gap-2 text-leaf md:mb-5">
    <Icon name="pin" className="size-4"/>{children}
  </p>;
}

function Brand({ children }: Copy) {
  return <h1 className="relative w-fit pt-5 font-display text-[clamp(2.6rem,6.4vw,6rem)] leading-[1.02] tracking-[-.045em] text-ink md:pt-7">
    <svg aria-hidden="true" className="absolute inset-x-0 top-0 h-6 w-full text-gilt" viewBox="0 0 320 24" preserveAspectRatio="none">
      <path d="M2 22Q160-14 318 22" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 22Q160-6 312 22" fill="none" stroke="currentColor" strokeWidth=".6"/>
      <path d="m154 5 6-4 6 4-6 4Z" fill="currentColor"/>
    </svg>
    {children}
  </h1>;
}

function Lead({ children }: Copy) {
  return <p className="mt-4 max-w-[30ch] text-[clamp(1.05rem,1.75vw,1.4rem)] leading-snug font-semibold md:mt-6">{children}</p>;
}

function Actions({ children }: Copy) {
  return <div className="mt-6 flex flex-wrap items-center gap-2.5 md:mt-8">{children}</div>;
}

function Hours() {
  return <div className="relative mt-7 md:mt-8">
    <SiteLink href="/#find-us" className="inline-flex no-underline"><span className="sr-only">Shop hours. </span><OpeningTicket/></SiteLink>
  </div>;
}

export const Hero = Object.assign(HeroSection, { Location, Brand, Lead, Actions, Hours });
