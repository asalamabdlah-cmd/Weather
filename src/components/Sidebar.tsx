import { PageId } from '../types';
import { LayoutDashboard, CloudSun, Settings, HelpCircle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as PageId, label: '仪表盘', icon: LayoutDashboard },
    { id: 'forecast' as PageId, label: '天气预报', icon: CloudSun },
    { id: 'settings' as PageId, label: '设置', icon: Settings },
  ];

  return (
    <nav 
      id="sidebar"
      className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-black bg-white p-8 z-50"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-tighter">天气预览</h1>
        <p className="text-xs text-gray-500 mt-1">Minimalist Weather</p>
      </div>

      <ul className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              id={`nav-${item.id}`}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-none transition-all duration-200 group text-sm font-medium",
                activePage === item.id 
                  ? "bg-black text-white" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <item.icon className={cn("w-5 h-5", activePage === item.id ? "text-white" : "text-gray-500")} />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-4">
        <button 
          id="btn-refresh"
          className="w-full py-3 border border-black text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
        >
          刷新数据
        </button>
        <button
          id="nav-support"
          onClick={() => onPageChange('support')}
          className={cn(
            "w-full flex items-center gap-4 px-4 py-3 rounded-none transition-all duration-200 text-sm font-medium",
            activePage === 'support' 
              ? "bg-black text-white" 
              : "text-gray-500 hover:bg-gray-100"
          )}
        >
          <HelpCircle className="w-5 h-5" />
          <span>支持</span>
        </button>
      </div>
    </nav>
  );
}
