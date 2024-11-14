export async function getAllContacts() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const contacts = await fakeContacts.getAll();
  return contacts;
}

export type UserData = {
  id?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
};

type ContactRecord = UserData & {
  id: string;
  avatar: string;
};

const fakeContacts = {
  records: {} as Record<string, UserData>,

  async create(values: UserData): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const avatar = `https://i.pravatar.cc/150`;
    const newContact = { id, avatar, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async getAll(): Promise<UserData[]> {
    return Object.keys(fakeContacts.records).map(
      (key) => fakeContacts.records[key]
    );
  },
};

[
  {
    firstName: "Alex",
    lastName: "Johnson",
    position: "CEO",
  },
  {
    firstName: "Samantha",
    lastName: "Carter",
    position: "Director",
  },
  {
    firstName: "David",
    lastName: "Miller",
    position: "Product Manager",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    position: "Software Engineer",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    position: "Software Engineer",
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    position: "UX Designer",
  },
  {
    firstName: "Chris",
    lastName: "Taylor",
    position: "Financial Analyst",
  },
  {
    firstName: "Jessica",
    lastName: "Martinez",
    position: "HR Specialist",
  },
  {
    firstName: "Ryan",
    lastName: "Anderson",
    position: "Sales Manager",
  },
  {
    firstName: "Laura",
    lastName: "Moore",
    position: "Operations Manager",
  },
  {
    firstName: "James",
    lastName: "Thomas",
    position: "Data Scientist",
  },
  {
    firstName: "Olivia",
    lastName: "Garcia",
    position: "Marketing Specialist",
  },
  {
    firstName: "Daniel",
    lastName: "Hernandez",
    position: "Business Analyst",
  },
  {
    firstName: "Sophia",
    lastName: "Lopez",
    position: "Content Strategist",
  },
  {
    firstName: "Ethan",
    lastName: "Walker",
    position: "Support",
  },
].forEach((contact) => {
  const id = `${contact.firstName.toLowerCase()}-${contact.lastName.toLocaleLowerCase()}`;
  fakeContacts.create({
    ...contact,
    id,
    avatar: `https://i.pravatar.cc/150?u=${id}`,
  });
});
