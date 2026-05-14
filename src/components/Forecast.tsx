import { useState, useMemo } from 'react';
import {
  AirVent, Compass, Sunrise, Sunset, Calendar, Radar,
  Sun, CloudSun, Cloud, CloudRain, CloudLightning, Wind,
  Droplets, Eye, Thermometer, ChevronLeft, ChevronRight, Umbrella, Shirt,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { City, Language, UI_TEXT } from '../types';
import { LiveWeatherData, DailyForecastItem } from '../lib/weather';

const WEATHER_META: Record<string, { label: string; icon: typeof Sun; color: string }> = {
  sunny: { label: '晴', icon: Sun, color: 'text-amber-500' },
  partly_cloudy: { label: '多云', icon: CloudSun, color: 'text-sky-400' },
  cloudy: { label: '阴', icon: Cloud, color: 'text-gray-400' },
  rainy: { label: '雨', icon: CloudRain, color: 'text-blue-400' },
  thunderstorm: { label: '雷雨', icon: CloudLightning, color: 'text-purple-500' },
  windy: { label: '大风', icon: Wind, color: 'text-teal-500' },
};

const dayContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.3 } } };
const dayItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

function getClothing(tempHigh: number, tempLow: number, conditionIcon: string, uvIndex: string, windSpeed: string, lang: Language): string[] {
  const items: string[] = [];
  const isZh = lang === 'zh';
  const avgTemp = (tempHigh + tempLow) / 2;

  if (avgTemp <= 5) items.push(isZh ? '🧥 天气寒冷，建议穿棉衣、羽绒服、厚毛衣，戴围巾手套。' : '🧥 Very cold. Wear a down jacket, heavy coat, scarf, and gloves.');
  else if (avgTemp <= 12) items.push(isZh ? '🧥 天气较冷，建议穿棉衣、羽绒服、毛衣等保暖衣物。' : '🧥 Cold weather. Wear a down jacket, coat, and warm layers.');
  else if (avgTemp <= 18) items.push(isZh ? '🧣 天气偏凉，建议穿外套、卫衣、长裤。' : '🧣 Cool weather. Wear a light jacket, hoodie, and long pants.');
  else if (avgTemp <= 24) items.push(isZh ? '👕 气温舒适，建议穿衬衫、T恤、薄外套，注意早晚温差。' : '👕 Mild weather. A shirt or T-shirt with a light jacket for the evening.');
  else if (avgTemp <= 30) items.push(isZh ? '👗 天气温暖，建议穿短袖、短裤、裙子等清凉衣物。' : '👗 Warm weather. Short sleeves, shorts, or dresses are comfortable.');
  else items.push(isZh ? '🩳 天气炎热，建议穿轻薄透气衣物，注意防晒补水。' : '🩳 Hot weather. Wear light, breathable clothing. Stay hydrated and use sun protection.');

  if (conditionIcon === 'rainy' || conditionIcon === 'thunderstorm') {
    items.push(isZh ? '☔ 今天有雨，出门请携带雨伞！' : '☔ Rain expected. Don\'t forget your umbrella!');
  } else {
    items.push(isZh ? '🌂 无降水，无需带伞。' : '🌂 No rain expected. Umbrella not needed.');
  }

  if (uvIndex === '强' || uvIndex === '极强' || uvIndex === '中等') {
    items.push(isZh ? '🕶️ 紫外线较强，建议涂抹防晒霜，佩戴太阳镜。' : '🕶️ High UV. Apply sunscreen and wear sunglasses.');
  }

  const windLevel = parseInt(windSpeed);
  if (!isNaN(windLevel) && windLevel >= 4) {
    items.push(isZh ? '💨 风力较大，建议穿防风外套。' : '💨 Strong winds. Wear a windbreaker.');
  }

  if (tempHigh - tempLow > 12) {
    items.push(isZh ? '🌡️ 昼夜温差大，注意早晚添衣。' : '🌡️ Large temperature swing. Layer up in the morning and evening.');
  }

  return items;
}

interface ForecastProps {
  city: City;
  forecastData: DailyForecastItem[] | null;
  liveWeather: LiveWeatherData | null;
  loading: boolean;
  language: Language;
}

export default function Forecast({ city, forecastData, liveWeather, loading, language }: ForecastProps) {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [scrollIdx, setScrollIdx] = useState(0);
  const t = (key: string) => UI_TEXT[key]?.[language] || key;

  const days = useMemo(() => {
    if (forecastData && forecastData.length > 0) return forecastData;
    return [];
  }, [forecastData]);

  const activeDay = days[selectedDay];
  const visibleDays = 7;
  const maxScroll = Math.max(0, days.length - visibleDays);
  const displayDays = days.slice(scrollIdx, scrollIdx + visibleDays);

  if (loading || days.length === 0) {
    return (
      <div className="space-y-6 sm:space-y-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 dark:border-white/10 pb-6 sm:pb-8 gap-4">
          <div><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 dark:text-white">{t('fifteenDay')}</h2><p className="text-gray-500 dark:text-neutral-300 font-medium text-sm sm:text-base">{t('weatherData')}</p></div>
        </div>
        <div className="text-center py-20 text-gray-400 dark:text-neutral-400 text-lg">{t('loading')}</div>
      </div>
    );
  }

  const weatherMeta = WEATHER_META[activeDay?.conditionIcon] || WEATHER_META.sunny;
  const WeatherIcon = weatherMeta.icon;
  const clothingItems = activeDay ? getClothing(activeDay.tempHigh, activeDay.tempLow, activeDay.conditionIcon, activeDay.uvIndex, activeDay.windSpeed, language) : [];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 dark:border-white/10 pb-6 sm:pb-8 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 dark:text-white">{t('fifteenDay')}</h2>
          <p className="text-gray-500 dark:text-neutral-300 font-medium text-sm sm:text-base">{t('weatherData')}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-left md:text-right">
          <p className="text-xl sm:text-2xl font-bold dark:text-white">{city.district}</p>
          <p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase tracking-widest mt-1">{city.coords}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* 15 Day strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-12 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
          <div className="bg-gray-50/50 dark:bg-neutral-800/50 p-3 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider dark:text-white">{t('longTerm')} · {t('clickForDetail')}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 dark:text-neutral-400">{scrollIdx + 1}-{Math.min(scrollIdx + visibleDays, days.length)} / {days.length}</span>
              <Calendar className="w-4 h-4 text-gray-400 dark:text-neutral-400" />
            </div>
          </div>
          <div className="relative">
            {scrollIdx > 0 && (
              <button onClick={() => setScrollIdx(Math.max(0, scrollIdx - 1))} className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                <ChevronLeft className="w-5 h-5 dark:text-white" />
              </button>
            )}
            {scrollIdx < maxScroll && (
              <button onClick={() => setScrollIdx(Math.min(maxScroll, scrollIdx + 1))} className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                <ChevronRight className="w-5 h-5 dark:text-white" />
              </button>
            )}
            <motion.div variants={dayContainer} initial="hidden" animate="visible" className="flex divide-x divide-black/5 dark:divide-white/5 overflow-x-auto scrollbar-hide" key={scrollIdx}>
              {displayDays.map((day, i) => {
                const realIdx = scrollIdx + i;
                const isSelected = realIdx === selectedDay;
                const meta = WEATHER_META[day.conditionIcon] || WEATHER_META.sunny;
                const Icon = meta.icon;
                return (
                  <motion.button key={day.date} variants={dayItem} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedDay(realIdx)}
                    className={`flex-none w-28 sm:w-32 md:w-36 p-4 sm:p-5 flex flex-col items-center transition-colors cursor-pointer rounded-xl text-left ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black' : 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'}`}>
                    <span className={`text-[10px] mb-1 font-medium ${isSelected ? 'text-gray-300 dark:text-neutral-500' : 'text-gray-400 dark:text-neutral-400'}`}>{day.dayLabel}</span>
                    <span className="text-[10px] text-gray-400 dark:text-neutral-400 opacity-70 mb-2">{day.date.slice(5)}</span>
                    <motion.div className="mb-2" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: i * 0.15 }}>
                      <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${isSelected ? 'text-white dark:text-black' : meta.color}`} />
                    </motion.div>
                    <span className="text-sm sm:text-base font-bold">{day.tempHigh}°</span>
                    <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300 dark:text-neutral-500' : 'text-gray-400 dark:text-neutral-400'}`}>{day.tempLow}°</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Selected Day Detail */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedDay} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {/* Summary Card */}
            <div className="md:col-span-4 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6 flex flex-col items-center">
              <p className="text-xs text-gray-400 dark:text-neutral-400 mb-2">{activeDay.dayLabel} · {activeDay.date}</p>
              <WeatherIcon className={`w-12 h-12 sm:w-14 sm:h-14 ${weatherMeta.color} mb-3`} />
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold dark:text-white">{activeDay.tempHigh}°</span>
              <p className="text-sm text-gray-500 dark:text-neutral-300 mt-2">{activeDay.condition} · {t('feelsLike')} {activeDay.tempLow}°</p>
              <div className="w-full mt-auto pt-4 sm:pt-6 border-t border-dashed border-black/10 dark:border-white/10 grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center"><Droplets className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-gray-400 dark:text-neutral-400" /><p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('humidity')}</p><p className="text-xs sm:text-sm font-bold dark:text-white">{activeDay.humidity}%</p></div>
                <div className="text-center"><Wind className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-gray-400 dark:text-neutral-400" /><p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('wind')}</p><p className="text-xs sm:text-sm font-bold dark:text-white">{activeDay.windSpeed}</p></div>
                <div className="text-center"><Eye className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-gray-400 dark:text-neutral-400" /><p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('uv')}</p><p className="text-xs sm:text-sm font-bold dark:text-white">{activeDay.uvIndex}</p></div>
              </div>
            </div>

            {/* Hourly Detail + Clothing */}
            <div className="md:col-span-8 space-y-4 sm:space-y-6">
              <div className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 dark:text-white">{activeDay.dayLabel} · {t('hourlyDetail')}</h3>
                <div className="flex justify-between overflow-x-auto scrollbar-hide gap-2">
                  {activeDay.hourly.map((h, i) => {
                    const hm = WEATHER_META[h.conditionIcon] || WEATHER_META.sunny;
                    const HIcon = hm.icon;
                    return (
                      <motion.div key={h.time} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex flex-col items-center gap-2 min-w-[60px] sm:min-w-[70px]">
                        <span className="text-[10px] sm:text-xs text-gray-400 dark:text-neutral-400">{h.time}</span>
                        <HIcon className={`w-5 h-5 ${hm.color}`} />
                        <span className="text-sm sm:text-base font-bold dark:text-white">{h.temp}°</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-dashed border-black/10 dark:border-white/10 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3"><Sunrise className="w-5 h-5 text-gray-400 dark:text-neutral-400" /><div><p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('sunrise')}</p><p className="text-sm font-bold dark:text-white">{activeDay.sunrise}</p></div></div>
                  <div className="flex items-center gap-3"><Sunset className="w-5 h-5 text-gray-400 dark:text-neutral-400" /><div><p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('sunset')}</p><p className="text-sm font-bold dark:text-white">{activeDay.sunset}</p></div></div>
                </div>
              </div>

              {/* Clothing Recommendation */}
              <div className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3 dark:text-white flex items-center gap-2"><Shirt className="w-4 h-4" /> {t('clothingTitle')}</h3>
                <ul className="space-y-2">
                  {clothingItems.map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="text-sm text-gray-600 dark:text-neutral-300 flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">{item.match(/^[^\s]+/)?.[0]}</span>
                      <span>{item.replace(/^[^\s]+\s/, '')}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* AQI */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-4 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4 sm:mb-6"><h3 className="text-[10px] font-bold uppercase tracking-wider dark:text-white">{t('aqiTitle')}</h3><AirVent className="w-4 h-4 text-gray-400 dark:text-neutral-400" /></div>
          <div className="flex items-baseline justify-between mb-6 sm:mb-8 pb-4 border-b border-black/5 dark:border-white/5">
            <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} className="text-4xl sm:text-5xl md:text-6xl font-bold dark:text-white">{city.aqi}</motion.span>
            <span className="text-[10px] font-bold uppercase bg-gray-100 dark:bg-neutral-700 px-2 py-1 rounded-lg dark:text-white">{city.aqi <= 50 ? t('aqiExcellent') : city.aqi <= 100 ? t('aqiGood') : t('aqiModerate')}</span>
          </div>
          <div className="space-y-4">
            {['PM2.5', 'PM10', 'O3'].map((item, i) => (
              <div key={i} className="space-y-2"><div className="flex justify-between text-xs"><span className="text-gray-400 dark:text-neutral-400">{item}</span><span className="font-bold dark:text-white">12 µg/m³</span></div><div className="w-full h-1 bg-gray-100 dark:bg-neutral-700 rounded-full overflow-hidden"><motion.div className="h-full bg-black dark:bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${20 + i * 15}%` }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 + i * 0.1 }} /></div></div>
            ))}
          </div>
        </motion.div>

        {/* Radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-8 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-3 bg-gray-50/50 dark:bg-neutral-800/50 border-b border-black/10 dark:border-white/10"><h3 className="text-[10px] font-bold uppercase tracking-wider dark:text-white">{t('radarTitle')}</h3><div className="flex items-center gap-2"><span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-neutral-400">0% PROBABILITY</span><Radar className="w-4 h-4 text-gray-400 dark:text-neutral-400" /></div></div>
          <div className="flex-1 bg-gray-50 dark:bg-neutral-800 relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex items-center justify-center p-2">
            <div className="w-full h-full border border-black/10 dark:border-white/10 grayscale opacity-50 flex items-center justify-center overflow-hidden relative rounded-xl">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M0 50 Q 100 0 200 80 T 400 30" fill="none" stroke="currentColor" strokeWidth="0.5" /><path d="M0 120 Q 150 180 300 100 T 500 150" fill="none" stroke="currentColor" strokeWidth="0.5" /><circle cx="250" cy="150" r="1.5" fill="currentColor" /><text x="255" y="155" className="text-[8px] fill-current font-bold">{city.name.toUpperCase()}</text></svg>
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg p-2 sm:p-3 text-[8px] space-y-1 sm:space-y-2 dark:text-white">
                <p className="font-bold border-b border-black/10 dark:border-white/10 pb-1 mb-1">{t('legend')}</p>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-black dark:bg-white rounded-full" /><span>{t('heavy')}</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full" /><span>{t('medium')}</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 border border-black dark:border-white rounded-full" /><span>{t('light')}</span></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wind */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="md:col-span-12 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider mb-4 sm:mb-8 dark:text-white">{t('windDir')}</h3>
            <div className="flex items-baseline gap-2">
              <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut', delay: 0.3 }} className="text-4xl sm:text-5xl md:text-6xl font-bold dark:text-white">
                {liveWeather?.windSpeedKmh || 14}
              </motion.span>
              <span className="text-sm text-gray-400 dark:text-neutral-400">km/h</span>
            </div>
            <span className="inline-block mt-4 bg-gray-100 dark:bg-neutral-700 px-3 py-1 text-[10px] font-bold uppercase border border-black/10 dark:border-white/10 rounded-lg dark:text-white">{language === 'zh' ? '东北风' : 'NE Wind'}</span>
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border border-black/10 dark:border-white/10 relative flex items-center justify-center self-center sm:self-auto">
            <div className="absolute inset-0">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-black/40 dark:bg-white/40" />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-black/40 dark:bg-white/40" />
              <div className="absolute left-1 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-black/40 dark:bg-white/40" />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-black/40 dark:bg-white/40" />
            </div>
            <Compass className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black dark:text-white" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
