import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CreditCard from "~/components/CreditCard";
import ExpenseRoundChart from "~/components/ExpenseRoundChart";
import ItemGrid from "~/components/ItemCard";
import RecentTransChart from "~/components/RecentTransChart";
import {
  getExpenseStatistics,
  getRecentTransactions,
} from "~/data/mockedData.js";

export const loader = async () => {
  const transactionData = await getRecentTransactions();
  const expenseStatistics = await getExpenseStatistics();
  return json({ transactionData, expenseStatistics });
};

export const meta: MetaFunction = () => {
  return [
    { title: "BusinessApp" },
    { name: "description", content: "Welcome to BusinessApp!" },
  ];
};

export default function Index() {
  const { transactionData, expenseStatistics } = useLoaderData<typeof loader>();

  return (

      <ItemGrid leftHeading="Recent Transaction" className="col-span-2">
        <RecentTransChart data={transactionData} />
      </ItemGrid>

      <ItemGrid leftHeading="Expense Statistics" className="col-span-1">
        <ExpenseRoundChart data={expenseStatistics} />
      </ItemGrid>
  );
}
