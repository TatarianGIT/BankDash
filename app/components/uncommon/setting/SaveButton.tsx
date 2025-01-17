import { Button as MantineButton } from "@mantine/core";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn";

type SaveButtonProps = {
  isLoading?: boolean;
  isSubmitting?: boolean;
};

const SaveButton = ({
  isLoading = false,
  isSubmitting = false,
}: SaveButtonProps) => {
  if (isLoading) return <Button isDisabled={true}>Save</Button>;

  if (isSubmitting)
    return (
      <Button className="px-6">
        Saving <LoaderCircle className="ml-2 animate-spin w-4 h-4" />
      </Button>
    );

  return <Button> Save</Button>;
};

const Button = ({
  children,
  className,
  isDisabled = false,
}: {
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
}) => {
  return (
    <MantineButton
      variant="filled"
      disabled={isDisabled}
      type="submit"
      className={cn("px-10 mt-6 mb-2", className)}
    >
      {children}
    </MantineButton>
  );
};

export default SaveButton;
