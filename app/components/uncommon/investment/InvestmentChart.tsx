import { LineChart } from "@mantine/charts";
import { Card } from "@mantine/core";
import { InvestmentDataType } from "~/data/investment/mockedData";

type InvestmentChartProps = {
  data: InvestmentDataType[];
  type: "investment" | "revenue";
};

const InvestmentChart = ({ type, data }: InvestmentChartProps) => {
  const color =
    type === "investment" ? "orange" : type === "revenue" ? "cyan" : undefined;
  const curveType =
    type === "investment" ? "linear" : type === "revenue" ? "bump" : undefined;

  return (
    <Card withBorder shadow="sm" radius={"lg"} className="w-full">
      <LineChart
        className="pt-3 pr-2"
        h={300}
        data={data}
        dataKey="year"
        series={[{ name: type, color: color }]}
        curveType={curveType}
        connectNulls
        valueFormatter={(value) =>
          "$" + new Intl.NumberFormat("en-US").format(value)
        }
        lineProps={{ isAnimationActive: true }}
      />
    </Card>
  );
};

export default InvestmentChart;
