import { Button as MantineButton } from "@mantine/core";

const SaveButton = ({ isLoading = false }: { isLoading?: boolean }) => {
  if (isLoading) return <Button label="Save" isDisabled={true} />;

  return <Button label="Save" />;
};

const Button = ({
  label,
  isDisabled = false,
}: {
  label: string;
  isDisabled?: boolean;
}) => {
  return (
    <MantineButton
      variant="filled"
      disabled={isDisabled}
      type="submit"
      className="px-10 mt-6 mb-2"
    >
      {label}
    </MantineButton>
  );
};

export default SaveButton;
