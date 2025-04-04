import { Button, Grid, Text, TextProps, useMatches } from "@mantine/core";
import { CreditCard } from "lucide-react";
import { cn } from "~/utils/cn";

const CardList = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {cardListData.length ? (
        cardListData.map((card) => (
          <div key={card.id}>
            <Grid align="center">
              <Grid.Col
                span={"content"}
                className="flex justify-center items-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-${card.color}-500/50 flex justify-center items-center `}
                >
                  <CreditCard size={30} className={`text-${card.color}-500`} />
                </div>
              </Grid.Col>

              <Grid.Col span={"auto"}>
                <ListText>Card Type</ListText>
                <ListText isBottomText>{card.type}</ListText>
              </Grid.Col>

              <Grid.Col span={"auto"}>
                <ListText>Bank</ListText>
                <ListText isBottomText>{card.bankName}</ListText>
              </Grid.Col>

              <Grid.Col span={"auto"} className="hidden md:inline-block">
                <ListText>Card Number</ListText>
                <ListText isBottomText>
                  <CardNumber cardNumber={card.number} />
                </ListText>
              </Grid.Col>

              <Grid.Col span={"auto"} className="hidden md:inline-block">
                <ListText>Namain Card</ListText>
                <ListText isBottomText>{card.namain}</ListText>
              </Grid.Col>

              <Grid.Col span={"content"}>
                <Button variant="transparent" className="text-base p-0">
                  Details
                </Button>
              </Grid.Col>
            </Grid>
          </div>
        ))
      ) : (
        <Text>No cards found</Text>
      )}
    </div>
  );
};

type ListTextProps = {
  children: React.ReactNode;
  isBottomText?: boolean;
} & TextProps;

const ListText = ({
  isBottomText = false,
  children,
  ...rest
}: ListTextProps) => {
  return (
    <Text
      className={cn(
        "font-medium text-base text-nowrap whitespace-nowrap",
        isBottomText && "text-sm font-normal text-mantineColorViolet6/70",
        rest.className
      )}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CardList;

const CardNumber = ({ cardNumber }: { cardNumber: string }) => {
  const cardNumberLength = useMatches({
    base: -14,
    lg: -9,
  });

  const slicedNumber = cardNumber.slice(cardNumberLength);

  return <>{slicedNumber}</>;
};

type CardListDataType = {
  id: number;
  type: "primary" | "secondary";
  bankName: string;
  number: string;
  namain: string;
  color: string;
};

const cardListData: CardListDataType[] = [
  {
    id: 0,
    type: "secondary",
    bankName: "DBL Bank",
    number: "**** **** 6500",
    namain: "William",
    color: "blue",
  },
  {
    id: 1,
    type: "secondary",
    bankName: "BRC Bank",
    number: "**** **** 7290",
    namain: "Michael",
    color: "pink",
  },
  {
    id: 2,
    type: "secondary",
    bankName: "ABM Bank",
    number: "**** **** 2137",
    namain: "Edward",
    color: "yellow",
  },
];
