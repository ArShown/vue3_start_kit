export declare function defineProvider<T extends () => any>(
  instance: T
): () => ReturnType<T>;

export declare function defineService<
  Id extends string,
  T extends Function | Record<string | number | symbol, any>
>(id: Id, instance: T): T extends Function ? () => ReturnType<T> : () => T;
