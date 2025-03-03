import { Button } from "@mantine/core";
import { RotateCcw } from "lucide-react";

type RepayButtonProps = {
  isDisabled?: boolean;
  rightSection?: string;
  handleClick: () => void;
};

const RepayButton = ({
  isDisabled = false,
  rightSection,
  handleClick,
}: RepayButtonProps) => {
  return (
    <>
      <Button
        disabled={isDisabled}
        variant="outline"
        className="hidden md:inline-block rounded-full md:w-28"
        aria-label="Repay loan"
        onClick={handleClick}
      >
        Repay {rightSection}
      </Button>

      <Button
        disabled={isDisabled}
        variant="outline"
        className="md:hidden rounded-full md:w-28 relative"
        aria-label="Repay loan"
        onClick={handleClick}
      >
        {rightSection ? (
          <>
            <span className="px-2 text-xs">{rightSection}</span>
            <div className="absolute inset-0">
              <RotateCcw size={32} strokeWidth={1} className="m-auto h-full" />
            </div>
          </>
        ) : (
          <RotateCcw />
        )}
      </Button>
    </>
  );
};

export default RepayButton;
