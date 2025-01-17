import { Text } from "@mantine/core";
import SwitchOption from "./SwitchOption";
import FormInput from "./FormInput";
import SaveButton from "./SaveButton";
import { SecurityType } from "~/data/setting/mockedData";
import { WithLoading } from "~/types";
import { useFetcher } from "@remix-run/react";

type SecurityTabProps = WithLoading<{
  data?: SecurityType;
}> & { password: string };

const SecurityTab = ({ data, isLoading, password }: SecurityTabProps) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="POST"
      className="pt-10 px-1 md:px-6 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        <Text>Two-factor Authentication</Text>
        <SwitchOption
          name={"twoFa"}
          isLoading={isLoading}
          checked={data?.twoFa}
          label="Enable or disable two factor authentication"
        />
      </div>

      <div className="md:w-1/2 sm:w-3/5 w-full max-w-96 flex flex-col gap-3">
        <Text>Change Password</Text>
        <FormInput
          withAuthFiller
          password={password}
          name={"currentPassword"}
          isLoading={isLoading}
          type="password"
          placeholder="**********"
          label="Current Password"
        />
        <FormInput
          name={"newPassword"}
          isLoading={isLoading}
          type="password"
          placeholder="**********"
          label="New Password"
        />
      </div>

      <div className="flex justify-end">
        <SaveButton
          isLoading={isLoading}
          isSubmitting={fetcher.state === "submitting"}
        />
      </div>
    </fetcher.Form>
  );
};

export default SecurityTab;
