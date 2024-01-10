export function isAmountTimePassed(lastRequestDate: string, time: number): boolean {
  const lastRequestDateTime = new Date(lastRequestDate).getTime();
  const currentTime = new Date().getTime();
  const AmountInMilliseconds = time;

  return currentTime - lastRequestDateTime >= AmountInMilliseconds;
}