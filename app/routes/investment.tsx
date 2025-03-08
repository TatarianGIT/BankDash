import { LoaderFunctionArgs } from "@remix-run/node";
import { defer, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/auth/auth";
import Item from "~/components/common/Item";
import LoadingItem from "~/components/common/LoadingItem";
import InvestmentBadgeSection from "~/components/uncommon/investment/InvestmentBadgeSection";
import InvestmentChart from "~/components/uncommon/investment/InvestmentChart";
import MyInvestment from "~/components/uncommon/investment/MyInvestment";
import TrendingStock from "~/components/uncommon/investment/TrendingStock";
import { getInvestment, getRevenue } from "~/data/investment/mockedData";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuth(request);

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
        <LoadingItem data={data.ivestments} className="min-h-80">
          {(response) => <InvestmentChart type="investment" data={response} />}
        </LoadingItem>
      </Item>

      <Item leftHeading="Monthly Revenue" size="half">
        <LoadingItem data={data.revenue} className="min-h-80">
          {(response) => <InvestmentChart type="revenue" data={response} />}
        </LoadingItem>
      </Item>

      <Item leftHeading="My Investment" size="medium" withCardContainer={false}>
        <MyInvestment />
      </Item>

      <Item leftHeading="Trending Stock" size="small">
        <TrendingStock />
      </Item>
    </>
  );
};

export default Investment;
