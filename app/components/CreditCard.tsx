import { Card, Container, Text } from "@mantine/core";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type CreditCardProps = {
  upperColor: string;
  bottomColor: string;
};

const CreditCard = ({ bottomColor, upperColor }: CreditCardProps) => {
  return (
    <Container className="p-0 m-0">
      <Card shadow="sm" className="p-0 m-0" radius={"lg"}>
        <div className="flex flex-col">
          {/* Upper container */}
          <div className={cn(upperColor, "flex flex-col")}>
            {/* Balance and Icon */}
            <div className="flex justify-between items-center p-6">
              <div className="flex flex-col">
                <CardDetail type="balance" header="Balance">
                  $ 7,121
                </CardDetail>
              </div>
              <CreditCardIcon className="w-8 h-8 text-gray-300" />
            </div>

            {/* Card details */}
            <div className="grid grid-cols-2 p-6">
              <div>
                <CardDetail header="CARD HOLDER">Some Dude</CardDetail>
              </div>
              <div>
                <CardDetail header="VALID THRU">12/22</CardDetail>
              </div>
            </div>

            {/* Bottom container / Number and Icon */}
            <div
              className={cn(
                bottomColor,
                "flex justify-between items-center p-6 "
              )}
            >
              <Text className="text-gray-300 text-2xl">
                4123 **** **** 5124
              </Text>
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
    <div className="bg-gray-200/50 w-[30px] h-[30px] rounded-full relative">
      <div className="bg-gray-200/50 w-[30px] h-[30px] rounded-full absolute right-[15px]" />
    </div>
  );
};

export default CreditCard;
