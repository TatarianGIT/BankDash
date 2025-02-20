import { ScrollArea } from "@mantine/core";
import { ReactNode } from "react";

type CreditCardContainerProps = {
  children: ReactNode;
};

const CreditCardContainer = ({ children }: CreditCardContainerProps) => {
  return (
    <ScrollArea type="auto">
      <div className="flex flex-row gap-3 pb-5">{children}</div>
    </ScrollArea>
  );
};

export default CreditCardContainer;
