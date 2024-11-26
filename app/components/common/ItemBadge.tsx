import { Card, Grid, NumberFormatter, Text } from "@mantine/core";
import { ReactElement, ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemBadgeProps = {
  children: ReactElement<typeof ItemBadge>[];
  colSpan: number | "auto" | "content";
  className?: string;
};

const ItemBadgeContainer = ({
  children,
  className,
  colSpan,
}: ItemBadgeProps) => {
  return (
    <Grid.Col span={colSpan}>
      <Grid className={cn(className, "")}>{children}</Grid>
    </Grid.Col>
  );
};

type BadgeContentProps = {
  icon: ReactNode;
  heading: string;
  balance: number;
  colSpan: number;
  backgroundColor: string;
};

export const ItemBadge = ({
  icon,
  heading,
  balance,
  colSpan,
  backgroundColor,
}: BadgeContentProps) => {
  return (
    <Grid.Col span={colSpan}>
      <Card
        withBorder
        shadow="sm"
        radius={"lg"}
        className="flex flex-row gap-2 w-full h-full"
      >
        <div
          className={cn(
            backgroundColor,
            "h-12 w-12 rounded-full flex justify-center items-center"
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col justify-center">
          <Text className="text-xs">{heading}</Text>
          <NumberFormatter
            className="text-base font-semibold"
            prefix={"$"}
            value={balance}
            thousandSeparator
          />
        </div>
      </Card>
    </Grid.Col>
  );
};

type AmountProps = {
  balance: number;
  type: "%" | "$" | "number";
  operation: "income" | "expense" | undefined;
};

const Amount = ({ balance, operation, type }: AmountProps) => {
  const operationPrefix =
    operation === "income" ? "+" : operation === "expense" ? "-" : "";
  const prefix = type === "$" ? "$" : "";
  const suffix = type === "%" ? "%" : "";

  return (
    <>
      <NumberFormatter
        className={cn(
          "text-base font-semibold",
          operation === "expense" ? "text-red-500" : ""
        )}
        suffix={suffix}
        prefix={operationPrefix + prefix}
        value={balance}
        thousandSeparator
        decimalSeparator="."
        decimalScale={2}
      />
    </>
  );
};

export default ItemBadgeContainer;
