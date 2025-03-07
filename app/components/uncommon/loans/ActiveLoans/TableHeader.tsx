import { Checkbox, Table } from "@mantine/core";
import { WithLoading } from "~/types";

type TableHeaderProps = WithLoading<{
  allRowsChecked: boolean;
  handleSelectAll: (rowsSelected: boolean) => void;
}>;

const TableHeader = ({ ...props }: TableHeaderProps) => {
  return (
    <Table.Tr>
      <Table.Th>
        <Checkbox
          className="flex justify-center"
          checked={props.allRowsChecked}
          onChange={(event) =>
            props.handleSelectAll &&
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

export default TableHeader;
