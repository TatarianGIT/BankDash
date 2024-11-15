import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Item from "~/components/common/Item";
import CreditCard from "~/components/dashboard/CreditCard";
import MyExpense from "~/components/transaction/MyExpense";
import RecentTransactionsTable from "~/components/transaction/RecentTransactionsTable";
import {
  getRecentTransactions,
  getRecentTransactionsLength,
  RecentTransactionsType,
} from "~/data/transaction/recentTransations.js";
import { getMyExpense } from "~/data/transaction/myExpense.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const myExpense = await getMyExpense();

  const url = new URL(request.url);

  const getOperation = url.searchParams.get("operation");

  const operation: RecentTransactionsType["operation"] = getOperation
    ? ["all", "expense", "income"].includes(getOperation)
      ? getOperation
      : "all"
    : "all";

  const offsetString = url.searchParams.get("offset");
  const offset = offsetString ? parseInt(offsetString) : 1;

  const limitString = url.searchParams.get("limit");
  const limit = limitString ? parseInt(limitString) : 5;

  const recentTransactionsLength = await getRecentTransactionsLength({
    operation,
  });
  const recentTransactionsData: RecentTransactionsType[] =
    await getRecentTransactions({ limit, offset, operation });

  return json({
    myExpense,
    recentTransactionsData,
    recentTransactionsLength,
  });
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
        <RecentTransactionsTable
          data={data.recentTransactionsData}
          dataLength={data.recentTransactionsLength}
        />
      </Item>
    </>
  );
};

export default Transaction;
