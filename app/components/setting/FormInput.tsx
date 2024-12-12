import { Button, Input, Select, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { X } from "lucide-react";
import { ReactNode, useState } from "react";

type FormInputProps = {
  label: string;
  placeholder?: string;
} & (
  | {
      type: "text" | "email" | "password" | "number" | "date";
      data?: undefined;
    }
  | { type: "select"; data: string[] }
);

const FormInput = ({ type, label, placeholder, data }: FormInputProps) => {
  const [value, setValue] = useState<string | number | undefined>();
  const [dateValue, setDateValue] = useState<Date | null>(null);

  const handleClearValue = () => {
    if (value || dateValue) {
      setValue("");
      setDateValue(null);
    }
  };

  if (type === "select")
    return (
      <InputContainer value={value} onClick={handleClearValue} label={label}>
        <Select placeholder={placeholder} data={data} searchable />
      </InputContainer>
    );

  if (type === "date")
    return (
      <InputContainer
        value={dateValue}
        onClick={handleClearValue}
        label={label}
      >
        <DateInput
          value={dateValue}
          onChange={setDateValue}
          placeholder="Date input"
          radius={"lg"}
        />
      </InputContainer>
    );

  return (
    <InputContainer value={value} onClick={handleClearValue} label={label}>
      <Input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        type={type}
        radius={"lg"}
        placeholder={placeholder}
      />
    </InputContainer>
  );
};

export default FormInput;

const ClearButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      variant="transparent"
      className="absolute right-2 bottom-0 p-0"
    >
      <X size={20} />
    </Button>
  );
};

type InputContainerProps = {
  label: string;
  children: ReactNode;
  value: (string | number | undefined) | (Date | null);
  onClick: () => void;
};

const InputContainer = ({
  label,
  children,
  value,
  onClick,
}: InputContainerProps) => {
  return (
    <div className="flex flex-col">
      <Text>{label}</Text>
      <div className="relative">
        {children}
        {value && <ClearButton onClick={onClick} />}
      </div>
    </div>
  );
};
