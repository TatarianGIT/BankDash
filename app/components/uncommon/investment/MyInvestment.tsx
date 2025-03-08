import { Grid, NumberFormatter, Text, useMatches } from "@mantine/core";
import { ReactNode } from "react";
import { SiApple, SiSamsung, SiTesla } from "react-icons/si";
import CardContainer from "~/components/common/CardContainer";
import { cn } from "~/utils/cn";

const MyInvestment = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {MyInvestmentData.length ? (
        MyInvestmentData.map((element) => (
          <MyInvestmentElement key={element.id} data={element} />
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default MyInvestment;

type MyInvestmentElementProps = {
  key: number | "string";
  data: MyInvestmentDataType;
};

const MyInvestmentElement = ({ data }: MyInvestmentElementProps) => {
  return (
    <CardContainer>
      <Grid
        align="center"
        justify="center"
        gutter={"lg"}
        className="px-2 md:px-4"
      >
        <Grid.Col
          span={"content"}
          className={cn(
            "w-11 h-11 rounded-2xl flex justify-center items-center",
            data.backgroundColor
          )}
        >
          {data.icon}
        </Grid.Col>
        <Grid.Col span={"auto"} className="flex flex-col">
          <Text className="text-sm">{data.companyName}</Text>
          <Text className={"text-xs"}>{data.companyDesc}</Text>
        </Grid.Col>
        <Grid.Col span={3} className={"flex flex-col"}>
          <Text>
            <NumberFormatter
              className="text-sm"
              value={data.value}
              thousandSeparator
              prefix="$"
            />
          </Text>
          <Text className={"text-xs"}>Envestment Value</Text>
        </Grid.Col>
        <Grid.Col span={"content"} className="flex flex-col">
          <Text>
            <NumberFormatter
              className={cn(
                data.type === "income"
                  ? "text-green-400"
                  : data.type === "expense"
                  ? "text-red-400"
                  : undefined,
                "text-sm"
              )}
              value={data.returnValue}
              allowNegative={false}
              decimalScale={2}
              decimalSeparator="."
              suffix="%"
              prefix={
                data.type === "income"
                  ? "+ "
                  : data.type === "expense"
                  ? "- "
                  : undefined
              }
            />
          </Text>
          <Text className={"text-xs"}>Return Value</Text>
        </Grid.Col>
      </Grid>
    </CardContainer>
  );
};

export type MyInvestmentDataType = {
  id: number;
  icon: ReactNode;
  backgroundColor: string;
  companyName: string;
  companyDesc: string;
  value: number;
  returnValue: number;
  type: "income" | "expense";
};

const MyInvestmentData: MyInvestmentDataType[] = [
  {
    id: 0,
    icon: <SiApple size={30} className="text-pink-500" />,
    backgroundColor: "bg-pink-500/50",
    companyName: "Apple Store",
    companyDesc: "E-commerce, Marketplace",
    value: 54000,
    returnValue: 16.7,
    type: "income",
  },
  {
    id: 1,
    icon: <SiSamsung size={30} className="text-blue-500" />,
    backgroundColor: "bg-blue-500/50",
    companyName: "Samsung Mobile",
    companyDesc: "E-commerce, Marketplace",
    value: 25300,
    returnValue: 4.1,
    type: "expense",
  },
  {
    id: 2,
    icon: <SiTesla size={30} className="text-amber-500" />,
    backgroundColor: "bg-amber-500/50",
    companyName: "Tesla Motors",
    companyDesc: "Electric Vehicles",
    value: 8200,
    returnValue: 25.5,
    type: "income",
  },
];
