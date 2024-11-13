import { ScrollArea, Text } from "@mantine/core";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type ItemCardProps = {
  children: ReactNode | ReactNode[];
  leftHeading: string;
  className?: string;
  size: "small" | "big";
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
    <div
      className={cn(
        size === "big"
          ? "col-span-1 lg:col-span-7"
          : "col-span-1 lg:col-span-5",
        className,
        ""
      )}
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
    </div>
  );
};

export default Item;
