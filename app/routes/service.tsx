import Item from "~/components/common/Item";
import BankServiceList from "~/components/uncommon/service/BankServiceList";
import ServiceBadgeSection from "~/components/uncommon/service/ServiceBadgeSection";

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
