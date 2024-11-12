import { PieChart } from "@mantine/charts";
import { Card } from "@mantine/core";

type ExpenseRoundChartProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

const ExpenseRoundChart = ({ data }: ExpenseRoundChartProps) => {
  return (
    <Card
      shadow="md"
      withBorder
      radius={"lg"}
      className="m-0 w-full h-full p-4"
    >
      <PieChart
        withLabelsLine
        labelsPosition="inside"
        labelsType="percent"
        withLabels
        data={data}
        size={250}
        strokeWidth={10}
        withTooltip
        tooltipDataSource="segment"
        pieProps={{ isAnimationActive: true }}
      />
    </Card>
  );
};

export default ExpenseRoundChart;
