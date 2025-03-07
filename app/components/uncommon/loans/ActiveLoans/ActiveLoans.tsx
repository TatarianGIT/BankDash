import { LoanTableElementType } from "~/data/loan/mockedData";
import { WithLoading } from "~/types";
import DataTable from "./LoanTable/DataTable";
import LoadingTable from "./LoanTable/LoadingTable";

type ActiveLoansProps = WithLoading<{
  loansData: LoanTableElementType[];
}>;

const ActiveLoans = ({ loansData, isLoading }: ActiveLoansProps) => {
  if (isLoading) return <LoadingTable />;

  return <DataTable loansData={loansData} />;
};

export default ActiveLoans;
