import { Container, Text } from "@mantine/core";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemCardProps = {
  children: ReactNode | ReactNode[];
  leftHeading: string;
  className?: string;
} & (
  | { variant?: "default"; rightHeading?: string }
  | { variant: "alt"; rightHeading: string | undefined }
);

const Item = ({
  children,
  leftHeading,
  rightHeading,
  variant = "default",
  className,
}: ItemCardProps) => {
  const isChildrenArray = Array.isArray(children);

  return (
    <ItemCardContent
      className={className}
      leftHeading={leftHeading}
      rightHeading={rightHeading}
      isChildrenArray={isChildrenArray}
      variant={variant}
    >
      {children}
    </ItemCardContent>
  );
};

type ItemCardContentProps = {
  className?: string;
  isChildrenArray: boolean;
} & ItemCardProps;

const ItemCardContent = ({
  className,
  isChildrenArray,
  children,
  variant,
  leftHeading,
  rightHeading,
}: ItemCardContentProps) => {
  return (
    <div className={cn(className, "w-full h-full")}>
      <div className="flex justify-between items-center p-1">
        <Text className="text-2xl">{leftHeading}</Text>

        {variant === "alt" && <Text>{variant === "alt" && rightHeading}</Text>}
      </div>
      <div className={cn(isChildrenArray ? "grid grid-cols-2 gap-7" : "")}>
        {children}
      </div>
    </div>
  );
};

export default Item;
