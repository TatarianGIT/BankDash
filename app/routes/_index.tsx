import { Button, Text } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { redirectIfLoggedIn } from "~/auth/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirectIfLoggedIn(request);
};

const Index = () => {
  return (
    <div className="max-w-3xl flex flex-col gap-10 p-4">
      <h1 className="text-center text-2xl">
        Modern Banking Analytics Dashboard
      </h1>

      <Text size="lg" className="text-justify">
        BankDash is a full-stack web application demonstrating modern web
        development practices. Built with Remix v2, this dashboard offers
        real-time financial insights, transaction management, and user
        customization features while implementing security best practices.
      </Text>

      <Text size="lg" className="text-justify">
        BankDash is my personal playground for growth as a developer. I built it
        to deepen my expertise in React and Remix—not just by following
        tutorials, but by creating something real from the ground up. Throughout
        the process, I focused on writing clean, maintainable code while
        incorporating best practices and modern solutions. My goal was to build
        something that feels like a real product, not just another to-do app.
      </Text>

      <Text className="flex items-center gap-2">
        To explore futher more, simply
        <Link to="/login">
          <Button variant="transparent" className="inline-block p-0">
            Log In
          </Button>
        </Link>
      </Text>

      <Text className="flex items-center gap-2">
        To view project&apos;s source code, visit this
        <Button
          variant="default"
          className="flex justify-center items-center gap-3"
        >
          <GitHubIcon />
          Github Repo
        </Button>
      </Text>
      <Text className="flex items-center gap-2">
        My GitHub page
        <Button
          variant="default"
          className="flex justify-center items-center gap-3"
        >
          <GitHubIcon />
          TatarianGIT
        </Button>
      </Text>
    </div>
  );
};

const GitHubIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-github"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default Index;
