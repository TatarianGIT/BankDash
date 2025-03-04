import { useMemo } from "react";
import { LoanTableElementType } from "~/data/loan/mockedData";
import { reduceNumber } from "../utils";

const useReduceLoan = (arrayOfElements: LoanTableElementType[]) => {
  return useMemo(() => {
    return {
      money: reduceNumber(arrayOfElements, "money"),
      moneyLeft: reduceNumber(arrayOfElements, "moneyLeft"),
      installment: reduceNumber(arrayOfElements, "installment"),
    };
  }, [arrayOfElements]);
};

export default useReduceLoan;
