import { LoaderFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/auth/auth";
import Item from "~/components/common/Item";
import BankServiceList from "~/components/uncommon/service/BankServiceList";
import ServiceBadgeSection from "~/components/uncommon/service/ServiceBadgeSection";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await requireAuth(request);
};

const Service = () => {
  return (
    <>
      <ServiceBadgeSection />

      <Item leftHeading="Back Services List" size="full">
        <BankServiceList />
      </Item>
    </>
  );
};

export default Service;
