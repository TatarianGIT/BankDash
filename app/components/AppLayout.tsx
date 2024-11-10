import "@mantine/core/styles.css";

import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ThemeSwticher from "./ThemeSwitcher.js";
import { ReactNode } from "react";
import NavBar from "./NavBar.js";
import AppLogo from "./AppLogo.js";
import { useLocation } from "@remix-run/react";
import { navList } from "~/data/NavList";

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  const location = useLocation();

  const header =
    navList.find((element) => element.value === location.pathname)?.label || "";

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text className="text-2xl">{header}</Text>
          <ThemeSwticher className="w-10 h-10 p-2 ml-auto" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Group h="60px">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <AppLogo />
        </Group>
        <NavBar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
