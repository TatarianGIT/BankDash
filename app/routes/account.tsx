import { useMatches } from "@mantine/core";
import { CircleDollarSign, PiggyBank } from "lucide-react";
import { GiExpense, GiReceiveMoney } from "react-icons/gi";
import Invoices from "~/components/account/InvoicesList";
import LatestTransation from "~/components/account/LatestTransation";
import Overview from "~/components/account/Overview";
import CreditCard from "~/components/common/CreditCard";
import Item from "~/components/common/Item";
import ItemBadgeContainer, { ItemBadge } from "~/components/common/ItemBadge";
import { MockedCreditCardData } from "~/data/common/creditCard";

const Account = () => {
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
          balance={12750}
          type="$"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<GiReceiveMoney size={30} className="text-blue-500" />}
          backgroundColor="bg-blue-500/25"
          heading="Income"
          balance={5600}
          type="$"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<GiExpense size={30} className="text-pink-500" />}
          backgroundColor="bg-pink-500/25"
          heading="Expense"
          balance={3625}
          type="$"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<PiggyBank size={30} className="text-cyan-500" />}
          backgroundColor="bg-cyan-500/25"
          heading="Total Savings"
          balance={5250}
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
      >
        {MockedCreditCardData.map((creditCard) => (
          <CreditCard key={creditCard.id} {...creditCard} />
        ))}
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
