import { wait } from "~/utils/wait";

export const getProfile = async () => {
  await wait(800);
  return settings.getProfile();
};

export const getPreferences = async () => {
  await wait(1100);
  return settings.getPreferences();
};

export const getSecurity = async () => {
  await wait(1500);
  return settings.getSecurity();
};

export type ProfileType = {
  fullName: string;
  username: string;
  email: string;
  // birthDate: Date;
  birthDate: string;
  presentAddress: string;
  permaAddress: string;
  city: string;
  postalCode: number;
  country: string;
};

export type PreferencesType = {
  currency: string;
  timeZone: string;
  digitalCurrency: boolean;
  merchantOrder: boolean;
  recommendation: boolean;
};

export type SecurityType = {
  twoFa: boolean;
  currentPassword: string;
};

export const settings = {
  profile: {
    fullName: "Marcus Dawson",
    username: "mdawson98",
    email: "marcus.dawson@example.com",
    // birthDate: new Date("1998-05-15"),
    birthDate: "1998-05-15",
    presentAddress: "Seattle, Washington, USA",
    permaAddress: "Tacoma, Washington, USA",
    city: "Seattle",
    postalCode: 98101,
    country: "USA",
  } as ProfileType,

  preferences: {
    currency: "EUR",
    timeZone: "UTC-05:00 New York, Toronto, Havana, Lima, Bogotá",
    digitalCurrency: true,
    merchantOrder: false,
    recommendation: true,
  } as PreferencesType,

  security: {
    twoFa: true,
    currentPassword: "password1234!",
  } as SecurityType,

  async getProfile(): Promise<ProfileType> {
    return this.profile;
  },

  async getPreferences(): Promise<PreferencesType> {
    return this.preferences;
  },

  async getSecurity(): Promise<SecurityType> {
    return this.security;
  },

  async updateProfile(
    update: Partial<ProfileType> & { password: string }
  ): Promise<void> {
    if (update.password !== this.security.currentPassword) {
      console.log("incorrect password!");
      return;
    }

    this.profile = { ...this.profile, ...update };
    console.log("profile updated!");
    return;
  },

  async updatePreferences(update: Partial<PreferencesType>): Promise<void> {
    this.preferences = { ...this.preferences, ...update };
    console.log("preferences updated!");
    return;
  },

  async updateSecurity(update: Partial<SecurityType>): Promise<void> {
    this.security = { ...this.security, ...update };
    console.log("security updated!");
    return;
  },
};

const currencies = ["USD", "EUR", "PLN"];
const timezones = [
  {
    timezone: "UTC-12:00",
    cities: "Baker Island, Howland Island",
  },
  {
    timezone: "UTC-11:00",
    cities: "Pago Pago, Midway Atoll, Niue",
  },
  {
    timezone: "UTC-10:00",
    cities: "Honolulu, Papeete, Rarotonga",
  },
  {
    timezone: "UTC-09:00",
    cities: "Anchorage, Gambier Islands",
  },
  {
    timezone: "UTC-08:00",
    cities: "Los Angeles, Vancouver, Tijuana, Seattle",
  },
  {
    timezone: "UTC-07:00",
    cities: "Denver, Phoenix, Calgary, Ciudad Juárez",
  },
  {
    timezone: "UTC-06:00",
    cities: "Chicago, Mexico City, Winnipeg, San Salvador",
  },
  {
    timezone: "UTC-05:00",
    cities: "New York, Toronto, Havana, Lima, Bogotá",
  },
  {
    timezone: "UTC-04:00",
    cities: "Santiago, Caracas, La Paz, San Juan",
  },
  {
    timezone: "UTC-03:00",
    cities: "Buenos Aires, São Paulo, Montevideo, Georgetown",
  },
  {
    timezone: "UTC-02:00",
    cities: "South Georgia and the South Sandwich Islands",
  },
  {
    timezone: "UTC-01:00",
    cities: "Azores, Cape Verde",
  },
  {
    timezone: "UTC+00:00",
    cities: "London, Lisbon, Dublin, Reykjavik, Accra",
  },
  {
    timezone: "UTC+01:00",
    cities:
      "Berlin, Rome, Stockholm, Paris, Madrid, Warsaw, Lagos, Kinshasa, Algiers, Casablanca",
  },
  {
    timezone: "UTC+02:00",
    cities: "Cairo, Johannesburg, Helsinki, Athens, Bucharest",
  },
  {
    timezone: "UTC+03:00",
    cities: "Moscow, Nairobi, Istanbul, Riyadh, Baghdad",
  },
  {
    timezone: "UTC+04:00",
    cities: "Dubai, Baku, Tbilisi, Yerevan",
  },
  {
    timezone: "UTC+05:00",
    cities: "Karachi, Tashkent, Yekaterinburg",
  },
  {
    timezone: "UTC+06:00",
    cities: "Dhaka, Almaty, Bishkek",
  },
  {
    timezone: "UTC+07:00",
    cities: "Bangkok, Jakarta, Hanoi, Ho Chi Minh City",
  },
  {
    timezone: "UTC+08:00",
    cities: "Beijing, Singapore, Perth, Kuala Lumpur",
  },
  {
    timezone: "UTC+09:00",
    cities: "Tokyo, Seoul, Pyongyang",
  },
  {
    timezone: "UTC+10:00",
    cities: "Sydney, Guam, Port Moresby",
  },
  {
    timezone: "UTC+11:00",
    cities: "Noumea, Solomon Islands",
  },
  {
    timezone: "UTC+12:00",
    cities: "Auckland, Suva, Petropavlovsk-Kamchatsky",
  },
  {
    timezone: "UTC+13:00",
    cities: "Nuku'alofa, Samoa",
  },
  {
    timezone: "UTC+14:00",
    cities: "Kiritimati",
  },
];
