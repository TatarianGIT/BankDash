import { Link } from "@remix-run/react";
import { Feather } from "lucide-react";

const AppLogo = () => {
  return (
    <Link
      to={"/"}
      className="flex w-full justify-center items-center gap-2 text-lg font-bold"
    >
      <Feather size={30} />
      <span>BankDash.</span>
    </Link>
  );
};

export default AppLogo;
