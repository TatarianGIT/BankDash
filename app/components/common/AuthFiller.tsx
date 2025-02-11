import { ActionIcon, Tooltip } from "@mantine/core";
import { LockOpen } from "lucide-react";

type AuthFillerProps = {
  handleClick: () => void;
  className?: string;
};

const AuthFiller = ({ handleClick, className }: AuthFillerProps) => {
  return (
    <Tooltip label={"Fill with credentials"} className={className}>
      <ActionIcon variant="light" size={"sm"} onClick={handleClick}>
        <LockOpen />
      </ActionIcon>
    </Tooltip>
  );
};

export default AuthFiller;
