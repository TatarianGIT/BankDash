import { json, useLoaderData } from "@remix-run/react";
import Item from "~/components/common/Item";
import LoanBadgeSection from "~/components/loans/LoanBadgeSection";
import LoanTable from "~/components/loans/LoanTable";
import { getLoansData } from "~/data/loan/mockedData";

export const loader = async () => {
  const loansData = await getLoansData();

  return json({ loansData });
};

const Loan = () => {
  const { loansData } = useLoaderData<typeof loader>();

  return (
    <>
      <LoanBadgeSection />

      <Item leftHeading="Active Loans Overview" size="full">
        <LoanTable loansData={loansData} />
      </Item>
    </>
  );
};

export default Loan;
