import { Feather } from "lucide-react";

const AppLogo = () => {
  return (
    <div className="flex w-full absolute -z-10 justify-center items-center gap-2 text-lg font-bold">
      <Feather size={30} />
      <span>BankDash.</span>
    </div>
  );
};

export default AppLogo;
