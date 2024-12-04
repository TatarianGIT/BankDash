import { useMatches } from "@mantine/core";
import ItemBadgeContainer, { ItemBadge } from "../common/ItemBadge";
import {
  BriefcaseBusiness,
  ChartColumnIncreasing,
  PencilRuler,
  User,
} from "lucide-react";

const LoanBadgeSection = () => {
  const colSpan = useMatches({
    base: 1,
    md: 3,
  });

  return (
    <ItemBadgeContainer colSpan={12}>
      <ItemBadge
        colSpan={colSpan}
        icon={<User size={30} className="text-blue-500" />}
        backgroundColor="bg-blue-500/25"
        heading="Personal Loans"
        description={50_000}
        type="$"
      />
      <ItemBadge
        colSpan={colSpan}
        icon={<BriefcaseBusiness size={30} className="text-amber-500" />}
        backgroundColor="bg-amber-500/25"
        heading="Corporate Loans"
        description={100_000}
        type="$"
      />
      <ItemBadge
        colSpan={colSpan}
        icon={<ChartColumnIncreasing size={30} className="text-pink-500" />}
        backgroundColor="bg-pink-500/25"
        heading="Business Loans"
        description={500_000}
        type="$"
      />
      <ItemBadge
        colSpan={colSpan}
        icon={<PencilRuler size={30} className="text-cyan-500" />}
        backgroundColor="bg-cyan-500/25"
        heading="Custom Loans"
        description={"Choose Money"}
        type="%"
        operation="income"
      />
    </ItemBadgeContainer>
  );
};

export default LoanBadgeSection;
