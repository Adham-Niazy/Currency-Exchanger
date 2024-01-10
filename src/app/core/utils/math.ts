export function multiplyNumbers(numbers: number[]): number {
  return +numbers.reduce((acc, curr) => (acc * curr), 1).toFixed(2);
}

export function convertRatesToDisplayedRates(rates: { [rate: string]: number }, base: string) {
  const newRates = [];
  for (const key in rates) {
    const currentRate = rates[key];
    const inverseRate = 1 / rates[key];
    newRates.push([base, key, currentRate]);
    newRates.push([key, base, inverseRate]);
  }
  return newRates;
}