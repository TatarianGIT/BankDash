import { Card, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { ReactNode } from "react";
import { WithLoading } from "~/types";
import { cn } from "~/utils/cn.js";

type CreditCardType = "Physical" | "Virtual";

type CreditCardProps = WithLoading<{
  balance: number;
  name: string;
  date: string;
  number: string;
  type: CreditCardType;
}>;

const CreditCard = ({
  type,
  balance,
  name,
  number,
  date,
  isLoading = false,
}: CreditCardProps) => {
  const { ref, width } = useElementSize();

  const size = ref.current ? Math.floor(width / 10 - 10) + "px" : "16px";
  const cardType = isLoading ? "Physical" : type;
  const textColor = cardType === "Virtual" ? "text-gray-300" : "text-gray-700";

  const withLoading = <T,>(cardDetail: T): T | JSX.Element => {
    return isLoading ? (
      <LoadingSkeleton className="w-4/5 h-5 mt-1" />
    ) : (
      cardDetail
    );
  };

  return (
    <Card
      ref={ref}
      shadow="sm"
      className="p-0 m-0 min-w-[300px] md:min-w-max w-full flex"
      radius={"lg"}
    >
      <div className="flex flex-col">
        {/* Upper container */}
        <div
          className={cn(
            cardType === "Virtual"
              ? "bg-gradient-to-bl from-[#0A06F4] from-50% to-[#4C49ED]"
              : "bg-gray-200",
            "flex flex-col"
          )}
        >
          {/* Balance and Icon */}
          <div className="flex justify-between items-center px-6 py-3">
            <div className="flex flex-col">
              <CardDetail textColor={textColor} type="balance" header="Balance">
                <div
                  className={cn(
                    isLoading && "w-24",
                    "flex justify-center items-center gap-2"
                  )}
                >
                  $ {withLoading(balance)}
                </div>
              </CardDetail>
            </div>
            <CreditCardIcon className={cn(textColor, "w-8 h-8")} />
          </div>

          <div className="grid grid-cols-2 px-6 py-3 gap-2">
            <div>
              <CardDetail textColor={textColor} header="CARD HOLDER">
                {withLoading(name)}
              </CardDetail>
            </div>
            <div>
              <CardDetail textColor={textColor} header="VALID THRU">
                {withLoading(date)}
              </CardDetail>
            </div>
          </div>

          {/* Bottom container / Number and Icon */}
          <div
            className={cn(
              cardType === "Virtual"
                ? "bg-gradient-to-b from-[#4C49ED] from-15% to-[#0A06F4]"
                : "bg-gray-200 border-t border-gray-300",
              "flex justify-between items-center px-6 py-3"
            )}
          >
            <Text
              component="span"
              style={{ fontSize: `clamp(10px, ${size}, 20px)` }}
              className={cn(
                cardType === "Virtual" ? "text-gray-300" : "text-gray-700",
                `w-full`
              )}
            >
              {withLoading(number)}
            </Text>
            <BottomIcon cardType={cardType} />
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
        component="span"
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

const BottomIcon = ({
  cardType = "Physical",
}: {
  cardType: CreditCardType | undefined;
}) => {
  const circleStyles = cn(
    cardType === "Virtual" ? "bg-gray-200/50" : "bg-gray-400/50",
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

const LoadingSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-stone-300 dark:bg-stone-300 h-full w-full rounded-lg",
        className
      )}
    />
  );
};

export default CreditCard;
