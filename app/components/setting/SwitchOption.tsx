import { Switch } from "@mantine/core";
import { useState } from "react";

const SwitchOption = ({
  label,
  checked,
}: {
  label: string;
  checked: boolean | undefined;
}) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(checked);

  return (
    <Switch
      label={label}
      checked={isChecked ?? false}
      onChange={(e) => setIsChecked(e.currentTarget.checked)}
    />
  );
};

export default SwitchOption;
