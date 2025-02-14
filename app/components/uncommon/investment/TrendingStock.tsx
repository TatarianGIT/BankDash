import { NumberFormatter, Table, Text } from "@mantine/core";
import { cn } from "~/utils/cn";

const TrendingStock = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
        <Text className="text-sm">{element.position}</Text>
      </Table.Td>
      <Table.Td>
        <Text className="text-sm">{element.name}</Text>
      </Table.Td>

      <Table.Td>
        <Text className="text-sm">
          <NumberFormatter value={element.price} prefix="$" thousandSeparator />
        </Text>
      </Table.Td>

      <Table.Td>
        <Text className="text-sm">
          <NumberFormatter
            className={cn(
              "",
              element.type === "income"
                ? "text-green-400"
                : element.type === "expense"
                ? "text-red-400"
                : ""
            )}
            allowNegative={false}
            value={element.return}
            prefix={
              (element.type === "income"
                ? "+"
                : element.type === "expense"
                ? "-"
                : undefined) + "$"
            }
          />
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table className="w-full">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>SL No.</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Return</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TrendingStock;

const elements = [
  { position: 1, name: "Trivago", price: 520, return: 5, type: "income" },
  { position: 2, name: "Canon", price: 470, return: 10, type: "income" },
  { position: 3, name: "Uber Food", price: 305, return: 3, type: "expense" },
  { position: 4, name: "Nokia", price: 940, return: 2, type: "income" },
  { position: 5, name: "Tiktok", price: 675, return: 12, type: "expense" },
];
