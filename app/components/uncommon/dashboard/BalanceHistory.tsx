import { AreaChart } from "@mantine/charts";

type BalanceHistoryProps = {
  data: {
    date: string;
    Balance: number;
  }[];
};

const BalanceHistory = ({ data }: BalanceHistoryProps) => {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      withGradient
      series={[{ name: "Balance", color: "violet" }]}
      areaProps={{ isAnimationActive: true }}
      className="h-full"
    />
  );
};

export default BalanceHistory;
