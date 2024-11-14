import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Item from "~/components/common/Item";
import CreditCard from "~/components/dashboard/CreditCard";
import MyExpense from "~/components/transaction/MyExpense";
import RecentTransactionsTable from "~/components/transaction/RecentTransactionsTable";
import {
  getRecentTransactions,
  RecentTransactionsType,
} from "~/data/transaction/recentTransations.js";
import { getMyExpense } from "~/data/transaction/myExpense.js";

export const loader = async () => {
  const myExpense = await getMyExpense();
  const recentTransactionsData: RecentTransactionsType[] =
    await getRecentTransactions();

  return json({ myExpense, recentTransactionsData });
};

const Transaction = () => {
  const { ...data } = useLoaderData<typeof loader>();

  return (
    <>
      <Item
        leftHeading="My Cards"
        variant="alt"
        rightHeading="+ Add Card"
        size="medium"
      >
        <CreditCard variant="primary" />
        <CreditCard variant="alt" />
      </Item>

      <Item leftHeading="My Expense" size="small">
        <MyExpense data={data.myExpense} />
      </Item>

      <Item leftHeading="Recent Transactions" size="big" className="col-span-1">
        <RecentTransactionsTable data={data.recentTransactionsData} />
      </Item>
    </>
  );
};

export default Transaction;
