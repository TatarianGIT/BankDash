import { json, useLoaderData } from "@remix-run/react";
import Item from "~/components/common/Item";
import InvestmentBadgeSection from "~/components/investment/InvestmentBadgeSection";
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

  return (
    <>
      <InvestmentBadgeSection />

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
