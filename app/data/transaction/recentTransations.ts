import { wait } from "~/utils/wait";

const allowedOperations = ["all", "expense", "income"] as const;
export type AllowedOperations = (typeof allowedOperations)[number];

export const allowedLimits = [5, 10] as const;
export type AllowedLimits = (typeof allowedLimits)[number];

export const checkLimit = (getLimit: AllowedLimits | string | null) => {
  const limit: AllowedLimits = allowedLimits[0];

  if (getLimit === null) return limit;

  if (typeof getLimit !== "number") {
    const parsedLimit = parseInt(getLimit);
    if (allowedLimits.includes(parsedLimit as AllowedLimits)) {
      return parsedLimit as AllowedLimits;
    }
  } else if (allowedLimits.includes(getLimit)) {
    return getLimit;
  }

  return 5;
};

export const checkOperation = (getOperation: string | null) => {
  if (getOperation === null) return "all";
  const operation = allowedOperations.includes(
    getOperation as AllowedOperations
  )
    ? getOperation
    : "all";

  return operation as AllowedOperations;
};

export const checkOffset = (
  getOffset: string | null,
  getOperation: AllowedOperations,
  getLimit: AllowedLimits
) => {
  if (getOffset === null) return 1;

  const operation = checkOperation(getOperation);
  const limit = checkLimit(getLimit);

  const dataLength = filterData(recentTransactionsData, operation).length;

  const offset = parseInt(getOffset);

  return offset <= Math.ceil(dataLength / limit) ? offset : 1;
};

function filterData(
  data: RecentTransactionsType[],
  operation: AllowedOperations
) {
  const filteredData =
    operation === "income"
      ? recentTransactionsData.filter(
          (element) => element.operation === operation
        )
      : operation === "expense"
      ? recentTransactionsData.filter(
          (element) => element.operation === operation
        )
      : recentTransactionsData;

  return filteredData;
}

export const getRecentTransactionsLength = async ({
  operation,
  limit,
}: {
  operation: AllowedOperations;
  limit: AllowedLimits;
}) => {
  await wait(200);
  return Math.ceil(
    filterData(recentTransactionsData, operation).length / limit
  );
};

type GetRecentTransactionsType = {
  limit: number;
  offset: number;
  operation: "all" | "expense" | "income";
};

export const getRecentTransactions = async ({
  limit,
  offset,
  operation,
}: GetRecentTransactionsType) => {
  await wait(600);

  const filteredData = filterData(recentTransactionsData, operation);

  let rowLimit = 5;

  const isLimitAllowed = allowedLimits.includes(limit as 5 | 10);

  if (isLimitAllowed) rowLimit = limit;

  const firstItem = (offset - 1) * rowLimit;
  const lastItem = offset * rowLimit;

  return filteredData.slice(firstItem, lastItem);
};

export type RecentTransactionsType = {
  transactionId: string;
  operation: AllowedOperations;
  description: string;
  type: string;
  last4Digits: string;
  date: string;
  amount: number;
};

const recentTransactionsData: RecentTransactionsType[] = Array.from(
  { length: 72 },
  (_, index) => ({
    transactionId: Math.random().toString(36).substring(2, 10),
    operation: Math.random() > 0.5 ? "expense" : "income",
    description: [
      "Spotify subscription",
      "Grocery purchase",
      "Online course",
      "Gym membership",
      "Electricity bill",
      "Amazon order",
      "Dinner at restaurant",
      "Movie ticket",
      "Pet supplies",
      "Taxi ride",
      "Coffee shop",
      "Bookstore purchase",
      "Gas station",
      "Clothing store",
      "Phone bill payment",
      "Flight booking",
      "Hotel reservation",
      "Car repair",
      "Home appliance purchase",
      "Insurance payment",
      "Medical bill",
      "Gaming subscription",
      "Streaming service",
      "Concert tickets",
      "Gift purchase",
      "Subscription box",
      "Charity donation",
    ][index % 27],
    type: [
      "Shopping",
      "Food",
      "Education",
      "Health & Fitness",
      "Utilities",
      "Entertainment",
      "Transport",
      "Dining",
      "Pet Care",
      "Travel",
      "Groceries",
      "Bills",
      "Subscription",
      "Gift",
      "Donation",
    ][index % 15],
    last4Digits: Math.floor(1000 + Math.random() * 9000).toString(),
    date: `${Math.floor(1 + Math.random() * 28)} ${
      ["Jan", "Feb", "Mar"][index % 3]
    }, ${Math.floor(10 + Math.random() * 14)}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
    amount: Math.floor(10 + Math.random() * 200),
  })
);
