import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { Moon, Sun } from "lucide-react";

function ThemeSwticher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      className="w-10 h-10"
    >
      {computedColorScheme === "light" ? <Sun /> : <Moon />}
    </ActionIcon>
  );
}

export default ThemeSwticher;
