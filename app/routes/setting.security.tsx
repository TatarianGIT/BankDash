import { defer, useLoaderData } from "@remix-run/react";
import LoadingItem from "~/components/common/LoadingItem";
import SecurityTab from "~/components/setting/SecurityTab";
import { getSecurity } from "~/data/setting/mockedData";

export const loader = async () => {
  const security = getSecurity();
  return defer({ security });
};

export const Security = () => {
  const { ...data } = useLoaderData<typeof loader>();

  return (
    <LoadingItem
      data={data.security}
      fallback={<SecurityTab isLoading={true} />}
    >
      {(response) => <SecurityTab data={response} />}
    </LoadingItem>
  );
};

export default Security;
