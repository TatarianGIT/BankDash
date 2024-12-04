import { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import AddNewCard from "~/components/card/AddNewCard";
import CardList from "~/components/card/CardList";
import CardSetting from "~/components/card/CardSetting";
import ExpenseStatistics from "~/components/card/ExpenseStatistics";
import CreditCard from "~/components/common/CreditCard";
import Item from "~/components/common/Item";
import { addNewCard, CardData, getAllCards } from "~/data/card/addNewCard";

export const loader = async () => {
  const cards = await getAllCards();

  return json({ cards });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();

  const newCard: CardData = {
    balance: 0,
    name: form.get("name") as string,
    number: form.get("number") as string,
    type: form.get("type") as "Physical" | "Virtual",
    date: form.get("date") as string,
  };

  const response = await addNewCard(newCard);

  return json({ response });
};

const Card = () => {
  const { cards } = useLoaderData<typeof loader>();
  return (
    <>
      <Item shouldOverflow={true} size="full" leftHeading="My Cards">
        {cards.length
          ? cards.map((creditCard) => (
              <CreditCard key={creditCard.id} {...creditCard} />
            ))
          : null}
      </Item>

      <Item size="small" leftHeading="Card Expense Statistics">
        <ExpenseStatistics />
      </Item>

      <Item size="medium" leftHeading="Card List">
        <CardList />
      </Item>

      <Item size="medium" leftHeading="Add New Card">
        <AddNewCard />
      </Item>

      <Item size="small" leftHeading="Card Setting">
        <CardSetting />
      </Item>
    </>
  );
};

export default Card;
