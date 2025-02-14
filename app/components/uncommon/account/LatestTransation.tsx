import { Grid, NumberFormatter, Text, useMatches } from "@mantine/core";
import { HandPlatter, ShoppingBasket, UserRound } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

const LatestTransation = () => {
  return (
    <div className="flex flex-col col-span-12 gap-2">
      {Data ? (
        Data.map((item: DataType) => <TransationItem key={item.id} {...item} />)
      ) : (
        <p>You have no recent transactions.</p>
      )}
    </div>
  );
};

type TransationItemProps = {
  key: number | string;
} & DataType;

const TransationItem = ({
  icon,
  heading,
  date,
  type,
  card,
  isCompleted,
  operation,
  balance,
  iconBgColor,
}: TransationItemProps) => {
  const size: "auto" | "content" | number = useMatches({
    base: "auto",
    sm: 5,
  });

  return (
    <Grid className="h-full w-full" gutter={4}>
      <MantineGridCol
        hideOnMobile={false}
        span={size}
        className="flex flex-row gap-3"
      >
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
      </MantineGridCol>

      <MantineGridCol hideOnMobile={true} span={"auto"}>
        <Text>{type}</Text>
      </MantineGridCol>

      <MantineGridCol hideOnMobile={true} span={2}>
        <Text>{card}</Text>
      </MantineGridCol>

      <MantineGridCol hideOnMobile={true} span={"auto"}>
        <Text>{isCompleted ? "Completed" : "Pending"}</Text>
      </MantineGridCol>

      <MantineGridCol hideOnMobile={false} span={"content"} className="ml-auto">
        <Text
          className={cn(
            operation === "expense" ? "text-red-600" : "text-green-600",
            ""
          )}
        >
          {operation === "expense" ? "-" : operation === "income" ? "+" : null}
          <NumberFormatter value={balance} prefix="$" thousandSeparator />
        </Text>
      </MantineGridCol>
    </Grid>
  );
};

const MantineGridCol = ({
  span,
  className,
  children,
  hideOnMobile,
}: {
  children: ReactNode;
  span: number | "auto" | "content";
  className?: string;
  hideOnMobile: boolean;
}) => {
  return (
    <Grid.Col
      span={span}
      className={cn(
        className,
        "flex items-center",
        hideOnMobile ? "hidden sm:flex" : ""
      )}
    >
      {children}
    </Grid.Col>
  );
};

export default LatestTransation;

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
    card: "**** 1234",
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
    card: "**** 1234",
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
    card: "**** 1234",
    operation: "income",
    isCompleted: true,
    balance: 780,
  },
];
