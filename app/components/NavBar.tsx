import { NavLink, useLocation } from "@remix-run/react";
import { NavLink as MantineNavLink } from "@mantine/core";
import { cn } from "~/utils/cn.js";

import { NavElementType, navList } from "~/data/NavList";

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
