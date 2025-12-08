/**
 * Calculates the percentage of a value in relation to a total.
 *
 * @param {number} value - the value for which to calculate the percentage
 * @param {number} total - the total value against which to calculate the percentage
 * @return {string | undefined} the calculated percentage as a string with two decimal places or undefined if inputs are invalid
 */
export const getPercentageString = (
  value?: number,
  total?: number,
): string | undefined => {
  if (value === undefined || total === undefined || total === 0) {
    return undefined;
  }

  const percentage = (value / total) * 100;
  return `${percentage.toFixed(2)} %`;
};
