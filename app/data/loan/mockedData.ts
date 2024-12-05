import { wait } from "~/utils/wait";

export type LoanTableElementType = {
  SLNo: number;
  money: number;
  moneyLeft: number;
  duration: number;
  rate: string;
  installment: string;
};

const loanData: LoanTableElementType[] = Array.from({ length: 10 }, () => ({
  SLNo: Math.ceil(Math.random() * 10000),
  money: Math.ceil(Math.random() * 100000),
  moneyLeft: Math.ceil(Math.random() * 10000),
  duration: Math.ceil(Math.random() * 10),
  rate: Math.ceil(Math.random() * 10).toFixed(2),
  installment: (Math.random() * 10).toFixed(2),
}));

export const getLoansData = async () => {
  await wait(1000);
  return loanData;
};
