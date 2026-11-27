import { noticeDays, packs } from '../../content/packs';
import { Icon, TwineDivider } from '../../components/art/marks';
import { CallToAction, Heading, Paragraph } from '../../components/counter';
import { PackDockets } from '../../components/pack-display';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/packs/', 'Barbecue packs', 'Four butcher’s barbecue packs with serving sizes, weights and prices. Enquire ahead for collection from the counter.');

export default function PacksPage() {
  return <>
    <PageHead icon="grill" title="Barbecue packs, wrapped and ready">
      <p>Four packs for backyard grills, steak nights and a long table.</p>
    </PageHead>
    <section aria-label="Barbecue packs" className="paper-surface">
      <div className="wrap section-pad"><PackDockets packs={packs}/></div>
    </section>
    <section className="chalk-surface section-pad">
      <div className="wrap board-frame px-5 py-8 sm:px-10">
        <Heading>Make it your own</Heading>
        <Paragraph className="mt-4">Ask us to swap sausages for chicken or lamb for beef, or to use gluten-free sausages. Please give us {noticeDays} days' notice for packs.</Paragraph>
      </div>
    </section>
    <section className="marble-surface section-pad">
      <div className="wrap counter-reveal">
        <TwineDivider/>
        <Heading className="mt-6">Grill notes</Heading>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          <GrillNote href="/cuts/#reverse-seared-rib-eye">Start a thick rib eye in a low oven before searing.</GrillNote>
          <GrillNote href="/cuts/#butterflied-lamb-leg">Set up a cooler zone to finish a butterflied leg.</GrillNote>
          <GrillNote href="/cuts/#low-and-slow-brisket">Allow an hour for your brisket to rest before carving.</GrillNote>
        </ul>
        <CallToAction href="/contact/" className="mt-7">Enquire about a pack</CallToAction>
      </div>
    </section>
  </>;
}

function GrillNote({ href, children }: { href: string; children: string }) {
  return <li className="docket relative border-t-3 border-oxblood p-5">
    <Icon name="grill" className="mb-2 text-oxblood"/><SiteLink href={href} className="text-link">{children}</SiteLink>
  </li>;
}
