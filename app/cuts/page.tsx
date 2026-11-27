import { primals } from '../../content/cuts';
import { guides } from '../../content/guides';
import { CallToAction, Heading, Paragraph } from '../../components/counter';
import { CutChart } from '../../components/cut-chart';
import { GuideBook } from '../../components/guide-book';
import { PageHead } from '../../components/page-head';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/cuts/', 'Cuts & guides', 'Explore beef, lamb and pork primals and find cooking guides from the butcher’s counter.');

export default function CutsPage() {
  return <>
    <PageHead icon="cleaver" title="Know your cuts">
      <p>See where each cut comes from, then find out how we like to cook it.</p>
    </PageHead>
    <section className="marble-surface">
      <div className="wrap section-pad">
        <h2 className="sr-only">Butcher's cut chart</h2>
        <CutChart entries={primals}/>
      </div>
    </section>
    <section id="cooking-guides" className="paper-surface section-pad">
      <div className="wrap">
        <Heading>Cooking guides</Heading>
        <Paragraph className="mt-3 text-muted">Use a thermometer in the thickest part of the meat and check the temperature before resting. <a className="text-link" href="https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures">Safe cooking temperatures</a></Paragraph>
        <GuideBook guides={guides}/>
      </div>
    </section>
    <section className="tiled-surface section-pad border-y border-gilt">
      <div className="wrap">
        <Heading className="text-gold">Ask the counter</Heading>
        <Paragraph className="mt-4">Bring us a recipe and we'll recommend a cut for it.</Paragraph>
        <CallToAction href="/contact/" tone="gold" className="mt-5">Talk to the counter</CallToAction>
      </div>
    </section>
  </>;
}
