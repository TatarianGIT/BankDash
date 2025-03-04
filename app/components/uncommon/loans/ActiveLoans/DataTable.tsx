import { Table, Text } from "@mantine/core";
import { useState } from "react";
import { LoanTableElementType } from "~/data/loan/mockedData";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import useReduceLoan from "./hooks/useReduceLoan";
import { objSort } from "./utils";

type DataTableProps = {
  loansData: LoanTableElementType[];
};

const DataTable = ({ loansData }: DataTableProps) => {
  const [data, setData] = useState<LoanTableElementType[]>(loansData);
  const [selectedRows, setSelectedRows] = useState<LoanTableElementType[]>([]);

  const allRowsChecked =
    JSON.stringify(objSort(selectedRows)) == JSON.stringify(objSort(data));

  const reducedSelected = useReduceLoan(selectedRows);
  const reducedTotal = useReduceLoan(selectedRows);

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

  return (
    <>
      {data.length > 0 ? (
        <Table
          highlightOnHover
          withColumnBorders
          withTableBorder
          className="text-xs md:text-sm lg:text-base max-w-[1000px] mx-auto"
        >
          <Table.Thead>
            <TableHeader
              allRowsChecked={allRowsChecked}
              handleSelectAll={handleSelectAll}
            />
          </Table.Thead>

          <Table.Tbody>
            {data.map((loan) => {
              const isRowSelected = selectedRows.some(
                (item) => item.SLNo === loan.SLNo
              );

              return (
                <TableRow
                  key={loan.SLNo}
                  loan={loan}
                  handleRepay={() => handleRepay(loan)}
                  handleRowSelect={handleSelectRow}
                  isRowSelected={isRowSelected}
                />
              );
            })}
          </Table.Tbody>

          {selectedRows.length > 0 && (
            <Table.Tfoot>
              <Table.Tr>
                <Table.Td colSpan={3}>Selected</Table.Td>
              </Table.Tr>
              <TableRow
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
            </Table.Tfoot>
          )}

          <Table.Tfoot>
            <Table.Tr>
              <Table.Td colSpan={3}>Total</Table.Td>
            </Table.Tr>
            <TableRow
              isTotalFooter={true}
              key={"total"}
              footerData={{
                installment: reducedTotal.installment.toString(),
                money: reducedTotal.money,
                moneyLeft: reducedTotal.moneyLeft,
              }}
            />
          </Table.Tfoot>
        </Table>
      ) : (
        <Text className="text-center">
          You don&apos;t have any active loans!
        </Text>
      )}
    </>
  );
};

export default DataTable;
