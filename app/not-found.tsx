import { EmptyHooks, TileBand } from '../components/art/marks';
import { CallToAction, Paragraph } from '../components/counter';

export default function NotFound() {
  return <>
    <TileBand/>
    <section className="chalk-surface section-pad">
      <div className="board-frame wrap py-12 text-center sm:py-16">
        <EmptyHooks/>
        <h1 className="heading px-5 text-gold">Not on the hook</h1>
        <Paragraph className="mx-auto mt-4 px-5">That cut's walked out the door. Try the board instead.</Paragraph>
        <div className="mt-7 flex flex-wrap justify-center gap-3 px-5">
          <CallToAction href="/specials/" tone="gold">See specials</CallToAction>
          <CallToAction href="/cuts/">Cuts &amp; guides</CallToAction>
          <CallToAction href="/">Home</CallToAction>
        </div>
      </div>
    </section>
  </>;
}
