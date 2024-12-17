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
      className="p-4 flex justify-center items-center w-full"
    >
      <PieChart
        withLabelsLine
        labelsPosition="inside"
        labelsType="percent"
        withLabels
        data={data}
        size={250}
        strokeWidth={7}
        withTooltip
        tooltipDataSource="segment"
        pieProps={{ isAnimationActive: true }}
      />
    </Card>
  );
};

export default ExpenseRoundChart;
