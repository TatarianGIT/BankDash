import { useMatches } from "@mantine/core";
import { json, useLoaderData } from "@remix-run/react";
import { getInvestment, getRevenue } from "~/data/investment/mockedData";

export const loader = async () => {
  const ivestments = await getInvestment();
  const revenue = await getRevenue();

  return json({ ivestments, revenue });
};

const Investment = () => {
  const data = useLoaderData<typeof loader>();

  const colSpan: number | "auto" | "content" = useMatches({
    base: 12,
    md: "auto",
  });
  return (
    <>
      <ItemBadgeContainer colSpan={12}>
        <ItemBadge
          colSpan={colSpan}
          icon={<TbMoneybag size={30} className="text-cyan-500" />}
          backgroundColor="bg-cyan-500/25"
          heading="Total Invested Amount"
          balance={150000}
          type="$"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<IoPieChartOutline size={30} className="text-pink-500" />}
          backgroundColor="bg-pink-500/25"
          heading="Number of Investments"
          balance={1250}
          type="number"
        />
        <ItemBadge
          colSpan={colSpan}
          icon={<TbRepeat size={30} className="text-blue-500" />}
          backgroundColor="bg-blue-500/25"
          heading="Rate of Return"
          balance={5.81}
          type="%"
          operation="income"
        />
      </ItemBadgeContainer>
    </>
  );
};

export default Investment;
