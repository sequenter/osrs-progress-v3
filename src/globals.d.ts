type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

/* FUNCTIONS */

type Consumer<T> = (T: T) => void;
