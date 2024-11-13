import { AreaChart } from "@mantine/charts";
import { Card } from "@mantine/core";

type BalanceHistoryProps = {
  data: {
    date: string;
    Balance: number;
  }[];
};

const BalanceHistory = ({ data }: BalanceHistoryProps) => {
  return (
    <Card shadow="md" withBorder radius={"lg"}>
      <AreaChart
        h={300}
        data={data}
        dataKey="date"
        withGradient
        series={[{ name: "Balance", color: "violet" }]}
        areaProps={{ isAnimationActive: true }}
        className="h-full"
      />
    </Card>
  );
};

export default BalanceHistory;
