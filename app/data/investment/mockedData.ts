export async function getInvestment() {
  return investmentData;
}

export async function getRevenue() {
  return revenueData;
}

export type InvestmentDataType = {
  year: number;
} & ({ investment: number } | { revenue: number });

const investmentData: InvestmentDataType[] = [
  {
    year: 2016,
    investment: 6400,
  },
  {
    year: 2017,
    investment: 23700,
  },
  {
    year: 2018,
    investment: 16800,
  },
  {
    year: 2019,
    investment: 36200,
  },
  {
    year: 2020,
    investment: 20700,
  },
  {
    year: 2021,
    investment: 29350,
  },
];

const revenueData: InvestmentDataType[] = [
  {
    year: 2016,
    revenue: 11600,
  },
  {
    year: 2017,
    revenue: 14250,
  },
  {
    year: 2018,
    revenue: 27800,
  },
  {
    year: 2019,
    revenue: 32100,
  },
  {
    year: 2020,
    revenue: 18500,
  },
  {
    year: 2021,
    revenue: 22900,
  },
];
