'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

export function MobileNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  useEffect(() => {
    if (disclosure.current) disclosure.current.open = false;
  }, [pathname]);

  return <details ref={disclosure} className="group lg:hidden" onKeyDown={event => {
    if (event.key === 'Escape' && disclosure.current?.open) {
      disclosure.current.open = false;
      trigger.current?.focus();
    }
  }}>
    <summary ref={trigger} className="flex min-h-11 list-none items-center gap-1.5 text-sm font-bold text-gold [&::-webkit-details-marker]:hidden">
      Menu <span aria-hidden="true" className="group-open:rotate-180">⌄</span>
    </summary>
    <nav aria-label="Main" className="tiled-surface absolute inset-x-0 z-30 mt-2 grid border-b-2 border-gilt px-6 py-3 shadow-lg">
      {children}
    </nav>
  </details>;
}
