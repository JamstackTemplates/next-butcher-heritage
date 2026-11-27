import { business } from '../content/business';
import { christmas } from '../content/christmas';
import { primals } from '../content/cuts';
import { packs } from '../content/packs';
import { specials } from '../content/specials';
import { ChristmasWreath, HookRail, SaltbushSprig, TileBand, TwineDivider } from '../components/art/marks';
import { CallToAction, DirectionsLink, Heading, Label, OpeningTicket, Paragraph, ShopAddress, Subheading, VisitMap, WeeklyHours } from '../components/counter';
import { ChristmasLink } from '../components/christmas-link';
import { CutChart } from '../components/cut-chart';
import { Hero } from '../components/home-hero';
import { PackShelf } from '../components/pack-display';
import { SiteLink } from '../components/site-link';
import { SpecialsBoard } from '../components/specials-board';
import { dateLabel, dateSpan, tradingDates } from '../lib/dates';
import { pageMetadata } from '../lib/metadata';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata = pageMetadata('/');

export default function HomePage() {
  const homePrimals = primals.filter(entry => entry.animal === 'lamb' && entry.id !== 'lamb-loin');
  const [wordmark, ...rest] = business.wordmark.split(' & ');
  return <>
    <Hero>
      <Hero.Location>{business.address.venue}</Hero.Location>
      <Hero.Brand>
        {wordmark}
        {rest.length ? <span className="block whitespace-nowrap">
          <span className="mr-[.14em] align-[.1em] text-[.55em] text-oxblood">&amp;</span>{' '}{rest.join(' & ')}
        </span> : null}
      </Hero.Brand>
      <Hero.Lead>{business.tagline} Here's what's on the board this week.</Hero.Lead>
      <Hero.Actions>
        <CallToAction href="/specials/">See this week's specials</CallToAction>
        <ChristmasLink>Christmas preorder enquiries</ChristmasLink>
      </Hero.Actions>
      <Hero.Hours/>
    </Hero>

    <TileBand/>
    <section className="chalk-surface section-pad relative overflow-hidden">
      <SaltbushSprig className="pointer-events-none absolute -right-10 -bottom-8 w-72 rotate-[160deg] opacity-25 no-print"/>
      <div className="wrap">
        <HookRail className="mb-4 w-64 max-w-full no-print"/>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <Heading>On the board this week</Heading>
          <p className="border-y border-dashed border-gold/65 py-1 font-script text-xl text-gold">{dateSpan(specials.weekOf, specials.validUntil)}</p>
        </div>
        <SpecialsBoard items={specials.items.filter(item => item.featured)}/>
        <CallToAction href="/specials/" tone="gold" className="mt-8">See all specials</CallToAction>
      </div>
    </section>
    <div aria-hidden="true" className="timber-edge no-print"/>

    <section className="marble-surface section-pad">
      <div className="wrap counter-reveal">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <Heading>Know your cuts</Heading>
            <Paragraph className="mt-3 text-muted">Find the best way to cook your saltbush lamb. Choose a cut on the chart.</Paragraph>
          </div>
          <SaltbushSprig className="hidden w-30 shrink-0 -rotate-12 sm:block"/>
        </div>
        <CutChart entries={homePrimals} preview/>
        <CallToAction href="/cuts/" className="mt-7">Explore cuts &amp; cooking guides</CallToAction>
      </div>
    </section>

    <div aria-hidden="true" className="awning-scallops no-print"/>
    <section className="butcher-paper section-pad relative -mt-[38px] overflow-hidden">
      <SaltbushSprig className="pointer-events-none absolute -top-4 -left-12 w-64 rotate-[25deg] opacity-30 no-print"/>
      <div className="wrap counter-reveal relative">
        <TwineDivider/>
        <Heading className="mt-6">Barbecue packs</Heading>
        <Paragraph className="mt-3 text-muted">From four at the grill to twelve around the table.</Paragraph>
        <PackShelf packs={packs}/>
        <CallToAction href="/packs/" tone="quiet" className="mt-5">See what's in each pack</CallToAction>
      </div>
    </section>

    <section className="tiled-surface section-pad border-y-2 border-gilt">
      <div className="wrap grid items-center gap-6 sm:grid-cols-[1fr_1.55fr] lg:gap-16">
        <ChristmasWreath className="mx-auto w-40 sm:w-full sm:max-w-78"/>
        <div className="counter-reveal">
          <Heading className="text-gold">Christmas at the counter</Heading>
          <Label className="mt-5 text-chalk">Preorder enquiries close</Label>
          <p className="mt-1 font-display text-[clamp(3.1rem,8vw,6.5rem)] leading-none text-gold"><time dateTime={christmas.enquiriesClose}>{dateLabel(christmas.enquiriesClose)}</time></p>
          <Paragraph className="mt-4 font-semibold text-chalk">Collect {tradingDates(christmas.collectionDays)}.</Paragraph>
          <CallToAction href="/contact/" tone="gold" className="mt-6">Send a Christmas preorder enquiry</CallToAction>
        </div>
      </div>
    </section>

    <section className="paper-surface section-pad relative z-[1]">
      <div aria-hidden="true" className="torn-edge no-print"/>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden no-print">
        <p className="watermark-numerals absolute -right-6 bottom-[-.08em] text-[clamp(8rem,24vw,22rem)]">1928</p>
      </div>
      <div className="wrap counter-reveal relative grid items-center gap-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
        <div className="marble-surface border border-line p-6 sm:p-10">
          <Heading>The shop</Heading>
          <Paragraph className="story-dropcap mt-5 text-muted">{business.story}</Paragraph>
        </div>
        <div>
          <Subheading>Counter promises</Subheading>
          <ol className="mt-4 grid gap-3">
            <CounterPromise number={1}>We buy whole animals.</CounterPromise>
            <CounterPromise number={2}>We make our sausages in-house, with no fillers.</CounterPromise>
            <CounterPromise number={3}>We cut and trim free on request.</CounterPromise>
          </ol>
        </div>
      </div>
    </section>

    <section id="find-us" className="marble-surface section-pad pt-0!">
      <div aria-hidden="true" className="brass-rail mx-auto mb-[clamp(3rem,6vw,6rem)] w-[min(100%-2.5rem,78rem)] no-print"/>
      <div className="wrap counter-reveal">
        <Heading>Find us</Heading>
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
          <div className="enamel px-5 py-6 sm:px-8">
            <Subheading>Trading hours</Subheading>
            <OpeningTicket className="my-4"/>
            <WeeklyHours/>
          </div>
          <div>
            <ShopAddress/>
            <Paragraph className="mt-2 text-muted">{business.directions}</Paragraph>
            <div className="mt-3 mb-5"><DirectionsLink>Get directions</DirectionsLink></div>
            <VisitMap>Show market map</VisitMap>
          </div>
        </div>
      </div>
    </section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </>;
}

function CounterPromise({ number, children }: { number: number; children: string }) {
  return <li className="flex items-center gap-4 border-4 border-double border-gilt bg-glass px-4 py-3 text-chalk sm:px-6">
    <span aria-hidden="true" className="font-display text-2xl text-gold">{number}</span>
    <span className="font-semibold">{children}</span>
  </li>;
}
