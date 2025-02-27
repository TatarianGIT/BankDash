import { Carousel, CarouselSlide } from "@mantine/carousel";
import {
  Avatar,
  Button,
  Container,
  Modal,
  NumberFormatter,
  NumberInput,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useFetcher } from "@remix-run/react";
import { Banknote, Loader, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { UserData } from "~/data/dashboard/contacts.js";
import useNotification from "~/hooks/useNotification";
import { action } from "~/routes/dashboard";
import { cn } from "~/utils/cn";

type QuickTransferProps = {
  data: UserData[];
};

const QuickTransfer = ({ data }: QuickTransferProps) => {
  const [opened, { close, open }] = useDisclosure();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedContact = data.find((_, index) => index === selectedIndex);

  const [shouldClear, setShouldClear] = useState<boolean>(false);

  const fetcher = useFetcher<typeof action>();

  const [value, setValue] = useState<number>(0);
  const formatedValue = (
    <NumberFormatter value={value} prefix="$" thousandSeparator />
  );

  useNotification({ id: "quickTransfer", fetcher: fetcher });

  useEffect(() => {
    if (
      opened &&
      fetcher.data?.status === "success" &&
      fetcher.state === "idle" &&
      shouldClear
    ) {
      setValue(0);
      close();
      setShouldClear(false);
    }
  }, [close, fetcher.data?.status, fetcher.state, opened, shouldClear]);

  return (
    <div className="p-0 flex-col w-full">
      {data.length ? (
        <>
          <Modal
            opened={opened}
            onClose={close}
            title={
              <Text size="xl" fw={600}>
                Confirm Transfer
              </Text>
            }
            radius="lg"
            padding="xl"
            centered
            role="alertdialog"
          >
            <fetcher.Form
              onSubmit={() => setShouldClear(true)}
              method="POST"
              className="flex flex-col gap-6"
            >
              <div className="flex justify-evenly  items-center h-24 bg-mantineColorGray1 dark:bg-mantineColorDark6 rounded-2xl">
                <div className="w-16 h-16 bg-mantineColorDark1 dark:bg-mantineColorDark5 rounded-full flex justify-center items-center">
                  <Banknote className="w-full h-full text-white p-2" />
                </div>
                <div className="flex gap-2 sm:gap-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-mantineColorBlue5 dark:bg-mantineColorBlue8 rounded-full animate-[bounce_1.5s_infinite_0ms]" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-mantineColorBlue5 dark:bg-mantineColorBlue8 rounded-full animate-[bounce_1.5s_infinite_150ms]" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-mantineColorBlue5 dark:bg-mantineColorBlue8 rounded-full animate-[bounce_1.5s_infinite_300ms]" />
                </div>

                <div className="w-16 h-16">
                  <Avatar
                    src={selectedContact?.avatar}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <Text size="lg">
                You are about to send{" "}
                <span className="text-green-600 font-semibold text-lg">
                  {formatedValue}
                </span>{" "}
                to{" "}
                <span className="text-cyan-600 font-semibold text-lg">
                  {selectedContact?.firstName} {selectedContact?.lastName}.
                </span>
              </Text>
              <Text size="lg">This action cannot be undone.</Text>

              <div className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
                <Button
                  onClick={close}
                  size="md"
                  variant="light"
                  color="gray"
                  className="max-sm:order-1"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  size="md"
                  color="green"
                  className="relative"
                >
                  {fetcher.state === "idle" ? (
                    <Text>Confirm</Text>
                  ) : (
                    <>
                      <Text className="invisible">Confirm</Text>
                      <div className="absolute inset-0 flex justify-center items-center">
                        <Loader className="w-5 h-5 animate-spin" />
                      </div>
                    </>
                  )}
                </Button>
              </div>
            </fetcher.Form>
          </Modal>
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
              control: {
                margin: "-25px",
              },
            }}
            initialSlide={0}
            onSlideChange={(index) => setSelectedIndex(index)}
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
      <AmountInput open={open} value={value} setValue={setValue} />
    </div>
  );
};

type PersonCardProps = { data: UserData };

const PersonCard = ({ data }: PersonCardProps) => {
  const position = data.position?.split(" ");

  return (
    <Container className="flex flex-col gap-3 w-full justify-between items-center text-center p-2 shadow-md rounded-md h-full">
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

type AmountInputProps = {
  open: () => void;
  value: number;
  setValue: (newValue: number) => void;
};

const AmountInput = ({ open, setValue, value }: AmountInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="mt-auto w-full p-4">
      <div className="flex gap-4 flex-wrap items-center">
        <Text>Write Amount</Text>
        <div className="relative min-w-[250px] flex-1">
          <NumberInput
            placeholder="Amount..."
            thousandSeparator=","
            prefix="$ "
            allowNegative={false}
            min={0}
            max={100_000_000}
            allowDecimal={true}
            decimalScale={2}
            radius={"xl"}
            value={value}
            onChange={(newValue) => setValue(Number(newValue))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Button
            disabled={value <= 0}
            onClick={open}
            className={cn(
              "rounded-full flex justify-center items-center absolute bottom-0 right-0 z-10 data-[disabled]:dark:bg-gray-700 data-[disabled]:cursor-not-allowed",
              isFocused && "border-2 border-mantinePrimaryColor8"
            )}
            type="submit"
          >
            <Text>Send</Text>
            <Send className="ml-1 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;
