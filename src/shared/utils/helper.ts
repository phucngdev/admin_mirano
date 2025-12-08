import type { CodeBaseEntity } from '#/api/requests';
import dayjs from 'dayjs';

type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'DD/MM/YYYY, HH:mm';

/**
 * Formats a given date string according to the specified format.
 *
 * @param {string} date - The date string to be formatted.
 * @param {DateFormat} format - The format to be applied. Defaults to 'YYYY-MM-DD'.
 * @return {string} The formatted date string.
 */
const formatDaytime = (date: string, format: DateFormat = 'YYYY-MM-DD') => {
  switch (format) {
    case 'YYYY-MM-DD':
      return dayjs(date).format('YYYY-MM-DD');

    case 'YYYY-MM-DD HH:mm:ss':
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');

    default:
      return dayjs(date).format(format);
  }
};

/**
 * Formats a given time input into a string representation.
 *
 * @param {number} input - The time input to be formatted.
 * @return {string} The formatted time string.
 */
function formatTime(input: number): string {
  const minutes = Math.floor(input / 60);
  const seconds = input % 60;

  return dayjs().minute(minutes).second(seconds).format('m:ss');
}

interface FormatFromTo {
  from: string;
  to: string;
  fromFormat?: DateFormat;
  toFormat?: DateFormat;
}

/**
 * Formats the 'from' and 'to' values from one format to another and returns the formatted values as a string.
 *
 * @param {FormatFromTo} formatFromTo - An object containing the 'from' and 'to' values and their respective formats.
 * @param {string} formatFromTo.from - The 'from' value to be formatted.
 * @param {string} formatFromTo.to - The 'to' value to be formatted.
 * @param {string} formatFromTo.fromFormat - The format of the 'from' value.
 * @param {string} formatFromTo.toFormat - The format to which the 'to' value should be formatted.
 * @returns {string} - The formatted 'from' and 'to' values concatenated with a hyphen.
 */
const formatFromTo = ({ from, to, fromFormat, toFormat }: FormatFromTo) =>
  `${formatDaytime(from, fromFormat)} - ${formatDaytime(to, toFormat)}`;

const currencyFormat = (
  cost?: number | null,
  minimumFractionDigits = 2,
  locale = 'en-US',
  currencyUnit = 'USD',
  // eslint-disable-next-line max-params
) => {
  const costValue = cost ?? 0;

  const unitDividedByCent = 100;

  const costDisplay = costValue / unitDividedByCent;

  return `${costDisplay.toLocaleString(locale, {
    currency: currencyUnit,
    minimumFractionDigits,
    style: 'currency', // decimal digit
  })} CAD`;
};

const distanceFormat = (distance?: number | null, unit = 'km') => {
  const unitDividedByMeter = 1000;

  const distanceValue = distance ?? 0;

  return `${distanceValue / unitDividedByMeter} ${unit}`;
};

const formatCodeAndPin = (codes?: CodeBaseEntity[] | null) => {
  if (!codes?.length) return '';
  const codeAndPin: string[] = [];
  codes.forEach(code => {
    codeAndPin.push(`${code.code} | ${code.PIN}`);
  });
  return codeAndPin.join(', ');
};

function formatEmptyProperty<T>(object: T) {
  const tmp = structuredClone(object);

  for (const key in tmp) {
    if (!tmp[key]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tmp[key] = null as unknown as any;
    }
  }

  return tmp;
}

/**
 * Normalizes the input string by converting it to lowercase, replacing underscores with spaces, and capitalizing the first letter of each word.
 *
 * @param {string} value - the string to be normalized
 * @return {string} the normalized string
 */
function normalizeEnumString(value?: string) {
  if (!value) return '';
  return value
    .toLocaleLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const formatter = {
  currencyFormat,
  distanceFormat,
  formatCodeAndPin,
  formatDaytime,
  formatEmptyProperty,
  formatFromTo,
  formatTime,
  normalizeEnumString,
};
