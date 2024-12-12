import { Tabs, Text } from "@mantine/core";
import CardContainer from "../common/CardContainer";

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
          Profile Tab
        </Tabs.Panel>

        <Tabs.Panel value="preferences">
          Preferences
        </Tabs.Panel>

        <Tabs.Panel value="security">
          Security
        </Tabs.Panel>
      </Tabs>
    </CardContainer>
  );
};

const TabLabel = ({ children }: { children: string }) => {
  return <Text className="text-xs sm:text-sm md:text-base">{children}</Text>;
};

export default SettingCard;
