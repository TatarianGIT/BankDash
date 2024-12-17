import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import CreditCard from "~/components/common/CreditCard";
import Item from "~/components/common/Item";
import LoadingItem, {
  SkeletonContainer,
} from "~/components/common/LoadingItem";
import MyExpense from "~/components/transaction/MyExpense";
import RecentTransactionsTable from "~/components/transaction/RecentTransactionsTable";
import { MockedCreditCardData } from "~/data/common/creditCard";
import { getMyExpense } from "~/data/transaction/myExpense.js";
import {
  checkLimit,
  checkOffset,
  checkOperation,
  getRecentTransactions,
  getRecentTransactionsLength,
} from "~/data/transaction/recentTransations.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const myExpense = getMyExpense();

  const url = new URL(request.url);

  const getLimit = url.searchParams.get("limit");
  const getOperation = url.searchParams.get("operation");
  const getOffset = url.searchParams.get("offset");

  const limit = checkLimit(getLimit);
  const operation = checkOperation(getOperation);
  const offset = checkOffset(getOffset, operation, limit);

  const recentTransactionsLength = getRecentTransactionsLength({
    operation,
  });

  const recentTransactionsData = getRecentTransactions({
    limit,
    offset,
    operation,
  });

  const totalPages = Math.ceil(Number(recentTransactionsLength) / limit);

  return defer({
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
        shouldOverflow={true}
        leftHeading="My Cards"
        variant="alt"
        rightHeading="+ Add Card"
        size="medium"
      >
        {MockedCreditCardData.map((creditCard) => (
          <CreditCard key={creditCard.id} {...creditCard} />
        ))}
      </Item>

      <Item leftHeading="My Expense" size="small">
        <LoadingItem data={data.myExpense}>
          {(response) => <MyExpense data={response} />}
        </LoadingItem>
      </Item>

      <Item
        leftHeading="Recent Transactions"
        size="full"
        className="col-span-1"
      >
        <Suspense fallback={<SkeletonContainer />}>
          <Await
            resolve={Promise.all([
              data.recentTransactionsData,
              data.recentTransactionsLength,
              data.totalPages,
            ])}
          >
            {([resolvedData, resolvedLength, resolvedTotalPages]) => (
              <RecentTransactionsTable
                data={resolvedData}
                dataLength={resolvedLength}
                totalPages={resolvedTotalPages}
              />
            )}
          </Await>
        </Suspense>
      </Item>
    </>
  );
};

export default Transaction;
