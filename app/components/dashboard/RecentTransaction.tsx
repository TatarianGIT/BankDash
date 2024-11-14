import { Card, Text } from "@mantine/core";
import React from "react";
import { BsCashCoin } from "react-icons/bs";
import { SlPaypal } from "react-icons/sl";
import { TbCreditCardPay } from "react-icons/tb";
import { cn } from "~/utils/cn.js";

const RecentTransaction = () => {
  const lastElementId =
    RecentTransactionData[RecentTransactionData.length - 1].id;

  return (
    <Card
      shadow="md"
      radius={"lg"}
      withBorder
      className="flex justify-center items-center p-1"
    >
      {RecentTransactionData?.length ? (
        RecentTransactionData.map((transaction: TransactionType) => (
          <React.Fragment key={transaction.id}>
            <Transaction
              icon={transaction.icon}
              title={transaction.title}
              date={transaction.date}
              operation={transaction.operation}
              amount={transaction.amount}
              accentColor={transaction.accentColor}
              isLast={lastElementId === transaction.id}
            />
          </React.Fragment>
        ))
      ) : (
        <Text>No recent transaction</Text>
      )}
    </Card>
  );
};

type TransactionProps = {
  icon: JSX.Element;
  title: string;
  date: string;
  operation: "add" | "remove";
  amount: number;
  accentColor: string;
  isLast: boolean;
};

const Transaction = ({ ...props }: TransactionProps) => {
  return (
    <div className="flex flex-col justify-center items-center lg:min-w-full min-w-[min(100%,400px)]">
      <div className="flex gap-4 p-2 justify-center items-center w-full">
        <div
          className={cn(
            props.accentColor,
            "min-w-14 min-h-14 p-3 rounded-full"
          )}
        >
          {props.icon}
        </div>
        <div className="flex flex-col w-full ">
          <Text className="text-base">{props.title}</Text>
          <Text className="text-sm mr-auto ml-auto text-gray-400 ">
            {props.date}
          </Text>
        </div>
        <div
          className={cn(
            props.operation === "add" ? "text-green-600" : "text-red-600",
            "flex gap-1 text-base ml-auto w-1/4 justify-center items-center "
          )}
        >
          <Text>{props.operation === "add" ? "+" : "-"}</Text>
          <Text>{"$" + props.amount}</Text>
        </div>
      </div>
      <div
        className={cn(
          props.isLast ? "hidden" : "",
          "bg-gray-200 dark:bg-gray-600 h-[1px] w-3/5"
        )}
      />
    </div>
  );
};

type TransactionType = {
  id: number;
  icon: JSX.Element;
  title: string;
  date: string;
  operation: "add" | "remove";
  amount: number;
  accentColor: string;
};

const RecentTransactionData: TransactionType[] = [
  {
    id: 0,
    icon: <TbCreditCardPay className="w-full h-full text-yellow-500" />,
    title: "Deposit from my Card",
    date: "25 January 2024",
    operation: "remove",
    amount: 850,
    accentColor: "bg-yellow-400/20",
  },
  {
    id: 1,
    icon: <SlPaypal className="w-full h-full text-purple-500" />,
    title: "Deposit Paypal",
    date: "24 January 2024",
    operation: "add",
    amount: 2500,
    accentColor: "bg-purple-400/20",
  },
  {
    id: 2,
    icon: <BsCashCoin className="w-full h-full text-cyan-500" />,
    title: "Jemi Wilson",
    date: "21 January 2024",
    operation: "add",
    amount: 5400,
    accentColor: "bg-cyan-400/20",
  },
];

export default RecentTransaction;
