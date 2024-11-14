import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CreditCard from "~/components/dashboard/CreditCard";
import ExpenseRoundChart from "~/components/dashboard/ExpenseRoundChart";
import Item from "~/components/common/Item";
import QuickTransfer from "~/components/dashboard/QuickTransfer";
import RecentTransaction from "~/components/dashboard/RecentTransaction";
import RecentTransChart from "~/components/dashboard/RecentTransChart";
import { getAllContacts } from "~/data/dashboard/contacts.js";
import {
  getBalanceHistory,
  getExpenseStatistics,
  getRecentTransactions,
} from "~/data/dashboard/mockedData.js";
import BalanceHistory from "~/components/dashboard/BalanceHistory";

export const loader = async () => {
  const transactionData = await getRecentTransactions();
  const expenseStatistics = await getExpenseStatistics();
  const contacts = await getAllContacts();
  const balanceHistory = await getBalanceHistory();
  return json({ transactionData, expenseStatistics, contacts, balanceHistory });
};

export const meta: MetaFunction = () => {
  return [
    { title: "BankDash" },
    { name: "description", content: "Welcome to BusinessApp!" },
  ];
};

export default function Index() {
  const { ...data } = useLoaderData<typeof loader>();

  return (
    <>
      <Item
        leftHeading="My Cards"
        variant="alt"
        rightHeading="See All"
        size="medium"
      >
        <CreditCard variant="primary" />
        <CreditCard variant="alt" />
      </Item>

      <Item size="small" leftHeading="Recent Transaction">
        <RecentTransaction />
      </Item>

      <Item size="medium" leftHeading="Recent Transaction">
        <RecentTransChart data={data.transactionData} />
      </Item>

      <Item size="small" leftHeading="Expense Statistics">
        <ExpenseRoundChart data={data.expenseStatistics} />
      </Item>

      <Item size="small" leftHeading="Quick Transfer">
        <QuickTransfer data={data.contacts} />
      </Item>

      <Item size="medium" leftHeading="Balance History">
        <BalanceHistory data={data.balanceHistory} />
      </Item>
    </>
  );
}
