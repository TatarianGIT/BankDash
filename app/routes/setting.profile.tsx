import { defer, useLoaderData } from "@remix-run/react";
import LoadingItem from "~/components/common/LoadingItem";
import ProfileTab from "~/components/setting/ProfileTab";
import { getProfile } from "~/data/setting/mockedData";

export const loader = async () => {
  const profile = getProfile();
  return defer({ profile });
};

export const Profile = () => {
  const { ...data } = useLoaderData<typeof loader>();

  return (
    <LoadingItem data={data.profile} fallback={<ProfileTab isLoading={true} />}>
      {(response) => <ProfileTab data={response} />}
    </LoadingItem>
  );
};

export default Profile;
