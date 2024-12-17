import { redirect } from "@remix-run/react";

export const loader = async () => {
  return redirect("/setting/profile");
};

const Setting = () => {
  return null;
};

export default Setting;
