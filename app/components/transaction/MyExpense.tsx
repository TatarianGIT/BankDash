import { BarChart } from "@mantine/charts";
import { Card } from "@mantine/core";
import { MyExpenseDataType } from "~/data/transaction/myExpense.js";

type MyExpenseProps = { data: MyExpenseDataType[] };

const MyExpense = ({ data }: MyExpenseProps) => {
  return (
    <Card withBorder shadow="md" radius={"lg"}>
      <BarChart
        h={300}
        data={data}
        dataKey="month"
        series={[{ name: "expense", color: "violet.6" }]}
        tickLine="y"
        withYAxis={false}
        withBarValueLabel={true}
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        barProps={{ radius: 20 }}
      />
    </Card>
  );
};

export default MyExpense;
