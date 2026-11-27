import type { ChristmasSeason } from '../content/christmas.ts';
import { calendarDate, dateLabel, localDate } from './dates.ts';
import type { HoursOverrides } from './hours.ts';

export function christmasHours(season: ChristmasSeason): HoursOverrides {
  return { ...season.collectionHours, ...Object.fromEntries(season.closedDays.map(date => [date, null])) };
}

export function christmasCountdown(season: ChristmasSeason, timeZone: string, now = new Date()) {
  const fallback = `Enquiries close ${dateLabel(season.enquiriesClose, 'weekday')}`;
  if (!timeZone) return fallback;
  const today = localDate(new Intl.DateTimeFormat('en-AU', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now));
  if (today < season.enquiriesOpen) return `Enquiries open ${dateLabel(season.enquiriesOpen, 'weekday')}`;
  if (today > season.enquiriesClose) return 'Enquiries for this Christmas have closed';
  const days = (+calendarDate(season.enquiriesClose) - +calendarDate(today)) / 86_400_000;
  if (days === 0) return 'Enquiries close today';
  if (days >= 14) return `Enquiries close in ${Math.ceil(days / 7)} weeks`;
  return `Enquiries close in ${days} ${days === 1 ? 'day' : 'days'}`;
}
