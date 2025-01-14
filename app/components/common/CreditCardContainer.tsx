import { ReactNode } from "react";

type CreditCardContainerProps = {
  children: ReactNode;
};

const CreditCardContainer = ({ children }: CreditCardContainerProps) => {
  return (
    <div className="flex flex-row gap-3 overflow-auto pb-3">{children}</div>
  );
};

export default CreditCardContainer;
