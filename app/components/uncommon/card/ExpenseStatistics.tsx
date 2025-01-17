import { DonutChart } from "@mantine/charts";
import CardContainer from "../../common/CardContainer";
import { SimpleGrid } from "@mantine/core";
import { cn } from "~/utils/cn";

const ExpenseStatistics = () => {
  return (
    <CardContainer className="flex justify-center items-center py-8">
      <DonutChart
        data={data}
        thickness={35}
        tooltipDataSource="segment"
        strokeWidth={4}
      />

      {data.length ? (
        <ul>
          <SimpleGrid cols={2} verticalSpacing="sm" className="pt-8">
            {data.map((item) => (
              <li key={item.name} className="flex gap-2 items-center w-full">
                <div className={cn("w-4 h-4 rounded-full", item.dotColor)} />
                {item.name}
              </li>
            ))}
          </SimpleGrid>
        </ul>
      ) : (
        <p>No data found</p>
      )}
    </CardContainer>
  );
};

export default ExpenseStatistics;

export const data = [
  {
    name: "DBL Bank",
    value: 250,
    color: "indigo.6",
    dotColor: "bg-indigo-600",
  },
  {
    name: "BRC Bank",
    value: 250,
    color: "yellow.6",
    dotColor: "bg-yellow-600",
  },
  { name: "ABM Bank", value: 250, color: "teal.6", dotColor: "bg-teal-600" },
  { name: "MCP Bank", value: 250, color: "gray.6", dotColor: "bg-gray-600" },
];
