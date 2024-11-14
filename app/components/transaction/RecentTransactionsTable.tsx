import { Button, Card, Pagination, Table, Tabs } from "@mantine/core";
import { RecentTransactionsType } from "~/data/transaction/recentTransations.js";

type RecentTransactionsTableProps = { data: RecentTransactionsType[] };

const RecentTransactionsTable = ({ data }: RecentTransactionsTableProps) => {
  const rows = data.map((element) => (
    <Table.Tr key={element.transactionId}>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>{element.transactionId}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{["****", element.last4Digits].join(" ")}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>
        <Button variant="outline" className="rounded-full">
          Download
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
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

      <Pagination total={10} className="py-4 flex justify-end" size={"lg"} />
    </>
  );
};

const TransactionTabs = () => {
  return (
    <Tabs defaultValue="all" className="my-4">
      <Tabs.List>
        <Tabs.Tab value="all" leftSection={<></>}>
          All transactions
        </Tabs.Tab>
        <Tabs.Tab value="received" leftSection={<></>}>
          Income
        </Tabs.Tab>
        <Tabs.Tab value="sent" leftSection={<></>}>
          Expense
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default RecentTransactionsTable;
