import {
  Button,
  Input,
  Select,
  SimpleGrid,
  Text,
  useMatches,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useFetcher } from "@remix-run/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { action } from "~/routes/card";

const AddNewCard = () => {
  const fetcher = useFetcher<typeof action>();

  const [formValues, setFormValues] = useState({
    type: "Physical",
    name: "",
    number: "",
    date: null,
  });

  const cols = useMatches({
    base: 1,
    md: 2,
  });

  useEffect(() => {
    const notificationId = "cardNotification";

    if (fetcher.state === "submitting") {
      notifications.show({
        id: notificationId,
        loading: true,
        title: "Loading...",
        message: "We are adding your new card.",
        autoClose: false,
      });
    }

    if (
      fetcher.state === "idle" &&
      fetcher.data?.response.status === "success"
    ) {
      setFormValues({ type: "", name: "", number: "", date: null });

      notifications.update({
        id: notificationId,
        loading: false,
        color: "lime",
        title: fetcher.data?.response.message.title,
        message: fetcher.data?.response.message.description,
        autoClose: 4000,
      });
    }

    if (fetcher.state === "idle" && fetcher.data?.response.status === "error") {
      notifications.hide(notificationId);
    }
  }, [fetcher.state, fetcher.data]);

  const handleChange = (name: string, value: string | Date | null) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (text: string) => {
    if (typeof text !== "string") return;
    const cleanedValue = text.replace(/\D/g, "").slice(0, 16);
    handleChange("number", cleanedValue);
  };

  const formatCardNumber = (value: string): string => {
    return (
      value
        .match(/.{1,4}/g)
        ?.join(" ")
        .trim() || ""
    );
  };

  return (
    <div>
      <Text className="text-sm py-4">
        Credit Card generally means a plastic card issued by Scheduled
        Commercial Banks assigned to a Cardholder, with a credit limit, that can
        be used to purchase goods and services on credit or obtain cash
        advances.
      </Text>

      <fetcher.Form method="POST">
        <SimpleGrid cols={cols} className="py-4">
          <FormElement
            name="type"
            type="select"
            label="Card Type"
            error={
              fetcher.data?.response.status === "error"
                ? fetcher.data?.response.message.type?._errors
                : undefined
            }
            value={formValues.type}
            onChange={(value) => handleChange("type", value)}
          />

          <FormElement
            name="name"
            type="text"
            label="Name On Card"
            placeholder="My Cards"
            error={
              fetcher.data?.response.status === "error"
                ? fetcher.data?.response.message.name?._errors
                : undefined
            }
            value={formValues.name}
            onChange={(value) => handleChange("name", value)}
          />

          <FormElement
            name="number"
            type="text"
            label="Card Number"
            placeholder="____  ____  ____  ____"
            error={
              fetcher.data?.response.status === "error"
                ? fetcher.data?.response.message.number?._errors
                : undefined
            }
            value={formatCardNumber(formValues.number)}
            onChange={(value) => handleNumberChange(value as string)}
          />

          <FormElement
            name="date"
            type="datePicker"
            label="Expiration Date"
            error={
              fetcher.data?.response.status === "error"
                ? fetcher.data?.response.message.date?._errors
                : undefined
            }
            value={formValues.date}
            onChange={(value) => handleChange("date", value)}
          />
        </SimpleGrid>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" className="my-2">
            ADD CARD
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddNewCard;

type FormElementProps = {
  label: string;
  name: string;
  error?: string[];
  value: string | Date | null;
  onChange: (value: string | Date | null) => void;
} & (
  | { type: "text"; placeholder: string }
  | { type: "datePicker"; placeholder?: string }
  | { type: "select"; placeholder?: string }
);

const FormElement = ({
  type,
  label,
  placeholder,
  name,
  error,
  onChange,
  value,
}: FormElementProps) => {
  const isError = error ? true : false;

  const handleValueClear = () => {
    onChange(type === "text" ? "" : null);
  };

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <label>
        <Text>{label}</Text>
      </label>

      <div className="relative">
        {type === "text" ? (
          <Input
            placeholder={placeholder}
            name={name}
            value={value as string}
            onChange={(e) => onChange(e.currentTarget.value)}
            error={isError}
          />
        ) : type === "datePicker" ? (
          <MonthPickerInput
            name={name}
            placeholder={placeholder || "Jan 2020"}
            value={value as Date | null}
            onChange={(date) => onChange(date)}
            error={isError}
          />
        ) : type === "select" ? (
          <Select
            name={name}
            defaultValue={"Physical"}
            placeholder="Pick type of Credit Card"
            data={["Physical", "Virtual"]}
            onChange={() => console.log("first")}
          />
        ) : null}

        {value && type !== "select" ? (
          <Button
            variant="transparent"
            onClick={handleValueClear}
            className="absolute bottom-0 right-0"
          >
            <X size={16} />
          </Button>
        ) : null}
      </div>

      {error ? (
        <Text className="text-red-500 text-sm m-0 p-0">{error[0]}</Text>
      ) : null}
    </div>
  );
};
