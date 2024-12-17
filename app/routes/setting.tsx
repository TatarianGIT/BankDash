import { Tabs, Text } from "@mantine/core";

import { Link, Outlet, useLocation } from "@remix-run/react";
import CardContainer from "~/components/common/CardContainer";

const SettingLayout = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split("/");

  return (
    <CardContainer className="w-full max-w-[1000px] my-auto px-2 md:px-4">
      <Tabs defaultValue={currentLocation[2]}>
        <Tabs.List className="flex justify-between md:justify-start">
          <Link to={"/setting/profile"}>
            <Tabs.Tab value="profile">
              <TabLabel>Edit Profile</TabLabel>
            </Tabs.Tab>
          </Link>
          <Link to={"/setting/preferences"}>
            <Tabs.Tab value="preferences">
              <TabLabel>Preferences</TabLabel>
            </Tabs.Tab>
          </Link>
          <Link to={"/setting/security"}>
            <Tabs.Tab value="security">
              <TabLabel>Security</TabLabel>
            </Tabs.Tab>
          </Link>
        </Tabs.List>

        <Outlet />
      </Tabs>
    </CardContainer>
  );
};

const TabLabel = ({ children }: { children: string }) => {
  return <Text className="text-xs sm:text-sm md:text-base">{children}</Text>;
};

export default SettingLayout;
