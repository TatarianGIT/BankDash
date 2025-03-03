import { NumberFormatter } from "@mantine/core";

const FormatedNumber = ({ value }: { value: number | string }) => {
  return (
    <NumberFormatter
      thousandSeparator
      prefix="$"
      value={Number(value).toFixed(2)}
    />
  );
};

export default FormatedNumber;
