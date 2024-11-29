import { Button, Grid, Text, useMatches } from "@mantine/core";
import CardContainer from "../common/CardContainer";
import { CreditCard } from "lucide-react";

const CardList = () => {
  return (
    <div className="flex flex-col gap-4">
      {cardListData.length ? (
        cardListData.map((card) => (
          <CardContainer key={card.id}>
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
                <Text>Card Type</Text>
                <Text className="text-sm">{card.type}</Text>
              </Grid.Col>

              <Grid.Col span={"auto"}>
                <Text>Bank</Text>
                <Text className="text-sm">{card.bankName}</Text>
              </Grid.Col>

              <Grid.Col span={"auto"} className="hidden md:inline-block">
                <Text>Card Number</Text>
                <Text className="text-sm">
                  <CardNumber cardNumber={card.number} />
                </Text>
              </Grid.Col>

              <Grid.Col span={"auto"} className="hidden md:inline-block">
                <Text>Namain Card</Text>
                <Text className="text-sm">{card.namain}</Text>
              </Grid.Col>

              <Grid.Col span={"content"}>
                <Button variant="transparent" className="text-base p-0">
                  <span className="hidden xs:inline-block pr-1">View</span>
                  Details
                </Button>
              </Grid.Col>
            </Grid>
          </CardContainer>
        ))
      ) : (
        <Text>No cards found</Text>
      )}
    </div>
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
