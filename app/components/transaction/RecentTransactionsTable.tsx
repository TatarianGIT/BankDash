import {
  Button,
  Card,
  NativeSelect,
  Pagination as PaginationMantine,
  Table,
  Tabs,
  useMatches,
} from "@mantine/core";
import { useSearchParams } from "@remix-run/react";
import { CircleArrowDown, CircleArrowUp, Download } from "lucide-react";
import { useState } from "react";
import {
  AllowedOperations,
  RecentTransactionsType,
} from "~/data/transaction/recentTransations.js";
import { cn } from "~/utils/cn.js";

type RecentTransactionsTableProps = {
  data: RecentTransactionsType[];
  dataLength: number;
  totalPages: number;
};

const RecentTransactionsTable = ({
  data,
  totalPages,
}: RecentTransactionsTableProps) => {
  return (
    <>
      <LimitSelect />
      <DesktopView data={data} className="hidden lg:block" />
      <TabletView data={data} className="hidden xs:block lg:hidden" />
      <MobileView data={data} className="block xs:hidden" />
      <Pagination totalPages={totalPages} />
    </>
  );
};

type DeviceViewProps = {
  data: RecentTransactionsType[];
  className: string;
};

const DesktopView = ({ data, className }: DeviceViewProps) => {
  const rows = data.map((element) => (
    <Table.Tr key={element.transactionId}>
      <Table.Td className="flex gap-1 items-center">
        {element.operation === "expense" ? (
          <CircleArrowUp />
        ) : (
          <CircleArrowDown />
        )}
        {element.description}
      </Table.Td>
      <Table.Td>{element.transactionId}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{["****", element.last4Digits].join(" ")}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>
        <AmountText amount={element.amount} operation={element.operation} />
      </Table.Td>
      <Table.Td>
        <DownloadButton />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={className}>
      <TransactionTabs />
      <Card withBorder shadow="md" radius={"lg"}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Th>Transaction ID</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Card</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Receipt</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </div>
  );
};

const TabletView = ({ data, className }: DeviceViewProps) => {
  const rows = data.map((element) => (
    <Table.Tr key={element.transactionId}>
      <Table.Td className="flex gap-1 items-center">
        {element.operation === "expense" ? (
          <CircleArrowUp />
        ) : (
          <CircleArrowDown />
        )}
        {element.description}
      </Table.Td>
      <Table.Td>{element.transactionId}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>
        <AmountText amount={element.amount} operation={element.operation} />
      </Table.Td>
      <Table.Td>
        <DownloadButton />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={className}>
      <TransactionTabs />
      <Card withBorder shadow="md" radius={"lg"}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Th>Transaction ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Receipt</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </div>
  );
};

const MobileView = ({ data, className }: DeviceViewProps) => {
  const rows = data.map((element) => (
    <Table.Tr key={element.transactionId}>
      <Table.Td className="flex gap-3">
        <div>
          {element.operation === "expense" ? (
            <CircleArrowUp className="h-full" />
          ) : (
            <CircleArrowDown className="h-full" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          {element.description}
          <br />
          {element.date}
        </div>
      </Table.Td>
      <Table.Td>
        <AmountText amount={element.amount} operation={element.operation} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={className}>
      <TransactionTabs />
      <Card withBorder shadow="md" radius={"lg"}>
        <Table>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </div>
  );
};

const TransactionTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const operation = searchParams.get("operation") || "all";

  const onOperationChange = (newOperation: string) => {
    setSearchParams((prev) => {
      prev.set("operation", newOperation);
      return prev;
    });
  };

  return (
    <Tabs
      onChange={(value) => {
        if (value) {
          onOperationChange(value);
        }
      }}
      value={operation}
      defaultValue="all"
      className="sm:px-4 my-4 w-full"
      radius={"md"}
    >
      <Tabs.List className="flex justify-between md:justify-start">
        <Tabs.Tab value="all">All transactions</Tabs.Tab>
        <Tabs.Tab value="income">Income</Tabs.Tab>
        <Tabs.Tab value="expense">Expense</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

const DownloadButton = () => {
  return (
    <>
      <Button variant="outline" className="inline-block md:hidden rounded-full">
        <Download />
      </Button>
      <Button variant="outline" className="md:inline-block hidden rounded-full">
        Download
      </Button>
    </>
  );
};

const AmountText = ({
  operation,
  amount,
}: {
  operation: AllowedOperations;
  amount: number;
}) => {
  return (
    <div
      className={cn(
        operation === "expense"
          ? "text-red-500"
          : operation === "income"
          ? "text-green-500"
          : "",
        "flex gap-1"
      )}
    >
      <div>
        {operation === "expense" ? (
          <>-</>
        ) : operation === "income" ? (
          <>+</>
        ) : null}
      </div>
      ${amount}
    </div>
  );
};

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const size = useMatches({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const offsetString = searchParams.get("offset");
  const offset = offsetString ? parseInt(offsetString) : 1;

  const [page, setPage] = useState<number>(offset);

  const onPageChage = (newPage: number) => {
    setPage(newPage);
    setSearchParams((prev) => {
      prev.set("offset", newPage.toString());
      return prev;
    });
  };

  return (
    <PaginationMantine
      value={page}
      total={totalPages}
      className="py-4 flex justify-end"
      size={size}
      onChange={onPageChage}
      withControls={true}
    />
  );
};

const LimitSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || "5";

  const onLimitChange = (newLimit: string) => {
    setSearchParams((prev) => {
      prev.set("limit", newLimit);
      return prev;
    });
  };

  return (
    <NativeSelect
      value={limit}
      radius="lg"
      label="Results"
      data={["5", "10"]}
      className="flex gap-2 justify-end items-center"
      onChange={(event) => onLimitChange(event.currentTarget.value)}
    />
  );
};

export default RecentTransactionsTable;
