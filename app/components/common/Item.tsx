import { Grid, ScrollArea, Text } from "@mantine/core";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemCardProps = {
  children: ReactNode | ReactNode[];
  leftHeading: string;
  className?: string;
  size: "small" | "medium" | "big";
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
  const isChildrenArray = Array.isArray(children);

  return (
    <Grid.Col
      className={cn("w-full h-full", className)}
      span={
        size === "big"
          ? { base: 12, lg: 12 }
          : size === "medium"
          ? { base: 12, lg: 7 }
          : size === "small"
          ? { base: 12, lg: 5 }
          : { base: 12, lg: 12 }
      }
    >
      <div className="flex justify-between items-center p-1">
        <Text className="text-2xl">{leftHeading}</Text>

        {variant === "alt" && <Text>{variant === "alt" && rightHeading}</Text>}
      </div>

      {isChildrenArray ? (
        <ScrollArea offsetScrollbars={true} type="always">
          <div
            className={cn(
              isChildrenArray ? "flex md:grid md:grid-cols-2 gap-7" : ""
            )}
          >
            {children}
          </div>
        </ScrollArea>
      ) : (
        <>{children}</>
      )}
    </Grid.Col>
  );
};

export default Item;
