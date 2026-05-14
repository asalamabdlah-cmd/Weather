export type PageId = 'dashboard' | 'forecast' | 'settings' | 'support';

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  coords: string;
  humidity: number;
  windSpeed: number;
  windDir: string;
  uvIndex: string;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
}

export interface DayForecast {
  day: string;
  temp: number;
  condition: 'clear_day' | 'partly_cloudy_day' | 'rainy' | 'cloud';
  label: string;
}

export interface HourForecast {
  time: string;
  temp: number;
  condition: string;
}
