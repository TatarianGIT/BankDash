import { NumberFormatter, Text } from "@mantine/core";
import { Apple, Gamepad2, UserRound } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn.js";

const InvoicesList = () => {
  return InvoicesData ? (
    InvoicesData.map((invoice) => <Invoice key={invoice.id} {...invoice} />)
  ) : (
    <Text>You don`&apos;`t have any invoices sent</Text>
  );
};

type InvoiceProps = {
  key: number | string;
} & InvoiceDataType;

const Invoice = ({
  amount,
  destination,
  timestamp,
  icon,
  backgroundColor,
}: InvoiceProps) => {
  return (
    <div className="flex flex-row h-full w-full gap-4">
      <div
        className={cn(
          "flex justify-center items-center w-11 h-11 rounded-xl",
          backgroundColor
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <Text>{destination}</Text>
        <Text className="text-xs">{timestamp}</Text>
      </div>
      <div className="flex items-center ml-auto">
        <Text>
          <NumberFormatter value={amount} thousandSeparator prefix="$" />
        </Text>
      </div>
    </div>
  );
};

export default InvoicesList;

type InvoiceDataType = {
  id: number;
  icon: ReactNode;
  backgroundColor: string;
  destination: string;
  timestamp: string;
  amount: number;
};

const InvoicesData: InvoiceDataType[] = [
  {
    id: 0,
    icon: <Apple className="text-cyan-500" />,
    backgroundColor: "bg-cyan-500/25",
    destination: "Apple Store",
    timestamp: "5h ago",
    amount: 450,
  },
  {
    id: 1,
    icon: <UserRound className="text-amber-500" />,
    backgroundColor: "bg-amber-500/25",
    destination: "Michael",
    timestamp: "2 days ago",
    amount: 160,
  },
  {
    id: 2,
    icon: <Gamepad2 className="text-blue-500" />,
    backgroundColor: "bg-blue-500/25",
    destination: "Playstation",
    timestamp: "5 days ago",
    amount: 1085,
  },
  {
    id: 3,
    icon: <UserRound className="text-pink-500" />,
    backgroundColor: "bg-pink-500/25",
    destination: "William",
    timestamp: "10 days ago",
    amount: 90,
  },
];
