import "@mantine/core/styles.css";

import { AppShell, Burger, Grid, Group, ScrollArea, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigation } from "@remix-run/react";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";
import { useUser } from "~/context/userContext.js";
import AppLogo from "./AppLogo.js";
import AuthButton from "./AuthButton.js";
import NavBar, { navList } from "./NavBar.js";
import Spotlight from "./Spotlight.js";
import ThemeSwticher from "./ThemeSwitcher.js";

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  const user = useUser();

  const [opened, { toggle }] = useDisclosure();

  const location = useLocation();
  const navigation = useNavigation();

  const isLoading =
    navigation.state === "loading" &&
    navigation.location.pathname !== "/transaction";

  const currentPath =
    location.pathname === "/" ? "/" : location.pathname.split("/")[1];

  const header =
    navList.find((item) => item.value === currentPath)?.label || "";

  const toggleNavBar = () => {
    toggle();
  };

  return (
    <AppShell
      layout="alt"
      header={{ height: { base: 60, sm: 70, md: 80, lg: 90 } }}
      navbar={{
        width: user
          ? { sm: "220px", md: "260px", lg: "300px", xl: "360px" }
          : { base: "0px" },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding={"md"}
    >
      <AppShell.Header>
        <div className="flex justify-between items-center h-full px-4">
          {user ? (
            <>
              <div className="flex gap-2 items-center sm:hidden">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                  lineSize={2}
                />
                <div className="h-10 w-10 invisible sm:hidden"></div>
              </div>

              <Text className="text-2xl shrink-0">{header}</Text>

              <Spotlight size={"lg"} className="hidden md:flex" />
              <Spotlight size={"md"} className="hidden sm:flex md:hidden" />
            </>
          ) : (
            <div>
              <AppLogo />
            </div>
          )}

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Spotlight size={"sm"} className="inline-block sm:hidden" />
                <ThemeSwticher className="w-10 h-10 p-2 max-md:hidden" />
              </>
            ) : (
              <ThemeSwticher className="w-10 h-10 p-2" />
            )}

            <AuthButton className="w-10 h-10" />
          </div>
        </div>
      </AppShell.Header>

      {user && (
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
            <NavBar navBarClick={toggleNavBar} />
          </ScrollArea>
        </AppShell.Navbar>
      )}

      <AppShell.Main className="bg-gray-50 dark:bg-stone-800 flex">
        {isLoading ? (
          <div className="flex-1 justify-center items-center flex">
            <LoadingSpinner />
          </div>
        ) : (
          <Grid
            className="gap-7 max-w-[1300px] w-full mx-auto"
            align="stretch"
            justify="center"
          >
            {children}
          </Grid>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

const LoadingSpinner = () => {
  return <LoaderCircle className="w-10 h-10 animate-spin" />;
};

export default AppLayout;
