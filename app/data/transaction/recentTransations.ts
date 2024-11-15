export const getRecentTransactions = async (): Promise<
  RecentTransactionsType[]
> => {
  return recentTransactionsData;
};

export type RecentTransactionsType = {
  transactionId: string;
  operation: "all" | "expense" | "income";
  description: string;
  type: string;
  last4Digits: string;
  date: string;
  amount: number;
};

const recentTransactionsData: RecentTransactionsType[] = Array.from(
  { length: 27 },
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
