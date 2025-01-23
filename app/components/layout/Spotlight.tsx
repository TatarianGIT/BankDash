import { Center, ScrollArea, Text, UnstyledButton } from "@mantine/core";
import {
  Spotlight as MantineSpotlight,
  spotlight,
  SpotlightActionData,
} from "@mantine/spotlight";
import { Link } from "@remix-run/react";
import { Search } from "lucide-react";
import { useState } from "react";

export interface CustomSpotlightActionData extends SpotlightActionData {
  label: string;
  description: string;
}

export interface CustomSpotlightActionGroupData {
  group: string;
  href: string;
  actions: CustomSpotlightActionData[];
}

function Spotlight() {
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
      <UnstyledButton
        className="bg-mantineColorDark6 rounded-full"
        onClick={spotlight.open}
      >
        <div
          style={{ backgroundColor: "var(--input-bg)" }}
          className="flex gap-2 border-2 border-gray-500 border-opacity-40 p-2 rounded-full "
        >
          <Search className="h-5 w-5 md:ml-1 opacity-40" />
          <p className="mr-4 lg:mr-6 hidden md:inline opacity-40">
            Search <span className="hidden lg:inline">for something</span>...
          </p>
        </div>
      </UnstyledButton>

      <MantineSpotlight.Root
        query={query}
        onQueryChange={setQuery}
        radius={"lg"}
      >
        <MantineSpotlight.Search
          placeholder="Search..."
          leftSection={<Search className="h-5 w-5" />}
        />
        <MantineSpotlight.ActionsList>
          {filteredActions.length > 0 ? (
            <ScrollArea className="h-96">
              {filteredActions.map((group) => (
                <div key={group.group} className="px-4 my-4">
                  <h2 className="text-xl font-semibold">{group.group}</h2>
                  <ul>
                    {group.actions.map((action) => (
                      <li
                        key={action.id}
                        className="px-4 my-1 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                      >
                        <Link to={group.href} onClick={spotlight.close}>
                          <Text className="font-semibold text-lg">
                            {action.label}
                          </Text>
                          <Text className="font-light">
                            {action.description}
                          </Text>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <MantineSpotlight.Empty className="h-96">
              <Center className="h-full">Nothing found...</Center>
            </MantineSpotlight.Empty>
          )}
        </MantineSpotlight.ActionsList>
      </MantineSpotlight.Root>
    </>
  );
}

export default Spotlight;

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
