import { useMatches } from "@mantine/core";
import { CircleDollarSign, PiggyBank } from "lucide-react";
import { GiExpense, GiReceiveMoney } from "react-icons/gi";
import ItemBadgeContainer, { ItemBadge } from "~/components/common/ItemBadge";

const Account = () => {
  const colSpan = useMatches({
    base: 6,
    md: 3,
  });
  return (
    <>
      <ItemBadgeContainer className="col-span-full">
        <ItemBadge
          colSpan={colSpan}
          icon={<CircleDollarSign size={30} className="text-amber-500" />}
          backgroundColor="bg-amber-500/25"
          heading="My Balance"
          balance={12750}
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<GiReceiveMoney size={30} className="text-blue-500" />}
          backgroundColor="bg-blue-500/25"
          heading="Income"
          balance={5600}
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<GiExpense size={30} className="text-pink-500" />}
          backgroundColor="bg-pink-500/25"
          heading="Expense"
          balance={3625}
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<PiggyBank size={30} className="text-cyan-500" />}
          backgroundColor="bg-cyan-500/25"
          heading="Total Savings"
          balance={5250}
        />
      </ItemBadgeContainer>
    </>
  );
};

export default Account;
