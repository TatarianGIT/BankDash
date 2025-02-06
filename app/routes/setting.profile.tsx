import { ActionFunctionArgs } from "@remix-run/node";
import { defer, json, useFetchers, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/auth/auth";
import LoadingItem from "~/components/common/LoadingItem";
import ProfileTab from "~/components/uncommon/setting/ProfileTab";
import {
  getPassword,
  getProfile,
  getUsername,
  updateProfile,
} from "~/data/setting/mockedData";

export const loader = async () => {
  const profile = getProfile();
  const password = await getPassword();
  const username = await getUsername();
  return defer({ profile, password, username });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireAuth(request);

  const formData = await request.formData();

  const updatedProfile = {
    fullName: formData.get("fullName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    birthDate: formData.get("birthDate"),
    presentAddress: formData.get("presentAddress"),
    permaAddress: formData.get("permaAddress"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
  };

  const response = await updateProfile(updatedProfile);

  return json(response);
};

export const Profile = () => {
  const { ...data } = useLoaderData<typeof loader>();
  const fetchers = useFetchers();
  const isLoading = fetchers[0]?.state === "loading";

  return (
    <>
      {isLoading ? (
        <ProfileTab
          isLoading={true}
          password={data.password}
          username={data.username}
        />
      ) : (
        <LoadingItem
          data={data.profile}
          fallback={
            <ProfileTab
              isLoading={true}
              password={data.password}
              username={data.username}
            />
          }
        >
          {(response) => (
            <ProfileTab
              data={response}
              password={data.password}
              username={data.username}
            />
          )}
        </LoadingItem>
      )}
    </>
  );
};

export default Profile;
