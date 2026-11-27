const dateOptions = { timeZone: 'UTC' } as const;

/** Parse a calendar date as midnight UTC for formatting and date arithmetic only. */
export function calendarDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

export function isCalendarDate(value: string) {
  const date = calendarDate(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(+date) && date.toISOString().startsWith(value);
}

export function dateLabel(value: string, style: 'short' | 'long' | 'weekday' = 'short') {
  return new Intl.DateTimeFormat('en-AU', {
    ...dateOptions, day: 'numeric', month: style === 'short' ? 'short' : 'long',
    ...(style === 'weekday' ? { weekday: 'long' } : {}),
  }).format(calendarDate(value));
}

export function dateSpan(start: string, end: string) {
  const startYear = start.slice(0, 4);
  const endYear = end.slice(0, 4);
  if (start === end) return `${dateLabel(end)} ${endYear}`;
  if (startYear !== endYear) return `${dateLabel(start)} ${startYear} – ${dateLabel(end)} ${endYear}`;
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  const first = sameMonth ? Number(start.slice(8, 10)) : dateLabel(start);
  return `${first}–${dateLabel(end)} ${endYear}`;
}

/** Compact a consecutive set, and list dates individually when there are gaps. */
export function tradingDates(dates: readonly string[]) {
  const [first] = dates;
  const last = dates.at(-1);
  if (!first || !last) return '';
  if (+calendarDate(last) - +calendarDate(first) === 86_400_000 * (dates.length - 1)) return dateSpan(first, last);
  return new Intl.ListFormat('en-AU', { type: 'conjunction' }).format(dates.map(date => dateSpan(date, date)));
}

export function localDate(parts: Intl.DateTimeFormatPart[]) {
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}
