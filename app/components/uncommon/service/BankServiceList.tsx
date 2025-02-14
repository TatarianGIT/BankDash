import { Button, Grid, Text } from "@mantine/core";
import {
  BriefcaseBusiness,
  ChartNoAxesColumn,
  HandCoins,
  Landmark,
  ShieldPlus,
  User,
} from "lucide-react";
import React from "react";
import { cn } from "~/utils/cn";

const BankServiceList = () => {
  return (
    <>
      {bankServiceListData.length ? (
        bankServiceListData.map((service) => (
          <ServiceElement key={service.id} {...service} />
        ))
      ) : (
        <p className="w-full text-center my-10">No services available</p>
      )}
    </>
  );
};

export default BankServiceList;

type ServiceElementProps = {
  key: number | string;
} & BankServiceListDataType;

const ServiceElement = ({ ...props }: ServiceElementProps) => {
  return (
    <div className="my-4">
      <Grid justify="center" align="center">
        <Grid.Col span={"content"}>
          <div className={cn("rounded-2xl", props.iconBackground)}>
            {props.icon}
          </div>
        </Grid.Col>

        <ServiceDetailText
          span={"auto"}
          upperText={props.title}
          lowerText={props.description}
        />

        <ServiceDetailText
          className="hidden sm:block "
          hideOnMobile
          upperText={props.firstItem}
          lowerText={props.secondItem}
        />

        <ServiceDetailText
          hideOnMobile
          upperText={props.firstItem}
          lowerText={props.secondItem}
        />

        <ServiceDetailText
          hideOnMobile
          upperText={props.firstItem}
          lowerText={props.secondItem}
        />

        <Grid.Col span={"content"} className="">
          <Button variant="outline" className="rounded-full">
            <span className="hidden md:inline-block pr-1">View</span>
            Details
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
};

const ServiceDetailText = ({
  lowerText,
  upperText,
  className,
  span = "auto",
  hideOnMobile,
}: {
  upperText: string;
  lowerText: string;
  className?: string;
  span?: number | "auto" | "content";
  hideOnMobile?: boolean;
}) => {
  return (
    <Grid.Col
      span={span}
      className={cn("", hideOnMobile ? "hidden md:block" : "", className)}
    >
      <Text className="text-sm font-semibold">{upperText}</Text>
      <Text className="text-xs">{lowerText}</Text>
    </Grid.Col>
  );
};

type BankServiceListDataType = {
  id: string;
  icon: React.ReactNode;
  iconBackground: string;
  title: string;
  description: string;
  firstItem: string;
  secondItem: string;
};

const bankServiceListData: BankServiceListDataType[] = [
  {
    id: "1255125",
    icon: <HandCoins className="w-11 h-11 text-pink-500 p-2" />,
    iconBackground: "bg-pink-500/50",
    title: "Business loans",
    description: "It is a long established ",
    firstItem: "Lorem Ipsum",
    secondItem: "Many publishing",
  },
  {
    id: "6161237",
    icon: <BriefcaseBusiness className="w-11 h-11 text-amber-500 p-2" />,
    iconBackground: "bg-amber-500/50",
    title: "Checking accounts",
    description: "It is a long established ",
    firstItem: "Lorem Ipsum",
    secondItem: "Many publishing",
  },
  {
    id: "11255136",
    icon: <ChartNoAxesColumn className="w-11 h-11 text-violet-500 p-2" />,
    iconBackground: "bg-violet-500/50",
    title: "Savings accounts",
    description: "It is a long established ",
    firstItem: "Lorem Ipsum",
    secondItem: "Many publishing",
  },
  {
    id: "61671334",
    icon: <User className="w-11 h-11 text-blue-500 p-2" />,
    iconBackground: "bg-blue-500/50",
    title: "Debit and credit cards",
    description: "It is a long established ",
    firstItem: "Lorem Ipsum",
    secondItem: "Many publishing",
  },
  {
    id: "861534",
    icon: <ShieldPlus className="w-11 h-11 text-cyan-500 p-2" />,
    iconBackground: "bg-cyan-500/50",
    title: "Life Insurance",
    description: "It is a long established ",
    firstItem: "Lorem Ipsum",
    secondItem: "Many publishing",
  },
  {
    id: "1616167",
    icon: <Landmark className="w-11 h-11 text-pink-500 p-2" />,
    iconBackground: "bg-pink-500/50",
    title: "Wealth Management",
    description: "It is a long established ",
    firstItem: "Lorem Ipsum",
    secondItem: "Many publishing",
  },
];
