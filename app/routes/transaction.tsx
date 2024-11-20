import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Item from "~/components/common/Item";
import CreditCard from "~/components/common/CreditCard";
import MyExpense from "~/components/transaction/MyExpense";
import RecentTransactionsTable from "~/components/transaction/RecentTransactionsTable";
import {
  checkLimit,
  checkOffset,
  checkOperation,
  getRecentTransactions,
  getRecentTransactionsLength,
  RecentTransactionsType,
} from "~/data/transaction/recentTransations.js";
import { getMyExpense } from "~/data/transaction/myExpense.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const myExpense = await getMyExpense();

  const url = new URL(request.url);

  const getLimit = url.searchParams.get("limit");
  const getOperation = url.searchParams.get("operation");
  const getOffset = url.searchParams.get("offset");

  const limit = checkLimit(getLimit);
  const operation = checkOperation(getOperation);
  const offset = checkOffset(getOffset, operation, limit);

  const recentTransactionsLength = await getRecentTransactionsLength({
    operation,
  });

  const recentTransactionsData: RecentTransactionsType[] =
    await getRecentTransactions({ limit, offset, operation });

  const totalPages = Math.ceil(recentTransactionsLength / limit);

  return json({
    myExpense,
    recentTransactionsData,
    recentTransactionsLength,
    totalPages,
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
          totalPages={data.totalPages}
        />
      </Item>
    </>
  );
};

export default Transaction;
