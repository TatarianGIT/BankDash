import { Grid, Text } from "@mantine/core";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemCardProps = {
  children: ReactNode;
  leftHeading: string;
  className?: string;
  size: "small" | "medium" | "full" | "half";
} & (
  | { variant?: "default"; rightHeading?: string }
  | { variant: "alt"; rightHeading: string | undefined }
);

const Item = ({
  children,
  leftHeading,
  rightHeading,
  size,
  variant = "default",
  className,
}: ItemCardProps) => {
  return (
    <Grid.Col
      className={cn("w-full h-full", className)}
      span={
        size === "full"
          ? { base: 12, lg: 12 }
          : size === "medium"
          ? { base: 12, lg: 7 }
          : size === "small"
          ? { base: 12, lg: 5 }
          : size === "half"
          ? { base: 12, lg: 6 }
          : { base: 12, lg: 12 }
      }
    >
      <div className="flex justify-between items-center p-1">
        <Text className="text-2xl">{leftHeading}</Text>

        {variant === "alt" && <Text>{variant === "alt" && rightHeading}</Text>}
      </div>

      {children}
    </Grid.Col>
  );
};

export default Item;
