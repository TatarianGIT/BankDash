import { Grid, NumberFormatter, Text } from "@mantine/core";
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
    <CardContainer className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-4 w-full">
      <div className="flex gap-2 justify-center sm:justify-start">
        <div
          className={cn(
            "w-11 h-11 rounded-2xl flex justify-center items-center",
            data.backgroundColor
          )}
        >
          {data.icon}
        </div>
        <div className="flex flex-col gap-2">
          <Text className="text-sm font-semibold tracking-wider">
            {data.companyName}
          </Text>
          <Text className="text-xs">{data.companyDesc}</Text>
        </div>
      </div>

      <div className="flex flex-row sm:justify-between justify-evenly">
        <div className="flex flex-col gap-2">
          <Text className="font-semibold">
            <NumberFormatter
              className="text-sm"
              value={data.value}
              thousandSeparator
              prefix="$"
            />
          </Text>
          <Text className={"text-xs"}>Envestment Value</Text>
        </div>
        <div className="flex flex-col gap-2">
          <Text className="font-semibold">
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
        </div>
      </div>
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
