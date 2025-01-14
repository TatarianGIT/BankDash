import { defer, useLoaderData } from "@remix-run/react";
import Item from "~/components/common/Item";
import LoadingItem from "~/components/common/LoadingItem";
import InvestmentBadgeSection from "~/components/investment/InvestmentBadgeSection";
import InvestmentChart from "~/components/investment/InvestmentChart";
import MyInvestment from "~/components/investment/MyInvestment";
import TrendingStock from "~/components/investment/TrendingStock";
import { getInvestment, getRevenue } from "~/data/investment/mockedData";

export const loader = async () => {
  const ivestments = getInvestment();
  const revenue = getRevenue();

  return defer({ ivestments, revenue });
};

const Investment = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <InvestmentBadgeSection />

      <Item leftHeading="Yearly Total Investment" size="half">
        <LoadingItem data={data.ivestments}>
          {(response) => <InvestmentChart type="investment" data={response} />}
        </LoadingItem>
      </Item>

      <Item leftHeading="Monthly Revenue" size="half">
        <LoadingItem data={data.revenue}>
          {(response) => <InvestmentChart type="revenue" data={response} />}
        </LoadingItem>
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
