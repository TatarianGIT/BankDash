import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Avatar, Button, Card, Container, NumberInput } from "@mantine/core";
import { Send } from "lucide-react";
import { useState } from "react";

const QuickTransfer = () => {
  return (
    <Card shadow="md" radius={"lg"}>
      <Carousel
        loop
        slideGap={"xs"}
        align={"start"}
        slideSize={"33.3%"}
        previousControlProps={{ style: { display: "none" } }}
        nextControlProps={{
          style: {
            position: "absolute",
            right: "-40px",
          },
        }}
        className="w-4/5"
      >
        <CarouselSlide>
          <PersonCard />
        </CarouselSlide>
        <CarouselSlide>
          <PersonCard />
        </CarouselSlide>
        <CarouselSlide>
          <PersonCard />
        </CarouselSlide>
        <CarouselSlide>
          <PersonCard />
        </CarouselSlide>
        <CarouselSlide>
          <PersonCard />
        </CarouselSlide>
      </Carousel>
      <AmountInput />
    </Card>
  );
};

const PersonCard = () => {
  return (
    <Container className="p-0 m-0 flex flex-col gap-3 w-24 justify-center items-center">
      <div>
        <Avatar className="w-16 h-16" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">Livia Bator</p>
        <p className="font-bold text-cyan-500">CEO</p>
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
      className="relative mt-auto pt-16"
    >
      <NumberInput
        placeholder="Amount..."
        radius={"xl"}
        className="absolute bottom-0"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <Button
        className="rounded-full flex justify-center items-center absolute bottom-0 right-0 z-10"
        type="submit"
      >
        <p>Send</p>
        <Send className="ml-1 w-5 h-5" />
      </Button>
    </form>
  );
};

export default QuickTransfer;
