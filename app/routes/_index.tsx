import { Badge, BadgeProps, Button, Text, Tooltip } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ComponentProps, useState } from "react";
import { redirectIfLoggedIn } from "~/auth/auth";
import { cn } from "~/utils/cn";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirectIfLoggedIn(request);
};

const Index = () => {
  return (
    <div className="max-w-3xl flex flex-col gap-10 p-4">
      <h1 className="text-3xl md:text-4xl font-medium">
        A simple and modern <br />
        <span className="text-mantinePrimaryColor7 text-4xl md:text-5xl font-semibold">
          Banking Analytics
        </span>{" "}
        <br />
        dashboard application.
      </h1>

      <div className="relative">
        <Text className="text-justify text-base sm:text-lg md:text-xl ">
          BankDash is a full-stack web application demonstrating modern web
          development practices. Built with Remix v2, this dashboard offers
          real-time financial insights, transaction management, and user
          customization features while implementing security best practices.
        </Text>

        <DescriptionInfo className="cursor-pointer absolute -top-7 -right-3" />
      </div>

      <Text className="text-justify text-base sm:text-lg md:text-xl ">
        BankDash is my personal playground for growth as a developer. I built it
        to deepen my expertise in React and Remix—not just by following
        tutorials, but by creating something real from the ground up. Throughout
        the process, I focused on writing clean, maintainable code while
        incorporating best practices and modern solutions. My goal was to build
        something that feels like a real product, not just another to-do app.
      </Text>
      <div className="flex gap-2 w-full justify-evenly flex-wrap">
        <TechBadge leftSection={<ReactIcon size="20" />}>React</TechBadge>
        <TechBadge leftSection={<RemixIcon size="20" />}>Remix</TechBadge>
        <TechBadge leftSection={<TypeScriptIcon size="20" />}>
          TypeScript
        </TechBadge>
        <TechBadge leftSection={<ViteIcon size="20" />}>Vite</TechBadge>
        <TechBadge leftSection={<TailwindIcon size="20" />}>
          TailwindCSS
        </TechBadge>
        <TechBadge leftSection={<MantineIcon size="20" />}>Mantine</TechBadge>
        <TechBadge leftSection={<ZodIcon size="20" />}>Zod</TechBadge>
      </div>
      <Text className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
        To explore futher more, simply
        <Link to="/login">
          <Button variant="transparent" className="inline-block p-0">
            Log In
          </Button>
        </Link>
      </Text>

      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center flex-wrap text-sm sm:text-base md:text-lg">
          To view project&apos;s source code, visit:
          <GitHubButton href="https://github.com/TatarianGIT/BankDash">
            GitHub repo
          </GitHubButton>
        </div>
        <div className="flex gap-1 items-center text-sm sm:text-base md:text-lg">
          My GitHub page:
          <GitHubButton href="https://github.com/TatarianGIT">
            TatarianGIT
          </GitHubButton>
        </div>
      </div>
    </div>
  );
};

type DescriptionInfoProps = {
  className?: string;
};

const DescriptionInfo = ({ className }: DescriptionInfoProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <Tooltip label="Totally not ChatGPT generated :-)" opened={opened}>
      <Text
        className={cn("w-fit text-red-600 text-4xl", className)}
        onClick={() => setOpened((o) => !o)}
        onMouseOver={() => setOpened(true)}
        onMouseOut={() => setOpened(false)}
      >
        *
      </Text>
    </Tooltip>
  );
};

type GitHubButtonProps = {
  href: string;
  children: string;
};

const GitHubButton = ({ children, href }: GitHubButtonProps) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={href}
      className="flex items-center"
    >
      <Button
        variant="transparent"
        className="text-gray-800 hover:text-gray-600 hover:bg-gray-100 px-2 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 "
      >
        <div className="flex items-center gap-2">
          <GithubIcon size="25" />
          {children}
        </div>
      </Button>
    </a>
  );
};

type TechBadgeProps = {
  children: string;
} & BadgeProps;

const TechBadge = ({ children, ...props }: TechBadgeProps) => {
  return (
    <Badge size="lg" variant="light" {...props}>
      {children}
    </Badge>
  );
};

type IconProps = {
  size?: string;
} & ComponentProps<"svg">;

const MantineIcon = ({ size, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 258"
    {...props}
  >
    <path
      fill="#339AF0"
      d="M256 128.661C256 57.604 198.693 0 128.002 0C57.307 0 0 57.604 0 128.661c0 71.056 57.307 128.662 128 128.662s128-57.606 128-128.662Z"
    />
    <path
      fill="#FFF"
      d="M110.576 64.111a9.707 9.707 0 0 1 7.227 1.82a79.107 79.107 0 0 1 11.68 10.685l.874.993h27.61c5.384 0 9.744 4.374 9.744 9.777c0 5.283-4.176 9.583-9.388 9.771l-.357.007h-15.25a77.617 77.617 0 0 1 6.426 31.087a77.617 77.617 0 0 1-5.979 30.03l-.448 1.054h15.242c5.386 0 9.747 4.376 9.747 9.778c0 5.282-4.178 9.584-9.39 9.772l-.357.007H130.34a79.11 79.11 0 0 1-12.546 11.666a9.715 9.715 0 0 1-13.63-2.027a9.805 9.805 0 0 1-1.623-3.451a9.805 9.805 0 0 1 1.096-7.409a9.696 9.696 0 0 1 2.551-2.82c14.91-11.107 23.469-28.09 23.469-46.602c0-18.511-8.56-35.494-23.469-46.602a9.693 9.693 0 0 1-2.554-2.82a9.842 9.842 0 0 1 .287-10.521l.243-.346a9.813 9.813 0 0 1 6.411-3.849Zm-1.755 47.41a14.435 14.435 0 0 1 4.728 3.258a14.62 14.62 0 0 1 3.105 4.857a14.745 14.745 0 0 1 .995 5.696a14.68 14.68 0 0 1-4.35 10.096a14.356 14.356 0 0 1-10.084 4.152a14.356 14.356 0 0 1-10.088-4.152a14.68 14.68 0 0 1-4.349-10.096a14.748 14.748 0 0 1 .998-5.696a14.62 14.62 0 0 1 3.105-4.857a14.434 14.434 0 0 1 4.726-3.257a14.303 14.303 0 0 1 11.214 0Z"
    />
  </svg>
);

const GithubIcon = ({ size, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20 10.25c0 2.234-.636 4.243-1.908 6.027c-1.271 1.784-2.914 3.018-4.928 3.703c-.234.045-.406.014-.514-.093a.539.539 0 0 1-.163-.4V16.67c0-.863-.226-1.495-.677-1.895a8.72 8.72 0 0 0 1.335-.24c.394-.107.802-.28 1.223-.52a3.66 3.66 0 0 0 1.055-.888c.282-.352.512-.819.69-1.402c.178-.583.267-1.252.267-2.008c0-1.077-.343-1.994-1.028-2.75c.32-.81.286-1.717-.105-2.723c-.243-.08-.594-.03-1.054.147a6.94 6.94 0 0 0-1.198.587l-.495.32a9.03 9.03 0 0 0-2.5-.346a9.03 9.03 0 0 0-2.5.347a11.52 11.52 0 0 0-.553-.36c-.23-.143-.593-.314-1.088-.514c-.494-.2-.868-.26-1.12-.18c-.381 1.005-.412 1.912-.09 2.722c-.686.756-1.03 1.673-1.03 2.75c0 .756.09 1.423.268 2.002c.178.578.406 1.045.683 1.401a3.53 3.53 0 0 0 1.048.894c.421.24.83.414 1.224.52c.395.108.84.188 1.335.241c-.347.32-.56.779-.638 1.375a2.539 2.539 0 0 1-.586.2a3.597 3.597 0 0 1-.742.067c-.287 0-.57-.096-.853-.287c-.282-.192-.523-.47-.723-.834a2.133 2.133 0 0 0-.631-.694c-.256-.178-.471-.285-.645-.32l-.26-.04c-.182 0-.308.02-.378.06c-.07.04-.09.09-.065.153a.738.738 0 0 0 .117.187a.961.961 0 0 0 .17.16l.09.066c.192.09.38.259.567.508c.187.249.324.476.41.68l.13.307c.113.338.304.612.574.821c.269.21.56.343.872.4c.312.058.614.09.905.094c.29.004.532-.011.723-.047l.299-.053c0 .338.002.734.007 1.188l.006.72c0 .16-.056.294-.17.4c-.112.108-.286.139-.52.094c-2.014-.685-3.657-1.92-4.928-3.703C.636 14.493 0 12.484 0 10.25c0-1.86.447-3.574 1.341-5.145a10.083 10.083 0 0 1 3.64-3.73A9.6 9.6 0 0 1 10 0a9.6 9.6 0 0 1 5.02 1.375a10.083 10.083 0 0 1 3.639 3.73C19.553 6.675 20 8.391 20 10.25Z"
    />
  </svg>
);

const ZodIcon = ({ size, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 203"
    {...props}
  >
    <defs>
      <filter
        id="logosZod0"
        width="105.2%"
        height="106.5%"
        x="-2.2%"
        y="-2.8%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dx="1" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="2"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0"
        />
      </filter>
      <path
        id="logosZod1"
        fill="#000"
        d="M200.42 0H53.63L0 53.355l121.76 146.624l9.714-10.9L252 53.857L200.42 0Zm-5.362 12.562l39.84 41.6l-112.8 126.558L17 54.162l41.815-41.6h136.243Z"
      />
    </defs>
    <g transform="translate(2 1.51)">
      <path
        fill="#18253F"
        d="M58.816 12.522h136.278l39.933 41.691l-112.989 126.553L16.957 54.213z"
      />
      <path
        fill="#274D82"
        d="M149.427 150.875H96.013l-24.124-29.534l68.364-.002l.002-4.19h39.078z"
      />
      <path
        fill="#274D82"
        d="M223.56 42.323L76.178 127.414l-19.226-24.052l114.099-65.877l-2.096-3.631l30.391-17.546zm-78.964-29.759L33.93 76.457L16.719 54.972l74.095-42.779z"
      />
      <use filter="url(#logosZod0)" href="#logosZod1" />
      <use fill="#3068B7" href="#logosZod1" />
    </g>
  </svg>
);

const ReactIcon = ({ size, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    {...props}
  >
    <g fill="none">
      <rect width="256" height="256" fill="#242938" rx="60" />
      <path
        fill="#00D8FF"
        d="M128.001 146.951c10.304 0 18.656-8.353 18.656-18.656c0-10.303-8.352-18.656-18.656-18.656c-10.303 0-18.656 8.353-18.656 18.656c0 10.303 8.353 18.656 18.656 18.656Z"
      />
      <path
        stroke="#00D8FF"
        strokeWidth="8.911"
        d="M128.002 90.363c25.048 0 48.317 3.594 65.862 9.635C215.003 107.275 228 118.306 228 128.295c0 10.409-13.774 22.128-36.475 29.649c-17.162 5.686-39.746 8.654-63.523 8.654c-24.378 0-47.463-2.786-64.819-8.717C41.225 150.376 28 138.506 28 128.295c0-9.908 12.41-20.854 33.252-28.12c17.61-6.14 41.453-9.812 66.746-9.812h.004Z"
        clipRule="evenodd"
      />
      <path
        stroke="#00D8FF"
        strokeWidth="8.911"
        d="M94.981 109.438c12.514-21.698 27.251-40.06 41.249-52.24c16.864-14.677 32.914-20.425 41.566-15.436c9.017 5.2 12.288 22.988 7.463 46.41c-3.645 17.707-12.359 38.753-24.238 59.351c-12.179 21.118-26.124 39.724-39.931 51.792c-17.471 15.272-34.362 20.799-43.207 15.698c-8.583-4.946-11.865-21.167-7.747-42.852c3.479-18.323 12.21-40.812 24.841-62.723h.004Z"
        clipRule="evenodd"
      />
      <path
        stroke="#00D8FF"
        strokeWidth="8.911"
        d="M95.012 147.578c-12.549-21.674-21.093-43.616-24.659-61.826c-4.293-21.941-1.258-38.716 7.387-43.72c9.009-5.216 26.052.834 43.934 16.712c13.52 12.004 27.403 30.061 39.316 50.639c12.214 21.098 21.368 42.473 24.929 60.461c4.506 22.764.859 40.157-7.978 45.272c-8.574 4.964-24.265-.291-40.996-14.689c-14.136-12.164-29.26-30.959-41.933-52.849Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

const TypeScriptIcon = ({ size, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    {...props}
  >
    <g fill="none">
      <rect width="256" height="256" fill="#007ACC" rx="60" />
      <path
        fill="#fff"
        d="m56.611 128.849l-.081 10.484h33.32v94.679h23.57v-94.679h33.32v-10.281c0-5.689-.121-10.443-.284-10.565c-.122-.162-20.399-.244-44.983-.203l-44.739.122l-.122 10.443Zm149.956-10.741c6.501 1.626 11.459 4.511 16.01 9.224c2.357 2.52 5.851 7.112 6.136 8.209c.081.325-11.053 7.802-17.798 11.987c-.244.163-1.22-.894-2.317-2.519c-3.291-4.795-6.745-6.868-12.028-7.233c-7.761-.529-12.759 3.535-12.718 10.321c0 1.991.284 3.169 1.097 4.795c1.706 3.535 4.876 5.648 14.832 9.955c18.326 7.884 26.168 13.085 31.045 20.48c5.445 8.249 6.664 21.415 2.966 31.208c-4.063 10.646-14.141 17.879-28.323 20.277c-4.388.772-14.791.65-19.504-.203c-10.281-1.829-20.033-6.908-26.047-13.572c-2.357-2.601-6.949-9.387-6.664-9.875c.121-.162 1.178-.812 2.356-1.503c1.138-.65 5.446-3.129 9.509-5.486l7.355-4.267l1.544 2.276c2.154 3.291 6.867 7.802 9.712 9.305c8.167 4.308 19.383 3.698 24.909-1.259c2.357-2.154 3.332-4.389 3.332-7.68c0-2.967-.366-4.267-1.91-6.502c-1.991-2.844-6.054-5.242-17.595-10.24c-13.206-5.689-18.895-9.224-24.096-14.832c-3.007-3.25-5.852-8.452-7.03-12.8c-.975-3.616-1.219-12.678-.447-16.335c2.722-12.759 12.353-21.658 26.25-24.3c4.511-.853 14.994-.528 19.424.569Z"
      />
    </g>
  </svg>
);

const RemixIcon = ({ size, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    {...props}
  >
    <defs>
      <path
        id="skillIconsRemixDark0"
        fill="#fff"
        fillRule="evenodd"
        d="M187.903 168.726c1.361 17.488 1.361 25.686 1.361 34.634h-40.462c0-1.949.035-3.732.07-5.54c.11-5.621.224-11.482-.687-23.318c-1.203-17.329-8.665-21.179-22.386-21.179H62.16v-31.528h65.565c17.331 0 25.997-5.272 25.997-19.231c0-12.275-8.666-19.713-25.997-19.713H62.16V52h72.786c39.236 0 58.734 18.532 58.734 48.134c0 22.142-13.72 36.582-32.256 38.989c15.647 3.129 24.794 12.034 26.479 29.603Z"
        clipRule="evenodd"
      />
    </defs>
    <g fill="none">
      <rect width="256" height="256" fill="#242938" rx="60" />
      <use href="#skillIconsRemixDark0" fillRule="evenodd" clipRule="evenodd" />
      <use href="#skillIconsRemixDark0" fillRule="evenodd" clipRule="evenodd" />
      <path
        fill="#fff"
        d="M62.16 203.36v-23.503h42.783c7.146 0 8.698 5.3 8.698 8.461v15.042h-51.48Z"
      />
      <path
        stroke="#fff"
        strokeOpacity=".8"
        strokeWidth=".32"
        d="M62 203.36v.16h51.801v-15.202c0-1.602-.392-3.755-1.701-5.512c-1.314-1.765-3.539-3.109-7.157-3.109H62v23.663Z"
      />
    </g>
  </svg>
);

const TailwindIcon = ({ size, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    {...props}
  >
    <g fill="none">
      <rect width="256" height="256" fill="#242938" rx="60" />
      <path
        fill="url(#skillIconsTailwindcssDark0)"
        fillRule="evenodd"
        d="M83 110c6-24 21.001-36 45-36c36 0 40.5 27 58.5 31.5c12.001 3.001 22.5-1.499 31.5-13.5c-5.999 23.999-21.001 36-45 36c-36 0-40.5-27-58.5-31.5C102.499 93.5 92 98 83 110Zm-45 54c6-23.999 21-36 45-36c36 0 40.5 27 58.5 31.5c12.001 3.001 22.5-1.499 31.5-13.5c-5.999 23.999-21.001 36-45 36c-36 0-40.5-27-58.5-31.5c-12-3.001-22.5 1.499-31.5 13.5Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="skillIconsTailwindcssDark0"
          x1="86.5"
          x2="163.5"
          y1="74"
          y2="185.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#32B1C1" />
          <stop offset="1" stopColor="#14C6B7" />
        </linearGradient>
      </defs>
    </g>
  </svg>
);

const ViteIcon = ({ size }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 257"
  >
    <defs>
      <linearGradient
        id="logosVitejs0"
        x1="-.828%"
        x2="57.636%"
        y1="7.652%"
        y2="78.411%"
      >
        <stop offset="0%" stopColor="#41D1FF" />
        <stop offset="100%" stopColor="#BD34FE" />
      </linearGradient>
      <linearGradient
        id="logosVitejs1"
        x1="43.376%"
        x2="50.316%"
        y1="2.242%"
        y2="89.03%"
      >
        <stop offset="0%" stopColor="#FFEA83" />
        <stop offset="8.333%" stopColor="#FFDD35" />
        <stop offset="100%" stopColor="#FFA800" />
      </linearGradient>
    </defs>
    <path
      fill="url(#logosVitejs0)"
      d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"
    />
    <path
      fill="url(#logosVitejs1)"
      d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"
    />
  </svg>
);

export default Index;
