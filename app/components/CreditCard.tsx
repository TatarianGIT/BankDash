import { Card, Container, Text } from "@mantine/core";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type CreditCardProps = {
  upperColor: string;
  bottomColor: string;
};

const data = {
  balance: 7421,
  cardHolder: "Some Dude",
  validThru: "12/24",
  cardNumber: "4123 **** **** 5124",
};

const CreditCard = ({ bottomColor, upperColor }: CreditCardProps) => {
  return (
    <Container className="p-0 m-0">
      <Card shadow="sm" className="p-0 m-0" radius={"lg"}>
        <div className="flex flex-col">
          {/* Upper container */}
          <div className={cn(upperColor, "flex flex-col")}>
            {/* Balance and Icon */}
            <div className="flex justify-between items-center px-6 py-3">
              <div className="flex flex-col">
                <CardDetail type="balance" header="Balance">
                  {data.balance}
                </CardDetail>
              </div>
              <CreditCardIcon className="w-8 h-8 text-gray-300" />
            </div>

            <div className="grid grid-cols-2 px-6 py-3">
              <div>
                <CardDetail header="CARD HOLDER">{data.cardHolder}</CardDetail>
              </div>
              <div>
                <CardDetail header="VALID THRU">{data.validThru}</CardDetail>
              </div>
            </div>

            {/* Bottom container / Number and Icon */}
            <div
              className={cn(
                bottomColor,
                "flex justify-between items-center px-6 py-3 "
              )}
            >
              <Text className="text-2xl text-gray-300">{data.cardNumber}</Text>
              <BottomIcon />
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

type CardDetailProps = {
  header: string;
  children: ReactNode;
  type?: "balance" | "other";
};

const CardDetail = ({ header, children, type = "other" }: CardDetailProps) => {
  return (
    <div>
      <Text className="text-gray-300 text-xs">{header}</Text>
      <Text
        className={cn(
          "text-gray-300 font-semibold text-base",
          type === "balance" ? " text-2xl " : " "
        )}
      >
        {children}
      </Text>
    </div>
  );
};

const BottomIcon = () => {
  return (
    <div className="w-12 relative">
      <div className="bg-gray-200/50 w-[30px] h-[30px] rounded-full">
        <div className="bg-gray-200/50 w-[30px] h-[30px] rounded-full absolute left-[15px]" />
      </div>
    </div>
  );
};

export default CreditCard;
