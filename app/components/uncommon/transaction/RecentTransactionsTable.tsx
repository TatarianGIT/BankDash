import {
  Button,
  Card,
  NativeSelect,
  Skeleton,
  Table,
  Tabs,
} from "@mantine/core";
import { useSearchParams } from "@remix-run/react";
import { CircleArrowDown, CircleArrowUp, Download } from "lucide-react";
import {
  AllowedOperations,
  RecentTransactionsType,
} from "~/data/transaction/recentTransations.js";
import { WithLoading } from "~/types";
import { cn } from "~/utils/cn.js";

type RecentTransactionsTableProps = WithLoading<{
  data: RecentTransactionsType[];
}>;

const RecentTransactionsTable = ({
  data,
  isLoading = false,
}: RecentTransactionsTableProps) => {
  return (
    <>
      <LimitSelect />
      <DesktopView
        isLoading={isLoading}
        data={data}
        className="hidden lg:block"
      />
      <TabletView
        isLoading={isLoading}
        data={data}
        className="hidden xs:block lg:hidden"
      />
      <MobileView
        isLoading={isLoading}
        data={data}
        className="block xs:hidden"
      />
    </>
  );
};

const TransactionTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const operation = (searchParams.get("operation") ||
    "all") as AllowedOperations;

  const onOperationChange = (newOperation: AllowedOperations) => {
    setSearchParams(
      (prev) => {
        prev.set("operation", newOperation);
        return prev;
      },
      { preventScrollReset: true }
    );
  };

  return (
    <>
      <Tabs
        onChange={(value) => {
          onOperationChange(value as AllowedOperations);
        }}
        value={operation}
        defaultValue="all"
        className="sm:px-4 my-4 w-full"
        radius={"md"}
      >
        <Tabs.List className="flex justify-between md:justify-start">
          <Tabs.Tab className="text-xs md:text-base" value="all">
            All transactions
          </Tabs.Tab>
          <Tabs.Tab className="text-xs md:text-base" value="income">
            Income
          </Tabs.Tab>
          <Tabs.Tab className="text-xs md:text-base" value="expense">
            Expense
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
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

const LimitSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const onLimitChange = (newLimit: string) => {
    setSearchParams(
      (prev) => {
        prev.set("limit", newLimit);
        return prev;
      },
      { preventScrollReset: true }
    );
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

type DeviceViewProps = {
  data: RecentTransactionsType[];
  className: string;
  isLoading: boolean;
};

const DesktopView = ({ data, className, isLoading }: DeviceViewProps) => {
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const loadingRows = Array.from({ length: limit }, (_, index) => (
    <Table.Tr key={index}>
      <Table.Td className="flex gap-1 items-center">
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
    </Table.Tr>
  ));

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

  if (isLoading)
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
            <Table.Tbody>{loadingRows}</Table.Tbody>
          </Table>
        </Card>
      </div>
    );

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

const TabletView = ({ data, className, isLoading }: DeviceViewProps) => {
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const loadingRows = Array.from({ length: limit }, (_, index) => (
    <Table.Tr key={index}>
      <Table.Td className="flex gap-1 items-center">
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
    </Table.Tr>
  ));

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

  if (isLoading)
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
            <Table.Tbody>{loadingRows}</Table.Tbody>
          </Table>
        </Card>
      </div>
    );

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

const MobileView = ({ data, className, isLoading }: DeviceViewProps) => {
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const loadingRows = Array.from({ length: limit }, (_, index) => (
    <Table.Tr key={index}>
      <Table.Td className="flex gap-3">
        <div className="w-auto h-full">
          <Skeleton className="h-7 w-7 rounded-full mt-auto flex justify-center items-center" />
        </div>
        <div className="flex flex-col gap-1 w-full h-full">
          <Skeleton className="h-5 w-3/4" />
          <br />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-5 w-full" />
      </Table.Td>
    </Table.Tr>
  ));

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

  if (isLoading)
    return (
      <div className={className}>
        <TransactionTabs />
        <Card withBorder shadow="md" radius={"lg"}>
          <Table>
            <Table.Tbody>{loadingRows}</Table.Tbody>
          </Table>
        </Card>
      </div>
    );

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

export default RecentTransactionsTable;

