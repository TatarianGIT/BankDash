import { Tabs, Text } from "@mantine/core";
import CardContainer from "../common/CardContainer";
import ProfileTab from "./ProfileTab";
import PreferencesTab from "./PreferencesTab";
import SecurityTab from "./SecurityTab";

const SettingCard = () => {
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
          <ProfileTab />
        </Tabs.Panel>

        <Tabs.Panel value="preferences">
          <PreferencesTab />
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <SecurityTab />
        </Tabs.Panel>
      </Tabs>
    </CardContainer>
  );
};

const TabLabel = ({ children }: { children: string }) => {
  return <Text className="text-xs sm:text-sm md:text-base">{children}</Text>;
};

export default SettingCard;
