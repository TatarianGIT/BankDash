import Item from "~/components/common/Item";
import BankServiceList from "~/components/service/BankServiceList";
import ServiceBadgeSection from "~/components/service/ServiceBadgeSection";

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
