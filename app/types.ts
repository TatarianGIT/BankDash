export type WithLoading<T> =
  | ({
      isLoading?: false;
    } & T)
  | ({ isLoading: true } & Partial<T>);

export type Override<T, R> = Omit<T, keyof R> & R;

export type NotificationResponse = {
  status: "success" | "error";
  message: string;
};
