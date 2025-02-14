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
    <div className="p-4 flex justify-center items-center w-full">
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
    </div>
  );
};

export default ExpenseRoundChart;
