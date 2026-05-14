import { City } from '../types';

// Open-Meteo weather code → condition mapping
function mapWeatherCode(code: number): { condition: string; icon: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'thunderstorm' | 'windy' } {
  if (code === 0) return { condition: '晴', icon: 'sunny' };
  if (code <= 3) return { condition: '多云', icon: 'partly_cloudy' };
  if (code <= 48) return { condition: '阴', icon: 'cloudy' };
  if (code <= 57) return { condition: '小雨', icon: 'rainy' };
  if (code <= 67) return { condition: '中雨', icon: 'rainy' };
  if (code <= 77) return { condition: '雨夹雪', icon: 'rainy' };
  if (code <= 82) return { condition: '大雨', icon: 'rainy' };
  if (code <= 86) return { condition: '小雪', icon: 'cloudy' };
  if (code <= 99) return { condition: '雷阵雨', icon: 'thunderstorm' };
  return { condition: '晴', icon: 'sunny' };
}

function windSpeedToLevel(kmh: number): string {
  if (kmh < 1) return '0级';
  if (kmh < 6) return '1级';
  if (kmh < 12) return '2级';
  if (kmh < 20) return '3级';
  if (kmh < 29) return '4级';
  if (kmh < 39) return '5级';
  return '6级';
}

function uvIndexLabel(uvi: number): string {
  if (uvi <= 2) return '弱';
  if (uvi <= 5) return '中等';
  if (uvi <= 7) return '强';
  return '极强';
}

// City coordinates for Open-Meteo API
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  beijing: { lat: 39.9042, lng: 116.4074 },
  shanghai: { lat: 31.2304, lng: 121.4737 },
  guangzhou: { lat: 23.1291, lng: 113.2644 },
  shenzhen: { lat: 22.5431, lng: 114.0579 },
  chengdu: { lat: 30.5728, lng: 104.0668 },
  hangzhou: { lat: 30.2741, lng: 120.1551 },
  zhengzhou: { lat: 34.7466, lng: 113.6254 },
  nanyang: { lat: 32.9907, lng: 112.5283 },
  luoyang: { lat: 34.6181, lng: 112.4539 },
  kaifeng: { lat: 34.7975, lng: 114.3076 },
  xinxiang: { lat: 35.303, lng: 113.9268 },
  anyang: { lat: 36.0977, lng: 114.3931 },
  xuchang: { lat: 34.0358, lng: 113.8523 },
  pingdingshan: { lat: 33.7663, lng: 113.1927 },
  jiaozuo: { lat: 35.2158, lng: 113.2418 },
  shangqiu: { lat: 34.4142, lng: 115.6564 },
  xinyang: { lat: 32.1473, lng: 114.0912 },
  zhoukou: { lat: 33.634, lng: 114.7017 },
  zhumadian: { lat: 32.9783, lng: 114.023 },
  puyang: { lat: 35.7618, lng: 115.0292 },
  luohe: { lat: 33.5813, lng: 114.0165 },
};

export interface LiveWeatherData {
  temp: number;
  condition: string;
  conditionIcon: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'thunderstorm' | 'windy';
  humidity: number;
  windSpeed: string;
  windSpeedKmh: number;
  uvIndex: string;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  aqi: number;
  lastUpdated: string;
}

export interface DailyForecastItem {
  date: string;
  dayLabel: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  conditionIcon: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'thunderstorm' | 'windy';
  humidity: number;
  windSpeed: string;
  uvIndex: string;
  sunrise: string;
  sunset: string;
  hourly: { time: string; temp: number; condition: string; conditionIcon: string }[];
}

function generateFallbackHourly(baseHigh: number, baseLow: number): { time: string; temp: number; condition: string; conditionIcon: string }[] {
  const conditions = ['sunny', 'partly_cloudy', 'cloudy', 'rainy'];
  const hourly: { time: string; temp: number; condition: string; conditionIcon: string }[] = [];
  for (let h = 6; h <= 22; h += 2) {
    const hourTemp = Math.round(baseLow + (baseHigh - baseLow) * Math.sin(((h - 6) / 16) * Math.PI));
    const ci = conditions[Math.floor(Math.random() * conditions.length)];
    hourly.push({ time: `${String(h).padStart(2, '0')}:00`, temp: hourTemp, condition: ci, conditionIcon: ci });
  }
  return hourly;
}

const WEEKDAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

function dayLabel(date: Date, index: number): string {
  if (index === 0) return '今天';
  if (index === 1) return '明天';
  if (index === 2) return '后天';
  return WEEKDAY_NAMES[date.getDay()];
}

export async function fetchWeather(city: City): Promise<{ live: LiveWeatherData; forecast: DailyForecastItem[] }> {
  const coords = CITY_COORDS[city.id];
  if (!coords) return generateFallback(city);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max,sunrise,sunset,uv_index_max&hourly=temperature_2m,weather_code&timezone=auto&forecast_days=8`;

    const res = await fetch(url);
    if (!res.ok) return generateFallback(city);
    const data = await res.json();

    const current = data.current;
    const mapped = mapWeatherCode(current.weather_code);
    const now = new Date();
    const lastUpdated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const live: LiveWeatherData = {
      temp: Math.round(current.temperature_2m),
      condition: mapped.condition,
      conditionIcon: mapped.icon,
      humidity: current.relative_humidity_2m,
      windSpeed: windSpeedToLevel(current.wind_speed_10m),
      windSpeedKmh: Math.round(current.wind_speed_10m),
      uvIndex: '中等',
      feelsLike: Math.round(current.apparent_temperature),
      sunrise: data.daily.sunrise[0]?.slice(11, 16) || city.sunrise,
      sunset: data.daily.sunset[0]?.slice(11, 16) || city.sunset,
      aqi: city.aqi,
      lastUpdated,
    };

    const daily = data.daily;
    const hourlyData = data.hourly;
    const forecast: DailyForecastItem[] = [];

    for (let i = 0; i < Math.min(daily.time.length, 8); i++) {
      const date = new Date(daily.time[i]);
      const dateStr = daily.time[i];
      const dm = mapWeatherCode(daily.weather_code[i]);

      // Extract hourly data for this day
      const dayHourly: { time: string; temp: number; condition: string; conditionIcon: string }[] = [];
      const dayStart = i * 24;
      for (let h = 6; h <= 22; h += 3) {
        const idx = dayStart + h;
        if (idx < hourlyData.time.length && hourlyData.time[idx]?.startsWith(dateStr)) {
          const hm = mapWeatherCode(hourlyData.weather_code[idx]);
          dayHourly.push({
            time: `${String(h).padStart(2, '0')}:00`,
            temp: Math.round(hourlyData.temperature_2m[idx]),
            condition: hm.condition,
            conditionIcon: hm.icon,
          });
        }
      }
      if (dayHourly.length === 0) {
        dayHourly.push(...generateFallbackHourly(daily.temperature_2m_max[i], daily.temperature_2m_min[i]));
      }

      forecast.push({
        date: dateStr,
        dayLabel: dayLabel(date, i),
        tempHigh: Math.round(daily.temperature_2m_max[i]),
        tempLow: Math.round(daily.temperature_2m_min[i]),
        condition: dm.condition,
        conditionIcon: dm.icon,
        humidity: current.relative_humidity_2m + Math.round((Math.random() - 0.5) * 10),
        windSpeed: windSpeedToLevel(daily.wind_speed_10m_max?.[i] || current.wind_speed_10m),
        uvIndex: uvIndexLabel(daily.uv_index_max?.[i] || 3),
        sunrise: daily.sunrise[i]?.slice(11, 16) || city.sunrise,
        sunset: daily.sunset[i]?.slice(11, 16) || city.sunset,
        hourly: dayHourly,
      });
    }

    return { live, forecast };
  } catch {
    return generateFallback(city);
  }
}

function generateFallback(city: City): { live: LiveWeatherData; forecast: DailyForecastItem[] } {
  const now = new Date();
  const lastUpdated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const hour = now.getHours();
  const tempVariation = Math.round(Math.sin((hour - 6) / 14 * Math.PI) * 5);
  const baseTemp = city.temp + tempVariation;

  const live: LiveWeatherData = {
    temp: baseTemp,
    condition: city.condition,
    conditionIcon: city.condition.includes('雨') ? 'rainy' : city.condition.includes('云') ? 'partly_cloudy' : city.condition.includes('阴') ? 'cloudy' : 'sunny',
    humidity: city.humidity + Math.round((Math.random() - 0.5) * 10),
    windSpeed: city.windSpeed,
    windSpeedKmh: parseInt(city.windSpeed) * 5 || 10,
    uvIndex: city.uvIndex,
    feelsLike: city.feelsLike + tempVariation,
    sunrise: city.sunrise,
    sunset: city.sunset,
    aqi: city.aqi,
    lastUpdated,
  };

  const today = new Date();
  const forecast: DailyForecastItem[] = [];
  const conditions: ('sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'thunderstorm' | 'windy')[] = ['sunny', 'partly_cloudy', 'cloudy', 'rainy', 'thunderstorm', 'windy'];
  const labels = ['晴', '多云', '阴', '小雨', '雷阵雨', '大风'];

  for (let i = 0; i < 8; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const ci = (i * 3 + Math.round(baseTemp) % 6) % 6;
    const high = baseTemp + Math.round((Math.sin(i * 0.7) * 6));
    const low = high - 5 - Math.round(Math.random() * 4);

    forecast.push({
      date: dateStr,
      dayLabel: dayLabel(date, i),
      tempHigh: high,
      tempLow: low,
      condition: labels[ci],
      conditionIcon: conditions[ci],
      humidity: city.humidity + Math.round((Math.random() - 0.5) * 15),
      windSpeed: city.windSpeed,
      uvIndex: city.uvIndex,
      sunrise: city.sunrise,
      sunset: city.sunset,
      hourly: generateFallbackHourly(high, low),
    });
  }

  return { live, forecast };
}
