import { BarChart } from "@mantine/charts";
import { MyExpenseDataType } from "~/data/transaction/myExpense.js";

type MyExpenseProps = { data: MyExpenseDataType[] };

const MyExpense = ({ data }: MyExpenseProps) => {
  return (
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
      maxBarWidth={30}
      className="mx-auto max-w-[600px]"
    />
  );
};

export default MyExpense;
