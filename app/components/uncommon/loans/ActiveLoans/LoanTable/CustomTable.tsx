import { Table } from "@mantine/core";
import { ReactNode } from "react";

export const CustomTableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Table
      highlightOnHover
      withColumnBorders
      withTableBorder
      className="p-0 w-full text-xs md:text-sm lg:text-base max-w-[1000px] mx-auto"
    >
      {children}
    </Table>
  );
};

export const CustomTableHeader = ({ children }: { children: ReactNode }) => {
  return <Table.Thead>{children}</Table.Thead>;
};

export const CustomTableBody = ({ children }: { children: ReactNode }) => {
  return <Table.Tbody>{children}</Table.Tbody>;
};

export const CustomTableTotalFooter = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Table.Tfoot>
      <Table.Tr>
        <Table.Td colSpan={3}>Total</Table.Td>
      </Table.Tr>
      {children}
    </Table.Tfoot>
  );
};

export const CustomTableSelectedFooter = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Table.Tfoot>
      <Table.Tr>
        <Table.Td colSpan={3}>Selected</Table.Td>
      </Table.Tr>
      {children}
    </Table.Tfoot>
  );
};
