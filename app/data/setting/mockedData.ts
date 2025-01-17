import { z } from "zod";
import { Override } from "~/types";
import { wait } from "~/utils/wait";

export type ProfileType = z.infer<typeof ProfileSchema>;
export type PreferencesType = z.infer<typeof PreferencesSchema>;
export type SecurityType = Omit<z.infer<typeof SecuritySchema>, "newPassword">;

type FormValue = FormDataEntryValue | null;

type UnknownRequest<T> = {
  [K in keyof T]: FormValue | boolean;
};

type IncomingProfile = UnknownRequest<ProfileType> & {
  password: FormValue;
};

type IncomingPreferences = UnknownRequest<PreferencesType>;

type IncomingSecurity = Override<
  UnknownRequest<SecurityType>,
  { twoFa: boolean }
> & {
  newPassword: unknown;
};

export type SettingResponse = {
  status: "success" | "error";
  message: string;
};

export const ProfileSchema = z.object({
  fullName: z.string().min(5),
  username: z.string().min(5),
  email: z.string().email().min(5),
  city: z.string().min(5),
  birthDate: z.string(),
  country: z.string().min(2),
  permaAddress: z.string().min(3),
  postalCode: z.number().min(0),
  presentAddress: z.string().min(3),
});

export const PreferencesSchema = z.object({
  currency: z.string().min(3).max(3),
  timeZone: z.string().min(5),
  digitalCurrency: z.boolean(),
  merchantOrder: z.boolean(),
  recommendation: z.boolean(),
});

export const SecuritySchema = z.object({
  newPassword: z.string().min(5).max(50),
  currentPassword: z.string().min(5).max(50),
  twoFa: z.boolean(),
});

const initProfile: ProfileType = {
  fullName: "Marcus Dawson",
  username: "mdawson98",
  email: "marcus.dawson@example.com",
  birthDate: "1998-05-15",
  presentAddress: "Seattle, Washington, USA",
  permaAddress: "Tacoma, Washington, USA",
  city: "Seattle",
  postalCode: 98101,
  country: "USA",
};

const initPreferences: PreferencesType = {
  currency: "EUR",
  timeZone: "UTC-05:00 New York, Toronto, Havana, Lima, Bogotá",
  digitalCurrency: true,
  merchantOrder: false,
  recommendation: true,
};

const initSecurity: SecurityType = {
  twoFa: true,
  currentPassword: "password1234!",
};

export const getProfile = async () => {
  await wait(500);
  return settings.getProfile();
};

export const getPreferences = async () => {
  await wait(800);
  return settings.getPreferences();
};

export const getSecurity = async () => {
  await wait(1100);
  return settings.getSecurity();
};

export const getPassword = async (): Promise<string> => {
  return settings.security.currentPassword;
};

export const getUsername = async (): Promise<string> => {
  return settings.profile.username;
};

export const updateProfile = async (newProfile: IncomingProfile) => {
  await wait(1100);
  return settings.updateProfile(newProfile);
};

export const updatePreferences = async (
  newPreferences: IncomingPreferences
) => {
  await wait(1100);
  return settings.updatePreferences(newPreferences);
};

export const updateSecurity = async (newSecurity: IncomingSecurity) => {
  await wait(1100);
  return settings.updateSecurity(newSecurity);
};

export const settings = {
  profile: { ...initProfile } as ProfileType,

  preferences: { ...initPreferences } as PreferencesType,

  security: { ...initSecurity } as SecurityType,

  async getPassword(): Promise<string> {
    return this.security.currentPassword;
  },

  async getUsername(): Promise<string> {
    return this.profile.username;
  },

  async getProfile(): Promise<ProfileType> {
    return this.profile;
  },

  async getPreferences(): Promise<PreferencesType> {
    return this.preferences;
  },

  async getSecurity(): Promise<SecurityType> {
    return this.security;
  },

  async updateProfile(update: IncomingProfile): Promise<SettingResponse> {
    const newProfile = {
      ...update,
      postalCode: Number(update.postalCode),
    } as ProfileType;

    const profileResult = ProfileSchema.safeParse(newProfile);
    const passwordResult = SecuritySchema.shape.currentPassword.safeParse(
      update.password
    );

    if (!update.password) {
      return {
        status: "error",
        message: "Password is required to edit profile",
      };
    }

    if (!passwordResult.success || !profileResult.success) {
      console.log(JSON.stringify(passwordResult.error?.format(), null, 2));
      console.log("\n");
      console.log(JSON.stringify(profileResult.error?.format(), null, 2));
      return { status: "error", message: "Unexpected error" };
    }

    const parsedProfile = profileResult.data;
    const parsedPassword = passwordResult.data;

    if (parsedPassword !== this.security.currentPassword) {
      return { status: "error", message: "Wrong password" };
    }

    this.profile = { ...parsedProfile };
    return { status: "success", message: "Profile saved successfully!" };
  },

  async updatePreferences(
    update: IncomingPreferences
  ): Promise<SettingResponse> {
    const parseResult = PreferencesSchema.safeParse(update);

    if (!parseResult.success) {
      console.log(JSON.stringify(parseResult.error, null, 2));
      return { status: "error", message: "Unexpected error" };
    }

    const parsedNewPreferences = parseResult.data;

    this.preferences = { ...parsedNewPreferences };
    return { status: "success", message: "Preferences saved successfully!" };
  },

  async updateSecurity(update: IncomingSecurity): Promise<SettingResponse> {
    const parsedTwoFa = SecuritySchema.shape.twoFa.safeParse(update.twoFa);
    const prevTwoFa = settings.security.twoFa;

    if (!parsedTwoFa.success) {
      return { status: "error", message: "Unexpected error" };
    }

    if (!update.currentPassword && !update.newPassword) {
      settings.security = { ...settings.security, twoFa: parsedTwoFa.data };
      return {
        status: "success",
        message: "Two factor authentication saved.",
      };
    }

    const parsedPasswords = SecuritySchema.omit({ twoFa: true }).safeParse(
      update
    );

    if (!parsedPasswords.success) {
      return { status: "error", message: "Unexprected error" };
    }

    if (
      settings.security.currentPassword !== parsedPasswords.data.currentPassword
    ) {
      return {
        status: "error",
        message: "Wrong password",
      };
    }

    if (
      settings.security.currentPassword === parsedPasswords.data.newPassword
    ) {
      return {
        status: "error",
        message: "New password must be different from current one",
      };
    }

    settings.security = {
      ...settings.security,
      currentPassword: parsedPasswords.data.newPassword,
    };

    if (prevTwoFa !== parsedTwoFa.data) {
      return {
        status: "success",
        message: "Security options saved successfully!",
      };
    }

    return {
      status: "success",
      message: "New password has been set!",
    };
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
