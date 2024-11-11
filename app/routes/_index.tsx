import type { MetaFunction } from "@remix-run/node";
import CreditCard from "~/components/CreditCard";
import ItemGrid from "~/components/ItemCard";

export const meta: MetaFunction = () => {
  return [
    { title: "BusinessApp" },
    { name: "description", content: "Welcome to BusinessApp!" },
  ];
};

export default function Index() {
  return (
    <ItemGrid leftHeading="My Cards" variant="alt" rightHeading="See All">
      <CreditCard
        upperColor="bg-gradient-to-bl from-[#0A06F4] from-50% to-[#4C49ED]"
        bottomColor="bg-gradient-to-b from-[#4C49ED] from-15% to-[#0A06F4] "
      />
      <CreditCard upperColor="bg-gray-100" bottomColor="bg-gray-100" />
    </ItemGrid>
  );
}
