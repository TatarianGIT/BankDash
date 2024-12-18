import { ScrollArea } from "@mantine/core";
import { ReactNode } from "react";

type CreditCardContainerProps = {
  children: ReactNode;
};

const CreditCardContainer = ({ children }: CreditCardContainerProps) => {
  return (
    <ScrollArea type="auto" className="pb-4 -mb-4">
      <div className="flex flex-row gap-3">{children}</div>
    </ScrollArea>
  );
};

export default CreditCardContainer;
