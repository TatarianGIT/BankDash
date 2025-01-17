import { ActionFunctionArgs } from "@remix-run/node";
import { defer, json, useFetchers, useLoaderData } from "@remix-run/react";
import LoadingItem from "~/components/common/LoadingItem";
import SecurityTab from "~/components/uncommon/setting/SecurityTab";
import {
  getPassword,
  getSecurity,
  updateSecurity,
} from "~/data/setting/mockedData";

export const loader = async () => {
  const security = getSecurity();
  const password = await getPassword();
  return defer({ security, password });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const updatedSecurity = {
    twoFa: formData.get("twoFa") === "on",
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  };

  const response = await updateSecurity(updatedSecurity);

  console.log(response);

  return json({ message: "ok" });
};

export const Security = () => {
  const { ...data } = useLoaderData<typeof loader>();
  const fetchers = useFetchers();
  const isLoading = fetchers[0]?.state === "loading";

  return (
    <>
      {isLoading ? (
        <SecurityTab isLoading={true} password={data.password} />
      ) : (
        <LoadingItem
          data={data.security}
          fallback={<SecurityTab isLoading={true} password={data.password} />}
        >
          {(response) => (
            <SecurityTab data={response} password={data.password} />
          )}
        </LoadingItem>
      )}
    </>
  );
};

export default Security;
