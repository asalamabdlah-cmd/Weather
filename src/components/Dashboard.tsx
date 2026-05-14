import { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, Droplets, SunMedium } from 'lucide-react';
import { DayForecast, HourForecast, City, Language, UI_TEXT } from '../types';
import { motion } from 'motion/react';
import { LiveWeatherData } from '../lib/weather';

const SEVEN_DAY_FORECAST: DayForecast[] = [
  { day: '今天', temp: 23, condition: 'clear_day', label: '晴' },
  { day: '周四', temp: 24, condition: 'partly_cloudy_day', label: '多云' },
  { day: '周五', temp: 21, condition: 'cloud', label: '阴' },
  { day: '周六', temp: 19, condition: 'rainy', label: '小雨' },
  { day: '周日', temp: 22, condition: 'clear_day', label: '晴' },
];

const HOURLY_FORECAST: HourForecast[] = [
  { time: '14:00', temp: 22, condition: 'Sun' },
  { time: '15:00', temp: 23, condition: 'CloudSun' },
  { time: '16:00', temp: 22, condition: 'Cloud' },
  { time: '17:00', temp: 21, condition: 'Cloud' },
  { time: '18:00', temp: 19, condition: 'Cloud' },
  { time: '19:00', temp: 17, condition: 'Moon' },
];

const hourlyContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const hourlyItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
const rowContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};
const rowItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

interface DashboardProps {
  city: City;
  liveWeather: LiveWeatherData | null;
  loading: boolean;
  language: Language;
}

export default function Dashboard({ city, liveWeather, loading, language }: DashboardProps) {
  const [time, setTime] = useState(new Date());
  const t = (key: string) => UI_TEXT[key]?.[language] || key;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', { hour12: false });
  const dateLocale = language === 'zh' ? 'zh-CN' : 'en-US';
  const w = liveWeather;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl">
      <motion.section id="clock-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-6 sm:p-8 md:p-12 text-center">
        <motion.h2 key={timeString} initial={{ scale: 1.03 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight dark:text-white">
          {timeString}
        </motion.h2>
        <p className="text-gray-500 dark:text-neutral-300 mt-4 font-medium uppercase tracking-widest text-xs sm:text-sm">
          {time.toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
        </p>
        {w && (
          <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-2">
            {t('lastUpdated')}: {w.lastUpdated}
          </p>
        )}
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-4 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-start mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold dark:text-white">{city.district}</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-300">{loading ? t('loading') : w?.condition || city.condition}</p>
            </div>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
              <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-black dark:text-white" />
            </motion.div>
          </div>
          <div className="text-center my-4 sm:my-6">
            <span className="text-5xl sm:text-6xl md:text-8xl font-bold dark:text-white">{w?.temp || city.temp}°</span>
            <p className="text-sm text-gray-500 dark:text-neutral-300 mt-2">{t('feelsLike')} {w?.feelsLike || city.feelsLike}°C</p>
          </div>
          <div className="w-full mt-auto pt-4 sm:pt-6 border-t border-dashed border-black/10 dark:border-white/10 grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.2 }}>
                <Droplets className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-gray-400 dark:text-neutral-400" />
              </motion.div>
              <p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('humidity')}</p>
              <p className="text-xs sm:text-sm font-bold dark:text-white">{w?.humidity || city.humidity}%</p>
            </div>
            <div className="text-center">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.6 }}>
                <Wind className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-gray-400 dark:text-neutral-400" />
              </motion.div>
              <p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('wind')}</p>
              <p className="text-xs sm:text-sm font-bold dark:text-white">{w?.windSpeed || city.windSpeed}</p>
            </div>
            <div className="text-center">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1.0 }}>
                <SunMedium className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-gray-400 dark:text-neutral-400" />
              </motion.div>
              <p className="text-[10px] text-gray-400 dark:text-neutral-400 uppercase">{t('uv')}</p>
              <p className="text-xs sm:text-sm font-bold dark:text-white">{w?.uvIndex || city.uvIndex}</p>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-8 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 dark:text-white">{t('hourlyForecast')}</h3>
          <motion.div variants={hourlyContainer} initial="hidden" animate="visible" className="flex justify-between items-end h-36 sm:h-48 overflow-x-auto scrollbar-hide">
            {HOURLY_FORECAST.map((hour, idx) => (
              <motion.div key={idx} variants={hourlyItem} className="flex flex-col items-center gap-2 sm:gap-4 min-w-[60px] sm:min-w-[70px]">
                <span className="text-[10px] sm:text-xs text-gray-400 dark:text-neutral-400">{hour.time}</span>
                <motion.div className="h-16 sm:h-24 flex items-center justify-center" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: idx * 0.15 }}>
                  {hour.condition === 'Sun' && <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />}
                  {hour.condition === 'CloudSun' && <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />}
                  {hour.condition === 'Cloud' && <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />}
                  {hour.condition === 'Moon' && <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black dark:border-white border-l-transparent -rotate-45" />}
                </motion.div>
                <span className="text-base sm:text-lg font-bold dark:text-white">{hour.temp}°</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-12 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
          <div className="border-b border-black/10 dark:border-white/10 p-3 sm:p-4 bg-gray-50/50 dark:bg-neutral-800/50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider dark:text-white">{t('dayForecast')}</h3>
          </div>
          <motion.div variants={rowContainer} initial="hidden" animate="visible" className="divide-y divide-black/5 dark:divide-white/5">
            {SEVEN_DAY_FORECAST.map((item, idx) => (
              <motion.div key={idx} variants={rowItem} whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)', scale: 1.005 }} className="flex items-center justify-between p-3 sm:p-4">
                <span className="w-12 sm:w-16 text-xs sm:text-sm font-medium dark:text-white">{item.day}</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: idx * 0.2 }}>
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-neutral-400" />
                  </motion.div>
                </div>
                <div className="flex items-baseline gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm font-bold w-6 sm:w-8 text-right dark:text-white">{item.temp}°</span>
                  <span className="text-[10px] sm:text-xs text-gray-400 dark:text-neutral-400 w-6 sm:w-8 text-right">{item.temp - 5}°</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

function CloudSun(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>
    </svg>
  );
}
