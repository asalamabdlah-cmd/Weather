import { PageId, Language } from '../types';
import { LayoutDashboard, CloudSun, Settings, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  mobile?: boolean;
  language: Language;
}

const LABELS: Record<string, Record<string, string>> = {
  dashboard: { zh: '仪表盘', en: 'Dashboard' },
  forecast: { zh: '天气预报', en: 'Forecast' },
  settings: { zh: '设置', en: 'Settings' },
  support: { zh: '支持', en: 'Support' },
  appTitle: { zh: '张妞专属天气预览', en: "ZhangNiu's Weather" },
  minimalist: { zh: '极简天气', en: 'Minimalist Weather' },
  refresh: { zh: '刷新数据', en: 'Refresh Data' },
};

export default function Sidebar({ activePage, onPageChange, mobile = false, language }: SidebarProps) {
  const t = (key: string) => (LABELS[key]?.[language] || key);

  const menuItems = [
    { id: 'dashboard' as PageId, icon: LayoutDashboard },
    { id: 'forecast' as PageId, icon: CloudSun },
    { id: 'settings' as PageId, icon: Settings },
  ];

  const activeLayoutId = mobile ? 'sidebar-active-mobile' : 'sidebar-active';

  return (
    <nav
      id="sidebar"
      className={
        mobile
          ? "flex flex-col h-full w-full"
          : "hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-md p-8 z-50"
      }
    >
      <div className={mobile ? "px-2 py-4" : ""}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-tighter dark:text-white">{t('appTitle')}</h1>
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{t('minimalist')}</p>
        </div>

        <ul className="flex-1 flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.id} className="relative">
              {activePage === item.id && (
                <motion.div
                  layoutId={activeLayoutId}
                  className="absolute inset-0 bg-black rounded-lg"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.button
                id={`nav-${item.id}`}
                onClick={() => onPageChange(item.id)}
                whileHover={activePage !== item.id ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative z-10 w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium",
                  activePage === item.id
                    ? "text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <item.icon className={cn("w-5 h-5", activePage === item.id ? "text-white dark:text-black" : "text-gray-500 dark:text-neutral-400")} />
                <span>{t(item.id)}</span>
              </motion.button>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-4">
          <motion.button
            id="btn-refresh"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 border border-black/10 dark:border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors dark:text-white"
          >
{t('refresh')}
          </motion.button>
          <div className="relative">
            {activePage === 'support' && (
              <motion.div
                layoutId={activeLayoutId}
                className="absolute inset-0 bg-black dark:bg-white rounded-lg"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <motion.button
              id="nav-support"
              onClick={() => onPageChange('support')}
              whileHover={activePage !== 'support' ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative z-10 w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium",
                activePage === 'support'
                  ? "text-white dark:text-black"
                  : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700"
              )}
            >
              <HelpCircle className="w-5 h-5" />
              <span>{t('support')}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}
