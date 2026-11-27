import { calendarDate, localDate } from './dates.ts';

/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}
const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
/** Local calendar dates with special trading hours, or null for a full closure. */
export type HoursOverrides = Readonly<Record<string, { opens: string; closes: string } | null>>;

export function validateInterval(label: string, opens?: string, closes?: string) {
  if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
    throw new Error(`${label} needs HH:MM opening before closing; overnight service is unsupported`);
  }
}

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    validateInterval(`hours: ${day}`, opens, closes);
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}
/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date(), overrides: HoursOverrides = {}): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now);
  } catch { return fallback; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return fallback;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const date = calendarDate(localDate(parts));
  const service = (offset: number) => {
    const day = DAYS[(index + offset) % 7];
    const key = date.toISOString().slice(0, 10);
    date.setUTCDate(date.getUTCDate() + 1);
    return { day, interval: key in overrides ? overrides[key] : hours.find(entry => entry.day === day) };
  };
  const today = service(0).interval;
  if (today?.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return `Open now · closes ${today.closes}`;
  }
  if (today?.opens && current < minutes(today.opens)) return `Closed · opens today at ${today.opens}`;
  for (let offset = 1; offset <= (Object.keys(overrides).length + 1) * 7; offset++) {
    const { day, interval } = service(offset);
    if (interval?.opens) return `Closed · opens ${day} at ${interval.opens}`;
  }
  return 'Closed · see opening hours';
}
