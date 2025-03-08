import { Card, CardProps } from "@mantine/core";
import { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
  className?: string;
} & CardProps;

const CardContainer = ({
  children,
  className,
  ...rest
}: CardContainerProps) => {
  return (
    <Card radius={"lg"} withBorder shadow="sm" className={className} {...rest}>
      {children}
    </Card>
  );
};

export default CardContainer;
