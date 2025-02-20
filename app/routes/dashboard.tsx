import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { defer, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/auth/auth";
import CardRouteLinkWrapper from "~/components/common/CardRouteLinkWrapper";
import CreditCard from "~/components/common/CreditCard";
import CreditCardContainer from "~/components/common/CreditCardContainer";
import Item from "~/components/common/Item";
import LoadingItem from "~/components/common/LoadingItem";
import BalanceHistory from "~/components/uncommon/dashboard/BalanceHistory";
import ExpenseRoundChart from "~/components/uncommon/dashboard/ExpenseRoundChart";
import QuickTransfer from "~/components/uncommon/dashboard/QuickTransfer";
import RecentTransaction from "~/components/uncommon/dashboard/RecentTransaction";
import RecentTransChart from "~/components/uncommon/dashboard/WeeklyActivity";
import { getCard } from "~/data/common/creditCard";
import { getAllContacts } from "~/data/dashboard/contacts.js";
import {
  getBalanceHistory,
  getExpenseStatistics,
  getRecentTransactions,
} from "~/data/dashboard/mockedData.js";
import { NotificationResponse } from "~/types";
import { wait } from "~/utils/wait";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuth(request);

  const transactionData = getRecentTransactions();
  const expenseStatistics = getExpenseStatistics();
  const contacts = getAllContacts();
  const balanceHistory = getBalanceHistory();
  const creditCards = getCard(2);

  return defer({
    transactionData,
    expenseStatistics,
    contacts,
    balanceHistory,
    creditCards,
  });
};

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<NotificationResponse> => {
  await requireAuth(request);
  await wait(2500);

  const randomValue = Math.random();
  if (randomValue < 0.3)
    return { status: "error", message: "An unexpected error occurred!" };

  return { status: "success", message: "Quick transfer completed!" };
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
        CustomWrapper={CardRouteLinkWrapper}
        withCardContainer={false}
      >
        <LoadingItem
          fallback={
            <>
              <CreditCardContainer>
                {Array.from({ length: 2 }, (_, index) => (
                  <CreditCard key={index} isLoading={true} />
                ))}
              </CreditCardContainer>
            </>
          }
          data={data.creditCards}
        >
          {(response) => (
            <CreditCardContainer>
              {response.map((creditCard) => (
                <CreditCard key={creditCard.id} {...creditCard} />
              ))}
            </CreditCardContainer>
          )}
        </LoadingItem>
      </Item>

      <Item size="small" leftHeading="Recent Transaction">
        <RecentTransaction />
      </Item>

      <Item size="medium" leftHeading="Weekly Activity">
        <LoadingItem data={data.transactionData} className="min-h-72">
          {(response) => <RecentTransChart data={response} />}
        </LoadingItem>
      </Item>

      <Item size="small" leftHeading="Expense Statistics">
        <LoadingItem data={data.expenseStatistics} className="min-h-72">
          {(response) => <ExpenseRoundChart data={response} />}
        </LoadingItem>
      </Item>

      <Item size="small" leftHeading="Quick Transfer">
        <LoadingItem data={data.contacts} className="min-h-96">
          {(response) => <QuickTransfer data={response} />}
        </LoadingItem>
      </Item>

      <Item size="medium" leftHeading="Balance History">
        <LoadingItem data={data.balanceHistory} className="min-h-96">
          {(response) => <BalanceHistory data={response} />}
        </LoadingItem>
      </Item>
    </>
  );
}
