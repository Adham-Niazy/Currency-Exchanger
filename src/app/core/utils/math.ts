export function multiplyNumbers(numbers: number[]) {
  return numbers.reduce((accumulator, currentValue) => {
    // Check for overflow before multiplying
    if (Number.isFinite(accumulator * currentValue)) {
      return accumulator * currentValue;
    } else {
      // Handle overflow gracefully, for example, return Infinity
      return Infinity;
    }
  }, 1); // Initialize accumulator with 1
}