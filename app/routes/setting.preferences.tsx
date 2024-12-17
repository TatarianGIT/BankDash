import { defer, useLoaderData } from "@remix-run/react";
import LoadingItem from "~/components/common/LoadingItem";
import PreferencesTab from "~/components/setting/PreferencesTab";
import { getPreferences } from "~/data/setting/mockedData";

export const loader = async () => {
  const preferences = getPreferences();
  return defer({ preferences });
};

export const Preferences = () => {
  const { ...data } = useLoaderData<typeof loader>();

  return (
    <LoadingItem
      data={data.preferences}
      fallback={<PreferencesTab isLoading={true} />}
    >
      {(response) => <PreferencesTab data={response} />}
    </LoadingItem>
  );
};

export default Preferences;
