import { Carousel, CarouselSlide } from "@mantine/carousel";
import {
  Avatar,
  Button,
  Card,
  Container,
  Modal,
  NumberFormatter,
  NumberInput,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useFetcher } from "@remix-run/react";
import { Loader, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { UserData } from "~/data/dashboard/contacts.js";
import useNotification from "~/hooks/useNotification";
import { action } from "~/routes/_index";

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
    <Card shadow="md" radius={"lg"} withBorder className="p-0 flex-col w-full">
      {data.length ? (
        <>
          <Modal opened={opened} onClose={close} title={"Confirm action"}>
            <fetcher.Form
              onSubmit={() => setShouldClear(true)}
              method="POST"
              className="flex flex-col gap-4"
            >
              <Text size="lg">
                {`Are you sure, that You want to send `}
                {formatedValue}
                {` to ${selectedContact?.firstName} ${selectedContact?.lastName}?`}
              </Text>
              <div className="flex justify-between w-full">
                <Button color="red" onClick={close} size="md">
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
    </Card>
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
  return (
    <div className="mt-auto w-full p-4">
      <div className="flex gap-4 flex-wrap items-center">
        <Text>Write Amount</Text>
        <div className="relative min-w-[250px] flex-1">
          <NumberInput
            placeholder="Amount..."
            radius={"xl"}
            value={value}
            onChange={(newValue) => setValue(Number(newValue))}
          />
          <Button
            disabled={value <= 0}
            onClick={open}
            className="rounded-full flex justify-center items-center absolute bottom-0 right-0 z-10 data-[disabled]:dark:bg-gray-700 data-[disabled]:cursor-not-allowed"
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
