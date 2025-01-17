import { ActionIcon, Tooltip } from "@mantine/core";
import { LockOpen } from "lucide-react";

type AuthFillerProps = {
  handleClick: () => void;
};

const AuthFiller = ({ handleClick }: AuthFillerProps) => {
  return (
    <Tooltip label={"Fill with credentials"}>
      <ActionIcon variant="light" size={"sm"} onClick={handleClick}>
        <LockOpen />
      </ActionIcon>
    </Tooltip>
  );
};

export default AuthFiller;
