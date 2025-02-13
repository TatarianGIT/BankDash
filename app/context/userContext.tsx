import { createContext, useContext } from "react";

type UserType = {
  userId: string;
  username: string;
};

const UserContext = createContext<UserType | null | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a context provider");
  }

  return context;
};

export default UserContext;
