import { Text } from "@mantine/core";
import SwitchOption from "./SwitchOption";
import FormInput from "./FormInput";
import SaveButton from "./SaveButton";
import { SecurityType } from "~/data/setting/mockedData";
import { WithLoading } from "~/types";

type SecurityTabProps = WithLoading<{
  data?: SecurityType;
}>;

const SecurityTab = ({ data, isLoading }: SecurityTabProps) => {
  return (
    <div className="pt-10 px-1 md:px-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Text>Two-factor Authentication</Text>
        <SwitchOption
          isLoading={isLoading}
          checked={data?.twoFa}
          label="Enable or disable two factor authentication"
        />
      </div>

      <div className="w-1/2 flex flex-col gap-3">
        <Text>Change Password</Text>
        <FormInput
          isLoading={isLoading}
          type="password"
          placeholder="**********"
          label="Current Password"
        />
        <FormInput
          isLoading={isLoading}
          type="password"
          placeholder="**********"
          label="New Password"
        />
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
};

export default SecurityTab;
