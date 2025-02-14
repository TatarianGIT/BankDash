import { Button, Checkbox, NumberFormatter, Table, Text } from "@mantine/core";
import { RotateCcw } from "lucide-react";
import React, { useState } from "react";
import { LoanTableElementType } from "~/data/loan/mockedData";

type LoanTableProps = {
  loansData: LoanTableElementType[];
};

const LoanTable = ({ loansData }: LoanTableProps) => {
  return (
    <div className="p-0 md:p-3 w-full">
      <DataTable loansData={loansData} />
    </div>
  );
};

type DataTableProps = {
  loansData: LoanTableElementType[];
};

const DataTable = ({ loansData }: DataTableProps) => {
  const [selectedRows, setSelectedRows] = useState<LoanTableElementType[]>([]);

  const allRowsChecked =
    JSON.stringify(objSort(selectedRows)) == JSON.stringify(objSort(loansData));

  const selectedMoneyTotal = reduceNumber(selectedRows, "money");
  const selectedMoneyLeftTotal = reduceNumber(selectedRows, "moneyLeft");
  const selectedInstallmentTotal = reduceNumber(selectedRows, "installment");

  const totalMoney = reduceNumber(loansData, "money");
  const totalMoneyLeft = reduceNumber(loansData, "moneyLeft");
  const totalInstallment = reduceNumber(loansData, "installment");

  const handleSelectAll = (rowsSelected: boolean) => {
    return rowsSelected ? setSelectedRows([...loansData]) : setSelectedRows([]);
  };

  const handleSelectRow = (
    rowSelected: boolean,
    loan: LoanTableElementType
  ) => {
    return setSelectedRows(
      rowSelected
        ? [...selectedRows, loan]
        : selectedRows.filter((oldLoan) => oldLoan.SLNo !== loan.SLNo)
    );
  };

  return (
    <>
      <Table striped withColumnBorders withRowBorders highlightOnHover>
        <Table.Thead>
          <TableHeader
            handleSelectAll={handleSelectAll}
            allRowsChecked={allRowsChecked}
          />
        </Table.Thead>
        <Table.Tbody>
          {loansData.map((loan) => {
            const isRowSelected = selectedRows.some(
              (item) => item.SLNo === loan.SLNo
            );

            return (
              <React.Fragment key={loan.SLNo}>
                <TableRowData
                  loan={loan}
                  isRowSelected={isRowSelected}
                  handleRowSelect={handleSelectRow}
                />
              </React.Fragment>
            );
          })}
        </Table.Tbody>

        <Table.Tfoot>
          <TableFooter
            heading="Total"
            money={totalMoney}
            moneyLeft={totalMoneyLeft}
            installment={totalInstallment}
          />
          {selectedRows.length > 0 && (
            <TableFooter
              heading="Selected"
              selectedRows={selectedRows}
              money={selectedMoneyTotal}
              moneyLeft={selectedMoneyLeftTotal}
              installment={selectedInstallmentTotal}
            />
          )}
        </Table.Tfoot>
      </Table>
    </>
  );
};

type TableRowDataProps = {
  isRowSelected: boolean;
  loan: LoanTableElementType;
  handleRowSelect: (isSelected: boolean, loan: LoanTableElementType) => void;
};

const TableRowData = ({
  handleRowSelect,
  isRowSelected,
  loan,
}: TableRowDataProps) => {
  return (
    <Table.Tr
      key={loan.SLNo}
      bg={isRowSelected ? "var(--mantine-color-blue-light)" : undefined}
      style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={isRowSelected}
          onChange={(event) =>
            handleRowSelect(event.currentTarget.checked, loan)
          }
        />
      </Table.Td>
      <Table.Td className="md:table-cell hidden">#{loan.SLNo}</Table.Td>
      <Table.Td>
        <FormatedNumber value={loan.money} />
      </Table.Td>
      <Table.Td>
        <FormatedNumber value={loan.moneyLeft} />
      </Table.Td>
      <Table.Td className="md:table-cell hidden">
        {loan.duration} months
      </Table.Td>
      <Table.Td className="md:table-cell hidden">{loan.rate}%</Table.Td>
      <Table.Td className="sm:table-cell hidden">
        <FormatedNumber value={loan.installment} /> {" / mo"}
      </Table.Td>
      <Table.Td className="flex justify-center">
        <RepayButton isDisabled={isRowSelected} />
      </Table.Td>
    </Table.Tr>
  );
};

type TableHeaderProps = {
  allRowsChecked: boolean;
  handleSelectAll: (rowsSelected: boolean) => void;
};

const TableHeader = ({ allRowsChecked, handleSelectAll }: TableHeaderProps) => {
  return (
    <Table.Tr>
      <Table.Th>
        <Checkbox
          checked={allRowsChecked}
          variant="outline"
          aria-label="Select all rows"
          onChange={(event) => handleSelectAll(event.currentTarget.checked)}
        />
      </Table.Th>
      <Table.Th className="md:table-cell hidden">SL No</Table.Th>
      <Table.Th>Loan Money</Table.Th>
      <Table.Th>Left to repay</Table.Th>
      <Table.Th className="md:table-cell hidden">Duration</Table.Th>
      <Table.Th className="md:table-cell hidden">Intrest rate</Table.Th>
      <Table.Th className="sm:table-cell hidden">Installment</Table.Th>
      <Table.Th>Repay</Table.Th>
    </Table.Tr>
  );
};

type TableFooterProps = {
  heading: string;
  money: number;
  moneyLeft: number;
  installment: number;
  selectedRows?: LoanTableElementType[];
};

const TableFooter = ({
  heading,
  installment,
  money,
  moneyLeft,
  selectedRows = [],
}: TableFooterProps) => {
  return (
    <>
      <Table.Tr>
        <Table.Td colSpan={8}>
          <Text className="font-medium text-red-600">{heading}</Text>
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Th></Table.Th>
        <Table.Th className="max-md:hidden"></Table.Th>
        <Table.Th>
          <FormatedNumber value={money.toFixed(2)} />
        </Table.Th>
        <Table.Th>
          <FormatedNumber value={moneyLeft.toFixed(2)} />
        </Table.Th>
        <Table.Th className="max-md:hidden"></Table.Th>
        <Table.Th className="max-md:hidden"></Table.Th>
        <Table.Th className="max-sm:hidden">
          <FormatedNumber value={installment.toFixed(2)} /> {" / mo"}
        </Table.Th>
        <Table.Th className="flex justify-center">
          {selectedRows.length > 0 && (
            <RepayButton rightSection={selectedRows.length.toString()} />
          )}
        </Table.Th>
      </Table.Tr>
    </>
  );
};

type RepayButtonProps = {
  isDisabled?: boolean;
  rightSection?: string;
};

const RepayButton = ({
  isDisabled = false,
  rightSection,
}: RepayButtonProps) => {
  return (
    <>
      <Button
        disabled={isDisabled}
        variant="outline"
        className="hidden md:inline-block rounded-full"
        aria-label="Repay loan"
      >
        Repay {rightSection}
      </Button>

      <Button
        disabled={isDisabled}
        variant="outline"
        className="md:hidden rounded-full p-1 w-full"
        aria-label="Repay loan"
      >
        <RotateCcw />
        {rightSection && <span className="px-2">{rightSection}</span>}
      </Button>
    </>
  );
};

const FormatedNumber = ({ value }: { value: number | string }) => {
  return (
    <NumberFormatter
      thousandSeparator
      prefix="$"
      value={Number(value).toFixed(2)}
    />
  );
};

const reduceNumber = (
  arrayOfElements: LoanTableElementType[],
  key: keyof LoanTableElementType
): number => {
  return arrayOfElements.reduce(
    (accumulator, loan) => accumulator + Number(loan[key]),
    0
  );
};

const objSort = (objArray: LoanTableElementType[]) => {
  return [...objArray].sort((a, b) => a.SLNo - b.SLNo);
};

export default LoanTable;
