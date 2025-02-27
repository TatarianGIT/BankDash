import { Grid, NumberFormatter, Text } from "@mantine/core";
import { BsCashCoin } from "react-icons/bs";
import { SlPaypal } from "react-icons/sl";
import { TbCreditCardPay } from "react-icons/tb";
import { cn } from "~/utils/cn.js";

const RecentTransaction = () => {
  return (
    <div className="flex flex-col justify-center items-center md:p-1 w-full">
      {RecentTransactionData?.length ? (
        <div className="w-full h-full grid grid-cols-[auto_1fr_auto] gap-y-1 gap-x-2 md:gap-y-2 md:gap-x-4 items-center">
          {RecentTransactionData.map((transaction: TransactionType) => (
            <Transaction key={transaction.id} {...transaction} />
          ))}
        </div>
      ) : (
        <Text>No recent transaction</Text>
      )}
    </div>
  );
};

type TransactionProps = {
  icon: JSX.Element;
  title: string;
  date: string;
  operation: "add" | "remove";
  amount: number;
  accentColor: string;
};

const Transaction = ({ ...props }: TransactionProps) => {
  return (
    <>
      <div
        className={cn(
          props.accentColor,
          "w-10 h-10 md:w-14 md:h-14 p-2 md:p-3 rounded-full flex items-center justify-center"
        )}
      >
        {props.icon}
      </div>
      <div className="flex flex-wrap items-center">
        <Text className="md:text-base text-sm text-nowrap mr-auto">
          {props.title}
        </Text>
        <Text className="md:text-sm text-xs text-gray-400 text-nowrap pr-10 md:pr-6">
          {props.date}
        </Text>
      </div>
      <div
        className={cn(
          props.operation === "add" ? "text-green-600" : "text-red-600",
          "flex gap-1 items-center justify-end"
        )}
      >
        <Text className="text-xs md:text-base">
          {props.operation === "add" ? "+" : "-"}
        </Text>
        <Text className="text-xs md:text-base">
          <NumberFormatter value={props.amount} prefix="$" thousandSeparator />
        </Text>
      </div>
    </>
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
  {
    id: 3,
    icon: <BsCashCoin className="w-full h-full text-cyan-500" />,
    title: "Jemi Wilson",
    date: "21 January 2024",
    operation: "remove",
    amount: 5,
    accentColor: "bg-cyan-400/20",
  },
];

export default RecentTransaction;
