import { business } from '../../content/business';
import { ContactLinks, DirectionsLink, OpeningTicket, Paragraph, ShopAddress, Subheading, VisitMap, WeeklyHours } from '../../components/counter';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { pageMetadata } from '../../lib/metadata';
import { site } from '../../lib/site';

export const metadata = pageMetadata('/contact/', 'Contact', business.enquiries.introduction);

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead icon="envelope" title="Talk to the counter">
      <p>{business.enquiries.introduction}</p>
    </PageHead>
    <div className="marble-surface section-pad">
      <div className="wrap grid items-start gap-6 md:grid-cols-[1.05fr_.95fr] md:gap-x-9">
        <section className="enamel p-5 sm:p-7 md:col-start-2 md:row-start-1" aria-labelledby="email-and-phone">
          <h2 id="email-and-phone" className="font-display text-xl sm:text-2xl">Email and phone</h2>
          <div className="mt-4"><ContactLinks/></div>
          <div className="mt-4 flex flex-wrap items-center gap-3"><CopyEmail email={business.email}/></div>
        </section>
        <section className="docket torn-docket p-5 pb-9 sm:p-8 sm:pb-12 md:col-start-1 md:row-span-2 md:row-start-1" aria-labelledby="send">
          <h2 id="send" className="font-display text-xl sm:text-2xl">{hosted ? 'Send an enquiry' : 'Write to us directly'}</h2>
          <div className="mt-4">
            {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email}/> :
              <Paragraph>Send your enquiry by email to <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>.</Paragraph>}
          </div>
        </section>
        <section className="chalk-surface board-frame p-5 sm:p-7 md:col-start-2 md:row-start-2" aria-labelledby="what-to-include">
          <h2 id="what-to-include" className="font-display text-xl">What to include</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Which items or pack and roughly how much, by weight, people or bones.</li>
            <li>Your preferred collection day and time.</li>
            <li>Any cutting or trimming requests.</li>
            <li>A phone number if you'd like a call back.</li>
          </ul>
          <Paragraph className="mt-4 text-gold">We'll email to confirm availability and weights.</Paragraph>
        </section>
      </div>
    </div>
    <section className="paper-surface section-pad">
      <div className="wrap grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
        <div className="enamel px-5 py-6 sm:px-8">
          <h2 className="font-display text-xl sm:text-2xl">Trading hours</h2>
          <OpeningTicket className="my-4"/>
          <WeeklyHours/>
        </div>
        <div>
          <Subheading className="mb-3">At the market</Subheading>
          <ShopAddress/>
          <Paragraph className="mt-2 text-muted">{business.directions}</Paragraph>
          <div className="mt-3 mb-5"><DirectionsLink>Get directions</DirectionsLink></div>
          <VisitMap>Show market map</VisitMap>
        </div>
      </div>
    </section>
  </>;
}
