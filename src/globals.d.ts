type PartialRecord<K, T> = Partial<Record<K, T>>;

/* FUNCTIONS */

type Consumer<T> = (T: T) => void;
