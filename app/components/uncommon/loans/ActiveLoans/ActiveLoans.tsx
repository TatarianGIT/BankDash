import { LoanTableElementType } from "~/data/loan/mockedData";
import DataTable from "./DataTable";

type ActiveLoansProps = {
  loansData: LoanTableElementType[];
};

const ActiveLoans = ({ loansData }: ActiveLoansProps) => {
  return (
    <div className="p-0 w-full">
      <DataTable loansData={loansData} />
    </div>
  );
};

export default ActiveLoans;
