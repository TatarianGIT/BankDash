import { PieChart } from "@mantine/charts";

type ExpenseRoundChartProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

const ExpenseRoundChart = ({ data }: ExpenseRoundChartProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <PieChart
        withLabelsLine
        labelsPosition="inside"
        labelsType="percent"
        withLabels
        data={data}
        size={280}
        strokeWidth={7}
        withTooltip
        tooltipDataSource="segment"
        pieProps={{ isAnimationActive: true }}
      />
    </div>
  );
};

export default ExpenseRoundChart;
