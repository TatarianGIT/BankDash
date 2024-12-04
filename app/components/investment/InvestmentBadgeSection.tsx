import { useMatches } from "@mantine/core";
import { IoPieChartOutline } from "react-icons/io5";
import { TbMoneybag, TbRepeat } from "react-icons/tb";
import ItemBadgeContainer, { ItemBadge } from "~/components/common/ItemBadge";

const InvestmentBadgeSection = () => {
  const colSpan: number | "auto" | "content" = useMatches({
    base: 12,
    md: "auto",
  });

  return (
    <ItemBadgeContainer colSpan={12}>
      <ItemBadge
        colSpan={colSpan}
        icon={<TbMoneybag size={30} className="text-cyan-500" />}
        backgroundColor="bg-cyan-500/25"
        heading="Total Invested Amount"
        description={150000}
        type="$"
      />
      <ItemBadge
        colSpan={colSpan}
        icon={<IoPieChartOutline size={30} className="text-pink-500" />}
        backgroundColor="bg-pink-500/25"
        heading="Number of Investments"
        description={1250}
        type="number"
      />
      <ItemBadge
        colSpan={colSpan}
        icon={<TbRepeat size={30} className="text-blue-500" />}
        backgroundColor="bg-blue-500/25"
        heading="Rate of Return"
        description={5.81}
        type="%"
        operation="income"
      />
    </ItemBadgeContainer>
  );
};

export default InvestmentBadgeSection;
