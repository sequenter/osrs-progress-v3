type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

type Consumer<T> = (T: T) => void;
