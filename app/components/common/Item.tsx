import { Card, Grid, Text } from "@mantine/core";
import { ElementType, Fragment, ReactNode } from "react";

type ItemCardProps = {
  children: ReactNode;
  leftHeading: string;
  className?: string;
  withCardContainer?: boolean;
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
  withCardContainer = true,
}: ItemCardProps) => {
  return (
    <Grid.Col
      className={className}
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
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-1">
          <Text className="text-2xl">{leftHeading}</Text>

          {variant === "alt" && (
            <CustomWrapper>
              <Text>{rightHeading}</Text>
            </CustomWrapper>
          )}
        </div>

        {withCardContainer ? (
          <Card
            withBorder
            shadow="md"
            radius={"lg"}
            className="h-full flex items-center justify-center relative"
          >
            {children}
          </Card>
        ) : (
          <div className="h-full">{children}</div>
        )}
      </div>
    </Grid.Col>
  );
};

export default Item;
