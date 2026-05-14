import { Wind, AirVent, Compass, Sunrise, Sunset, Calendar, Radar } from 'lucide-react';

export default function Forecast() {
  const days = [
    { label: '今天', temp: '24°', icon: 'Sun', desc: '晴', progress: 100 },
    { label: '周二', temp: '22°', icon: 'CloudSun', desc: '多云', progress: 75 },
    { label: '周三', temp: '19°', icon: 'CloudRain', desc: '小雨', progress: 50 },
    { label: '周四', temp: '18°', icon: 'Cloud', desc: '阴', progress: 66 },
    { label: '周五', temp: '21°', icon: 'CloudSun', desc: '多云', progress: 75 },
    { label: '周六', temp: '25°', icon: 'Sun', desc: '晴', progress: 100 },
    { label: '周日', temp: '26°', icon: 'Sun', desc: '晴', progress: 100 },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-black pb-8">
        <div>
          <h2 className="text-5xl font-bold tracking-tight mb-2">15天天气趋势</h2>
          <p className="text-gray-500 font-medium">大气精密与气象数据</p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-2xl font-bold">上海市</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">31.2304° N, 121.4737° E</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 15 Day horizontal prediction */}
        <div className="md:col-span-12 border border-black bg-white overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-black flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider">长期预测</span>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex divide-x divide-gray-100 overflow-x-auto scrollbar-hide">
            {days.map((day, i) => (
              <div key={i} className="flex-none w-32 p-6 flex flex-col items-center group hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span className="text-[10px] text-gray-400 group-hover:text-gray-500 mb-1">{day.label}</span>
                <span className="text-2xl font-bold mb-4">{day.temp}</span>
                <div className="mb-4">
                   {/* Simulating icon */}
                   <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center">
                     <div className="w-4 h-4 bg-current" />
                   </div>
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-gray-500">{day.desc}</span>
                <div className="w-full h-1 bg-gray-100 mt-4 relative">
                  <div className="absolute left-0 top-0 h-full bg-black group-hover:bg-white" style={{ width: `${day.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AQI Section */}
        <div className="md:col-span-4 border border-black bg-white p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-[10px] font-bold uppercase tracking-wider">空气质量指数</h3>
             <AirVent className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-gray-100">
            <span className="text-6xl font-bold">42</span>
            <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-1">空气质量优秀</span>
          </div>
          <div className="space-y-4">
            {['PM2.5', 'PM10', 'O3'].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">{item}</span>
                  <span className="font-bold">12 µg/m³</span>
                </div>
                <div className="w-full h-1 bg-gray-100">
                  <div className="h-full bg-black" style={{ width: `${20 + i * 15}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Placeholder */}
        <div className="md:col-span-8 border border-black bg-white flex flex-col">
          <div className="flex justify-between items-center p-3 bg-gray-100 border-b border-black">
             <h3 className="text-[10px] font-bold uppercase tracking-wider">降水雷达图</h3>
             <div className="flex items-center gap-2">
               <span className="text-[10px] text-gray-400">0% PROBABILITY</span>
               <Radar className="w-4 h-4 text-gray-400" />
             </div>
          </div>
          <div className="flex-1 bg-gray-50 relative min-h-[300px] flex items-center justify-center p-2">
             <div className="w-full h-full border border-black grayscale opacity-50 flex items-center justify-center overflow-hidden relative">
                {/* SVG Mock for map lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50 Q 100 0 200 80 T 400 30" fill="none" stroke="black" strokeWidth="0.5" />
                  <path d="M0 120 Q 150 180 300 100 T 500 150" fill="none" stroke="black" strokeWidth="0.5" />
                  <circle cx="250" cy="150" r="1.5" fill="black" />
                  <text x="255" y="155" className="text-[8px] fill-black font-bold">SHANGHAI</text>
                </svg>
                <div className="absolute bottom-4 right-4 bg-white border border-black p-3 text-[8px] space-y-2">
                  <p className="font-bold border-b border-black pb-1 mb-1">图例</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black" /> <span>强</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400" /> <span>中</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 border border-black" /> <span>弱</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sun cycle */}
        <div className="md:col-span-4 border border-black bg-white p-6">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-[10px] font-bold uppercase tracking-wider">昼夜周期</h3>
             <Sunrise className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Sunrise className="w-8 h-8 text-black" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase">日出</p>
                <p className="text-xl font-bold">05:42</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Sunset className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase">日落</p>
                <p className="text-xl font-bold">18:31</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dashed border-black">
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>日照时长: 12h 49m</span>
              <span>紫外线: 弱</span>
            </div>
          </div>
        </div>

        {/* Wind */}
        <div className="md:col-span-8 border border-black bg-white p-6 flex justify-between items-center">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider mb-8">风向风力</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold">14</span>
              <span className="text-sm text-gray-400">km/h</span>
            </div>
            <span className="inline-block mt-4 bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase border border-gray-200">东北风</span>
          </div>
          <div className="w-32 h-32 rounded-full border border-black relative flex items-center justify-center">
             <div className="absolute inset-0">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-black" />
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-black" />
                <div className="absolute left-1 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-black" />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-black" />
             </div>
             <Compass className="w-12 h-12 text-black transition-transform duration-1000 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
