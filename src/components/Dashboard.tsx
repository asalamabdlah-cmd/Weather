import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Droplets, SunMedium, Clock } from 'lucide-react';
import { DayForecast, HourForecast } from '../types';
import { motion } from 'motion/react';

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

export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Clock Section */}
      <section id="clock-section" className="border border-black p-12 bg-white text-center">
        <h2 className="text-7xl font-bold tracking-tight">
          {time.toLocaleTimeString('zh-CN', { hour12: false })}
        </h2>
        <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest">
          {time.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Current Weather Card */}
        <section className="md:col-span-4 border border-black bg-white p-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold">北京市海淀区</h3>
              <p className="text-sm text-gray-500">晴</p>
            </div>
            <Sun className="w-10 h-10 text-black" />
          </div>
          
          <div className="text-center my-6">
            <span className="text-8xl font-bold">22°</span>
            <p className="text-sm text-gray-500 mt-2">体感 21°C</p>
          </div>

          <div className="w-full mt-auto pt-6 border-t border-dashed border-gray-200 grid grid-cols-3 gap-4">
            <div className="text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase">湿度</p>
              <p className="text-sm font-bold">45%</p>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase">风力</p>
              <p className="text-sm font-bold">2级</p>
            </div>
            <div className="text-center">
              <SunMedium className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase">紫外线</p>
              <p className="text-sm font-bold">弱</p>
            </div>
          </div>
        </section>

        {/* Hourly Forecast */}
        <section className="md:col-span-8 border border-black bg-white p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-8">逐小时预报</h3>
          <div className="flex justify-between items-end h-48 overflow-x-auto scrollbar-hide">
            {HOURLY_FORECAST.map((hour, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 min-w-[70px]">
                <span className="text-xs text-gray-400">{hour.time}</span>
                <div className="h-24 flex items-center justify-center">
                   {/* Placeholder for icons based on condition */}
                   {hour.condition === 'Sun' && <Sun className="w-6 h-6" />}
                   {hour.condition === 'CloudSun' && <CloudSun className="w-6 h-6" />}
                   {hour.condition === 'Cloud' && <Cloud className="w-6 h-6" />}
                   {hour.condition === 'Moon' && <div className="w-6 h-6 rounded-full border-2 border-black border-l-transparent -rotate-45" />}
                </div>
                <span className="text-lg font-bold">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7-Day Forecast */}
        <section className="md:col-span-12 border border-black bg-white">
          <div className="border-b border-black p-4 bg-gray-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider">7天预报</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {SEVEN_DAY_FORECAST.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <span className="w-16 text-sm font-medium">{item.day}</span>
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-bold w-8 text-right">{item.temp}°</span>
                  <span className="text-xs text-gray-400 w-8 text-right">{item.temp - 5}°</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CloudSun(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>
    </svg>
  );
}
