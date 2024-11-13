import "@mantine/core/styles.css";

import {
  AppShell,
  Burger,
  Container,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ThemeSwticher from "./ThemeSwitcher.js";
import { ReactNode } from "react";
import { useLocation } from "@remix-run/react";
import NavBar, { navList } from "./NavBar.js";
import AppLogo from "./AppLogo.js";

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
      header={{ height: { base: 60, md: 85, lg: 100 } }}
      navbar={{
        width: { sm: "220px", md: "260px", lg: "300px", xl: "360px" },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" className="flex justify-between">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size={"md"}
            lineSize={2}
          />
          <Text className="text-2xl">{header}</Text>
          <ThemeSwticher className="w-10 h-10 p-2" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Group h={100}>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            className={`${opened ? "absolute right-10" : ""}`}
            size={"md"}
            lineSize={2}
          />
          <AppLogo />
        </Group>
        <ScrollArea type="auto">
          <NavBar />
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container className="px-2 py-0 w-full max-w-[1500px] ">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

const CenterAside = () => {
  return <div className="mx-auto sm:hidden" />;
};

export default AppLayout;
