import { Skeleton, Switch } from "@mantine/core";
import { useState } from "react";
import { WithLoading } from "~/types";

type SwitchOptionsProps = WithLoading<{
  label: string;
  checked: boolean | undefined;
}>;

const SwitchOption = ({ label, checked, isLoading }: SwitchOptionsProps) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(checked);

  if (isLoading)
    return (
      <div className="flex gap-2">
        <Skeleton className="w-10 rounded-3xl" />
        {label}
      </div>
    );

  return (
    <Switch
      label={label}
      checked={isChecked ?? false}
      onChange={(e) => setIsChecked(e.currentTarget.checked)}
    />
  );
};

export default SwitchOption;
