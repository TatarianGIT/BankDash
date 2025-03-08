import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunctionArgs,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { getAuthFromRequest } from "./auth/auth";
import AppLayout from "./components/layout/AppLayout.js";
import CustomErrorBoundary from "./components/layout/CustomErrorBoundary";
import UserContext from "./context/userContext";
import { getUserData } from "./data/setting/mockedData";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const authId = await getAuthFromRequest(request);

  if (!authId) return null;

  const user = await getUserData(authId);

  if (!user) return null;

  if (user && new URL(request.url).pathname === "/") {
    throw redirect("/dashboard");
  }

  return user;
}

export function shouldRevalidate({ formAction }: ShouldRevalidateFunctionArgs) {
  return (
    formAction && ["/login", "/logout", "/setting/profile"].includes(formAction)
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Notifications />
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const user = useLoaderData<typeof loader>();
  return (
    <UserContext.Provider value={user}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </UserContext.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return <CustomErrorBoundary error={error} />;
}
