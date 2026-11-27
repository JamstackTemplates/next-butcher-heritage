import type { Guide } from '../content/guides';
import { methodNames } from '../lib/methods';
import { Icon, PriceTicket } from './art/marks';

function duration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return [hours ? `${hours} h` : '', rest ? `${rest} min` : ''].filter(Boolean).join(' ');
}

export function GuideBook({ guides }: { guides: readonly Guide[] }) {
  return <div className="mt-8 space-y-9">
    {guides.map((guide, index) => <article key={guide.id} id={guide.id} className="guide-spread counter-reveal docket grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_2.25fr] md:gap-10">
      <header className={`col-span-full flex items-start gap-3 border-b border-line pb-4 ${index % 2 ? 'md:flex-row-reverse md:justify-end' : ''}`}>
        <Icon name={guide.method} className="size-8 text-leaf"/>
        <h3 className="font-display text-xl sm:text-[clamp(1.35rem,3.5vw,2.45rem)]">{guide.title}</h3>
      </header>
      <aside className={`marble-surface self-start space-y-4 border border-line p-4 ${index % 2 ? 'md:order-2' : ''}`}>
        <p className="eyebrow text-leaf">{methodNames[guide.method]}</p>
        <dl className="space-y-3 text-sm">
          <div className="flex gap-2"><Icon name="clock" className="size-5 text-leaf"/><div>
            <dt className="font-bold">Time</dt><dd>{duration(guide.activeMinutes)} active · {duration(guide.totalMinutes)} total</dd>
          </div></div>
          <div className="flex gap-2"><Icon name="thermometer" className="size-5 text-leaf"/><div>
            <dt className="font-bold">Heat</dt><dd>{guide.heat}</dd>
            {guide.targetCoreC ? <dd>{guide.targetCoreC}°C core</dd> : null}
          </div></div>
        </dl>
        <PriceTicket caption="Rest"><strong className="font-display">{duration(guide.restMinutes)}</strong></PriceTicket>
      </aside>
      <ol className="guide-steps max-w-[64ch] space-y-3">
        {guide.steps.map(step => <li key={step} className="leading-relaxed">{step}</li>)}
      </ol>
    </article>)}
  </div>;
}
