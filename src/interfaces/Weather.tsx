export interface ValueRange {
  min: number;
  max: number;
}
export interface WeatherData {
  location_id: number;
  location_name: string;
  date: Date;
  temperature: ValueRange;
  humidity: ValueRange;
  chanceOfRain: number | null;
  wind: ValueRange;
}

export interface LocationWeather {
  [location_id: string]: WeatherData[];
}

/**
 * Get a JS Date for tomorrow
 * @returns tomorrows date
 */
export const getTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

/**
 * set up some fact data for location 14
 */
export const SampleWeatherData: LocationWeather = {
  "14": [
    {
      location_id: 14,
      location_name: "Melbourne",
      date: new Date(),
      temperature: {
        min: 5,
        max: 32,
      },
      wind: {
        min: 10,
        max: 21,
      },
      humidity: {
        min: 67,
        max: 78,
      },
      chanceOfRain: 34,
    },
    {
      location_id: 14,
      location_name: "Melbourne",
      date: getTomorrow(),
      temperature: {
        min: 5,
        max: 30,
      },
      wind: {
        min: 10,
        max: 21,
      },
      humidity: {
        min: 57,
        max: 68,
      },
      chanceOfRain: 20,
    },
  ],
};
