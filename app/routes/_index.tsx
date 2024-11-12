import { Container } from "@mantine/core";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CreditCard from "~/components/CreditCard";
import ExpenseRoundChart from "~/components/ExpenseRoundChart";
import ItemGrid from "~/components/ItemCard";
import QuickTransfer from "~/components/QuickTransfer";
import RecentTransaction from "~/components/RecentTransaction";
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
    <Container className="p-0 m-0 grid grid-cols-3 gap-7">
      <ItemGrid
        leftHeading="My Cards"
        variant="alt"
        rightHeading="See All"
        className="col-span-2 h-full"
      >
        <CreditCard
          upperColor="bg-gradient-to-bl from-[#0A06F4] from-50% to-[#4C49ED]"
          bottomColor="bg-gradient-to-b from-[#4C49ED] from-15% to-[#0A06F4] "
        />
        <CreditCard upperColor="bg-gray-100" bottomColor="bg-gray-100" />
      </ItemGrid>

      <ItemGrid leftHeading="Recent Transaction" className="col-span-1">
        <RecentTransaction />
      </ItemGrid>

      <ItemGrid leftHeading="Recent Transaction" className="col-span-2">
        <RecentTransChart data={transactionData} />
      </ItemGrid>

      <ItemGrid leftHeading="Expense Statistics" className="col-span-1">
        <ExpenseRoundChart data={expenseStatistics} />
      </ItemGrid>

      <ItemGrid leftHeading="Quick Transfer" className="col-span-1">
        <QuickTransfer />
      </ItemGrid>

      <ItemGrid leftHeading="Recent Transaction" className="col-span-2">
        <RecentTransChart data={transactionData} />
      </ItemGrid>
    </Container>
  );
}
