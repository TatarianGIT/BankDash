import { Grid, Text } from "@mantine/core";
import { LockKeyhole, Snowflake } from "lucide-react";
import { ReactNode } from "react";
import { FaApple, FaApplePay, FaGoogle } from "react-icons/fa";
import { cn } from "~/utils/cn";

const CardSetting = () => {
  return (
    <div className="flex flex-col gap-5 py-6">
      {cardSettingData.length ? (
        <Grid>
          <CardSettingOptions data={cardSettingData} />
        </Grid>
      ) : (
        <Text className="mx-auto my-4">No settings found</Text>
      )}
    </div>
  );
};

export default CardSetting;

const CardSettingOptions = ({ data }: { data: CardSettingDataType[] }) => {
  return (
    <div className="flex flex-col">
      {data.map((setting) => (
        <div key={setting.id} className="flex gap-2 cursor-pointer my-1">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex justify-center items-center",
              setting.backgroundColor
            )}
          >
            {setting.icon}
          </div>
          <div>
            <Text className="text-lg">{setting.name}</Text>
            <Text className="text-sm">{setting.description}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

type CardSettingDataType = {
  id: number;
  icon: ReactNode;
  backgroundColor: string;
  name: string;
  description: string;
};

const cardSettingData: CardSettingDataType[] = [
  {
    id: 0,
    icon: <Snowflake className="w-9 h-9 text-yellow-500" />,
    backgroundColor: "bg-yellow-500/50",
    name: "Freeze Card",
    description: "Instantly block your card",
  },
  {
    id: 1,
    icon: <LockKeyhole className="w-9 h-9 text-blue-500" />,
    backgroundColor: "bg-blue-500/50",
    name: "Change Pin Code",
    description: "Choose another pin code",
  },
  {
    id: 2,
    icon: <FaGoogle className="w-9 h-9 text-pink-500" />,
    backgroundColor: "bg-pink-500/50",
    name: "Add to Google Pay",
    description: "Withdraw without any card",
  },
  {
    id: 3,
    icon: <FaApplePay className="w-9 h-9 text-cyan-500" />,
    backgroundColor: "bg-cyan-500/50",
    name: "Add to Apple Pay",
    description: "Withdraw without any card",
  },
  {
    id: 4,
    icon: <FaApple className="w-9 h-9 text-purple-500" />,
    backgroundColor: "bg-purple-500/50",
    name: "Add to Apple Store",
    description: "Withdraw without any card",
  },
];
