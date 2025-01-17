import { Avatar, Button } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { Pencil } from "lucide-react";
import { ProfileType } from "~/data/setting/mockedData";
import { WithLoading } from "~/types";
import FormInput from "./FormInput";
import SaveButton from "./SaveButton";

type ProfileTabProps = WithLoading<{
  data?: ProfileType;
}> & { password: string };

const ProfileTab = ({ data, password, isLoading }: ProfileTabProps) => {
  const fetcher = useFetcher();

  return (
    <div className="flex md:flex-row flex-col pt-10 items-center md:items-start">
      <UserAvatar />

      <fetcher.Form method="POST" className="w-full px-0 md:px-6">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormInput
            name={"fullName"}
            isLoading={isLoading}
            value={data?.fullName}
            label="Your Name"
            type="text"
            placeholder="Charlene Reed"
          />
          <FormInput
            name={"username"}
            isLoading={isLoading}
            value={data?.username}
            label="User Name"
            type="text"
            placeholder="charlenereed"
          />
          <FormInput
            name={"email"}
            isLoading={isLoading}
            value={data?.email}
            label="Email"
            type="email"
            placeholder="charlenereed@gmail.com"
          />
          <FormInput
            withAuthFiller
            password={password}
            name={"password"}
            isLoading={isLoading}
            label="Password"
            type="password"
            placeholder="**********"
          />
          <FormInput
            name={"birthDate"}
            isLoading={isLoading}
            date={new Date(data?.birthDate ?? "")}
            label="Date of Birth"
            type="date"
          />
          <FormInput
            name={"presentAddress"}
            isLoading={isLoading}
            value={data?.presentAddress}
            label="Present Adress"
            type="text"
            placeholder="San Jose, California, USA"
          />
          <FormInput
            name={"permaAddress"}
            isLoading={isLoading}
            value={data?.permaAddress}
            label="Permament Address"
            type="text"
            placeholder="San Jose, California, USA"
          />
          <FormInput
            name={"city"}
            isLoading={isLoading}
            value={data?.city}
            label="City"
            type="text"
            placeholder="San Jose"
          />
          <FormInput
            name={"postalCode"}
            isLoading={isLoading}
            value={data?.postalCode ?? 0}
            label="Postal Code"
            type="number"
            placeholder="45962"
          />
          <FormInput
            name={"country"}
            isLoading={isLoading}
            value={data?.country}
            label="Country"
            type="text"
            placeholder="USA"
          />
        </div>

        <div className="flex justify-end">
          <SaveButton
            isLoading={isLoading}
            isSubmitting={fetcher.state === "submitting"}
          />
        </div>
      </fetcher.Form>
    </div>
  );
};

export default ProfileTab;

const UserAvatar = () => {
  return (
    <div className="mb-5">
      <div className="relative w-28 h-28">
        <Avatar
          src={"https://i.pravatar.cc/300"}
          alt="Profile avatar"
          className={"w-28 h-28 relative border-2"}
        />

        <Button className="bg-blue-600 p-2 rounded-full absolute bottom-1 right-0">
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
