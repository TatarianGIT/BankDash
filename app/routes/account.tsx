import { useMatches } from "@mantine/core";
import { defer, useLoaderData } from "@remix-run/react";
import { CircleDollarSign, PiggyBank } from "lucide-react";
import { GiExpense, GiReceiveMoney } from "react-icons/gi";
import Invoices from "~/components/uncommon/account/InvoicesList";
import LatestTransation from "~/components/uncommon/account/LatestTransation";
import Overview from "~/components/uncommon/account/Overview";
import CardRouteLinkWrapper from "~/components/common/CardRouteLinkWrapper";
import CreditCard from "~/components/common/CreditCard";
import CreditCardContainer from "~/components/common/CreditCardContainer";
import Item from "~/components/common/Item";
import ItemBadgeContainer, { ItemBadge } from "~/components/common/ItemBadge";
import LoadingItem from "~/components/common/LoadingItem";
import { getCard } from "~/data/common/creditCard";
import { requireAuth } from "~/auth/auth";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuth(request);

  const creditCard = getCard(1);

  return defer({ creditCard });
};

const Account = () => {
  const { ...data } = useLoaderData<typeof loader>();

  const colSpan = useMatches({
    base: 6,
    md: 3,
  });

  return (
    <>
      <ItemBadgeContainer colSpan={12}>
        <ItemBadge
          colSpan={colSpan}
          icon={<CircleDollarSign size={30} className="text-amber-500" />}
          backgroundColor="bg-amber-500/25"
          heading="My Balance"
          description={12750}
          type="$"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<GiReceiveMoney size={30} className="text-blue-500" />}
          backgroundColor="bg-blue-500/25"
          heading="Income"
          description={5600}
          type="$"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<GiExpense size={30} className="text-pink-500" />}
          backgroundColor="bg-pink-500/25"
          heading="Expense"
          description={3625}
          type="$"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<PiggyBank size={30} className="text-cyan-500" />}
          backgroundColor="bg-cyan-500/25"
          heading="Total Savings"
          description={5250}
          type="$"
        />
      </ItemBadgeContainer>

      <Item size="medium" leftHeading="Last Transaction">
        <LatestTransation />
      </Item>

      <Item
        leftHeading="My Card"
        rightHeading="See All"
        variant="alt"
        size="small"
        CustomWrapper={CardRouteLinkWrapper}
        withCardContainer={false}
      >
        <CreditCardContainer>
          <LoadingItem
            fallback={<CreditCard isLoading={true} />}
            data={data.creditCard}
          >
            {(response) =>
              response.map((creditCard) => (
                <CreditCard key={creditCard.id} {...creditCard} />
              ))
            }
          </LoadingItem>
        </CreditCardContainer>
      </Item>

      <Item leftHeading="Debit & Credit Overview" size="medium">
        <Overview />
      </Item>

      <Item leftHeading="Invoces Sent" size="small">
        <Invoices />
      </Item>
    </>
  );
};

export default Account;
