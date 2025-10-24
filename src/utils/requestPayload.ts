export function getResponseObject<T>(requestBody: any, keys: string[]): T {
  return Object.fromEntries(
    Object.entries(requestBody).filter(([key]) => keys.includes(key))
  ) as T;
}
