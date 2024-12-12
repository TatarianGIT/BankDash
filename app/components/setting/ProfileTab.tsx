import { Avatar, Button, SimpleGrid, useMatches } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { Pencil } from "lucide-react";
import FormInput from "./FormInput";
import SaveButton from "./SaveButton";

const ProfileTab = () => {
  const cols = useMatches({
    base: 1,
    md: 2,
  });
  const fetcher = useFetcher();

  return (
    <div className="flex md:flex-row flex-col pt-10 items-center md:items-start">
      <UserAvatar />

      <fetcher.Form method="POST" className="w-full px-0 md:px-6">
        <SimpleGrid cols={cols}>
          <FormInput
            label="Your Name"
            type="text"
            placeholder="Charlene Reed "
          />
          <FormInput
            label="User Name"
            type="text"
            placeholder="Charlene Reed "
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="charlenereed@gmail.com"
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="**********"
          />
          <FormInput label="Date of Birth" type="date" />
          <FormInput
            label="Present Adress"
            type="text"
            placeholder="San Jose, California, USA"
          />
          <FormInput
            label="Permament Address"
            type="text"
            placeholder="San Jose, California, USA"
          />
          <FormInput label="City" type="text" placeholder="San Jose" />
          <FormInput label="Postal Code" type="number" placeholder="45962" />
          <FormInput label="Country" type="text" placeholder="USA" />
        </SimpleGrid>

        <div className="flex justify-end">
          <SaveButton />
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
          className="w-28 h-28 relative border-2"
          name="James Gray"
          color="initials"
        />

        <Button className="bg-blue-600 p-2 rounded-full absolute bottom-1 right-0">
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
