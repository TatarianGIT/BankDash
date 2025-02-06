import { redirect } from "@remix-run/node";
import { authCookie } from "./login";

export async function getAuthFromRequest(
  request: Request
): Promise<string | null> {
  const userId = await authCookie.parse(request.headers.get("Cookie"));
  return userId ?? null;
}

export async function requireAuth(request: Request) {
  const userId = await getAuthFromRequest(request);
  if (!userId) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": await authCookie.serialize("", {
          maxAge: 0,
        }),
      },
    });
  }
  return userId;
}

export async function redirectIfLoggedIn(request: Request) {
  const userId = await getAuthFromRequest(request);
  if (userId) {
    throw redirect("/dashboard");
  }
  return null;
}

export async function redirectWithClearedCookie(): Promise<Response> {
  throw redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(null, {
        expires: new Date(0),
      }),
    },
  });
}
