import {
  ChartCandlestick,
  CreditCard,
  HandCoins,
  Handshake,
  House,
  PencilRuler,
  Settings,
  UserRound,
} from "lucide-react";
import { ReactNode } from "react";

import { NavLink, useLocation } from "@remix-run/react";
import { NavLink as MantineNavLink } from "@mantine/core";
import { cn } from "~/utils/cn.js";

const NavBar = ({ navBarClick }: { navBarClick: () => void }) => {
  const handleNavBarClick = () => {
    navBarClick();
  };
  return (
    <>
      {navList.length ? (
        <ul className="flex flex-col gap-4 md:gap-6 lg:gap-9 py-4">
          {navList.map((element) => (
            <li key={element.id}>
              <NavBarElement
                element={element}
                navBarClick={handleNavBarClick}
              />
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
  navBarClick: () => void;
};

const NavBarElement = ({ element, navBarClick }: NavBarElementProps) => {
  const location = useLocation();

  const currentPath =
    location.pathname === "/" ? "/" : location.pathname.slice(1);
  const isActive = currentPath === element.value;

  const handleClick = () => {
    navBarClick();
  };

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
          onClick={handleClick}
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
    label: "Services",
    value: "service",
    icon: <PencilRuler />,
  },
  {
    id: 8,
    label: "Settings",
    value: "setting",
    icon: <Settings />,
  },
];
