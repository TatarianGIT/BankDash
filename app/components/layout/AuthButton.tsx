import {
  ActionIcon,
  Avatar,
  Combobox,
  ComboboxOption,
  Divider,
  Text,
  UnstyledButton,
  useCombobox,
} from "@mantine/core";
import { Form, Link } from "@remix-run/react";
import { LogIn, LogOut, Settings } from "lucide-react";
import { cn } from "~/utils/cn";
import ThemeSwticher from "./ThemeSwitcher";

type AuthButtonProps = {
  userId: string | null;
  className?: string;
};

const AuthButton = ({ className, userId }: AuthButtonProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  if (!userId)
    return (
      <Link to={"/login"}>
        <ActionIcon
          variant="default"
          size="lg"
          aria-label="Toggle color scheme"
          className={className}
        >
          <LogIn />
        </ActionIcon>
      </Link>
    );

  return (
    <Combobox store={combobox} width={200}>
      <Combobox.Target>
        <UnstyledButton>
          <Avatar
            className={cn("rounded-md border-[1px] border-gray-600", className)}
            onClick={() => combobox.toggleDropdown()}
            src={`https://i.pravatar.cc/150?u=${userId}`}
          />
        </UnstyledButton>
      </Combobox.Target>

      <Combobox.Dropdown className="flex flex-col gap-2 justify-center items-center py-3">
        <ComboboxOption value="settings" className="w-full md:hidden">
          <ThemeSwticher
            withText
            text="Switch theme"
            className="flex gap-2 w-full justify-center py-1"
          />
        </ComboboxOption>

        <ComboboxDivider className="md:hidden" />

        <ComboboxOption value="settings" className="w-full">
          <Link
            to={"/setting"}
            onClick={() => combobox.toggleDropdown()}
            className="flex gap-2 justify-center items-center py-1 w-full"
          >
            <Text>Settings</Text>
            <Settings />
          </Link>
        </ComboboxOption>

        <ComboboxDivider />

        <ComboboxOption value="logout" className="w-full">
          <Form method="POST" action="/logout" className="w-full">
            <UnstyledButton
              type="submit"
              onClick={() => combobox.toggleDropdown()}
              variant="transparent"
              className="flex gap-2 py-1 w-full justify-center itemsc"
            >
              <Text>Logout</Text>
              <LogOut />
            </UnstyledButton>
          </Form>
        </ComboboxOption>
      </Combobox.Dropdown>
    </Combobox>
  );
};

const ComboboxDivider = ({ className }: { className?: string }) => {
  return (
    <ComboboxOption value={""} className={cn("w-full my-0 py-0", className)}>
      <Divider variant="solid" orientation="horizontal" size={"sm"} />
    </ComboboxOption>
  );
};

export default AuthButton;
