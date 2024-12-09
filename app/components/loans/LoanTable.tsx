import { Button, Checkbox, NumberFormatter, Table, Text } from "@mantine/core";
import React, { useState } from "react";
import { LoanTableElementType } from "~/data/loan/mockedData";
import CardContainer from "../common/CardContainer";

type LoanTableProps = {
  loansData: LoanTableElementType[];
};

const LoanTable = ({ loansData }: LoanTableProps) => {
  return (
    <CardContainer>
      <DataTable loansData={loansData} />
    </CardContainer>
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
    <Table withTableBorder>
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
        <TableFooter
          heading="Selected"
          money={selectedMoneyTotal}
          moneyLeft={selectedMoneyLeftTotal}
          installment={selectedInstallmentTotal}
        />
      </Table.Tfoot>
    </Table>
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
      style={{ border: "1px solid var(--mantine-color-default-border) " }}
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
        <FormatedNumber value={loan.installment} /> {" / month"}
      </Table.Td>

      <Table.Td>
        <RepayButton />
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
          aria-label="Select row"
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
};

const TableFooter = ({
  heading,
  installment,
  money,
  moneyLeft,
}: TableFooterProps) => {
  return (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>{heading}</Table.Th>
      <Table.Th>
        <FormatedNumber value={money.toFixed(2)} />
      </Table.Th>
      <Table.Th>
        <FormatedNumber value={moneyLeft.toFixed(2)} />
      </Table.Th>
      <Table.Th></Table.Th>
      <Table.Th></Table.Th>
      <Table.Th>
        <FormatedNumber value={installment.toFixed(2)} /> {" / month"}
      </Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );
};

const RepayButton = () => {
  return (
    <Button variant="outline" className="rounded-full">
      Repay
    </Button>
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
