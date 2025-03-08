import { NumberFormatter, Text } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { HandPlatter, ShoppingBasket, UserRound } from "lucide-react";
import React, { ComponentProps, ReactNode } from "react";
import { cn } from "~/utils/cn.js";

const LatestTransaction = () => {
  return (
    <div className="grid grid-cols-[1fr,auto] sm:grid-cols-[1fr,1fr,auto] md:grid-cols-[auto,auto,auto,auto,auto] w-full gap-4">
      {Data ? (
        Data.map((item: DataType) => <TransactionItem key={item.id} {...item} />)
      ) : (
        <p>You have no recent transactions.</p>
      )}
    </div>
  );
};

type TransactionItemProps = {
  key: number | string;
} & DataType;

const TransactionItem = ({
  icon,
  heading,
  date,
  type,
  card,
  isCompleted,
  operation,
  balance,
  iconBgColor,
}: TransactionItemProps) => {
  const [containerRef, containerRect] = useResizeObserver();
  const [measureRef, measureRect] = useResizeObserver();

  const showAsterisks = measureRect.width + 10 <= containerRect.width;

  return (
    <>
      <Column className="flex flex-row gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-2xl flex justify-center items-center",
            iconBgColor
          )}
        >
          {icon}
        </div>
        <div>
          <Text>{heading}</Text>
          <Text>{date}</Text>
        </div>
      </Column>

      <Column className="max-sm:hidden">
        <Text>{type}</Text>
      </Column>

      <Column className="max-md:hidden" ref={containerRef}>
        <span ref={measureRef} className="invisible text-nowrap absolute">
          **** {card}
        </span>
        {showAsterisks && <Text className="pr-1">****</Text>}
        <Text>{card}</Text>
      </Column>

      <Column className="max-md:hidden">
        <Text>{isCompleted ? "Completed" : "Pending"}</Text>
      </Column>

      <Column>
        <Text
          className={cn(
            operation === "expense" ? "text-red-600" : "text-green-600"
          )}
        >
          {operation === "expense" ? "-" : operation === "income" ? "+" : null}
          <NumberFormatter value={balance} prefix="$" thousandSeparator />
        </Text>
      </Column>
    </>
  );
};

type ColumnProps = ComponentProps<"div">;

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("flex items-center justify-start", className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Column.displayName = "Column";

export default LatestTransaction;

type DataType = {
  id: number;
  icon: ReactNode;
  heading: string;
  date: string;
  type: string;
  card: string;
  operation: "expense" | "income";
  isCompleted: boolean;
  balance: number;
  iconBgColor: string;
};

const Data: DataType[] = [
  {
    id: 0,
    icon: <ShoppingBasket className="w-5 h-5 text-cyan-500" />,
    iconBgColor: "bg-cyan-500/25",
    heading: "Spotify Subscription",
    date: "25 Jan 2021",
    type: "Shopping",
    card: "1234",
    operation: "expense",
    isCompleted: false,
    balance: 150,
  },

  {
    id: 1,
    icon: <HandPlatter className="w-5 h-5 text-blue-500" />,
    iconBgColor: "bg-blue-500/25",
    heading: "Mobile Service",
    date: "25 Jan 2021",
    type: "Service",
    card: "1234",
    operation: "expense",
    isCompleted: true,
    balance: 340,
  },

  {
    id: 2,
    icon: <UserRound className="w-5 h-5 text-pink-500" />,
    iconBgColor: "bg-pink-500/25",
    heading: "Emilly Wilson",
    date: "25 Jan 2021",
    type: "Transfer",
    card: "1234",
    operation: "income",
    isCompleted: true,
    balance: 780,
  },
];
