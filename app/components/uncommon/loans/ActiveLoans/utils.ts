import { LoanTableElementType } from "~/data/loan/mockedData";

export const reduceNumber = (
  arrayOfElements: LoanTableElementType[],
  key: keyof LoanTableElementType
): number => {
  return arrayOfElements.reduce(
    (accumulator, loan) => accumulator + Number(loan[key]),
    0
  );
};

export const objSort = (objArray: LoanTableElementType[]) => {
  return [...objArray].sort((a, b) => a.SLNo - b.SLNo);
};
