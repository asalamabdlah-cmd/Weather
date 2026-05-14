import { useState, useEffect, useCallback } from 'react';
import { PageId, CITIES, ThemeMode, Language } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Forecast from './components/Forecast';
import Settings from './components/Settings';
import Support from './components/Support';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchWeather, LiveWeatherData, DailyForecastItem } from './lib/weather';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState('beijing');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('zh');
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData | null>(null);
  const [forecastData, setForecastData] = useState<DailyForecastItem[] | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const selectedCity = CITIES.find(c => c.id === selectedCityId) || CITIES[0];

  const loadWeather = useCallback(async () => {
    setWeatherLoading(true);
    const result = await fetchWeather(selectedCity);
    setLiveWeather(result.live);
    setForecastData(result.forecast);
    setWeatherLoading(false);
  }, [selectedCity]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard city={selectedCity} liveWeather={liveWeather} loading={weatherLoading} language={language} />;
      case 'forecast':
        return <Forecast city={selectedCity} forecastData={forecastData} liveWeather={liveWeather} loading={weatherLoading} language={language} />;
      case 'settings':
        return <Settings cities={CITIES} selectedCityId={selectedCityId} onCityChange={setSelectedCityId} theme={theme} onThemeChange={setTheme} language={language} onLanguageChange={setLanguage} />;
      case 'support':
        return <Support language={language} />;
      default:
        return <Dashboard city={selectedCity} liveWeather={liveWeather} loading={weatherLoading} language={language} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-surface dark:bg-neutral-950">
      <Sidebar activePage={activePage} onPageChange={(page) => {
        setActivePage(page);
        setIsMobileMenuOpen(false);
      }} language={language} />

      <main className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen overflow-x-hidden">
        <header id="mobile-header" className="md:hidden flex justify-between items-center w-full px-6 h-16 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg z-40 sticky top-0">
          <h1 className="text-lg font-bold uppercase tracking-tighter dark:text-white">{language === 'zh' ? '张妞专属天气预览' : "ZhangNiu's Weather"}</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 border border-black/10 dark:border-white/10 rounded-lg">
            <Menu className="w-6 h-6 dark:text-white" />
          </button>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="fixed inset-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl z-[60] p-8 md:hidden"
            >
              <Sidebar mobile activePage={activePage} onPageChange={(page) => {
                setActivePage(page);
                setIsMobileMenuOpen(false);
              }} language={language} />
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 border border-black/10 dark:border-white/10 rounded-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm dark:text-white">
                {language === 'zh' ? '关闭' : 'Close'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div id="content-container" className="p-6 md:p-12 lg:p-16 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
