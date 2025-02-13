import { Button, Card, Input, Text, Tooltip } from "@mantine/core";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { SVGProps, useState } from "react";
import { redirectIfLoggedIn } from "~/auth/auth";
import { authCookie, LoginResponseType, loginUser } from "~/auth/login";
import AuthFiller from "~/components/common/AuthFiller";
import { getPassword, getUsername } from "~/data/setting/mockedData";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await redirectIfLoggedIn(request);

  const username = await getUsername();
  const password = await getPassword();

  return json({ username, password });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const loginResult: LoginResponseType = await loginUser({
    username,
    password,
  });

  if (loginResult.success === false && loginResult.errors) {
    return loginResult.errors;
  }

  return null;
};

const Login = () => {
  const { ...userData } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFillCredentials = () => {
    setUsername(userData.username);
    setPassword(userData.password);
  };

  return (
    <div className="flex flex-col md:w-1/2 sm:w-3/4 w-full mx-3 sm:mx-0">
      <Text className="text-center my-10 text-lg md:text-xl lg:text-2xl">
        Sign in
      </Text>
      <Card shadow="md" radius={"lg"} className="p-6">
        <fetcher.Form method="POST" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <AuthFiller
              handleClick={handleFillCredentials}
              className="ml-auto -my-2"
            />
            {typeof fetcher.data === "string" && (
              <ErrorText error={fetcher.data} />
            )}
            <Text>Username</Text>
            <Input
              type="text"
              name="username"
              maxLength={30}
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            {typeof fetcher.data === "object" && fetcher.data?.username && (
              <ErrorText error={fetcher.data?.username?._errors} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Text>Password</Text>
            <Input
              type="password"
              name="password"
              value={password}
              maxLength={30}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            {typeof fetcher.data === "object" && fetcher.data?.password && (
              <ErrorText error={fetcher.data?.password?._errors} />
            )}
          </div>
          <Button type="submit" className="mt-2">
            Login
          </Button>
        </fetcher.Form>

        <Text className="mt-6 mb-3 flex items-center gap-1">
          If you don&apos;t have an accout,{" "}
          <Tooltip label={"Not implemented yet."}>
            <Button
              variant="transparent"
              disabled
              className="p-0 bg-transparent"
            >
              Sign up
            </Button>
          </Tooltip>
          .
        </Text>
      </Card>
    </div>
  );
};

const ErrorText = ({ error }: { error: string | string[] }) => {
  if (Array.isArray(error))
    return (
      <div className="flex flex-col gap-1">
        {error.map((error, index) => (
          <Text key={index} className="text-red-600 text-center">
            {error}
          </Text>
        ))}
      </div>
    );

  return <Text className="text-red-600 text-center">{error}</Text>;
};

export function PasswordSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11 11h-1v-1h1zm-3 0h1v-1H8zm5 0h-1v-1h1z"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 6V3.5a3.5 3.5 0 1 1 7 0V6h1.5A1.5 1.5 0 0 1 13 7.5v.55a2.5 2.5 0 0 1 0 4.9v.55a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 13.5v-6A1.5 1.5 0 0 1 1.5 6zm1-2.5a2.5 2.5 0 0 1 5 0V6H4zM8.5 9a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 0 0 0-3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Login;
