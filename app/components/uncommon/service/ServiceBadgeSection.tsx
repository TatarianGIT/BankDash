import { ShieldCheck, ShoppingBag, Stethoscope } from "lucide-react";
import ItemBadgeContainer, { ItemBadge } from "../../common/ItemBadge";

const ServiceBadgeSection = () => {
  return (
    <ItemBadgeContainer colSpan={12} shouldOverflow>
      <ItemBadge
        colSpan={4}
        icon={<Stethoscope size={30} className="text-blue-500" />}
        backgroundColor="bg-blue-500/25"
        heading="Life Insurance"
        description={"Unlimited protection"}
        type="number"
      />
      <ItemBadge
        colSpan={4}
        icon={<ShoppingBag size={30} className="text-amber-500" />}
        backgroundColor="bg-amber-500/25"
        heading="Shopping"
        description={"Buy. Think. Grow"}
        type="$"
      />
      <ItemBadge
        colSpan={4}
        icon={<ShieldCheck size={30} className="text-cyan-500" />}
        backgroundColor="bg-cyan-500/25"
        heading="Safety"
        description={"We are your allies"}
        type="$"
      />
    </ItemBadgeContainer>
  );
};

export default ServiceBadgeSection;
