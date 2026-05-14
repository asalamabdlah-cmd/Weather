import { HelpCircle, Database, Bug, ChevronRight, Send, HelpCircle as Quiz } from 'lucide-react';

export default function Support() {
  const faqs = [
    { q: '数据多久更新一次？', a: '默认情况下，天气数据每 15 分钟自动刷新一次。您也可以通过侧边栏或底部的 "Refresh Data" 按钮手动强制更新。', open: true },
    { q: '如何更改温度单位 (Celsius/Fahrenheit)？', a: '请导航至侧边栏的“设置”页面，在“显示偏好”区域中，您可以自由切换摄氏度或华氏度。', open: false },
    { q: '为什么定位不准确？', a: '定位依赖于您设备的浏览器权限和 IP 地址。请确保您已授予浏览器位置访问权限。若仍有偏差，您可以在设置中手动输入具体城市名称。', open: false },
  ];

  return (
    <div className="space-y-12 max-w-6xl">
      <div className="max-w-2xl">
        <h2 className="text-6xl font-bold tracking-tight mb-4">支持与帮助</h2>
        <p className="text-lg text-gray-500">
          查阅常见问题，了解数据来源，或向我们提交反馈。我们致力于提供最纯粹的极简天气体验。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          {/* FAQ */}
          <section>
            <h3 className="text-2xl font-bold border-b border-black pb-2 mb-6 flex items-center gap-2">
              <Quiz className="w-6 h-6" /> 常见问题 (FAQ)
            </h3>
            <div className="space-y-px">
              {faqs.map((faq, i) => (
                <details key={i} className="group border border-gray-100 bg-white" open={faq.open}>
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors list-none font-bold text-sm">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Data Sources */}
          <section>
            <h3 className="text-2xl font-bold border-b border-black pb-2 mb-6 flex items-center gap-2">
              <Database className="w-6 h-6" /> 数据来源
            </h3>
            <div className="border border-black p-8 bg-white space-y-4">
               <p className="text-sm">本应用的天气数据由 <strong className="font-bold">QWeather (和风天气)</strong> 提供支持。</p>
               <p className="text-sm text-gray-500">
                 和风天气提供全球范围内的实时天气、预报、空气质量等权威气象数据。我们承诺不对原始数据进行任何修改，仅以极简的视觉风格呈现。
               </p>
               <a 
                 href="https://www.qweather.com" 
                 target="_blank" 
                 rel="noreferrer" 
                 className="inline-flex items-center gap-2 text-xs font-bold border-b border-black hover:opacity-50 transition-opacity uppercase pt-4"
               >
                 访问 QWeather 官网
               </a>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-12">
          {/* Feedback Form */}
          <section className="border-4 border-black p-8 relative bg-white">
            <div className="absolute top-0 right-0 w-6 h-6 bg-black" />
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Bug className="w-6 h-6" /> 问题反馈
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">反馈类型</label>
                <select className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black rounded-none bg-white">
                  <option>程序故障</option>
                  <option>功能建议</option>
                  <option>数据异常</option>
                  <option>其他问题</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">详细描述</label>
                <textarea 
                  rows={6} 
                  placeholder="请详细描述您遇到的问题或建议..."
                  className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black rounded-none bg-transparent"
                />
              </div>
              <button 
                type="button" 
                className="w-full bg-black text-white py-4 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> 提交反馈
              </button>
            </form>
          </section>

          {/* Legal */}
          <section className="p-8 border border-gray-100 bg-white">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-4 mb-4">法律与关于</h4>
            <ul className="space-y-1">
              {['隐私政策 (Privacy Policy)', '服务条款 (Terms of Service)'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex justify-between items-center py-2 hover:bg-gray-50 transition-colors px-2 -mx-2 text-sm">
                    {item}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </a>
                </li>
              ))}
              <li className="flex justify-between items-center py-2 text-sm mt-4 border-t border-gray-50 pt-4">
                <span className="text-gray-400">当前版本</span>
                <span className="text-[10px] font-bold bg-gray-100 px-2 py-1">v2.4.1</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
