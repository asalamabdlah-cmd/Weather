import { useState } from 'react';
import { Globe, Monitor, RefreshCcw, Info, Search, Bell, MapPin, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { City, ThemeMode, Language, UI_TEXT } from '../types';

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const si = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

interface SettingsProps {
  cities: City[];
  selectedCityId: string;
  onCityChange: (cityId: string) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Settings({ cities, selectedCityId, onCityChange, theme, onThemeChange, language, onLanguageChange }: SettingsProps) {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const selectedCity = cities.find(c => c.id === selectedCityId) || cities[0];
  const t = (key: string) => UI_TEXT[key]?.[language] || key;

  const filteredCities = citySearch.trim()
    ? cities.filter(c => c.name.includes(citySearch) || c.district.includes(citySearch) || c.condition.includes(citySearch))
    : cities;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black/10 dark:border-white/10 pb-4 gap-4">
        <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl sm:text-3xl font-bold tracking-tight dark:text-white">
          {t('systemSettings')}
        </motion.h2>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-400" />
            <input type="text" placeholder={t('searchSettings')} className="pl-10 pr-4 py-2 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 rounded-lg w-full sm:w-48 md:w-64 dark:text-white" />
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-2 border border-black/10 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors rounded-lg shrink-0 dark:text-white">
            <Bell className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {/* Regional */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-400 border-b border-black/5 dark:border-white/5 pb-3 flex items-center gap-2"><Globe className="w-4 h-4" /> {t('regionalSettings')}</h3>
          <motion.div variants={sc} initial="hidden" animate="visible" className="space-y-4 sm:space-y-6 divide-y divide-black/5 dark:divide-white/5">
            <motion.div variants={si} className="flex flex-col sm:flex-row justify-between sm:items-center pt-2 gap-3">
              <div><p className="text-sm font-bold dark:text-white">{t('language')}</p><p className="text-[10px] text-gray-400 dark:text-neutral-400">{t('languageDesc')}</p></div>
              <select value={language} onChange={(e) => onLanguageChange(e.target.value as Language)} className="border border-black/10 dark:border-white/10 text-sm py-2 px-3 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus:outline-none rounded-lg w-full sm:w-48 dark:text-white">
                <option value="zh">简体中文</option>
                <option value="en">English</option>
              </select>
            </motion.div>
            <motion.div variants={si} className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 sm:pt-6 gap-3">
              <div><p className="text-sm font-bold dark:text-white">{t('timezone')}</p><p className="text-[10px] text-gray-400 dark:text-neutral-400">{t('timezoneDesc')}</p></div>
              <select className="border border-black/10 dark:border-white/10 text-sm py-2 px-3 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus:outline-none rounded-lg w-full sm:w-48 dark:text-white">
                <option>Asia/Shanghai (GMT+8)</option>
                <option>UTC</option>
              </select>
            </motion.div>
            <motion.div variants={si} className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 sm:pt-6 gap-3">
              <div><p className="text-sm font-bold dark:text-white">{t('cityManagement')}</p><p className="text-[10px] text-gray-400 dark:text-neutral-400">{t('currentCity')}: {selectedCity.district}</p></div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setIsCityModalOpen(true)} className="px-4 py-2 border border-black/10 dark:border-white/10 text-xs font-bold uppercase hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors rounded-lg w-full sm:w-auto dark:text-white">
                {t('switchCity')}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Display */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-400 border-b border-black/5 dark:border-white/5 pb-3 flex items-center gap-2"><Monitor className="w-4 h-4" /> {t('displayPref')}</h3>
          <motion.div variants={sc} initial="hidden" animate="visible" className="space-y-4 sm:space-y-6 divide-y divide-black/5 dark:divide-white/5">
            <motion.div variants={si} className="flex flex-col sm:flex-row justify-between sm:items-center pt-2 gap-3">
              <div><p className="text-sm font-bold dark:text-white">{t('themeStyle')}</p><p className="text-[10px] text-gray-400 dark:text-neutral-400">{t('themeDesc')}</p></div>
              <div className="flex border border-black/10 dark:border-white/10 rounded-lg overflow-hidden self-start">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => onThemeChange('light')} className={`px-4 sm:px-6 py-2 text-xs font-bold flex items-center gap-2 transition-colors ${theme === 'light' ? 'bg-black dark:bg-white text-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-white'}`}>
                  <Sun className="w-3.5 h-3.5" /> {t('lightMode')}
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => onThemeChange('dark')} className={`px-4 sm:px-6 py-2 text-xs font-bold flex items-center gap-2 transition-colors border-l border-black/10 dark:border-white/10 ${theme === 'dark' ? 'bg-black dark:bg-white text-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-white'}`}>
                  <Moon className="w-3.5 h-3.5" /> {t('darkMode')}
                </motion.button>
              </div>
            </motion.div>
            <motion.div variants={si} className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 sm:pt-6 gap-3">
              <div><p className="text-sm font-bold dark:text-white">{t('tempUnit')}</p></div>
              <div className="flex gap-4 sm:gap-6">
                <label className="flex items-center gap-2 cursor-pointer"><div className="w-4 h-4 border border-black/10 dark:border-white/10 rounded-sm flex items-center justify-center"><div className="w-2 h-2 bg-black dark:bg-white" /></div><span className="text-xs font-bold dark:text-white">{t('celsius')}</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><div className="w-4 h-4 border border-black/10 dark:border-white/10 rounded-sm" /><span className="text-xs font-bold dark:text-white">{t('fahrenheit')}</span></label>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Data */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-400 border-b border-black/5 dark:border-white/5 pb-3 flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> {t('dataSync')}</h3>
          <motion.div variants={sc} initial="hidden" animate="visible" className="space-y-4 sm:space-y-6 divide-y divide-black/5 dark:divide-white/5">
            <motion.div variants={si} className="flex flex-col sm:flex-row justify-between sm:items-center pt-2 gap-3">
              <div><p className="text-sm font-bold dark:text-white">{t('autoRefresh')}</p><p className="text-[10px] text-gray-400 dark:text-neutral-400">{t('autoRefreshDesc')}</p></div>
              <select className="border border-black/10 dark:border-white/10 text-sm py-2 px-3 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus:outline-none rounded-lg w-full sm:w-48 dark:text-white">
                <option>{t('everyHour')}</option>
                <option>{t('every30min')}</option>
                <option>{t('manualRefresh')}</option>
              </select>
            </motion.div>
            <motion.div variants={si} className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 sm:pt-6 gap-3">
              <div><p className="text-sm font-bold dark:text-white">{t('cacheClear')}</p><p className="text-[10px] text-gray-400 dark:text-neutral-400">{t('cacheUsed')}</p></div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-4 py-2 border border-black/10 dark:border-white/10 text-xs font-bold uppercase hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors rounded-lg w-full sm:w-auto dark:text-white">
                {t('clearData')}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 bg-gray-50/50 dark:bg-neutral-800/50 border border-black/5 dark:border-white/5 rounded-xl gap-2">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-neutral-400 uppercase tracking-widest"><Info className="w-3 h-3" /> {t('systemInfo')}</div>
          <span className="text-[10px] font-bold bg-white dark:bg-neutral-700 border border-black/5 dark:border-white/5 rounded-lg px-2 py-1 dark:text-white">{t('version')}</span>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-6 sm:px-8 py-3 border border-black/10 dark:border-white/10 text-xs font-bold uppercase hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors rounded-lg dark:text-white">{t('cancel')}</motion.button>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-6 sm:px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase hover:opacity-90 transition-opacity rounded-lg">{t('saveSettings')}</motion.button>
      </motion.div>

      {/* City Selection Modal */}
      <AnimatePresence>
        {isCityModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/20 dark:bg-black/50 backdrop-blur-sm" onClick={() => setIsCityModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} onClick={(e) => e.stopPropagation()} className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-black/10 dark:border-white/10">
                <h3 className="text-lg font-bold dark:text-white">{t('selectCity')}</h3>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsCityModalOpen(false)} className="p-2 border border-black/10 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors dark:text-white"><X className="w-4 h-4" /></motion.button>
              </div>
              <div className="p-3 sm:p-4 border-b border-black/5 dark:border-white/5">
                <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-400" /><input type="text" placeholder={t('searchCity')} value={citySearch} onChange={(e) => setCitySearch(e.target.value)} className="pl-10 pr-4 py-2 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 rounded-lg w-full dark:text-white" /></div>
              </div>
              <div className="p-4 sm:p-6 space-y-2 overflow-y-auto max-h-[50vh]">
                {filteredCities.map((city) => (
                  <motion.button key={city.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => { onCityChange(city.id); setIsCityModalOpen(false); setCitySearch(''); }} className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${selectedCityId === city.id ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                    <MapPin className={`w-5 h-5 shrink-0 ${selectedCityId === city.id ? 'text-white dark:text-black' : 'text-gray-400 dark:text-neutral-400'}`} />
                    <div className="flex-1 min-w-0"><p className="font-bold text-sm">{city.district}</p><p className={`text-[10px] ${selectedCityId === city.id ? 'text-gray-300 dark:text-neutral-500' : 'text-gray-400 dark:text-neutral-400'}`}>{city.coords} · {city.temp}°C · {city.condition}</p></div>
                    <div className={`text-2xl font-bold shrink-0 ${selectedCityId === city.id ? 'text-white dark:text-black' : 'dark:text-white'}`}>{city.temp}°</div>
                  </motion.button>
                ))}
                {filteredCities.length === 0 && <p className="text-center text-gray-400 dark:text-neutral-400 py-8">{t('noCityFound')}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
