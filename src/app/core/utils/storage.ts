export function SAVE_TO_STORAGE(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function GET_FROM_STORAGE(key: string) {
  return JSON.parse(localStorage.getItem(key) || '{}');
}