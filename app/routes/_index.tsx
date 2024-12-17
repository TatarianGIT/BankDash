import { type MetaFunction } from "@remix-run/node";
import { defer, useLoaderData } from "@remix-run/react";
import CreditCard from "~/components/common/CreditCard";
import Item from "~/components/common/Item";
import LoadingItem from "~/components/common/LoadingItem";
import BalanceHistory from "~/components/dashboard/BalanceHistory";
import ExpenseRoundChart from "~/components/dashboard/ExpenseRoundChart";
import QuickTransfer from "~/components/dashboard/QuickTransfer";
import RecentTransaction from "~/components/dashboard/RecentTransaction";
import RecentTransChart from "~/components/dashboard/RecentTransChart";
import { MockedCreditCardData } from "~/data/common/creditCard";
import { getAllContacts } from "~/data/dashboard/contacts.js";
import {
  getBalanceHistory,
  getExpenseStatistics,
  getRecentTransactions,
} from "~/data/dashboard/mockedData.js";

export const loader = async () => {
  const transactionData = getRecentTransactions();
  const expenseStatistics = getExpenseStatistics();
  const contacts = getAllContacts();
  const balanceHistory = getBalanceHistory();

  return defer({
    transactionData,
    expenseStatistics,
    contacts,
    balanceHistory,
  });
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
        shouldOverflow={true}
        leftHeading="My Cards"
        variant="alt"
        rightHeading="See All"
        size="medium"
      >
        {MockedCreditCardData.map((creditCard) => (
          <CreditCard key={creditCard.id} {...creditCard} />
        ))}
      </Item>

      <Item size="small" leftHeading="Recent Transaction">
        <RecentTransaction />
      </Item>

      <Item size="medium" leftHeading="Expense Statistics">
        <LoadingItem data={data.transactionData}>
          {(response) => <RecentTransChart data={response} />}
        </LoadingItem>
      </Item>

      <Item size="small" leftHeading="Expense Statistics">
        <LoadingItem data={data.expenseStatistics}>
          {(response) => <ExpenseRoundChart data={response} />}
        </LoadingItem>
      </Item>

      <Item size="small" leftHeading="Quick Transfer">
        <LoadingItem data={data.contacts}>
          {(response) => <QuickTransfer data={response} />}
        </LoadingItem>
      </Item>

      <Item size="medium" leftHeading="Balance History">
        <LoadingItem data={data.balanceHistory}>
          {(response) => <BalanceHistory data={response} />}
        </LoadingItem>
      </Item>
    </>
  );
}
