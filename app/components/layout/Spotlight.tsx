import {
  ScrollArea,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import {
  Spotlight as MantineSpotlight,
  spotlight,
  SpotlightActionData,
} from "@mantine/spotlight";
import { Link } from "@remix-run/react";
import { Search } from "lucide-react";
import { ReactNode, useState } from "react";
import { cn } from "~/utils/cn";

export type CustomSpotlightActionData = {
  label: string;
  description: string;
} & SpotlightActionData;

export type CustomSpotlightActionGroupData = {
  group: string;
  href: string;
  actions: CustomSpotlightActionData[];
};

type SpotlightProps = {
  className?: string;
  size: SpotlightButtonProps["size"];
};

function Spotlight({ size, className, ...rest }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const lowerCaseQuery = query.toLowerCase();

  const filteredActions = actions
    .map((group) => {
      const filteredActions = group.actions.filter(
        (action) =>
          action.label.toLowerCase().includes(lowerCaseQuery) ||
          action.description.toLowerCase().includes(lowerCaseQuery) ||
          group.group.toLowerCase().includes(lowerCaseQuery)
      );

      return filteredActions.length > 0
        ? { ...group, actions: filteredActions }
        : null;
    })
    .filter((group) => group !== null);

  return (
    <>
      <SpotlightButton
        size={size}
        onClick={spotlight.open}
        className={className}
      />

      <MantineSpotlight.Root
        query={query}
        onQueryChange={setQuery}
        radius="lg"
        {...rest}
      >
        <MantineSpotlight.Search
          placeholder="Search..."
          leftSection={<Search className="h-5 w-5 text-gray-400" />}
          className="px-6 py-5 text-lg focus:ring-2 focus:ring-blue-500/50 border-b border-gray-100 dark:border-stone-800 dark:bg-stone-900/60"
        />

        <MantineSpotlight.ActionsList>
          {filteredActions.length > 0 ? (
            <ScrollArea className="h-96 p-2">
              {filteredActions.map((group) => (
                <div key={group.group} className="px-2 my-4">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2 px-4 py-2.5 bg-stone-50 dark:bg-stone-900/35 rounded-md">
                    {group.group}
                  </h2>
                  <ul className="space-y-1">
                    {group.actions.map((action) => (
                      <li
                        key={action.id}
                        className="px-2 hover:bg-stone-50 dark:hover:bg-stone-900/30 rounded-lg"
                      >
                        <Link
                          to={group.href}
                          onClick={spotlight.close}
                          className="block p-3 rounded-md"
                        >
                          <div className="space-y-1">
                            <Text className="font-medium text-stone-900 dark:text-stone-100">
                              {action.label}
                            </Text>
                            <Text className="text-sm text-stone-500 dark:text-stone-400 line-clamp-1">
                              {action.description}
                            </Text>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <MantineSpotlight.Empty className="h-96">
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Search className="h-12 w-12 text-stone-400 dark:text-stone-500" />
                <Text className="text-stone-500 dark:text-stone-400 text-lg font-medium">
                  No results found
                </Text>
                <Text className="text-stone-400 dark:text-stone-500 text-sm">
                  Try different search terms
                </Text>
              </div>
            </MantineSpotlight.Empty>
          )}
        </MantineSpotlight.ActionsList>
      </MantineSpotlight.Root>
    </>
  );
}

export default Spotlight;

type SpotlightButtonProps = {
  size: "sm" | "md" | "lg";
} & Pick<SpotlightButtonContainerProps, "onClick" | "className">;

const SpotlightButton = ({
  size,
  onClick,
  className,
  ...rest
}: SpotlightButtonProps) => {
  if (size === "sm") {
    return (
      <SpotlightButtonContainer
        className={className}
        innerDivClassName="rounded-md"
        iconClassName="opacity-90"
        onClick={onClick}
        {...rest}
      />
    );
  }

  if (size === "md") {
    return (
      <>
        <SpotlightButtonContainer
          className={className}
          innerDivClassName="flex gap-2 items-center"
          iconClassName="ml-1"
          onClick={onClick}
          {...rest}
        >
          <p className="mr-8 inline opacity-40">Search...</p>
        </SpotlightButtonContainer>
      </>
    );
  }

  return (
    <>
      <SpotlightButtonContainer
        className={className}
        innerDivClassName="flex gap-2 items-center"
        iconClassName="ml-1"
        onClick={onClick}
        {...rest}
      >
        <p className="mr-12 inline opacity-40">Search for something...</p>
      </SpotlightButtonContainer>
    </>
  );
};

type SpotlightButtonContainerProps = {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
  innerDivClassName?: string;
  iconClassName?: string;
} & UnstyledButtonProps;

const SpotlightButtonContainer = ({
  className,
  children,
  onClick,
  iconClassName,
  innerDivClassName,
  ...rest
}: SpotlightButtonContainerProps) => {
  return (
    <UnstyledButton
      onClick={onClick}
      className={cn(
        "dark:bg-mantineColorDark6 sm:rounded-full rounded-md",
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          "border-[1px] border-gray-500 border-opacity-40 p-2 rounded-full",
          innerDivClassName
        )}
      >
        <Search
          className={cn(
            "max-md:h-full max-md:w-full opacity-40",
            iconClassName
          )}
        />
        {children}
      </div>
    </UnstyledButton>
  );
};

const actions: CustomSpotlightActionGroupData[] = [
  {
    group: "Dashboard Page",
    href: "/",
    actions: [
      {
        id: "my-cards-dashboard",
        label: "My Cards",
        description: "Recently used cards",
      },
      {
        id: "recent-transaction",
        label: "Recent Transaction",
        description: "Last three transactions",
      },
      {
        id: "weekly-activity",
        label: "Weekly Activity",
        description: "Deposit and withdraw in last week",
      },
      {
        id: "expense-statistics",
        label: "Expense Statistics",
        description: "Percentage graph of expenses",
      },
      {
        id: "quick-transfer",
        label: "Quick Transfer",
        description: "Quick payment to a person",
      },
      {
        id: "balance-history",
        label: "Balance History",
        description: "Balance over time",
      },
    ],
  },
  {
    group: "Transaction Page",
    href: "transaction",
    actions: [
      {
        id: "my-cards-transaction",
        label: "My Cards",
        description: "Recently used cards",
      },
      {
        id: "my-expense",
        label: "My Expense",
        description: "Expenses in last half of a year",
      },
      {
        id: "recent-transactions",
        label: "Recent Transactions",
        description: "Table of recent transactions",
      },
    ],
  },
  {
    group: "Accounts Page",
    href: "account",
    actions: [
      {
        id: "last-transaction",
        label: "Last Transaction",
        description: "Recent transations",
      },
      {
        id: "my-cards-accounts",
        label: "My Cards",
        description: "Recently used cards",
      },
      {
        id: "debit-and-credit-overview",
        label: "Debit & Credit Overview",
        description: "Card and debit over a week",
      },
      {
        id: "invoces-sent",
        label: "Invoces Sent",
        description: "Invoices recently sent",
      },
    ],
  },
  {
    group: "Investments Page",
    href: "investment",
    actions: [
      {
        id: "yearly-total-investment",
        label: "Yearly Total Investment",
        description: "Investments over a year",
      },
      {
        id: "monthly-revenue",
        label: "Monthly Revenue",
        description: "Revenue over a year",
      },
      {
        id: "my-investment",
        label: "My Investment",
        description: "Last three investments",
      },
      {
        id: "trending-stock",
        label: "Trending Stock",
        description: "Most trending stock companies",
      },
    ],
  },
  {
    group: "Credit Page Cards",
    href: "card",
    actions: [
      {
        id: "my-cards",
        label: "My Cards",
        description: "List of all cards",
      },
      {
        id: "card-expense-statistics",
        label: "Card Expense Statistics",
        description: "",
      },
      {
        id: "card-list",
        label: "Card List",
        description: "Card details",
      },
      {
        id: "add-new-card",
        label: "Add New Card",
        description: "Form to add new credit card",
      },
      {
        id: "card-setting",
        label: "Card Settings",
        description: "Card actions",
      },
    ],
  },
  {
    group: "Loans Page",
    href: "loan",
    actions: [
      {
        id: "active-loans-overview",
        label: "Active Loans Overview",
        description: "Table of active loans",
      },
    ],
  },
  {
    group: "Services Page",
    href: "service",
    actions: [
      {
        id: "back-services-list",
        label: "Back Services List",
        description: "List of all services provided by bank",
      },
    ],
  },
  {
    group: "Settings Page",
    href: "setting",
    actions: [
      {
        id: "edit-profile",
        label: "Edit Profile",
        description: "Form to edit personal details",
      },
      {
        id: "preferences",
        label: "Preferences",
        description: "Edit personal preferences",
      },
      {
        id: "security",
        label: "Security",
        description: "Security options",
      },
    ],
  },
];
