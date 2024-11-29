const Card = () => {
  return (
    <>
      <Item size="full" leftHeading="My Cards">
        <CreditCard variant="primary" />
        <CreditCard variant="alt" />
      </Item>
    </>
  );
};

export default Card;
