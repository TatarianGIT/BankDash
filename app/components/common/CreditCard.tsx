import { Card, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

type CreditCardProps = {
  variant: "primary" | "alt";
};

const data = {
  balance: 7421,
  cardHolder: "Some Dude",
  validThru: "12/24",
  cardNumber: "4123 **** **** 5124",
};

const CreditCard = ({ variant }: CreditCardProps) => {
  const { ref, width } = useElementSize();

  const size = ref.current ? Math.floor(width / 10 - 8) + "px" : "16px";

  const textColor = variant === "primary" ? "text-gray-300" : "text-gray-700";

  return (
    <Card
      ref={ref}
      shadow="sm"
      className="p-0 m-0 min-w-[300px] md:min-w-full flex"
      radius={"lg"}
    >
      <div className="flex flex-col">
        {/* Upper container */}
        <div
          className={cn(
            variant === "primary"
              ? "bg-gradient-to-bl from-[#0A06F4] from-50% to-[#4C49ED]"
              : "bg-gray-100",
            "flex flex-col"
          )}
        >
          {/* Balance and Icon */}
          <div className="flex justify-between items-center px-6 py-3">
            <div className="flex flex-col">
              <CardDetail textColor={textColor} type="balance" header="Balance">
                {data.balance}
              </CardDetail>
            </div>
            <CreditCardIcon className={cn(textColor, "w-8 h-8")} />
          </div>

          <div className="grid grid-cols-2 px-6 py-3">
            <div>
              <CardDetail textColor={textColor} header="CARD HOLDER">
                {data.cardHolder}
              </CardDetail>
            </div>
            <div>
              <CardDetail textColor={textColor} header="VALID THRU">
                {data.validThru}
              </CardDetail>
            </div>
          </div>

          {/* Bottom container / Number and Icon */}
          <div
            className={cn(
              variant === "primary"
                ? "bg-gradient-to-b from-[#4C49ED] from-15% to-[#0A06F4]"
                : "bg-gray-100 border-t",
              "flex justify-between items-center px-6 py-3"
            )}
          >
            <Text
              style={{ fontSize: `clamp(12px, ${size}, 20px)` }}
              className={cn(
                variant === "primary" ? "text-gray-300" : "text-gray-700",
                ``
              )}
            >
              {data.cardNumber}
            </Text>
            <BottomIcon variant={variant} />
          </div>
        </div>
      </div>
    </Card>
  );
};

type CardDetailProps = {
  header: string;
  children: ReactNode;
  type?: "balance" | "other";
  textColor: string;
};

const CardDetail = ({
  header,
  children,
  type = "other",
  textColor,
}: CardDetailProps) => {
  return (
    <div>
      <Text className={cn(textColor, " text-xs")}>{header}</Text>
      <Text
        className={cn(
          "font-semibold text-base",
          type === "balance" ? "text-2xl" : "",
          textColor
        )}
      >
        {children}
      </Text>
    </div>
  );
};

const BottomIcon = ({ variant }: { variant: "primary" | "alt" }) => {
  const circleStyles = cn(
    variant === "primary" ? "bg-gray-200/50" : "bg-gray-400/50",
    " w-[30px] h-[30px] rounded-full"
  );

  return (
    <div className="w-12 relative">
      <div className={circleStyles}>
        <div className={cn(circleStyles, "absolute left-[15px]")} />
      </div>
    </div>
  );
};

export default CreditCard;
