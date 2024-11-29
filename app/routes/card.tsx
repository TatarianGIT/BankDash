import CardList from "~/components/card/CardList";
import CardSetting from "~/components/card/CardSetting";
import ExpenseStatistics from "~/components/card/ExpenseStatistics";
import CreditCard from "~/components/common/CreditCard";
import Item from "~/components/common/Item";

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

      <Item size="small" leftHeading="Card Setting">
        <CardSetting />
      </Item>
    </>
  );
};

export default Card;
