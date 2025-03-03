import { Button, Checkbox, NumberFormatter, Table, Text } from "@mantine/core";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { LoanTableElementType } from "~/data/loan/mockedData";

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

type DataTableProps = {
  loansData: LoanTableElementType[];
};

const DataTable = ({ loansData }: DataTableProps) => {
  const [data, setData] = useState<LoanTableElementType[]>(loansData);
  const [selectedRows, setSelectedRows] = useState<LoanTableElementType[]>([]);

  const allRowsChecked =
    JSON.stringify(objSort(selectedRows)) == JSON.stringify(objSort(data));

  const selectedMoney = reduceNumber(selectedRows, "money");
  const selectedMoneyLeft = reduceNumber(selectedRows, "moneyLeft");
  const selectedInstallment = reduceNumber(selectedRows, "installment");

  const totalMoney = reduceNumber(data, "money");
  const totalMoneyLeft = reduceNumber(data, "moneyLeft");
  const totalInstallment = reduceNumber(data, "installment");

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
                  installment: selectedInstallment.toString(),
                  money: selectedMoney,
                  moneyLeft: selectedMoneyLeft,
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
                installment: totalInstallment.toString(),
                money: totalMoney,
                moneyLeft: totalMoneyLeft,
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

type TableHeaderProps = {
  allRowsChecked: boolean;
  handleSelectAll: (rowsSelected: boolean) => void;
};

const TableHeader = ({ ...props }: TableHeaderProps) => {
  return (
    <Table.Tr>
      <Table.Th>
        <Checkbox
          className="flex justify-center"
          checked={props.allRowsChecked}
          onChange={(event) =>
            props.handleSelectAll(event.currentTarget.checked)
          }
        />
      </Table.Th>
      <Table.Th className="max-sm:hidden">SL No</Table.Th>
      <Table.Th>Loan Money</Table.Th>
      <Table.Th>Left to repay</Table.Th>
      <Table.Th className="max-md:hidden">Duration</Table.Th>
      <Table.Th className="max-md:hidden">Intrest rate</Table.Th>
      <Table.Th className="max-sm:hidden">Installment</Table.Th>
      <Table.Th>Repay</Table.Th>
    </Table.Tr>
  );
};

type FooterData = Pick<
  LoanTableElementType,
  "money" | "installment" | "moneyLeft"
>;

type TableRowProps = {
  key: string | number;
  className?: string;
} & (
  | {
      isSelectionFooter?: false;
      isTotalFooter?: false;
      loan: LoanTableElementType;
      footerData?: undefined;
      isRowSelected: boolean;
      handleRowSelect: (checked: boolean, loan: LoanTableElementType) => void;
      handleRepay: () => void;
      buttonRightSection?: undefined;
    }
  | {
      isSelectionFooter: true;
      isTotalFooter?: false;
      handleRepay: () => void;
      footerData: FooterData;
      loan?: undefined;
      handleRowSelect?: undefined;
      isRowSelected?: undefined;
      buttonRightSection: string;
    }
  | {
      isTotalFooter: true;
      isSelectionFooter?: false;
      footerData: FooterData;
      loan?: undefined;
      handleRepay?: undefined;
      handleRowSelect?: undefined;
      isRowSelected?: undefined;
      buttonRightSection?: undefined;
    }
);

const TableRow = ({
  isSelectionFooter = false,
  isTotalFooter = false,
  ...props
}: TableRowProps) => {
  return (
    <Table.Tr
      key={props.key}
      bg={props.isRowSelected ? "var(--mantine-color-blue-light)" : undefined}
      style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}
      className={props.className}
    >
      <Table.Td>
        {!isSelectionFooter && !isTotalFooter && (
          <Checkbox
            className="flex justify-center"
            checked={props.isRowSelected}
            onChange={(event) =>
              props.handleRowSelect &&
              props.handleRowSelect(event.currentTarget.checked, props.loan)
            }
          />
        )}
      </Table.Td>
      <Table.Td className="max-sm:hidden">
        {props.loan?.SLNo ? "#" + props.loan?.SLNo : ""}
      </Table.Td>
      <Table.Td>
        <FormatedNumber
          value={(props.loan?.money || props.footerData?.money)!}
        />
      </Table.Td>
      <Table.Td>
        <FormatedNumber
          value={(props.loan?.moneyLeft || props.footerData?.moneyLeft)!}
        />
      </Table.Td>
      <Table.Td className="max-md:hidden">
        {props.loan?.duration ? props.loan?.duration + " months" : ""}
      </Table.Td>
      <Table.Td className="max-md:hidden">
        {props.loan?.rate && (
          <>
            <FormatedNumber value={props.loan?.rate || ""} /> {"/mo"}
          </>
        )}
      </Table.Td>
      <Table.Td className="max-sm:hidden">
        <FormatedNumber
          value={(props.loan?.installment || props.footerData?.installment)!}
        />
        /mo
      </Table.Td>
      <Table.Td className="flex justify-center">
        {!isTotalFooter && props.handleRepay && (
          <RepayButton
            rightSection={props.buttonRightSection}
            handleClick={props.handleRepay}
            isDisabled={props.isRowSelected}
          />
        )}
      </Table.Td>
    </Table.Tr>
  );
};

type RepayButtonProps = {
  isDisabled?: boolean;
  rightSection?: string;
  handleClick: () => void;
};

const RepayButton = ({
  isDisabled = false,
  rightSection,
  handleClick,
}: RepayButtonProps) => {
  return (
    <>
      <Button
        disabled={isDisabled}
        variant="outline"
        className="hidden md:inline-block rounded-full md:w-28"
        aria-label="Repay loan"
        onClick={handleClick}
      >
        Repay {rightSection}
      </Button>

      <Button
        disabled={isDisabled}
        variant="outline"
        className="md:hidden rounded-full md:w-28 relative"
        aria-label="Repay loan"
        onClick={handleClick}
      >
        {rightSection ? (
          <>
            <span className="px-2 text-xs">{rightSection}</span>
            <div className="absolute inset-0">
              <RotateCcw size={32} strokeWidth={1} className="m-auto h-full" />
            </div>
          </>
        ) : (
          <RotateCcw />
        )}
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

export default ActiveLoans;
