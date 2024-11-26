import { Card } from "@mantine/core";
import { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
  className?: string;
};

const CardContainer = ({ children, className }: CardContainerProps) => {
  return (
    <Card radius={"lg"} withBorder shadow="sm" className={className}>
      {children}
    </Card>
  );
};

export default CardContainer;
