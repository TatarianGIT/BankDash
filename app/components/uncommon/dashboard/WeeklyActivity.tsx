import { BarChart } from "@mantine/charts";
import { Card } from "@mantine/core";

type WeeklyActivityProps = {
  data: {
    day: string;
    Deposit: number;
    Withdraw: number;
  }[];
};

const WeeklyActivity = ({ data }: WeeklyActivityProps) => {
  return (
    <Card shadow="md" radius={"lg"} withBorder className="p-6 w-full">
      <BarChart
        h={300}
        data={data}
        dataKey="day"
        barProps={{ isAnimationActive: true, radius: 100, maxBarSize: 15 }}
        series={[
          { name: "Deposit", color: "violet.6" },
          { name: "Withdraw", color: "blue.6" },
        ]}
        tickLine="y"
        withLegend
      />
    </Card>
  );
};

export default WeeklyActivity;
