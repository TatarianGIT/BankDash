import { ActionFunctionArgs } from "@remix-run/node";
import { defer, json, useFetchers, useLoaderData } from "@remix-run/react";
import LoadingItem from "~/components/common/LoadingItem";
import ProfileTab from "~/components/uncommon/setting/ProfileTab";
import {
  getPassword,
  getProfile,
  updateProfile,
} from "~/data/setting/mockedData";

export const loader = async () => {
  const profile = getProfile();
  const password = await getPassword();
  return defer({ profile, password });
};

export const action = async ({ request }: ActionFunctionArgs) => {
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

  console.log(response);

  return json({ message: "ok" });
};

export const Profile = () => {
  const { ...data } = useLoaderData<typeof loader>();
  const fetchers = useFetchers();
  const isLoading = fetchers[0]?.state === "loading";

  return (
    <>
      {isLoading ? (
        <ProfileTab isLoading={true} password={data.password} />
      ) : (
        <LoadingItem
          data={data.profile}
          fallback={<ProfileTab isLoading={true} password={data.password} />}
        >
          {(response) => (
            <ProfileTab data={response} password={data.password} />
          )}
        </LoadingItem>
      )}
    </>
  );
};

export default Profile;
