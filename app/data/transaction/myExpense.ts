import { wait } from "~/utils/wait";

export const getMyExpense = async (): Promise<typeof myExpenseData> => {
  await wait(1700);
  return myExpenseData;
};

export type MyExpenseDataType = {
  month: string;
  expense: number;
};

export const myExpenseData: MyExpenseDataType[] = [
  { month: "Aug", expense: 2100 },
  { month: "Sep", expense: 5520 },
  { month: "Oct", expense: 1320 },
  { month: "Nov", expense: 2500 },
  { month: "Dec", expense: 7200 },
  { month: "Jan", expense: 3000 },
];
