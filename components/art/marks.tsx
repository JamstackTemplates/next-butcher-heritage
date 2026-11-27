import type { ReactNode } from 'react';

const icons = {
  cleaver: <><path d="M2 4h15v10H2zM17 9h3a2 2 0 0 1 0 4h-3M2 11h15"/><circle cx="5.5" cy="7" r=".7"/></>,
  grill: <><path d="M12 2c4 4 1 5 4 7l2-3c7 8 4 15-6 15-7 0-11-5-8-11l2 3c0-4 4-5 6-11Z"/><path d="M12 12c3 3 5 7 0 9-4 0-5-4 0-9Z"/></>,
  roast: <><path d="M3 13h18l-2 7H5zM1 13h22M7 13c-2-8 12-10 11 0M10 8l-1-3m6 2 1-3"/></>,
  braise: <><path d="M3 10h18l-1 8a2 2 0 0 1-2 2H6l-2-2zM1 12h2m18 0h2M3 10l3-3h12l3 3M10 7V4h4v3"/></>,
  slow: <><path d="M2 19c3-4 5 3 9 0s6 2 11-2M4 13c4-6 8 4 13-2M8 7c6 3 8-3 13-3"/></>,
  pan: <><path d="M2 11h14l-2 6H5zM16 12l6-4M3 9h13M7 7c-2-2 2-3 0-5m5 5c-2-2 2-3 0-5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
  thermometer: <path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0Zm2-6v9m3-10h4m-4 4h3"/>,
  beef: <path d="M3 10 1 5l4 2 4-1 1-3 2 3h8l2 3-1 7h-2v-4H9l-1 4H6v-4l-4 1Z"/>,
  lamb: <path d="m2 9 3-1 2-3 3 2q3-3 5 0 4-1 6 2l-1 5v3h-2l-1-5H9l-2 5H5l1-6H3Z"/>,
  pork: <path d="M2 10h3l2-5 3 2q7-2 10 3l2-3m-2 3q2 3-1 5l-1 3h-2v-4H9l-1 4H6v-4l-4-1Z"/>,
  chicken: <path d="m2 8 5 3 3-1 3-4 2 1 1-3 2 2 3 2-3 2c1 6-4 7-8 6S3 12 2 8Zm10 9v4m4-5v5m-6 0h8"/>,
  holly: <><path d="M12 18 3 7l5 1 1-4 4 4 5-3 1 4 3 1-7 8M12 18l-1 4"/><circle cx="12" cy="16" r="2"/><circle cx="16" cy="16" r="2"/></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  phone: <path d="m4 3 5 1 1 4-3 2c1 3 4 6 7 7l2-3 5 1v5C12 24 1 13 4 3Z"/>,
  envelope: <><rect x="2" y="4" width="20" height="16" rx="1"/><path d="m2 6 10 8L22 6M2 18l6-6m8 0 6 6"/></>,
};

export type IconName = keyof typeof icons;

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className={`shrink-0 ${className}`}>{icons[name]}</svg>;
}

export function SaltbushLeaves() {
  return <g stroke="var(--engraving, #4a604f)" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M17 96Q53 68 115 10m-72 64-7-25m26 10 17 2m-1-15-3-18m20 1 15 1" fill="none"/>
    <g fill="var(--saltbush, #8fa592)">
      <path d="M36 55c-20-6-23-24-14-26 9-1 17 10 14 26Z"/>
      <path d="M43 75C48 57 70 69 68 76c-1 6-17 10-25-1Zm20-15C75 44 94 50 96 56c2 9-17 14-33 4Z"/>
      <path d="M62 57C44 52 40 26 50 27c11 1 15 15 12 30Zm13-25C61 23 66 5 73 5c8 0 14 15 2 27Z"/>
      <path d="M87 38c11-16 32-16 35-8 3 8-14 14-35 8Zm13-14c1-16 21-26 25-21 4 7-11 19-25 21Z"/>
    </g>
    <path d="m28 41 8 13m16-14 9 16m8 5 14-4m24-22 7-2M51 74l9 1" fill="none" opacity=".65"/>
  </g>;
}

export function SaltbushSprig({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 132 103" className={className}><SaltbushLeaves /></svg>;
}

export function TileBand() {
  return <svg aria-hidden="true" width="100%" height="37" xmlns="http://www.w3.org/2000/svg" className="block border-y border-gilt no-print">
    <rect width="100%" height="37" className="tiled-surface" fill="var(--tile)" />
    <path d="M0 6H5000M0 34H5000" stroke="var(--gilt)" opacity=".75" />
    <path d="M0 11H5000" stroke="var(--saltbush)" opacity=".3" />
    <path d="M0 20H5000" stroke="var(--tile-shadow)" strokeWidth="28" strokeDasharray="2 106"/>
    <path d="M0 20H5000" stroke="var(--grout)" strokeWidth="28" strokeDasharray="1 107" opacity=".65"/>
  </svg>;
}

export function TwineDivider() {
  return <svg aria-hidden="true" width="100%" height="27" className="block no-print">
    <path d="M0 13.5H3000" stroke="var(--ticket)" strokeWidth="4"/>
    <path d="M0 13.5H3000" stroke="var(--oxblood)" strokeWidth="4" strokeDasharray="3 3"/>
    <svg x="50%" width="60" height="27" viewBox="-30 0 60 27" overflow="visible">
      <path transform="translate(-30)" d="M0 13Q-25-6-28 8-25 23 0 13 26-6 28 8 25 23 0 13m0 0q-8 12-15 13m15-13q7 11 15 13" fill="none" stroke="var(--oxblood)" strokeWidth="2.5"/>
    </svg>
  </svg>;
}

export function HookLines({ count = 5 }: { count?: number }) {
  return <g fill="none" strokeLinecap="round">
    <path d="M9 11h342" stroke="var(--gilt)" strokeWidth="6"/>
    <path d="M10 9h340" stroke="var(--light-gold)" strokeWidth="1"/>
    <circle cx="10" cy="11" r="5" fill="var(--gilt)"/><circle cx="350" cy="11" r="5" fill="var(--gilt)"/>
    {Array.from({ length: count }, (_, i) => <path key={i} d="M0 34c-10 3-9-11-1-13 11-3 12-15 4-15" transform={`translate(${55 + i * (250 / (count - 1))})`} stroke="var(--gilt)" strokeWidth="2.4"/>)}
  </g>;
}

export function HookRail({ className = '' }: { className?: string }) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 360 39"><HookLines /></svg>;
}

export function PriceTicket({ children, caption, className = '' }: {
  children: ReactNode; caption?: ReactNode; className?: string;
}) {
  return <div className={`price-ticket relative inline-flex max-w-full ${className}`}>
    <span className="price-pin" aria-hidden="true"/>
    <div className="price-face px-4 py-2.5 text-center leading-tight">
      {caption ? <div className="font-script text-base">{caption}</div> : null}
      {children}
    </div>
  </div>;
}

export function ChristmasWreath({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 320 315" className={className}>
    <circle cx="160" cy="144" r="100" fill="none" stroke="var(--gilt)" strokeWidth="2"/>
    <circle cx="160" cy="144" r="92" fill="none" stroke="var(--saltbush)" strokeWidth="1" strokeDasharray="2 5"/>
    {Array.from({ length: 12 }, (_, i) => <g key={i} transform={`rotate(${i * 30} 160 144) translate(136 239) scale(.64)`}><SaltbushLeaves /></g>)}
    <path d="M160 244c-32-35-67-32-60-12 5 18 40 22 60 12 32-35 67-32 60-12-5 18-40 22-60 12l23 37m-23-37-25 37" fill="none" stroke="#4c1d18" strokeWidth="7"/>
    <path d="M160 244c-32-35-67-32-60-12 5 18 40 22 60 12 32-35 67-32 60-12-5 18-40 22-60 12l23 37m-23-37-25 37" fill="none" stroke="#c0705b" strokeWidth="3" strokeDasharray="4 4"/>
    <path d="M156 248 196 259 188 306 145 299l3-39Z" fill="var(--ticket)" stroke="var(--gilt)" strokeWidth="2"/>
    <circle cx="161" cy="257" r="2" fill="#8b6b36"/>
    <text x="170" y="284" textAnchor="middle" fill="var(--ticket-ink)" fontFamily="var(--font-script)" fontSize="15" transform="rotate(10 170 284)">Ham</text>
    <path d="M109 144h30m42 0h30m-66 0 15-15 15 15-15 15Z" stroke="var(--gilt)" fill="none"/>
  </svg>;
}

export function EmptyHooks() {
  return <svg aria-hidden="true" viewBox="0 0 360 129" className="mx-auto mb-8 w-full max-w-lg no-print">
    <HookLines />
    <g transform="rotate(-8 180 32)">
      <path d="M180 32v32" stroke="var(--gilt)" strokeWidth="2"/>
      <path d="M133 57h94v63h-94l4-5-4-5 4-5-4-5 4-5-4-5 4-5-4-5 4-5-4-5 4-5Z" fill="var(--ticket)" stroke="var(--gilt)" strokeWidth="2"/>
      <circle cx="180" cy="64" r="2" fill="var(--ticket-ink)"/>
      <text x="180" y="101" fill="var(--ticket-ink)" textAnchor="middle" fontSize="34" fontFamily="var(--font-display)">404</text>
    </g>
  </svg>;
}

const parcelShapes = {
  flat: ['M26 52 134 22 214 55 186 94 48 102Z', 'M26 52 93 69 214 55M93 69l-45 33m45-33 93 25M134 22l-41 47', 'M60 43 175 87M168 35 67 93'],
  tall: ['M34 29 135 18 203 48 186 108 87 120 34 86Z', 'M34 29 90 57 203 48M90 57l-3 63m48-102-45 39 96 51', 'M52 38 171 104M170 33 71 107'],
  stacked: ['M22 60 130 39 215 63 194 107 67 119 22 97Z', 'M22 60 68 81 215 63M68 81l-1 38m93-93 23 26-104 12-31-17 112-21Z', 'M44 55 175 104M174 43 72 112'],
  long: ['M9 54 171 25 231 43 219 92 46 106 9 83Z', 'M9 54 50 73 231 43M50 73l-4 33m125-81L50 73l169 19', 'M47 47 99 100M148 29l52 62M23 72l201-7'],
} as const;

export const parcelVariants = ['flat', 'tall', 'stacked', 'long'] as const;

export function ButcherParcel({ variant, className = '' }: { variant: keyof typeof parcelShapes; className?: string }) {
  const [shape, folds, twine] = parcelShapes[variant];
  return <svg aria-hidden="true" viewBox="0 0 240 133" className={className} strokeLinejoin="round">
    <path d="M21 117q88 14 201-10m-187 17 65 2m50-5 51-4" fill="none" stroke="var(--gilt)" strokeWidth="1.5" opacity=".55"/>
    <path d={shape} fill="var(--street)" stroke="var(--engraving)" strokeWidth="2.5"/>
    <path d={folds} fill="none" stroke="var(--engraving)" strokeWidth="1.4" opacity=".8"/>
    <path d="m57 79 8 14m5-12 8 13m5-12 8 12m65-9 9 13m5-15 9 12" stroke="var(--engraving)" opacity=".36"/>
    <path d={twine} fill="none" stroke="var(--oxblood)" strokeWidth="3.5"/>
    <path d={twine} fill="none" stroke="var(--ticket)" strokeWidth="1.8" strokeDasharray="3 3"/>
    <path d="M109 65q-26-31-35-18-1 9 35 18 37-23 39-15-1 10-39 15l23 18m-23-18-13 23" fill="none" stroke="var(--oxblood)" strokeWidth="2.4"/>
    <path d="m122 70 37-8 9 21-37 8Z" stroke="var(--gilt)" fill="var(--ticket)"/>
    <path d="m133 75 20-4m-17 9 15-3" stroke="var(--ticket-ink)" opacity=".55"/>
  </svg>;
}
