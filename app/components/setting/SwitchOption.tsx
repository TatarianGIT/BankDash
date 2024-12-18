import { Skeleton, Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import { WithLoading } from "~/types";

type SwitchOptionsProps = WithLoading<{
  label: string;
  checked: boolean | undefined;
}>;

const SwitchOption = ({ label, checked, isLoading }: SwitchOptionsProps) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(checked);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(Math.floor(Math.random() * (200 - 100 + 1) + 100));
  }, []);

  if (isLoading) {
    return (
      <Switch
        disabled
        label={<Skeleton className={`h-5`} style={{ width: width + "px" }} />}
        onChange={(e) => setIsChecked(e.currentTarget.checked)}
      />
    );
  }

  return (
    <Switch
      label={label}
      checked={isChecked ?? false}
      onChange={(e) => setIsChecked(e.currentTarget.checked)}
    />
  );
};

export default SwitchOption;
