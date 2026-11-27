'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { chartArt, type ChartDrawingArt } from '../content/chart-art';
import { chartAnimals, type ChartAnimal, type Primal } from '../content/cuts';
import { methodNames } from '../lib/methods';
import { SiteLink } from './site-link';
import { Icon } from './art/marks';

const animalNames = { beef: 'Beef', lamb: 'Lamb', pork: 'Pork' };

function keyboardIndex(event: KeyboardEvent, index: number, count: number) {
  const positions: Record<string, number> = {
    ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: count - 1,
  };
  if (!Object.hasOwn(positions, event.key)) return undefined;
  event.preventDefault();
  return (positions[event.key] + count) % count;
}

function ChartDrawing({ animal, entries, selected, select }: {
  animal: ChartAnimal; entries: readonly Primal[]; selected?: string; select?: (entry: Primal) => void;
}) {
  const id = useId();
  const drawing: ChartDrawingArt = chartArt[animal];
  const regions = useRef<(SVGPathElement | null)[]>([]);
  const clip = `url(#${id}-body)`;
  return <svg viewBox="0 0 510 318" className="w-full" role={select ? 'group' : 'img'} aria-label={`${animalNames[animal]} cut chart`}>
    <defs>
      <clipPath id={`${id}-body`}><path d={drawing.outline}/></clipPath>
      <clipPath id={`${id}-fleece`}><path d={drawing.fleece ?? drawing.outline}/></clipPath>
      <pattern id={`${id}-hatch`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0v5" stroke="var(--ink)" strokeWidth=".9" opacity=".32"/>
      </pattern>
      <pattern id={`${id}-hide`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
        <path d="M0 4.5h5" stroke="var(--ink)" strokeWidth=".6" opacity=".16"/>
      </pattern>
      <pattern id={`${id}-wool`} width="16" height="13" patternUnits="userSpaceOnUse">
        <path d="M2 8a3.2 3.2 0 1 1 5.5 1.8M10 2.6a3 3 0 1 1 4.8 2.6" fill="none" stroke="var(--ink)" strokeWidth=".8" opacity=".3" strokeLinecap="round"/>
      </pattern>
      <pattern id={`${id}-bristle`} width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r=".7" fill="var(--ink)" opacity=".2"/><circle cx="5" cy="5" r=".5" fill="var(--ink)" opacity=".15"/>
      </pattern>
    </defs>
    {/* Poster frame: double gilt rule, corner rosettes, title ribbon and a foot scale. */}
    <path d="M6 6h498v306H6Z" fill="none" stroke="var(--gilt)" strokeWidth="1.6"/>
    <path d="M13 13h484v292H13Z" fill="none" stroke="var(--gilt)" strokeWidth=".6"/>
    {[[13, 13], [497, 13], [13, 305], [497, 305]].map(([cx, cy]) => <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
      <circle r="6" fill="var(--poster)" stroke="var(--gilt)"/><path d="M-3 0h6M0-3v6" stroke="var(--gilt)" strokeWidth=".8"/>
    </g>)}
    <path d="M186 24h138l10 12-10 12H186l-10-12Z" fill="var(--glass)" stroke="var(--gilt)"/>
    <path d="M176 36h-28m186 0h28" stroke="var(--gilt)"/>
    <text x="255" y="43" className="font-display text-[18px]" fill="var(--light-gold)" textAnchor="middle">{animalNames[animal]}</text>
    <path d="M40 298h430m-430-5v5m43-3v3m43-5v5m43-3v3m43-5v5m43-3v3m43-5v5m43-3v3m43-5v5m43-3v3m43-5v5" fill="none" stroke="var(--gilt)"/>
    <ellipse cx="270" cy="284" rx="196" ry="5" fill="var(--ink)" opacity=".13"/>
    {/* Far legs, then the body with its texture and belly shading. */}
    <path d={drawing.far} fill="color-mix(in srgb, var(--saltbush), var(--tile-shadow) 50%)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d={drawing.outline} fill="color-mix(in srgb, var(--saltbush), var(--paper) 52%)"/>
    <g clipPath={`url(#${id}-fleece)`}><path d={drawing.outline} fill={`url(#${id}-${drawing.texture})`}/></g>
    <g clipPath={clip}>
      <path d="M0 226Q255 270 510 222V318H0Z" fill={`url(#${id}-hatch)`}/>
      <path d="M0 70Q255 50 510 70" fill="none" stroke="var(--paper)" strokeWidth="10" opacity=".35"/>
    </g>
    <path d={drawing.dividers} fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3" opacity=".45"/>
    {drawing.notes.map(([label, x, y]) => <text key={label} x={x} y={y} className="cut-note">{label}</text>)}
    {Object.entries(drawing.regions).map(([region, [path, x, y]]) => {
      const index = entries.findIndex(entry => entry.region === region);
      const entry = entries[index];
      const active = entry?.id === selected;
      return <g key={region}>
        <path id={`${id}-${region}`} d={path} clipPath={clip} className={select && entry ? 'cut-region' : 'cut-region cut-region--static'}
          {...(select && entry ? {
            role: 'button', tabIndex: active ? 0 : -1, 'aria-label': entry.name, 'aria-pressed': active,
            'data-selected': active,
            ref: (node: SVGPathElement | null) => { regions.current[index] = node; },
            onFocus: () => select(entry),
            onPointerEnter: (event: React.PointerEvent) => { if (event.pointerType === 'mouse') select(entry); },
            onClick: () => select(entry),
            onKeyDown: (event: KeyboardEvent) => {
              const next = keyboardIndex(event, index, entries.length);
              if (next !== undefined) regions.current[next]?.focus();
              if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                select(entry);
              }
            },
          } : {})}
        />
      </g>;
    })}
    <g pointerEvents="none" stroke="var(--ink)" strokeLinejoin="round" strokeLinecap="round">
      <path d={drawing.features} fill="color-mix(in srgb, var(--saltbush), var(--tile-shadow) 32%)" strokeWidth="1.6"/>
      <path d={drawing.lines} fill="none" strokeWidth="1.4" opacity=".8"/>
      <path d={drawing.outline} fill="none" strokeWidth="2.6"/>
    </g>
    {Object.entries(drawing.regions).map(([region, [, x, y]]) => {
      const index = entries.findIndex(entry => entry.region === region);
      const entry = entries[index];
      if (!entry) return null;
      return <text key={region} x={x} y={y} className="cut-label" data-selected={entry.id === selected}>
        {animal === 'lamb' && entries.length === 3 ? index + 1 : entry.name}
      </text>;
    })}
  </svg>;
}

function CutList({ primal }: { primal: Primal }) {
  return <>
    <ul className="my-4 divide-y divide-line border-y border-line">
      {primal.cuts.map(cut => <li key={cut.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2.5">
        <span className="font-semibold">{cut.name}</span>
        <span className="flex items-center gap-2 text-sm text-muted"><Icon name={cut.method} className="size-4"/>{methodNames[cut.method]}</span>
      </li>)}
    </ul>
    <SiteLink className="text-link text-sm" href={`/cuts/#${primal.guideId}`}>Read the cooking guide</SiteLink>
  </>;
}

export function CutChart({ entries, preview = false }: { entries: readonly Primal[]; preview?: boolean }) {
  const availableAnimals = preview ? ['lamb'] as const : chartAnimals;
  const [animal, setAnimal] = useState<ChartAnimal>(availableAnimals[0]);
  const [selected, setSelected] = useState('');
  const [enhanced, setEnhanced] = useState(false);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setEnhanced(true), []);

  function changeAnimal(next: ChartAnimal) {
    setAnimal(next);
    setSelected('');
  }

  if (!enhanced) {
    return <div className="space-y-12">
      {availableAnimals.map(species => {
        const relevant = entries.filter(entry => entry.animal === species);
        return <div key={species} className="grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="chart-poster p-1.5 sm:p-3"><ChartDrawing animal={species} entries={relevant}/></div>
          <div className="space-y-5">
            {relevant.map(entry => <section key={entry.id}>
              <h3 className="font-display text-lg">{entry.name}</h3><CutList primal={entry}/>
            </section>)}
          </div>
        </div>;
      })}
    </div>;
  }

  const relevant = entries.filter(entry => entry.animal === animal);
  const active = relevant.find(entry => entry.id === selected) ?? relevant[0];
  return <>
    {!preview ? <div role="tablist" aria-label="Choose an animal" className="mb-5 flex flex-wrap gap-2">
      {availableAnimals.map((species, index) => <button key={species} type="button" role="tab"
        id={`${id}-tab-${species}`} aria-controls={`${id}-chart-${species}`} aria-selected={animal === species} tabIndex={animal === species ? 0 : -1}
        ref={node => { tabs.current[index] = node; }} onClick={() => changeAnimal(species)}
        onKeyDown={event => {
          const next = keyboardIndex(event, index, availableAnimals.length);
          if (next !== undefined) {
            changeAnimal(availableAnimals[next]);
            tabs.current[next]?.focus();
          }
        }}
        className="flex min-h-11 items-center gap-2 border-2 border-gilt bg-paper px-3 text-sm font-bold text-ink aria-selected:bg-primary aria-selected:text-white sm:px-5">
        <Icon name={species}/>{animalNames[species]}
      </button>)}
    </div> : null}
    {availableAnimals.map(species => <div key={species} id={`${id}-chart-${species}`}
      role={preview ? undefined : 'tabpanel'} aria-labelledby={preview ? undefined : `${id}-tab-${species}`} hidden={species !== animal}>
      {species === animal ? <div className="grid items-center gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="chart-poster p-1.5 sm:p-3"><ChartDrawing animal={animal} entries={relevant} selected={active.id} select={entry => setSelected(entry.id)}/></div>
        <section className="border-l-2 border-gilt pl-5 lg:pl-7">
          <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2">
            {relevant.map((entry, index) => <button type="button" key={entry.id} onClick={() => setSelected(entry.id)} aria-pressed={entry.id === active.id}
              className="min-h-9 border-b border-line text-sm font-bold text-muted aria-pressed:border-leaf aria-pressed:text-leaf">
              {preview ? `${index + 1}. ` : ''}{entry.name}
            </button>)}
          </div>
          <h3 aria-live="polite" className="font-display text-2xl">{active.name}</h3>
          <CutList primal={active}/>
        </section>
      </div> : null}
    </div>)}
  </>;
}
