import { createCookie, redirect } from "@remix-run/node";
import { z } from "zod";
import { ProfileType, settings } from "~/data/setting/mockedData";

const secret = process.env.COOKIE_SECRET || "someRandomString123";
if (secret === "default") {
  console.warn("Set your COOKIE_SECRET in .env file");
}

type SuccessLogin = {
  success: true;
  profile: ProfileType;
};

type ZodErrorLogin = {
  success: false;
  errors: z.ZodFormattedError<
    {
      username: string;
      password: string;
    },
    string
  >;
};

type ErrorLogin = {
  success: false;
  errors: string;
};

export type LoginResponseType = SuccessLogin | ZodErrorLogin | ErrorLogin;

const formSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(30, "Username is too long"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(30, "Password is too long"),
});

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secrets: [secret],
  secure: process.env.NODE_ENV === "production",
  maxAge: 3600 * 24 * 30, // 30 days
});

export async function loginUser({
  password,
  username,
}: {
  username: string;
  password: string;
}): Promise<LoginResponseType> {
  const parsedData = formSchema.safeParse({ username, password });

  if (!parsedData.success) {
    return { success: false, errors: parsedData.error.format() };
  }

  const { username: parsedUsername, password: parsedPassword } =
    parsedData.data;

  if (
    parsedUsername === settings.profile.username &&
    parsedPassword === settings.security.currentPassword
  ) {
    throw redirect("/dashboard", {
      headers: {
        "Set-Cookie": await authCookie.serialize(parsedUsername),
      },
    });
  }

  return { success: false, errors: "Invalid credentials!" };
}
