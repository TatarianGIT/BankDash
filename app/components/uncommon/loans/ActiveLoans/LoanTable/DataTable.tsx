import { useState } from "react";
import { LoanTableElementType } from "~/data/loan/mockedData";
import { objSort } from "../utils";
import useReduceLoan from "../hooks/useReduceLoan";
import {
  CustomTableBody,
  CustomTableContainer,
  CustomTableHeader,
  CustomTableSelectedFooter,
  CustomTableTotalFooter,
} from "./CustomTable";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import { Text } from "@mantine/core";

type DataTableProps = {
  loansData: LoanTableElementType[];
};

const DataTable = ({ loansData }: DataTableProps) => {
  const [data, setData] = useState<LoanTableElementType[]>(loansData);
  const [selectedRows, setSelectedRows] = useState<LoanTableElementType[]>([]);

  const allRowsChecked =
    JSON.stringify(objSort(selectedRows)) == JSON.stringify(objSort(data));

  const reducedTotal = useReduceLoan(data);
  const reducedSelected = useReduceLoan(selectedRows);

  const handleSelectAll = (rowsSelected: boolean) => {
    return rowsSelected ? setSelectedRows([...data]) : setSelectedRows([]);
  };

  const handleSelectRow = (
    isRowSelected: boolean,
    loan: LoanTableElementType
  ) => {
    return setSelectedRows(
      isRowSelected
        ? [...selectedRows, loan]
        : selectedRows.filter((oldLoan) => oldLoan.SLNo !== loan.SLNo)
    );
  };

  const handleRepay = (loan: LoanTableElementType) => {
    if (selectedRows.includes(loan)) {
      setSelectedRows((prevData) =>
        prevData.filter((l) => l.SLNo !== loan.SLNo)
      );
    }

    return setData((prevData) => prevData.filter((l) => l !== loan));
  };

  const handleMultipleRepay = () => {
    const slNosToRemove = new Set(selectedRows.map((loan) => loan.SLNo));
    setData((prevData) =>
      prevData.filter((loan) => !slNosToRemove.has(loan.SLNo))
    );

    setSelectedRows((prevData) =>
      prevData.filter((loan) => !slNosToRemove.has(loan.SLNo))
    );
    return;
  };

  return data.length ? (
    <CustomTableContainer>
      <CustomTableHeader>
        <TableHeader
          allRowsChecked={allRowsChecked}
          handleSelectAll={handleSelectAll}
        />
      </CustomTableHeader>
      <CustomTableBody>
        {data.map((loan) => {
          const isRowSelected = selectedRows.some(
            (item) => item.SLNo === loan.SLNo
          );
          return (
            <TableRow
              isLoading={false}
              key={loan.SLNo}
              loan={loan}
              handleRepay={() => handleRepay(loan)}
              handleRowSelect={handleSelectRow}
              isRowSelected={isRowSelected}
            />
          );
        })}
      </CustomTableBody>
      {selectedRows.length > 0 && (
        <CustomTableSelectedFooter>
          <TableRow
            isLoading={false}
            isSelectionFooter
            key={"selected"}
            footerData={{
              installment: reducedSelected.installment.toString(),
              money: reducedSelected.money,
              moneyLeft: reducedSelected.moneyLeft,
            }}
            handleRepay={() => handleMultipleRepay()}
            buttonRightSection={selectedRows.length.toString()}
          />
        </CustomTableSelectedFooter>
      )}
      <CustomTableTotalFooter>
        <TableRow
          isLoading={false}
          isTotalFooter={true}
          key={"total"}
          footerData={{
            installment: reducedTotal.installment.toString(),
            money: reducedTotal.money,
            moneyLeft: reducedTotal.moneyLeft,
          }}
        />
      </CustomTableTotalFooter>
    </CustomTableContainer>
  ) : (
    <Text className="text-center py-44">
      You don&apos;t have any active loans!
    </Text>
  );
};

export default DataTable;
