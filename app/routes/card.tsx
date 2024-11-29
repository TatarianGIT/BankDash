import CardList from "~/components/card/CardList";
import CardSetting from "~/components/card/CardSetting";
import ExpenseStatistics from "~/components/card/ExpenseStatistics";
import CreditCard from "~/components/common/CreditCard";
import Item from "~/components/common/Item";
import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import AddNewCard, { cardFormSchema } from "~/components/card/AddNewCard";
import { addNewCard } from "~/data/card/addNewCard";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = Object.fromEntries(await request.formData());

  const parsed = await cardFormSchema.safeParseAsync(form);

  if (!parsed.success) {
    const error = parsed.error.format();
    return json({ error });
  }

  await addNewCard(form);

  return null;
};

const Card = () => {
  return (
    <>
      <Item size="full" leftHeading="My Cards">
        <CreditCard variant="primary" />
        <CreditCard variant="alt" />
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
