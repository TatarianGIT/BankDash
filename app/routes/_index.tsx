import { Button, Text } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { redirectIfLoggedIn } from "~/auth/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirectIfLoggedIn(request);
};

export default function Index() {
  const { ...data } = useLoaderData<typeof loader>();


const Index = () => {
  return (
    <div className="max-w-3xl flex flex-col gap-10 p-4">
      <h1 className="text-center text-2xl">
        Modern Banking Analytics Dashboard
      </h1>

    <>
      <Item
        leftHeading="My Cards"
        variant="alt"
        rightHeading="See All"
        size="medium"
        CustomWrapper={CardRouteLinkWrapper}
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

      <Text className="flex items-center gap-2">
        To view project&apos;s source code, visit this
        <Button
          variant="default"
          className="flex justify-center items-center gap-3"
        >
          <GitHubIcon />
          Github Repo
        </Button>
      </Text>
      <Text className="flex items-center gap-2">
        My GitHub page
        <Button
          variant="default"
          className="flex justify-center items-center gap-3"
        >
          <GitHubIcon />
          TatarianGIT
        </Button>
      </Text>
    </div>
  );
};

      <Item size="small" leftHeading="Recent Transaction">
        <RecentTransaction />
      </Item>

      <Item size="medium" leftHeading="Weekly Activity">
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

export default Index;
