import { Checkbox, Table } from "@mantine/core";
import { LoanTableElementType } from "~/data/loan/mockedData";
import FormatedNumber from "./FormatedNumber";
import RepayButton from "./RepayButton";

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

export default TableRow;
