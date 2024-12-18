import { wait } from "~/utils/wait";
import dayjs from "dayjs";
import { z } from "zod";

export const addNewCard = async (data: CardData): Promise<NewCardResponse> => {
  await wait(600);
  const parsed = await cardFormSchema.safeParseAsync(data);

  if (!parsed.success) {
    const error = parsed.error.format();
    return { status: "error", message: error };
  }

  data.date = dayjs(data.date).format("MM/YY");
  data.balance = Math.floor(Math.random() * 10000);

  await card.create(data);

  return {
    status: "success",
    message: {
      title: "Success!",
      description: `Your ${parsed.data.type.toLowerCase()} card has been added.`,
    },
  };
};

export const getAllCards = async () => {
  await wait(800);

  return card.getAll();
};

export const cardFormSchema = z.object({
  type: z.enum(["Physical", "Virtual"]),
  name: z.string().min(1, "Name On Card is required"),
  number: z
    .string()
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Invalid Card Number"),
  date: z.string().min(1, "Expiration Date is required"),
});

export type NewCardResponse =
  | {
      status: "success";
      message: { title: string; description: string };
    }
  | {
      status: "error";
      message: z.ZodFormattedError<
        {
          number: string;
          type: "Physical" | "Virtual";
          date: string;
          name: string;
        },
        string
      >;
    };

export type CardData = {
  id?: string;
  balance: number;
  type: "Physical" | "Virtual";
  name: string;
  date: string;
  number: string;
};

type CardRecord = {
  id: string;
} & CardData;

export const card = {
  records: {} as Record<string, CardData>,

  async create(values: CardData): Promise<CardRecord> {
    const id = (Date.now() + Math.floor(Math.random() * 10000)).toString();
    const newCard = { id, ...values };
    card.records[id] = newCard;

    return newCard;
  },

  async getAll(): Promise<CardData[]> {
    return Object.keys(card.records).map((key) => card.records[key]);
  },

  async getAmount(amount: number): Promise<CardData[]> {
    return Object.keys(card.records)
      .slice(0, amount)
      .map((key) => card.records[key]);
  },
};

(
  [
    {
      balance: 12500,
      name: "Arnold Strong",
      type: "Physical",
      date: "12/24",
      number: "2420 2150 6660 1250",
    },
    {
      balance: 7700,
      name: "Anna Strong",
      type: "Virtual",
      date: "05/25",
      number: "5120 4486 4884 1688",
    },
    {
      balance: 2200,
      name: "Anna Strong",
      type: "Physical",
      date: "07/28",
      number: "1120 4516 5221 8128",
    },
  ] as CardData[]
).forEach((element) => card.create(element));
