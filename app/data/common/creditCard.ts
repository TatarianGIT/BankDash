import { wait } from "~/utils/wait";
import { card } from "../card/addNewCard";

export const getCard = async (amount: number) => {
  await wait(800);
  return card.getAmount(amount);
};
