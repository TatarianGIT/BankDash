import { Card, Container } from "@mantine/core";
import { BsCashCoin } from "react-icons/bs";
import { SlPaypal } from "react-icons/sl";
import { TbCreditCardPay } from "react-icons/tb";
import { cn } from "~/utils/cn.js";

const RecentTransaction = () => {
  return (
    <Container className="p-0 m-0">
      <Card shadow="md" radius={"lg"} withBorder>
        {RecentTransactionData.length ? (
          RecentTransactionData.map((transaction: TransactionType) => (
            <Transaction
              key={transaction.id}
              icon={transaction.icon}
              title={transaction.title}
              date={transaction.date}
              operation={transaction.operation}
              amount={transaction.amount}
              accentColor={transaction.accentColor}
            />
          ))
        ) : (
          <p>No recent transaction</p>
        )}
      </Card>
    </Container>
  );
};

type TransactionProps = {
  key: number | string;
  icon: JSX.Element;
  title: string;
  date: string;
  operation: "add" | "remove";
  amount: number;
  accentColor: string;
};

const Transaction = ({ ...props }: TransactionProps) => {
  return (
    <Container className="flex gap-4 p-0 m-0 justify-center items-center">
      <div className={cn(props.accentColor, "w-14 h-14 p-3 rounded-full")}>
        {props.icon}
      </div>
      <div className="flex flex-col">
        <p className="text-base">{props.title}</p>
        <p className="text-sm">{props.date}</p>
      </div>
      <div
        className={cn(
          props.operation === "add" ? "text-green-600" : "text-red-600",
          "flex gap-1 text-base ml-auto"
        )}
      >
        <p>{props.operation === "add" ? "+" : "-"}</p>
        <p>{"$" + props.amount}</p>
      </div>
    </Container>
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
