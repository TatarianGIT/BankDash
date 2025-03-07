import { Checkbox, Skeleton, Table, TableTdProps } from "@mantine/core";
import { LoanTableElementType } from "~/data/loan/mockedData";
import FormatedNumber from "./FormatedNumber";
import RepayButton from "./RepayButton";
import { ReactNode } from "react";
import { WithLoading } from "~/types";

type FooterData = Pick<
  LoanTableElementType,
  "money" | "installment" | "moneyLeft"
>;

type TableRowProps = WithLoading<
  {
    key: string | number;
    className?: string;
    isLoading: boolean;
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
  )
>;

const TableRow = ({
  isLoading = false,
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
            disabled={isLoading}
            onChange={(event) =>
              props.handleRowSelect &&
              props.loan &&
              props.handleRowSelect(event.currentTarget.checked, props.loan)
            }
          />
        )}
      </Table.Td>
      <LoadingTableData isLoading={isLoading} className="max-sm:hidden">
        {props.loan?.SLNo ? "#" + props.loan?.SLNo : ""}
      </LoadingTableData>
      <LoadingTableData isLoading={isLoading}>
        <FormatedNumber
          value={(props.loan?.money || props.footerData?.money)!}
        />
      </LoadingTableData>
      <LoadingTableData isLoading={isLoading}>
        <FormatedNumber
          value={(props.loan?.moneyLeft || props.footerData?.moneyLeft)!}
        />
      </LoadingTableData>
      <LoadingTableData isLoading={isLoading} className="max-md:hidden">
        {props.loan?.duration ? props.loan?.duration + " months" : ""}
      </LoadingTableData>
      <LoadingTableData isLoading={isLoading} className="max-md:hidden">
        {props.loan?.rate && (
          <>
            <FormatedNumber value={props.loan?.rate || ""} /> {"/mo"}
          </>
        )}
      </LoadingTableData>
      <LoadingTableData isLoading={isLoading} className="max-sm:hidden">
        <FormatedNumber
          value={(props.loan?.installment || props.footerData?.installment)!}
        />
        /mo
      </LoadingTableData>
      <Table.Td className="flex justify-center">
        {!isTotalFooter && (
          <RepayButton
            disabled={isLoading || props.isRowSelected}
            rightSection={props.buttonRightSection}
            handleClick={props.handleRepay as () => void}
            isDisabled={props.isRowSelected}
          />
        )}
      </Table.Td>
    </Table.Tr>
  );
};

type LoadingTableDataProps = {
  isLoading: boolean;
  children: ReactNode;
} & TableTdProps;

const LoadingTableData = ({
  children,
  isLoading,
  ...props
}: LoadingTableDataProps) => {
  if (isLoading)
    return (
      <Table.Td {...props}>
        <Skeleton className="w-full h-6" />
      </Table.Td>
    );

  return <Table.Td {...props}>{children}</Table.Td>;
};

export default TableRow;
