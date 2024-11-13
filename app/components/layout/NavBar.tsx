import {
  ChartCandlestick,
  CreditCard,
  HandCoins,
  Handshake,
  House,
  PencilRuler,
  Settings,
  UserRound,
  Wrench,
} from "lucide-react";
import { ReactNode } from "react";

import { NavLink, useLocation } from "@remix-run/react";
import { NavLink as MantineNavLink } from "@mantine/core";
import { cn } from "~/utils/cn.js";

const NavBar = () => {
  return (
    <>
      {navList.length ? (
        <ul className="flex flex-col gap-9 py-4">
          {navList.map((element) => (
            <li key={element.id}>
              <NavBarElement element={element} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No navigation elements</p>
      )}
    </>
  );
};

export default NavBar;

type NavBarElementProps = {
  element: NavElementType;
};

const NavBarElement = ({ element }: NavBarElementProps) => {
  const location = useLocation();

  const isActive = location.pathname === element.value;

  return (
    <div className="relative">
      {isActive && (
        <div className="h-full w-[6px] bg-blue-500 absolute rounded-r-xl"></div>
      )}
      <div className="px-4">
        <MantineNavLink
          label={element.label}
          to={element.value}
          leftSection={element.icon}
          component={NavLink}
          className={cn(
            isActive ? "text-blue-500" : "",
            "pl-10 text-lg rounded-md"
          )}
        />
      </div>
    </div>
  );
};

export type NavElementType = {
  id: number;
  label: string;
  value: string;
  icon: ReactNode;
};

export const navList: NavElementType[] = [
  {
    id: 1,
    label: "Dashboard",
    value: "/",
    icon: <House />,
  },
  {
    id: 2,
    label: "Transactions",
    value: "transaction",
    icon: <Handshake />,
  },
  {
    id: 3,
    label: "Accounts",
    value: "account",
    icon: <UserRound />,
  },
  {
    id: 4,
    label: "Investments",
    value: "investment",
    icon: <ChartCandlestick />,
  },
  {
    id: 5,
    label: "Credit Cards",
    value: "card",
    icon: <CreditCard />,
  },
  {
    id: 6,
    label: "Loans",
    value: "loan",
    icon: <HandCoins />,
  },
  {
    id: 7,
    label: "Servieces",
    value: "serviece",
    icon: <PencilRuler />,
  },
  {
    id: 8,
    label: "My Privileges",
    value: "privileges",
    icon: <Wrench />,
  },
  {
    id: 9,
    label: "Settings",
    value: "setting",
    icon: <Settings />,
  },
];
