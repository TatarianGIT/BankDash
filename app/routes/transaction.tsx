import { Pagination as PaginationMantine } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  defer,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { Suspense } from "react";
import { requireAuth } from "~/auth/auth";
import CardRouteLinkWrapper from "~/components/common/CardRouteLinkWrapper";
import CreditCard from "~/components/common/CreditCard";
import CreditCardContainer from "~/components/common/CreditCardContainer";
import Item from "~/components/common/Item";
import LoadingItem from "~/components/common/LoadingItem";
import MyExpense from "~/components/uncommon/transaction/MyExpense";
import RecentTransactionsTable from "~/components/uncommon/transaction/RecentTransactionsTable";
import { getCard } from "~/data/common/creditCard";
import { getMyExpense } from "~/data/transaction/myExpense.js";
import {
  checkLimit,
  checkOffset,
  checkOperation,
  getRecentTransactions,
  getRecentTransactionsLength,
} from "~/data/transaction/recentTransations.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuth(request);

  const url = new URL(request.url);

  const getLimit = url.searchParams.get("limit");
  const getOperation = url.searchParams.get("operation");
  const getOffset = url.searchParams.get("offset");

  const limit = checkLimit(getLimit);
  const operation = checkOperation(getOperation);
  const offset = checkOffset(getOffset, operation, limit);

  const recentTransactionsData = getRecentTransactions({
    limit,
    offset,
    operation,
  });

  const recentTransactionsLength = await getRecentTransactionsLength({
    limit,
    operation,
  });

  const creditCards = getCard(2);

  const myExpense = await getMyExpense();

  return defer({
    creditCards,
    recentTransactionsData,
    myExpense,
    totalPages: recentTransactionsLength,
  });
};

const Transaction = () => {
  const { ...data } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Item
        leftHeading="My Cards"
        variant="alt"
        rightHeading="+ Add Card"
        size="medium"
        CustomWrapper={CardRouteLinkWrapper}
        withCardContainer={false}
      >
        <CreditCardContainer>
          <LoadingItem
            fallback={
              <>
                {Array.from({ length: 2 }, (_, index) => (
                  <CreditCard key={index} isLoading={true} />
                ))}
              </>
            }
            data={data.creditCards}
          >
            {(response) =>
              response.map((creditCard) => (
                <CreditCard key={creditCard.id} {...creditCard} />
              ))
            }
          </LoadingItem>
        </CreditCardContainer>
      </Item>

      <Item leftHeading="My Expense" size="small">
        <MyExpense data={data.myExpense} />
      </Item>

      <Item
        leftHeading="Recent Transactions"
        size="full"
        className="col-span-1"
        withCardContainer={false}
      >
        {isLoading ? (
          <RecentTransactionsTable isLoading={true} data={[]} />
        ) : (
          <Suspense
            fallback={
              <>
                <RecentTransactionsTable isLoading={true} data={[]} />
              </>
            }
          >
            <Await
              resolve={Promise.all([
                data.recentTransactionsData,
                data.totalPages,
              ])}
            >
              {([resolvedData]) => (
                <>
                  <RecentTransactionsTable data={resolvedData} />
                </>
              )}
            </Await>
          </Suspense>
        )}
      </Item>

      <Pagination totalPages={data.totalPages} />
    </>
  );
};

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const offset = parseInt(searchParams.get("offset") || "1", 10);

  const onPageChage = (newPage: number) => {
    setSearchParams(
      (prev) => {
        prev.set("offset", newPage.toString());
        return prev;
      },
      { preventScrollReset: true }
    );
  };

  return (
    <div className="ml-auto pr-2">
      <PaginationMantine
        value={offset}
        total={totalPages}
        className="py-4 hidden md:flex justify-end"
        size={"md"}
        onChange={onPageChage}
        withControls={true}
        boundaries={1}
      />

      <PaginationMantine
        value={offset}
        total={totalPages}
        className="py-4 flex justify-end md:hidden"
        size={"xs"}
        onChange={onPageChage}
        withControls={true}
        boundaries={1}
      />
    </div>
  );
};

export default Transaction;
