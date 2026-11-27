import { christmas, christmasItems } from '../../content/christmas';
import { ChristmasWreath, TwineDivider } from '../../components/art/marks';
import { ChristmasCountdown } from '../../components/christmas-countdown';
import { CalendarSlip, ChristmasLedger } from '../../components/christmas-display';
import { CallToAction, Heading, Paragraph } from '../../components/counter';
import { PageHead } from '../../components/page-head';
import { dateLabel } from '../../lib/dates';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/christmas/', 'Christmas', 'Browse Christmas hams, turkey and roasts, see Adelaide market collection dates, and send a preorder enquiry.');

export default function ChristmasPage() {
  return <>
    <PageHead icon="holly" title="Christmas at the counter" decoration={<ChristmasWreath className="w-21"/>}>
      <p className="no-print"><ChristmasCountdown season={christmas}>Enquiries close {dateLabel(christmas.enquiriesClose, 'weekday')}</ChristmasCountdown></p>
    </PageHead>
    <section className="marble-surface">
      <div className="wrap py-10 sm:py-14">
        <Heading>Christmas dates</Heading>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.45fr_1fr]">
          <CalendarSlip title="Enquiries open"><time dateTime={christmas.enquiriesOpen}>{dateLabel(christmas.enquiriesOpen, 'weekday')}</time></CalendarSlip>
          <CalendarSlip title="Enquiries close"><time dateTime={christmas.enquiriesClose}>{dateLabel(christmas.enquiriesClose, 'weekday')}</time></CalendarSlip>
          <CalendarSlip title="Collection days">
            <ul className="space-y-1 text-sm tabular-nums">
              {christmas.collectionDays.map(day => <li key={day}><time dateTime={day}>{dateLabel(day)}</time> · {christmas.collectionHours[day].opens}–{christmas.collectionHours[day].closes}</li>)}
            </ul>
          </CalendarSlip>
          <CalendarSlip title="Shop closed">
            <ul className="text-sm">{christmas.closedDays.map(day => <li key={day}><time dateTime={day}>{dateLabel(day, 'weekday')}</time></li>)}</ul>
          </CalendarSlip>
        </dl>
      </div>
    </section>
    <section className="paper-surface section-pad">
      <div className="wrap max-w-5xl">
        <Heading>Christmas preorder list</Heading>
        <Paragraph className="mt-3 mb-7 text-muted">House-smoked hams, Barossa turkey and cuts for the Christmas table.</Paragraph>
        <ChristmasLedger items={christmasItems}/>
      </div>
    </section>
    <section className="marble-surface section-pad no-print">
      <div className="wrap counter-reveal">
        <TwineDivider/>
        <Heading className="mt-6">How preorder enquiries work</Heading>
        <ol className="mt-6 grid gap-3 md:grid-cols-3">
          <EnquiryStep number={1}>Send an enquiry with what you'd like and your preferred collection day.</EnquiryStep>
          <EnquiryStep number={2}>We'll email to confirm availability and weights.</EnquiryStep>
          <EnquiryStep number={3}>Collect from the counter on your chosen day.</EnquiryStep>
        </ol>
        <Paragraph className="mt-5 font-bold">Please wait for our email before planning collection.</Paragraph>
      </div>
    </section>
    <div className="tiled-surface border-y border-gilt py-9 no-print">
      <div className="wrap"><CallToAction href="/contact/" tone="gold">Send a Christmas preorder enquiry</CallToAction></div>
    </div>
  </>;
}

function EnquiryStep({ number, children }: { number: number; children: string }) {
  return <li className="tiled-surface flex gap-4 border-4 border-double border-gilt p-4 font-semibold sm:p-5">
    <span aria-hidden="true" className="font-display text-2xl leading-none text-gold">{number}</span><span>{children}</span>
  </li>;
}
