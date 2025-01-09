export type WithLoading<T> =
  | ({
      isLoading?: false;
    } & T)
  | ({ isLoading: true } & Partial<T>);
