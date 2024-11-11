import { Container, Text } from "@mantine/core";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemCardProps = {
  children: ReactNode | ReactNode[];
  leftHeading: string;
} & (
  | { variant?: "default"; rightHeading?: string }
  | { variant: "alt"; rightHeading: string | undefined }
);

const ItemGrid = ({
  children,
  leftHeading,
  rightHeading,
  variant = "default",
}: ItemCardProps) => {
  const isChildrenArray = Array.isArray(children);
  const isOdd = isChildrenArray && children.length % 2 !== 0;
  const lastIndex = isChildrenArray && isOdd ? children.length : undefined;

  if (isChildrenArray)
    return (
      <ItemCardContent
        leftHeading={leftHeading}
        isChildrenArray={isChildrenArray}
        variant={variant}
        rightHeading={rightHeading}
      >
        {children.map((element, index) => (
          <Container
            key={index}
            className={cn(
              lastIndex === index + 1 ? "col-span-2" : "",
              "p-0 m-0"
            )}
          >
            {element}
          </Container>
        ))}
      </ItemCardContent>
    );

  return (
    <ItemCardContent
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
  isChildrenArray: boolean;
} & ItemCardProps;

const ItemCardContent = ({
  isChildrenArray,
  children,
  variant,
  leftHeading,
  rightHeading,
}: ItemCardContentProps) => {
  return (
    <div>
      <div className="flex justify-between items-center p-1">
        <Text>{leftHeading}</Text>

        {variant === "alt" && <Text>{variant === "alt" && rightHeading}</Text>}
      </div>
      <div className={cn(isChildrenArray ? "grid grid-cols-2 gap-7" : "")}>
        {children}
      </div>
    </div>
  );
};

export default ItemGrid;
