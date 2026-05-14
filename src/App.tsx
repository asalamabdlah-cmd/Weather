/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PageId } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Forecast from './components/Forecast';
import Settings from './components/Settings';
import Support from './components/Support';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'forecast':
        return <Forecast />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Fixed Sidebar for Desktop */}
      <Sidebar activePage={activePage} onPageChange={(page) => {
        setActivePage(page);
        setIsMobileMenuOpen(false);
      }} />

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile Header */}
        <header id="mobile-header" className="md:hidden flex justify-between items-center w-full px-6 h-16 border-b border-black bg-white z-40 sticky top-0">
          <h1 className="text-xl font-bold uppercase tracking-tighter">天气预览</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-black"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="fixed inset-0 bg-white z-[60] p-8 md:hidden"
            >
               <Sidebar activePage={activePage} onPageChange={(page) => {
                setActivePage(page);
                setIsMobileMenuOpen(false);
              }} />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-2 border border-black"
              >
                关闭
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Container */}
        <div id="content-container" className="p-6 md:p-12 lg:p-16 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
