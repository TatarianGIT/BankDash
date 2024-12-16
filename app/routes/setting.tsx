import { Tabs, Text } from "@mantine/core";

import {
  getPreferences,
  getProfile,
  getSecurity,
  PreferencesType,
  ProfileType,
  SecurityType,
} from "~/data/setting/mockedData";
import { json, useLoaderData } from "@remix-run/react";
import CardContainer from "~/components/common/CardContainer";
import ProfileTab from "~/components/setting/ProfileTab";
import PreferencesTab from "~/components/setting/PreferencesTab";
import SecurityTab from "~/components/setting/SecurityTab";

export const loader = async () => {
  const profile: ProfileType = await getProfile();
  const preferences: PreferencesType = await getPreferences();
  const security: SecurityType = await getSecurity();

  return json({ profile, preferences, security });
};

const Setting = () => {
  const { ...data } = useLoaderData<typeof loader>();

  return (
    <CardContainer className="w-full max-w-[1000px] my-auto px-2 md:px-4">
      <Tabs defaultValue={"profile"} className="">
        <Tabs.List className="flex justify-between md:justify-start">
          <Tabs.Tab value="profile">
            <TabLabel>Edit Profile</TabLabel>
          </Tabs.Tab>
          <Tabs.Tab value="preferences">
            <TabLabel>Preferences</TabLabel>
          </Tabs.Tab>
          <Tabs.Tab value="security">
            <TabLabel>Security</TabLabel>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <ProfileTab data={data.profile} />
        </Tabs.Panel>

        <Tabs.Panel value="preferences">
          <PreferencesTab data={data.preferences} />
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <SecurityTab data={data.security} />
        </Tabs.Panel>
      </Tabs>
    </CardContainer>
  );
};

const TabLabel = ({ children }: { children: string }) => {
  return <Text className="text-xs sm:text-sm md:text-base">{children}</Text>;
};

export default Setting;
