import { Switch } from "@mantine/core";
import { useState } from "react";

const SwitchOption = ({
  label,
  checked,
}: {
  label: string;
  checked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  return (
    <Switch
      label={label}
      checked={isChecked}
      onChange={(e) => setIsChecked(e.currentTarget.checked)}
    />
  );
};

export default SwitchOption;
