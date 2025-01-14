import { Link } from "@remix-run/react";
import { ReactNode } from "react";

const CardRouteLinkWrapper = ({ children }: { children: ReactNode }) => {
  return <Link to={"/card"}>{children}</Link>;
};

export default CardRouteLinkWrapper;
