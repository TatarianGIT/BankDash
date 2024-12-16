import { Button, Input, Select, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Undo2 } from "lucide-react";
import { ReactNode, useState } from "react";

type FormInputProps = {
  label: string;
  placeholder?: string;
} & (
  | (
      | {
          type: "text" | "email";
          value: string;
          data?: undefined;
          date?: null;
          select?: null;
        }
      | {
          type: "number";
          value: number;
          data?: undefined;
          date?: null;
          select?: null;
        }
    )
  | {
      type: "date";
      value?: undefined;
      data?: undefined;
      date: Date | null;
      select?: null;
    }
  | {
      type: "select";
      value?: undefined;
      data: string[];
      date?: null;
      select: string;
    }
  | {
      type: "password";
      value?: undefined;
      data?: undefined;
      date?: null;
      select?: null;
    }
);

const FormInput = ({
  type,
  label,
  placeholder,
  data = undefined,
  value = undefined,
  date = null,
  select = null,
}: FormInputProps) => {
  const initialInputValue = value;
  const initialDateValue = date;
  const initialSelectValue = select;

  const [inputValue, setInputValue] = useState<string | number | undefined>(
    value
  );
  const [selectValue, setSelectValue] = useState<string | null>(select);
  const [dateValue, setDateValue] = useState<Date | null>(date);

  const handleClearValue = () => {
    setInputValue(initialInputValue);
    setDateValue(initialDateValue);
    setSelectValue(initialSelectValue);
  };

  if (type === "select") {
    const isChanged = initialSelectValue !== selectValue;
    return (
      <>
        <InputContainer
          onClick={handleClearValue}
          label={label}
          showUndoButton={isChanged}
        >
          <Select
            searchable
            placeholder={placeholder}
            data={data}
            value={selectValue}
            onChange={setSelectValue}
            nothingFoundMessage="Nothing found..."
            styles={{ section: { display: "none" } }}
          />
        </InputContainer>
      </>
    );
  }

  if (type === "date") {
    const isChanged =
      initialDateValue?.toDateString() !== dateValue?.toDateString();
    return (
      <InputContainer
        onClick={handleClearValue}
        label={label}
        showUndoButton={isChanged}
      >
        <div>
          <DateInput
            value={dateValue}
            onChange={setDateValue}
            placeholder="Date input"
            radius={"lg"}
          />
        </div>
      </InputContainer>
    );
  }

  const isChanged = initialInputValue !== inputValue;
  return (
    <InputContainer
      onClick={handleClearValue}
      label={label}
      showUndoButton={isChanged}
    >
      <Input
        value={inputValue ?? ""}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        type={type}
        radius={"lg"}
        placeholder={placeholder}
      />
    </InputContainer>
  );
};

export default FormInput;

type InputContainerProps = {
  label: string;
  children: ReactNode;
  showUndoButton: boolean;
  onClick: () => void;
};

const InputContainer = ({
  label,
  children,
  onClick,
  showUndoButton,
}: InputContainerProps) => {
  return (
    <div className="flex flex-col">
      <Text>{label}</Text>
      <div className="relative">
        {children}
        {showUndoButton && <UndoButton onClick={onClick} />}
      </div>
    </div>
  );
};

const UndoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      variant="transparent"
      className="absolute right-3 bottom-0 p-0"
    >
      <Undo2 size={20} />
    </Button>
  );
};
