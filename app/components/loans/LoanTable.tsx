import { Button, Checkbox, NumberFormatter, Table, Text } from "@mantine/core";
import { useState } from "react";
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

  const selectedMoneyTotal = reduceNumber(selectedRows, "money");
  const selectedMoneyLeftTotal = reduceNumber(selectedRows, "moneyLeft");
  const selectedInstallmentTotal = reduceNumber(selectedRows, "installment");

  const totalMoney = reduceNumber(loansData, "money");
  const totalMoneyLeft = reduceNumber(loansData, "moneyLeft");
  const totalInstallment = reduceNumber(loansData, "installment");

  const header = (
    <Table.Tr>
      <Table.Th>
        <Checkbox
          checked={
            JSON.stringify(objSort(selectedRows)) ==
            JSON.stringify(objSort(loansData))
          }
          variant="outline"
          aria-label="Select row"
          onChange={(event) =>
            setSelectedRows(event.currentTarget.checked ? [...loansData] : [])
          }
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

  const footer = (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>Total</Table.Th>
      <Table.Th>
        <FormatedNumber value={totalMoney} />
      </Table.Th>
      <Table.Th>
        <FormatedNumber value={totalMoneyLeft} />
      </Table.Th>
      <Table.Th className="md:table-cell hidden"></Table.Th>
      <Table.Th className="md:table-cell hidden"></Table.Th>
      <Table.Th className="sm:table-cell hidden">
        <FormatedNumber value={totalInstallment} /> {" / month"}
      </Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  const selectedTotal = (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>Selected</Table.Th>
      <Table.Th>
        <FormatedNumber value={selectedMoneyTotal.toFixed(2)} />
      </Table.Th>
      <Table.Th>
        <FormatedNumber value={selectedMoneyLeftTotal.toFixed(2)} />
      </Table.Th>
      <Table.Th className="md:table-cell hidden"></Table.Th>
      <Table.Th className="md:table-cell hidden"></Table.Th>
      <Table.Th className="sm:table-cell hidden">
        <FormatedNumber value={selectedInstallmentTotal.toFixed(2)} />{" "}
        {" / month"}
      </Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  const rows = loansData.map((loan) => {
    const isSelected = selectedRows.some((item) => item.SLNo === loan.SLNo);

    return (
      <Table.Tr
        key={loan.SLNo}
        bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}
      >
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={isSelected}
            onChange={(event) =>
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, loan]
                  : selectedRows.filter((oldLoan) => oldLoan.SLNo !== loan.SLNo)
              )
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
  });

  return (
    <>
      <Table withTableBorder>
        <Table.Thead>{header}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Tfoot>
          {footer}
          {selectedTotal}
        </Table.Tfoot>
      </Table>
    </>
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

export default LoanTable;

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
