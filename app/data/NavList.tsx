import {
  ChartCandlestick,
  CreditCard,
  HandCoins,
  Handshake,
  House,
  PencilRuler,
  Settings,
  UserRound,
  Wrench,
} from "lucide-react";
import { ReactNode } from "react";

export type NavElementType = {
  id: number;
  label: string;
  value: string;
  icon: ReactNode;
};

export const navList: NavElementType[] = [
  {
    id: 1,
    label: "Dashboard",
    value: "/",
    icon: <House />,
  },
  {
    id: 2,
    label: "Transactions",
    value: "transaction",
    icon: <Handshake />,
  },
  {
    id: 3,
    label: "Accounts",
    value: "account",
    icon: <UserRound />,
  },
  {
    id: 4,
    label: "Investments",
    value: "investment",
    icon: <ChartCandlestick />,
  },
  {
    id: 5,
    label: "Credit Cards",
    value: "card",
    icon: <CreditCard />,
  },
  {
    id: 6,
    label: "Loans",
    value: "loan",
    icon: <HandCoins />,
  },
  {
    id: 7,
    label: "Servieces",
    value: "serviece",
    icon: <PencilRuler />,
  },
  {
    id: 8,
    label: "My Privileges",
    value: "privileges",
    icon: <Wrench />,
  },
  {
    id: 9,
    label: "Settings",
    value: "setting",
    icon: <Settings />,
  },
];
