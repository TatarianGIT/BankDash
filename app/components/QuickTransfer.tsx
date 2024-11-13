import { Carousel, CarouselSlide } from "@mantine/carousel";
import {
  Avatar,
  Button,
  Card,
  Container,
  NumberInput,
  Text,
} from "@mantine/core";
import { Send } from "lucide-react";
import { useState } from "react";
import { UserData } from "~/data/contacts.js";

type QuickTransferProps = {
  data: UserData[];
};

const QuickTransfer = ({ data }: QuickTransferProps) => {
  return (
    <Card shadow="md" radius={"lg"} withBorder className="p-0 flex-col">
      {data.length ? (
        <>
          <Carousel
            loop
            slideGap={"sm"}
            align={"center"}
            withControls
            className="my-4"
            slideSize={"125px"}
            styles={{
              container: {
                paddingTop: "0.2rem",
                paddingBottom: "0.2rem",
              },
              root: { padding: "1rem" },
            }}
          >
            {data.map((user: UserData) => (
              <CarouselSlide key={user.id}>
                <PersonCard data={user} />
              </CarouselSlide>
            ))}
          </Carousel>
        </>
      ) : (
        <Text>No contacts found</Text>
      )}

      <AmountInput />
    </Card>
  );
};

type PersonCardProps = { data: UserData };

const PersonCard = ({ data }: PersonCardProps) => {
  const position = data.position?.split(" ");

  return (
    <Container className="flex flex-col gap-3 w-full justify-between items-center  text-center p-2 shadow-md rounded-md h-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar className="w-16 h-16" src={data.avatar} />
        <div>
          <Text className="font-bold w-full">{data.firstName}</Text>
          <Text className="font-bold w-full">{data.lastName}</Text>
        </div>
      </div>
      <div className="h-1/3">
        {position?.map((word, index) => (
          <Text key={index} className="font-bold text-cyan-500 w-full">
            {word}
          </Text>
        ))}
      </div>
    </Container>
  );
};

const AmountInput = () => {
  const [value, setValue] = useState<number | string>();

  const handleSubmit = () => {
    console.log(`Form submitted... $ ${value}`);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className="mt-auto w-full p-4"
    >
      <div className="relative flex md:flex-col justify-center items-center gap-4">
        <Text className="flex-shrink-0 md:w-full">Write Amount</Text>
        <NumberInput
          placeholder="Amount..."
          radius={"xl"}
          className="bottom-0 w-full"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <Button
          className="rounded-full flex justify-center items-center absolute bottom-0 right-0 z-10"
          type="submit"
        >
          <Text>Send</Text>
          <Send className="ml-1 w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default QuickTransfer;
