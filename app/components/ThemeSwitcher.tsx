import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { SunMoon } from "lucide-react";

type ThemeSwitcherProps = {
  className?: string;
};

function ThemeSwticher({ className }: ThemeSwitcherProps) {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const handleColorSchemeChange = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  return (
    <ActionIcon
      onClick={handleColorSchemeChange}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      className={className}
    >
      <SunMoon />
    </ActionIcon>
  );
}

export default ThemeSwticher;
