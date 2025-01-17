import { Button, Input, Select, Skeleton, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Undo2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { Override } from "~/types";
import AuthFiller from "../../common/AuthFiller";

type BaseInputProps = {
  label: string;
  name: string;
  type: "text" | "email" | "number" | "date" | "select" | "password";
  isLoading?: boolean;
  placeholder?: string;
  value?: string | number | undefined;
  data?: string[] | undefined;
  date?: Date | null | undefined;
  select?: string | undefined | null;
  withAuthFiller?: boolean | undefined;
  username?: string | undefined;
  password?: string | undefined;
};

type TextInputProps = Override<
  BaseInputProps,
  {
    type: "text";
    value: string | undefined;
  } & (
    | {
        withAuthFiller?: true;
        username: string;
      }
    | {
        withAuthFiller?: false;
        username?: undefined;
      }
  )
>;

type EmailInputProps = Override<
  BaseInputProps,
  {
    type: "email";
    value: string | undefined;
    withAuthFiller?: true;
  }
>;

type NumberInputProps = Override<
  BaseInputProps,
  {
    type: "number";
    value: number | undefined;
  }
>;

type DateInputProps = Override<
  BaseInputProps,
  {
    type: "date";
    date: Date | null | undefined;
  }
>;

type SelectInputProps = Override<
  BaseInputProps,
  {
    type: "select";
    data: string[];
    select: string | undefined;
  }
>;

type PasswordInputProps = Override<
  BaseInputProps,
  {
    type: "password";
  } & (
    | {
        withAuthFiller?: true;
        password: string;
      }
    | {
        withAuthFiller?: false;
        password?: undefined;
      }
  )
>;

type FormInputProps = BaseInputProps &
  (
    | TextInputProps
    | EmailInputProps
    | NumberInputProps
    | DateInputProps
    | SelectInputProps
    | PasswordInputProps
  );

const FormInput = ({
  type,
  label,
  placeholder,
  name,
  data = undefined,
  value = undefined,
  date = null,
  select = null,
  isLoading = false,
  withAuthFiller = false,
  password = undefined,
  username = undefined,
}: FormInputProps) => {
  const initialInputValue = value;
  const initialDateValue = date;
  const initialSelectValue = select;

  const [inputValue, setInputValue] = useState<string | number | undefined>(
    value
  );
  const [selectValue, setSelectValue] = useState<string | null>(select);
  const [dateValue, setDateValue] = useState<Date | null>(date);

  const handleAuthFill = () => {
    if (type === "text" && withAuthFiller) {
      setInputValue(username);
    } else {
      if (type === "password" && withAuthFiller) {
        setInputValue(password);
      }
    }
    return;
  };

  const handleClearValue = () => {
    setInputValue(initialInputValue);
    setDateValue(initialDateValue);
    setSelectValue(initialSelectValue);
  };

  if (isLoading)
    return (
      <InputContainer label={label}>
        <Skeleton className="h-9 rounded-3xl" />
      </InputContainer>
    );

  if (type === "select") {
    const isChanged = initialSelectValue !== selectValue;
    return (
      <>
        <InputContainer
          handleClearClick={handleClearValue}
          label={label}
          showUndoButton={isChanged}
        >
          <Select
            name={name}
            searchable
            radius={"lg"}
            placeholder={placeholder}
            data={data}
            value={selectValue ?? ""}
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
        handleClearClick={handleClearValue}
        label={label}
        showUndoButton={isChanged}
      >
        <div>
          <DateInput
            name={name}
            value={dateValue ?? null}
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
      handleAuthClick={handleAuthFill}
      handleClearClick={handleClearValue}
      label={label}
      showUndoButton={isChanged}
      withAuthFiller={withAuthFiller}
    >
      <Input
        name={name}
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
  label?: string;
  children?: ReactNode;
  showUndoButton?: boolean;
  withAuthFiller?: boolean;
  handleClearClick?: () => void;
  handleAuthClick?: () => void;
};

const InputContainer = ({
  label,
  children,
  showUndoButton,
  withAuthFiller = false,
  handleClearClick,
  handleAuthClick,
}: InputContainerProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between">
        <Text>{label}</Text>
        {handleAuthClick && withAuthFiller && (
          <AuthFiller handleClick={handleAuthClick} />
        )}
      </div>
      <div className="relative">
        {children}
        {handleClearClick && showUndoButton && (
          <UndoButton onClick={handleClearClick} />
        )}
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
