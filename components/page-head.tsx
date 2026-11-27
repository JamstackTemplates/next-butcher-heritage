import type { ReactNode } from 'react';
import { Icon, TileBand, type IconName } from './art/marks';

export function PageHead({ title, children, icon, decoration }: { title: ReactNode; children?: ReactNode; icon: IconName; decoration?: ReactNode }) {
  return <header className="marble-surface relative isolate px-5 pt-10 sm:pt-14">
    <div className="glass-panel mx-auto flex max-w-4xl flex-col items-center px-5 pt-9 pb-9 text-center sm:px-14 sm:pt-12">
      <div className="mb-3 flex items-center gap-3 text-gold no-print">
        <span className="w-11 border-t border-gilt"/>
        {decoration ?? <Icon name={icon} className="size-8"/>}
        <span className="w-11 border-t border-gilt"/>
      </div>
      <h1 className="heading max-w-[22ch] text-[clamp(1.85rem,5.6vw,4.15rem)]">{title}</h1>
      {children ? <div className="mt-4 max-w-[57ch] text-base leading-relaxed text-chalk">{children}</div> : null}
    </div>
    <div className="absolute inset-x-0 bottom-0 -z-10"><TileBand/></div>
  </header>;
}
