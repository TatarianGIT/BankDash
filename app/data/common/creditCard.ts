import { CardData } from "../card/addNewCard";

export const MockedCreditCardData: CardData[] = [
  {
    id: Date.now().toString() + Math.ceil(Math.random() * 10000),
    balance: 21042,
    date: "07/24",
    name: "John Smith",
    number: "5225 1025 5911 1029",
    type: "Physical",
  },
  {
    id: Date.now().toString() + Math.ceil(Math.random() * 10000),
    balance: 7288,
    date: "02/25",
    name: "Emma Smith",
    number: "1255 2825 8892 5826",
    type: "Virtual",
  },
];
