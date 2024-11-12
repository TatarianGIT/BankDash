const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const transactionData = [
  { day: "Sat", Deposit: 1200, Withdraw: 900 },
  { day: "Sun", Deposit: 1900, Withdraw: 1200 },
  { day: "Mon", Deposit: 400, Withdraw: 1000 },
  { day: "Tue", Deposit: 1000, Withdraw: 200 },
  { day: "Thu", Deposit: 800, Withdraw: 1400 },
  { day: "Fri", Deposit: 750, Withdraw: 600 },
];

export const getRecentTransactions = async () => {
  return transactionData;
};

export const expenseStatistics = [
  { name: "Investment", value: 30, color: "pink.6" },
  { name: "Entertainment", value: 20, color: "gray.6" },
  { name: "Bill Expense", value: 15, color: "orange.6" },
  { name: "Others", value: 35, color: "blue.6" },
];

export const getExpenseStatistics = async () => {
  return expenseStatistics;
};
