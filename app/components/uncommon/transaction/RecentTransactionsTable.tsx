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
import { ReactNode } from "react";
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
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const loadingRows = Array.from({ length: limit }, (_, index) => (
    <TableRowData key={index} isLoading={true} />
  ));

  const rows = data?.map((element) => (
    <TableRowData
      key={element.transactionId}
      isLoading={false}
      data={element}
    />
  ));

  return (
    <>
      <LimitSelect />
      <TransactionTabs />
      <Card withBorder shadow="md" radius={"lg"}>
        <Table>
          <TableHeadings />
          <Table.Tbody>{isLoading ? loadingRows : rows}</Table.Tbody>
        </Table>
      </Card>
    </>
  );
};

const TableHeadings = () => {
  return (
    <Table.Thead className="max-md:hidden">
      <Table.Tr>
        <Table.Th>Description</Table.Th>
        <Table.Th>Transaction ID</Table.Th>
        <Table.Th className="max-lg:hidden">Type</Table.Th>
        <Table.Th className="max-lg:hidden">Card</Table.Th>
        <Table.Th className="max-md:hidden">Date</Table.Th>
        <Table.Th>Amount</Table.Th>
        <Table.Th>Receipt</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

type TableRowDataProps =
  | { key: string | number; isLoading: true }
  | { key: string | number; isLoading: false; data: RecentTransactionsType };

const TableRowData = ({ ...props }: TableRowDataProps) => {
  const { key, isLoading } = props;

  if (isLoading) {
    return (
      <Table.Tr key={key}>
        <DescriptionTd
          isLoading={true}
          data={{ operation: "all", description: "", date: "", amount: 0 }}
        />
        <TransactionIdTd isLoading={true} data={{ transactionId: "" }} />
        <TypeTd isLoading={true} data={{ type: "" }} />
        <CardTd isLoading={true} data={{ last4Digits: "" }} />
        <DateTd isLoading={true} data={{ date: "" }} />
        <AmountTd isLoading={true} data={{ amount: 0, operation: "all" }} />
        <ReceiptTd isLoading={true} />
      </Table.Tr>
    );
  }

  const { data } = props;

  return (
    <Table.Tr key={key}>
      <DescriptionTd isLoading={false} data={data} />
      <TransactionIdTd isLoading={false} data={data} />
      <TypeTd isLoading={false} data={data} />
      <CardTd isLoading={false} data={data} />
      <DateTd isLoading={false} data={data} />
      <AmountTd isLoading={false} data={data} />
      <ReceiptTd isLoading={false} />
    </Table.Tr>
  );
};

type TableDataContainerProps = {
  isLoading: boolean;
  className?: string;
  children: ReactNode;
};

type TableDataProps<K extends keyof RecentTransactionsType> = {
  isLoading: boolean;
  data: Pick<RecentTransactionsType, K>;
};

const TableDataContainer = ({
  isLoading = false,
  className,
  children,
}: TableDataContainerProps) => {
  if (isLoading)
    return (
      <Table.Td className={className}>
        <Skeleton className="h-9 w-full" />
      </Table.Td>
    );

  return <Table.Td className={className}>{children}</Table.Td>;
};

const DescriptionTd = ({
  isLoading,
  data,
}: TableDataProps<"operation" | "description" | "date" | "amount">) => {
  return (
    <TableDataContainer
      isLoading={isLoading}
      className="flex md:gap-1 gap-4 items-center"
    >
      {data.operation === "expense" ? (
        <CircleArrowUp className="max-md:w-8 max-md:h-8" />
      ) : (
        <CircleArrowDown className="max-md:w-8 max-md:h-8" />
      )}

      <div className="flex flex-col">
        {data.description}
        <div className="md:hidden">{data.date}</div>
      </div>

      <div className="md:hidden ml-auto">
        <AmountText amount={data.amount} operation={data.operation} />
      </div>
    </TableDataContainer>
  );
};

const TransactionIdTd = ({
  isLoading,
  data,
}: TableDataProps<"transactionId">) => {
  return (
    <TableDataContainer isLoading={isLoading} className="max-md:hidden">
      {data.transactionId}
    </TableDataContainer>
  );
};

const TypeTd = ({ isLoading, data }: TableDataProps<"type">) => {
  return (
    <TableDataContainer isLoading={isLoading} className="max-lg:hidden">
      {data.type}
    </TableDataContainer>
  );
};

const CardTd = ({ isLoading, data }: TableDataProps<"last4Digits">) => {
  return (
    <TableDataContainer isLoading={isLoading} className="max-lg:hidden">
      {data.last4Digits}
    </TableDataContainer>
  );
};

const DateTd = ({ isLoading, data }: TableDataProps<"date">) => {
  return (
    <TableDataContainer isLoading={isLoading} className="max-md:hidden">
      {data.date}
    </TableDataContainer>
  );
};

const AmountTd = ({
  isLoading,
  data,
}: TableDataProps<"amount" | "operation">) => {
  return (
    <TableDataContainer isLoading={isLoading} className="max-md:hidden">
      <AmountText amount={data.amount} operation={data.operation} />
    </TableDataContainer>
  );
};

const ReceiptTd = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <TableDataContainer isLoading={isLoading} className="max-md:hidden">
      <DownloadButton />
    </TableDataContainer>
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

export default RecentTransactionsTable;
