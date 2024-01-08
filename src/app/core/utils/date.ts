export function isOneDayPassed(lastRequestDate: string): boolean {
  const lastRequestDateTime = new Date(lastRequestDate).getTime();
  const currentTime = new Date().getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  return currentTime - lastRequestDateTime >= oneDayInMilliseconds;
}