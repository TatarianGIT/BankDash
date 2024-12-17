import { Tabs, Text } from "@mantine/core";

import { defer, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import CardContainer from "~/components/common/CardContainer";
import LoadingItem from "~/components/common/LoadingItem";
import PreferencesTab from "~/components/setting/PreferencesTab";
import ProfileTab from "~/components/setting/ProfileTab";
import SecurityTab from "~/components/setting/SecurityTab";
import {
  getPreferences,
  getProfile,
  getSecurity,
} from "~/data/setting/mockedData";

export const loader = async () => {
  const profile = getProfile();
  const preferences = getPreferences();
  const security = getSecurity();

  return defer({ profile, preferences, security });
};

const Setting = () => {
  const [activeTab, setActiveTab] = useState<string | null>("profile");

  const { ...data } = useLoaderData<typeof loader>();

  return (
    <CardContainer className="w-full max-w-[1000px] my-auto px-2 md:px-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
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

        <LoadingItem
          data={data.profile}
          fallback={
            <Tabs.Panel value="profile">
              <ProfileTab isLoading={true} />
            </Tabs.Panel>
          }
        >
          {(response) => (
            <Tabs.Panel value="profile">
              <ProfileTab data={response} />
            </Tabs.Panel>
          )}
        </LoadingItem>

        <LoadingItem
          data={data.preferences}
          fallback={
            <Tabs.Panel value="profile">
              <PreferencesTab isLoading={true} />
            </Tabs.Panel>
          }
        >
          {(response) => (
            <Tabs.Panel value="preferences">
              <PreferencesTab data={response} />
            </Tabs.Panel>
          )}
        </LoadingItem>

        <LoadingItem
          data={data.security}
          fallback={
            <Tabs.Panel value="profile">
              <SecurityTab isLoading={true} />
            </Tabs.Panel>
          }
        >
          {(response) => (
            <Tabs.Panel value="security">
              <SecurityTab data={response} />
            </Tabs.Panel>
          )}
        </LoadingItem>
      </Tabs>
    </CardContainer>
  );
};

const TabLabel = ({ children }: { children: string }) => {
  return <Text className="text-xs sm:text-sm md:text-base">{children}</Text>;
};

export default Setting;
