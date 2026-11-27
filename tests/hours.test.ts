import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { ChristmasSeason } from '../content/christmas.ts';
import { tradingDates } from '../lib/dates.ts';
import { christmasCountdown, christmasHours } from '../lib/christmas.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · closes 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · closes 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · closes 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

const adelaideHours: OpeningHours[] = [
  { day: 'Monday' },
  { day: 'Tuesday', opens: '07:30', closes: '17:30' },
  { day: 'Wednesday', opens: '07:30', closes: '17:30' },
  { day: 'Thursday', opens: '07:30', closes: '17:30' },
  { day: 'Friday', opens: '07:00', closes: '21:00' },
  { day: 'Saturday', opens: '07:00', closes: '15:00' },
  { day: 'Sunday' },
];
const christmas: ChristmasSeason = {
  enquiriesOpen: '2026-11-01',
  enquiriesClose: '2026-12-18',
  collectionDays: ['2026-12-22', '2026-12-23', '2026-12-24'],
  collectionHours: {
    '2026-12-22': { opens: '07:00', closes: '18:00' },
    '2026-12-23': { opens: '07:00', closes: '18:00' },
    '2026-12-24': { opens: '06:30', closes: '14:00' },
  },
  closedDays: ['2026-12-25', '2026-12-26'],
};

test('Adelaide opening boundaries, closed days and both 2026 DST changes', () => {
  const atCounter = (date: string) => openingLabel(adelaideHours, 'Australia/Adelaide', new Date(date));
  assert.equal(atCounter('2026-11-23T20:59:00Z'), 'Closed · opens today at 07:30');
  assert.equal(atCounter('2026-11-23T21:00:00Z'), 'Open now · closes 17:30');
  assert.equal(atCounter('2026-11-27T10:29:00Z'), 'Open now · closes 21:00');
  assert.equal(atCounter('2026-11-27T10:30:00Z'), 'Closed · opens Saturday at 07:00');
  for (const date of ['2026-11-22T23:00:00Z', '2026-11-21T23:00:00Z']) {
    assert.equal(atCounter(date), 'Closed · opens Tuesday at 07:30');
  }
  const sundayOpening = adelaideHours.map(day => day.day === 'Sunday' ? { day: day.day, opens: '03:00', closes: '22:00' } : day);
  const onSunday = (date: string) => openingLabel(sundayOpening, 'Australia/Adelaide', new Date(date));
  assert.equal(onSunday('2026-10-03T16:29:00Z'), 'Closed · opens today at 03:00');
  assert.equal(onSunday('2026-10-03T16:30:00Z'), 'Open now · closes 22:00');
  assert.equal(onSunday('2026-04-04T16:29:00Z'), 'Closed · opens today at 03:00');
  assert.equal(onSunday('2026-04-04T16:30:00Z'), 'Closed · opens today at 03:00');
  assert.equal(onSunday('2026-04-04T17:30:00Z'), 'Open now · closes 22:00');
});

test('Christmas hours replace the usual weekdays and skip holiday closures', () => {
  const atCounter = (date: string) => openingLabel(adelaideHours, 'Australia/Adelaide', new Date(date), christmasHours(christmas));
  assert.equal(atCounter('2026-12-23T19:59:00Z'), 'Closed · opens today at 06:30');
  assert.equal(atCounter('2026-12-23T20:00:00Z'), 'Open now · closes 14:00');
  assert.equal(atCounter('2026-12-24T03:30:00Z'), 'Closed · opens Tuesday at 07:30');
});

test('Christmas countdown follows the Adelaide calendar through close day', () => {
  const label = (date: string) => christmasCountdown(christmas, 'Australia/Adelaide', new Date(date));
  assert.equal(label('2026-10-25T08:00:00Z'), 'Enquiries open Sunday 1 November');
  assert.equal(label('2026-11-27T08:00:00Z'), 'Enquiries close in 3 weeks');
  assert.equal(label('2026-12-16T10:00:00Z'), 'Enquiries close in 2 days');
  assert.equal(label('2026-12-18T13:29:00Z'), 'Enquiries close today');
  assert.equal(label('2026-12-18T13:30:00Z'), 'Enquiries for this Christmas have closed');
});

test('edited collection dates with gaps are listed individually', () => {
  assert.equal(tradingDates(christmas.collectionDays), '22–24 Dec 2026');
  assert.equal(tradingDates(['2026-12-22', '2026-12-24']), '22 Dec 2026 and 24 Dec 2026');
});
