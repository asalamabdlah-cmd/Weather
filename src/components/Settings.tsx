import { Globe, Clock, Monitor, RefreshCcw, Database, Info, Search, Bell } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center border-b border-black pb-4">
        <h2 className="text-3xl font-bold tracking-tight">系统设置</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索设置..." 
              className="pl-10 pr-4 py-2 border border-black bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black w-64"
            />
          </div>
          <button className="p-2 border border-black hover:bg-gray-100 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Regional */}
        <section className="border border-black p-6 bg-white space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" /> 区域设置
          </h3>
          
          <div className="space-y-6 divide-y divide-gray-50">
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-sm font-bold">语言 (Language)</p>
                <p className="text-[10px] text-gray-400">选择系统显示语言</p>
              </div>
              <select className="border border-black text-sm py-2 px-3 bg-white focus:outline-none w-48">
                <option>简体中文</option>
                <option>English</option>
              </select>
            </div>

            <div className="flex justify-between items-center pt-6">
              <div>
                <p className="text-sm font-bold">时区 (Timezone)</p>
                <p className="text-[10px] text-gray-400">用于数据同步和显示</p>
              </div>
              <select className="border border-black text-sm py-2 px-3 bg-white focus:outline-none w-48">
                <option>Asia/Shanghai (GMT+8)</option>
                <option>UTC</option>
              </select>
            </div>

            <div className="flex justify-between items-center pt-6">
              <div>
                <p className="text-sm font-bold">城市管理</p>
                <p className="text-[10px] text-gray-400">管理默认显示城市</p>
              </div>
              <button className="px-4 py-2 border border-black text-xs font-bold uppercase hover:bg-gray-100 transition-colors">
                编辑城市
              </button>
            </div>
          </div>
        </section>

        {/* Display */}
        <section className="border border-black p-6 bg-white space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Monitor className="w-4 h-4" /> 显示偏好
          </h3>
          
          <div className="space-y-6 divide-y divide-gray-50">
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-sm font-bold">主题风格</p>
                <p className="text-[10px] text-gray-400">深色/浅色模式切换</p>
              </div>
              <div className="flex border border-black">
                <button className="px-6 py-2 bg-black text-white text-xs font-bold">浅色</button>
                <button className="px-6 py-2 hover:bg-gray-100 text-xs font-bold border-l border-black">深色</button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6">
              <div>
                <p className="text-sm font-bold">温度单位</p>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-black" />
                  </div>
                  <span className="text-xs font-bold">摄氏度 (°C)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-black" />
                  <span className="text-xs font-bold">华氏度 (°F)</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Data */}
        <section className="border border-black p-6 bg-white space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3 flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" /> 数据与同步
          </h3>
          
          <div className="space-y-6 divide-y divide-gray-50">
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-sm font-bold">自动刷新间隔</p>
                <p className="text-[10px] text-gray-400">控制后台获取天气数据的频率</p>
              </div>
              <select className="border border-black text-sm py-2 px-3 bg-white focus:outline-none w-48">
                <option>每 1 小时</option>
                <option>每 30 分钟</option>
                <option>手动刷新</option>
              </select>
            </div>

            <div className="flex justify-between items-center pt-6">
              <div>
                <p className="text-sm font-bold">缓存清理</p>
                <p className="text-[10px] text-gray-400">12.4 MB 已用</p>
              </div>
              <button className="px-4 py-2 border border-black text-xs font-bold uppercase hover:bg-gray-100 transition-colors">
                清除数据
              </button>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <div className="flex justify-between p-4 bg-gray-100 border border-gray-200">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
            <Info className="w-3 h-3" /> 系统信息
          </div>
          <span className="text-[10px] font-bold bg-white px-2 py-1 border border-gray-200">版本 V2.04 运行中</span>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button className="px-8 py-3 border border-gray-200 text-xs font-bold uppercase hover:bg-gray-50 transition-colors">取消</button>
        <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase hover:opacity-90 transition-opacity">保存设置</button>
      </div>
    </div>
  );
}
