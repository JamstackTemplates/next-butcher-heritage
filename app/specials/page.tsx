import { specials } from '../../content/specials';
import { HookRail } from '../../components/art/marks';
import { CallToAction, Heading, Paragraph } from '../../components/counter';
import { PageHead } from '../../components/page-head';
import { SpecialsBoard } from '../../components/specials-board';
import { dateSpan } from '../../lib/dates';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/specials/', 'Specials', 'See this week’s counter specials, prices and availability at Saltbush & Cleaver.');

export default function SpecialsPage() {
  return <>
    <PageHead icon="cleaver" title="This week's specials">
      <p>{dateSpan(specials.weekOf, specials.validUntil)}</p>
      <HookRail className="mx-auto mt-3 w-54 max-w-full no-print"/>
    </PageHead>
    <div className="marble-surface px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <section className="board-frame chalk-surface mx-auto max-w-5xl px-4 pt-7 pb-10 sm:px-10 sm:pt-9">
        <h2 className="sr-only">The specials board</h2>
        <SpecialsBoard items={specials.items} filterable/>
      </section>
      <section className="docket torn-docket relative z-10 mx-auto -mt-2 max-w-3xl px-5 pt-7 pb-9 sm:px-9">
        <Heading>How specials work</Heading>
        <Paragraph className="mt-3">Prices are per kilogram unless marked. Specials run Tuesday to Saturday while stock lasts. Ask at the counter and we'll cut any special to your thickness.</Paragraph>
        <div className="mt-5 flex flex-wrap gap-3 no-print">
          <CallToAction href="/packs/">See barbecue packs</CallToAction>
          <CallToAction href="/contact/" tone="quiet">Enquire about larger quantities</CallToAction>
        </div>
      </section>
    </div>
  </>;
}
