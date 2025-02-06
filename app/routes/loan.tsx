import { LoaderFunctionArgs } from "@remix-run/node";
import { defer, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/auth/auth";
import Item from "~/components/common/Item";
import LoadingItem from "~/components/common/LoadingItem";
import LoanBadgeSection from "~/components/uncommon/loans/LoanBadgeSection";
import LoanTable from "~/components/uncommon/loans/LoanTable";
import { getLoansData } from "~/data/loan/mockedData";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuth(request);

  const loansData = getLoansData();

  return defer({ loansData });
};

const Loan = () => {
  const { loansData } = useLoaderData<typeof loader>();

  return (
    <>
      <LoanBadgeSection />

      <Item leftHeading="Active Loans Overview" size="full">
        <LoadingItem data={loansData} className="h-[600px]">
          {(reponse) => <LoanTable loansData={reponse} />}
        </LoadingItem>
      </Item>
    </>
  );
};

export default Loan;
