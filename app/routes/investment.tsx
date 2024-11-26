import { useMatches } from "@mantine/core";
import { json, useLoaderData } from "@remix-run/react";
import { IoPieChartOutline } from "react-icons/io5";
import { TbMoneybag, TbRepeat } from "react-icons/tb";
import Item from "~/components/common/Item";
import ItemBadgeContainer, { ItemBadge } from "~/components/common/ItemBadge";
import InvestmentChart from "~/components/investment/InvestmentChart";
import MyInvestment from "~/components/investment/MyInvestment";
import TrendingStock from "~/components/investment/TrendingStock";
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

      <Item leftHeading="Yearly Total Investment" size="half">
        <InvestmentChart type="investment" data={data.ivestments} />
      </Item>

      <Item leftHeading="Yearly Total Investment" size="half">
        <InvestmentChart type="revenue" data={data.revenue} />
      </Item>

      <Item leftHeading="My Investment" size="medium">
        <MyInvestment />
      </Item>

      <Item leftHeading="Trending Stock" size="small">
        <TrendingStock />
      </Item>
    </>
  );
};

export default Investment;
