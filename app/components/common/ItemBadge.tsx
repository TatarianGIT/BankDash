import { Card, Grid, NumberFormatter, ScrollArea, Text } from "@mantine/core";
import { ReactElement, ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemBadgeProps = {
  children: ReactElement<typeof ItemBadge>[];
  colSpan: number | "auto" | "content";
  className?: string;
  shouldOverflow?: boolean;
};

const ItemBadgeContainer = ({
  children,
  className,
  colSpan,
  shouldOverflow,
}: ItemBadgeProps) => {
  if (shouldOverflow)
    return (
      <>
        <Grid.Col span={colSpan} className="hidden md:block">
          <Grid className={cn(className, "")}>{children}</Grid>
        </Grid.Col>

        <ScrollArea className="block md:hidden w-full pb-2" type="always">
          <div className="flex flex-row min-w-max">{children}</div>
        </ScrollArea>
      </>
    );

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
  colSpan?: number | "auto" | "content";
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
        className="flex flex-row gap-2 w-full h-full md:justify-center"
      >
        <div
          className={cn(
            backgroundColor,
            "md:h-12 md:w-12 w-10 h-10 p-2 md:p-1 shrink-0 rounded-full flex justify-center items-center my-auto"
          )}
        >
          {icon}
        </div>

        <div className="flex flex-col justify-center">
          <Text className="text-xs ">{heading}</Text>
          {typeof description === "number" ? (
            <Amount
              description={description}
              type={type}
              operation={operation}
            />
          ) : (
            <Text className="text-xs md:text-base font-semibold">
              {description}
            </Text>
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
          "text-xs md:text-base font-semibold",
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
