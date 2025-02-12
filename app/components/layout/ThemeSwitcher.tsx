import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import { cn } from "~/utils/cn";

type ThemeSwitcherProps = {
  className?: string;
} & (
  | { withText?: true; text: string }
  | { withText?: false; text?: undefined }
);

function ThemeSwticher({ className, withText, text }: ThemeSwitcherProps) {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const handleColorSchemeChange = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  if (!withText)
    return (
      <ActionIcon
        onClick={handleColorSchemeChange}
        variant="default"
        aria-label="Toggle color scheme"
        className={cn("rounded-md", className)}
      >
        <Sun className="dark:hidden inline-block" />
        <Moon className="hidden dark:inline-block" />
      </ActionIcon>
    );

  return (
    <UnstyledButton onClick={handleColorSchemeChange} className={className}>
      <Text>{text}</Text>
      <Sun className="dark:hidden inline-block" />
      <Moon className="hidden dark:inline-block" />
    </UnstyledButton>
  );
}

export default ThemeSwticher;
