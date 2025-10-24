export type WithRequired<T, K extends keyof T> = T & { K: T[K] };
