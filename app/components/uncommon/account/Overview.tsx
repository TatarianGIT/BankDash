import { BarChart } from "@mantine/charts";

const Overview = () => {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      withLegend
      series={[
        { name: "Debit", color: "violet.6" },
        { name: "Credit", color: "blue.6" },
      ]}
      tickLine="y"
      withXAxis={false}
      withYAxis={false}
      barProps={{ radius: 10 }}
      className="p-2"
    />
  );
};

export default Overview;

export const data = [
  { day: "Mon", Debit: 500, Credit: 1200 },
  { day: "Tue", Debit: 420, Credit: 750 },
  { day: "Wed", Debit: 390, Credit: 710 },
  { day: "Thu", Debit: 1400, Credit: 650 },
  { day: "Fri", Debit: 990, Credit: 1220 },
  { day: "Sat", Debit: 1150, Credit: 560 },
  { day: "Sun", Debit: 1280, Credit: 1650 },
];
