import { SimpleGrid, useMatches } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import FormInput from "./FormInput";
import SaveButton from "./SaveButton";
import SwitchOption from "./SwitchOption";

const PreferencesTab = () => {
  const fetcher = useFetcher();
  const cols = useMatches({
    base: 1,
    md: 2,
  });

  return (
    <fetcher.Form method="POST" className="pt-10 px-1 md:px-6">
      <SimpleGrid cols={cols} verticalSpacing={"xl"}>
        <FormInput
          type="select"
          label="Currency"
          data={currencies}
          placeholder={currencies[0]}
        />
        <FormInput
          type="select"
          label="Time Zone"
          data={timezones.map((timezone) => {
            return timezone.timezone + " " + timezone.cities;
          })}
          placeholder={placeholderTimezone}
        />

        <div className="flex flex-col gap-2">
          <SwitchOption label="I send or receive digita currency" />
          <SwitchOption label="I receive merchant order" />
          <SwitchOption label="There are recommendation for my account" />
        </div>
      </SimpleGrid>
      <div className="flex justify-end w-full">
        <SaveButton />
      </div>
    </fetcher.Form>
  );
};

export default PreferencesTab;

const currencies = ["USD ($)", "EUR (€)", "PLN (zł)"];

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

const placeholderTimezone = timezones[0].timezone + " " + timezones[0].cities;
