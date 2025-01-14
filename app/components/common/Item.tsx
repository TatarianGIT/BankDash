import { Grid, Text } from "@mantine/core";
import { ElementType, Fragment, ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemCardProps = {
  children: ReactNode;
  leftHeading: string;
  className?: string;
  size: "small" | "medium" | "full" | "half";
} & (
  | { variant?: "default"; rightHeading?: string; CustomWrapper?: undefined }
  | {
      variant: "alt";
      rightHeading: string | undefined;
      CustomWrapper?: ElementType;
    }
);

const Item = ({
  children,
  leftHeading,
  rightHeading,
  size,
  variant = "default",
  className,
  CustomWrapper = Fragment,
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

        {variant === "alt" && (
          <CustomWrapper>
            <Text>{rightHeading}</Text>
          </CustomWrapper>
        )}
      </div>

      {children}
    </Grid.Col>
  );
};

export default Item;
