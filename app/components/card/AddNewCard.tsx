import { Button, Input, SimpleGrid, Text, useMatches } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import CardContainer from "../common/CardContainer";
import { z } from "zod";
import { useFetcher } from "@remix-run/react";
import { action } from "~/routes/card";

export const cardFormSchema = z.object({
  type: z.string().min(1, "Card Type is required"),
  name: z.string().min(1, "Name On Card is required"),
  number: z
    .string()
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Invalid Card Number"),
  date: z.string().min(1, "Expiration Date is required"),
});

const AddNewCard = () => {
  const fetcher = useFetcher<typeof action>();

  const [formValues, setFormValues] = useState({
    type: "",
    name: "",
    number: "",
    date: null,
  });

  const cols = useMatches({
    base: 1,
    md: 2,
  });

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data?.error) {
      setFormValues({ type: "", name: "", number: "", date: null });
    }
  }, [fetcher.state, fetcher.data]);

  const handleChange = (name: string, value: string | Date | null) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CardContainer>
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
            type="text"
            label="Card Type"
            placeholder="Classic"
            error={fetcher.data?.error?.type}
            value={formValues.type}
            onChange={(value) => handleChange("type", value)}
          />

          <FormElement
            name="name"
            type="text"
            label="Name On Card"
            placeholder="My Cards"
            error={fetcher.data?.error?.name}
            value={formValues.name}
            onChange={(value) => handleChange("name", value)}
          />

          <FormElement
            name="number"
            type="text"
            label="Card Number"
            placeholder="**** **** **** ****"
            error={fetcher.data?.error?.number}
            value={formValues.number}
            onChange={(value) => handleChange("number", value)}
          />

          <FormElement
            name="date"
            type="datePicker"
            label="Expiration Date"
            error={fetcher.data?.error?.date}
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
    </CardContainer>
  );
};

export default AddNewCard;

type FormElementProps = {
  label: string;
  name: string;
  error: { _errors: string[] } | undefined;
  value: string | Date | null;
  onChange: (value: string | Date | null) => void;
} & (
  | { type: "text"; placeholder: string }
  | { type: "datePicker"; placeholder?: string }
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
        ) : null}

        {value ? (
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
        <Text className="text-red-500 text-sm m-0 p-0">{error._errors[0]}</Text>
      ) : null}
    </div>
  );
};
