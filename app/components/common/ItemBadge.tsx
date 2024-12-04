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
  description: number | string;
  colSpan: number | "auto" | "content";
  backgroundColor: string;
} & (
  | { type: "%"; operation: "income" | "expense" }
  | { type: "number"; operation?: undefined }
  | { type: "$"; operation?: undefined }
);

export const ItemBadge = ({
  icon,
  heading,
  description,
  colSpan,
  backgroundColor,
  type,
  operation,
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
          {typeof description === "number" ? (
            <Amount
              description={description}
              type={type}
              operation={operation}
            />
          ) : (
            <Text className="text-base font-semibold">{description}</Text>
          )}
        </div>
      </Card>
    </Grid.Col>
  );
};

type AmountProps = {
  description: number | string;
  type: "%" | "$" | "number";
  operation: "income" | "expense" | undefined;
};

const Amount = ({ description, operation, type }: AmountProps) => {
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
        value={description}
        thousandSeparator
        decimalSeparator="."
        decimalScale={2}
      />
    </>
  );
};

export default ItemBadgeContainer;
