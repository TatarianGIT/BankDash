import { redirectWithClearedCookie } from "~/auth/auth";

export const action = async () => {
  return redirectWithClearedCookie();
};
