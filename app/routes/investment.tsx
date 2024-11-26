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
    </>
  );
};

export default Investment;
