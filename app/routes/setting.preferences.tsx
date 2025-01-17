import { ActionFunctionArgs } from "@remix-run/node";
import { defer, json, useFetchers, useLoaderData } from "@remix-run/react";
import LoadingItem from "~/components/common/LoadingItem";
import PreferencesTab from "~/components/uncommon/setting/PreferencesTab";
import { getPreferences, updatePreferences } from "~/data/setting/mockedData";

export const loader = async () => {
  const preferences = getPreferences();
  return defer({ preferences });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const newPreferences = {
    currency: formData.get("currency"),
    timeZone: formData.get("timeZone"),
    digitalCurrency: formData.get("digitalCurrency") === "on",
    merchantOrder: formData.get("merchantOrder") === "on",
    recommendation: formData.get("recommentations") === "on",
  };

  const response = await updatePreferences(newPreferences);

  return json(response);
};

export const Preferences = () => {
  const { ...data } = useLoaderData<typeof loader>();
  const fetchers = useFetchers();
  const isLoading = fetchers[0]?.state === "loading";

  return (
    <>
      {isLoading ? (
        <PreferencesTab isLoading={true} />
      ) : (
        <LoadingItem
          data={data.preferences}
          fallback={<PreferencesTab isLoading={true} />}
        >
          {(response) => <PreferencesTab data={response} />}
        </LoadingItem>
      )}
    </>
  );
};

export default Preferences;
