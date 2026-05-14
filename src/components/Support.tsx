import { useState } from 'react';
import { Database, Bug, ChevronRight, Send, HelpCircle as Quiz } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, UI_TEXT } from '../types';

interface SupportProps { language: Language; }

export default function Support({ language }: SupportProps) {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const t = (key: string) => UI_TEXT[key]?.[language] || key;

  const faqs = language === 'zh' ? [
    { q: '数据多久更新一次？', a: '默认情况下，天气数据每 15 分钟自动刷新一次。您也可以通过侧边栏或底部的 "Refresh Data" 按钮手动强制更新。' },
    { q: '如何更改温度单位 (Celsius/Fahrenheit)？', a: '请导航至侧边栏的"设置"页面，在"显示偏好"区域中，您可以自由切换摄氏度或华氏度。' },
    { q: '为什么定位不准确？', a: '定位依赖于您设备的浏览器权限和 IP 地址。请确保您已授予浏览器位置访问权限。若仍有偏差，您可以在设置中手动输入具体城市名称。' },
  ] : [
    { q: 'How often is the data updated?', a: 'Weather data is automatically refreshed every 15 minutes by default. You can also manually force an update via the "Refresh Data" button in the sidebar or at the bottom.' },
    { q: 'How to change the temperature unit (Celsius/Fahrenheit)?', a: 'Navigate to the "Settings" page in the sidebar, and under the "Display" section, you can freely switch between Celsius and Fahrenheit.' },
    { q: 'Why is the location inaccurate?', a: 'Location depends on your device\'s browser permissions and IP address. Please ensure you have granted location access to your browser. If there are still discrepancies, you can manually enter a specific city name in Settings.' },
  ];

  return (
    <div className="space-y-12 max-w-6xl">
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 dark:text-white"
        >
          {t('supportTitle')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-gray-500 dark:text-neutral-300"
        >
          {t('supportDesc')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl sm:text-2xl font-bold border-b border-black/10 dark:border-white/10 pb-2 mb-6 flex items-center gap-2 dark:text-white">
              <Quiz className="w-5 h-5 sm:w-6 sm:h-6" /> {t('faqTitle')}
            </h3>
            <div className="space-y-px">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="flex justify-between items-center p-4 sm:p-6 w-full cursor-pointer hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors font-bold text-sm text-left dark:text-white"
                    >
                      {faq.q}
                      <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronRight className="w-4 h-4 dark:text-white" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-sm text-gray-500 dark:text-neutral-300 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-xl sm:text-2xl font-bold border-b border-black/10 dark:border-white/10 pb-2 mb-6 flex items-center gap-2 dark:text-white">
              <Database className="w-5 h-5 sm:w-6 sm:h-6" /> {t('dataSource')}
            </h3>
            <div className="border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl p-4 sm:p-8 space-y-4">
              <p className="text-sm dark:text-white">{t('dataSourceDesc1')} <strong className="font-bold">QWeather ({language === 'zh' ? '和风天气' : 'QWeather'})</strong> {t('dataSourceDesc2')}</p>
              <p className="text-sm text-gray-500 dark:text-neutral-300">{t('dataSourceText')}</p>
              <a href="https://www.qweather.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold border-b border-black/10 dark:border-white/10 hover:opacity-50 transition-opacity uppercase pt-4 dark:text-white">
                {t('visitQWeather')}
              </a>
            </div>
          </motion.section>
        </div>

        <div className="lg:col-span-5 space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg shadow-md rounded-2xl p-4 sm:p-8 relative"
          >
            <div className="absolute top-0 right-0 w-4 h-4 bg-black/40 dark:bg-white/40 rounded-bl-lg" />
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 dark:text-white">
              <Bug className="w-5 h-5 sm:w-6 sm:h-6" /> {t('feedbackTitle')}
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-400 mb-2">{t('feedbackType')}</label>
                <select className="w-full border border-black/10 dark:border-white/10 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm dark:text-white">
                  <option>{t('feedbackTypeBug')}</option>
                  <option>{t('feedbackTypeFeature')}</option>
                  <option>{t('feedbackTypeData')}</option>
                  <option>{t('feedbackTypeOther')}</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-400 mb-2">{t('feedbackDesc')}</label>
                <textarea rows={6} placeholder={t('feedbackPlaceholder')} className="w-full border border-black/10 dark:border-white/10 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm dark:text-white" />
              </div>
              <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-xl">
                <Send className="w-4 h-4" /> {t('submitFeedback')}
              </motion.button>
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="p-4 sm:p-8 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md shadow-sm rounded-2xl"
          >
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-400 border-b border-black/5 dark:border-white/5 pb-4 mb-4">{t('legalTitle')}</h4>
            <ul className="space-y-1">
              {[t('privacy'), t('terms')].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex justify-between items-center py-2 hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors px-2 -mx-2 text-sm rounded-lg dark:text-white">
                    {item}
                    <ChevronRight className="w-4 h-4 text-gray-300 dark:text-neutral-500" />
                  </a>
                </li>
              ))}
              <li className="flex justify-between items-center py-2 text-sm mt-4 border-t border-black/5 dark:border-white/5 pt-4">
                <span className="text-gray-400 dark:text-neutral-400">{t('currentVersion')}</span>
                <span className="text-[10px] font-bold bg-gray-100 dark:bg-neutral-700 px-2 py-1 rounded-lg dark:text-white">v2.4.1</span>
              </li>
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
