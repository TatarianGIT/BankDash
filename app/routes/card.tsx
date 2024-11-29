import ExpenseStatistics from "~/components/card/ExpenseStatistics";

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
    </>
  );
};

export default Card;
