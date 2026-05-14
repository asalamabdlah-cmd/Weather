export type PageId = 'dashboard' | 'forecast' | 'settings' | 'support';

export interface City {
  id: string;
  name: string;
  district: string;
  coords: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: string;
  uvIndex: string;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  aqi: number;
}

export const CITIES: City[] = [
  // 直辖市/省会
  { id: 'beijing', name: '北京', district: '北京市海淀区', coords: '39.9042° N, 116.4074° E', temp: 22, condition: '晴', humidity: 45, windSpeed: '2级', uvIndex: '弱', feelsLike: 21, sunrise: '05:42', sunset: '18:31', aqi: 42 },
  { id: 'shanghai', name: '上海', district: '上海市浦东新区', coords: '31.2304° N, 121.4737° E', temp: 24, condition: '多云', humidity: 62, windSpeed: '3级', uvIndex: '中等', feelsLike: 25, sunrise: '05:28', sunset: '18:15', aqi: 55 },
  { id: 'guangzhou', name: '广州', district: '广州市天河区', coords: '23.1291° N, 113.2644° E', temp: 28, condition: '阴', humidity: 78, windSpeed: '2级', uvIndex: '弱', feelsLike: 31, sunrise: '05:58', sunset: '18:42', aqi: 38 },
  { id: 'shenzhen', name: '深圳', district: '深圳市南山区', coords: '22.5431° N, 114.0579° E', temp: 27, condition: '晴', humidity: 70, windSpeed: '3级', uvIndex: '强', feelsLike: 30, sunrise: '05:56', sunset: '18:40', aqi: 30 },
  { id: 'chengdu', name: '成都', district: '成都市武侯区', coords: '30.5728° N, 104.0668° E', temp: 20, condition: '小雨', humidity: 85, windSpeed: '1级', uvIndex: '弱', feelsLike: 20, sunrise: '06:18', sunset: '18:58', aqi: 65 },
  { id: 'hangzhou', name: '杭州', district: '杭州市西湖区', coords: '30.2741° N, 120.1551° E', temp: 23, condition: '多云', humidity: 55, windSpeed: '2级', uvIndex: '中等', feelsLike: 23, sunrise: '05:35', sunset: '18:25', aqi: 48 },
  // 河南省城市
  { id: 'zhengzhou', name: '郑州', district: '郑州市金水区', coords: '34.7466° N, 113.6254° E', temp: 25, condition: '晴', humidity: 40, windSpeed: '3级', uvIndex: '中等', feelsLike: 24, sunrise: '05:22', sunset: '18:55', aqi: 58 },
  { id: 'nanyang', name: '南阳', district: '南阳市卧龙区', coords: '32.9907° N, 112.5283° E', temp: 23, condition: '多云', humidity: 55, windSpeed: '2级', uvIndex: '弱', feelsLike: 23, sunrise: '05:30', sunset: '18:50', aqi: 45 },
  { id: 'luoyang', name: '洛阳', district: '洛阳市洛龙区', coords: '34.6181° N, 112.4539° E', temp: 24, condition: '晴', humidity: 38, windSpeed: '2级', uvIndex: '中等', feelsLike: 23, sunrise: '05:25', sunset: '18:52', aqi: 52 },
  { id: 'kaifeng', name: '开封', district: '开封市龙亭区', coords: '34.7975° N, 114.3076° E', temp: 24, condition: '多云', humidity: 48, windSpeed: '3级', uvIndex: '弱', feelsLike: 24, sunrise: '05:23', sunset: '18:53', aqi: 60 },
  { id: 'xinxiang', name: '新乡', district: '新乡市红旗区', coords: '35.3030° N, 113.9268° E', temp: 23, condition: '阴', humidity: 52, windSpeed: '2级', uvIndex: '弱', feelsLike: 22, sunrise: '05:20', sunset: '18:55', aqi: 55 },
  { id: 'anyang', name: '安阳', district: '安阳市文峰区', coords: '36.0977° N, 114.3931° E', temp: 22, condition: '晴', humidity: 42, windSpeed: '3级', uvIndex: '中等', feelsLike: 21, sunrise: '05:16', sunset: '18:57', aqi: 48 },
  { id: 'xuchang', name: '许昌', district: '许昌市魏都区', coords: '34.0358° N, 113.8523° E', temp: 24, condition: '多云', humidity: 50, windSpeed: '2级', uvIndex: '弱', feelsLike: 24, sunrise: '05:26', sunset: '18:50', aqi: 53 },
  { id: 'pingdingshan', name: '平顶山', district: '平顶山市新华区', coords: '33.7663° N, 113.1927° E', temp: 22, condition: '小雨', humidity: 68, windSpeed: '1级', uvIndex: '弱', feelsLike: 22, sunrise: '05:28', sunset: '18:48', aqi: 40 },
  { id: 'jiaozuo', name: '焦作', district: '焦作市解放区', coords: '35.2158° N, 113.2418° E', temp: 23, condition: '晴', humidity: 35, windSpeed: '3级', uvIndex: '强', feelsLike: 22, sunrise: '05:21', sunset: '18:54', aqi: 62 },
  { id: 'shangqiu', name: '商丘', district: '商丘市睢阳区', coords: '34.4142° N, 115.6564° E', temp: 24, condition: '多云', humidity: 46, windSpeed: '2级', uvIndex: '中等', feelsLike: 24, sunrise: '05:18', sunset: '18:56', aqi: 50 },
  { id: 'xinyang', name: '信阳', district: '信阳市浉河区', coords: '32.1473° N, 114.0912° E', temp: 21, condition: '小雨', humidity: 75, windSpeed: '1级', uvIndex: '弱', feelsLike: 21, sunrise: '05:32', sunset: '18:45', aqi: 35 },
  { id: 'zhoukou', name: '周口', district: '周口市川汇区', coords: '33.6340° N, 114.7017° E', temp: 23, condition: '阴', humidity: 56, windSpeed: '2级', uvIndex: '弱', feelsLike: 23, sunrise: '05:24', sunset: '18:52', aqi: 47 },
  { id: 'zhumadian', name: '驻马店', district: '驻马店市驿城区', coords: '32.9783° N, 114.0230° E', temp: 22, condition: '多云', humidity: 58, windSpeed: '2级', uvIndex: '弱', feelsLike: 22, sunrise: '05:29', sunset: '18:48', aqi: 43 },
  { id: 'puyang', name: '濮阳', district: '濮阳市华龙区', coords: '35.7618° N, 115.0292° E', temp: 22, condition: '晴', humidity: 40, windSpeed: '3级', uvIndex: '中等', feelsLike: 21, sunrise: '05:17', sunset: '18:58', aqi: 53 },
  { id: 'luohe', name: '漯河', district: '漯河市源汇区', coords: '33.5813° N, 114.0165° E', temp: 23, condition: '阴', humidity: 54, windSpeed: '2级', uvIndex: '弱', feelsLike: 23, sunrise: '05:27', sunset: '18:50', aqi: 49 },
];

export interface DayForecastData {
  date: string;
  dayLabel: string;
  tempHigh: number;
  tempLow: number;
  condition: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'thunderstorm' | 'windy';
  label: string;
  humidity: number;
  windSpeed: string;
  uvIndex: string;
  sunrise: string;
  sunset: string;
  hourly: { time: string; temp: number; condition: string }[];
}

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  coords: string;
  humidity: number;
  windSpeed: number;
  windDir: string;
  uvIndex: string;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
}

export interface DayForecast {
  day: string;
  temp: number;
  condition: 'clear_day' | 'partly_cloudy_day' | 'rainy' | 'cloud';
  label: string;
}

export interface HourForecast {
  time: string;
  temp: number;
  condition: string;
}

export type ThemeMode = 'light' | 'dark';
export type Language = 'zh' | 'en';

export const UI_TEXT: Record<string, Record<string, string>> = {
  appTitle: { zh: '张妞专属天气预览', en: "ZhangNiu's Weather" },
  dashboard: { zh: '仪表盘', en: 'Dashboard' },
  forecast: { zh: '天气预报', en: 'Forecast' },
  settings: { zh: '设置', en: 'Settings' },
  support: { zh: '支持', en: 'Support' },
  refreshData: { zh: '刷新数据', en: 'Refresh Data' },
  close: { zh: '关闭', en: 'Close' },
  systemSettings: { zh: '系统设置', en: 'System Settings' },
  searchSettings: { zh: '搜索设置...', en: 'Search settings...' },
  regionalSettings: { zh: '区域设置', en: 'Regional' },
  language: { zh: '语言 (Language)', en: 'Language' },
  languageDesc: { zh: '选择系统显示语言', en: 'Select display language' },
  timezone: { zh: '时区 (Timezone)', en: 'Timezone' },
  timezoneDesc: { zh: '用于数据同步和显示', en: 'For data sync and display' },
  cityManagement: { zh: '城市管理', en: 'City Management' },
  cityManagementDesc: { zh: '管理默认显示城市', en: 'Manage default city' },
  currentCity: { zh: '当前', en: 'Current' },
  switchCity: { zh: '切换城市', en: 'Switch City' },
  selectCity: { zh: '选择城市', en: 'Select City' },
  searchCity: { zh: '搜索城市...', en: 'Search city...' },
  noCityFound: { zh: '未找到匹配的城市', en: 'No matching cities' },
  displayPref: { zh: '显示偏好', en: 'Display' },
  themeStyle: { zh: '主题风格', en: 'Theme' },
  themeDesc: { zh: '深色/浅色模式切换', en: 'Dark/Light mode toggle' },
  lightMode: { zh: '浅色', en: 'Light' },
  darkMode: { zh: '深色', en: 'Dark' },
  tempUnit: { zh: '温度单位', en: 'Temperature Unit' },
  celsius: { zh: '摄氏度 (°C)', en: 'Celsius (°C)' },
  fahrenheit: { zh: '华氏度 (°F)', en: 'Fahrenheit (°F)' },
  dataSync: { zh: '数据与同步', en: 'Data & Sync' },
  autoRefresh: { zh: '自动刷新间隔', en: 'Auto-refresh Interval' },
  autoRefreshDesc: { zh: '控制后台获取天气数据的频率', en: 'Control weather data fetch frequency' },
  everyHour: { zh: '每 1 小时', en: 'Every 1 hour' },
  every30min: { zh: '每 30 分钟', en: 'Every 30 minutes' },
  manualRefresh: { zh: '手动刷新', en: 'Manual refresh' },
  cacheClear: { zh: '缓存清理', en: 'Clear Cache' },
  cacheUsed: { zh: '12.4 MB 已用', en: '12.4 MB used' },
  clearData: { zh: '清除数据', en: 'Clear Data' },
  systemInfo: { zh: '系统信息', en: 'System Info' },
  version: { zh: '版本 V2.04 运行中', en: 'Version V2.04 Running' },
  cancel: { zh: '取消', en: 'Cancel' },
  saveSettings: { zh: '保存设置', en: 'Save Settings' },
  hourlyForecast: { zh: '逐小时预报', en: 'Hourly Forecast' },
  dayForecast: { zh: '7天预报', en: '7-Day Forecast' },
  feelsLike: { zh: '体感', en: 'Feels like' },
  humidity: { zh: '湿度', en: 'Humidity' },
  wind: { zh: '风力', en: 'Wind' },
  uv: { zh: '紫外线', en: 'UV Index' },
  fifteenDay: { zh: '15天天气趋势', en: '15-Day Weather Trend' },
  weatherData: { zh: '大气精密与气象数据', en: 'Precision Atmospheric Data' },
  longTerm: { zh: '长期预测', en: 'Long-term Forecast' },
  clickForDetail: { zh: '点击日期查看详情', en: 'Click date for details' },
  hourlyDetail: { zh: '逐小时详情', en: 'Hourly Details' },
  sunrise: { zh: '日出', en: 'Sunrise' },
  sunset: { zh: '日落', en: 'Sunset' },
  dayLength: { zh: '日照时长', en: 'Day Length' },
  windDir: { zh: '风向风力', en: 'Wind Direction' },
  northeastWind: { zh: '东北风', en: 'NE Wind' },
  aqiTitle: { zh: '空气质量指数', en: 'Air Quality Index' },
  aqiExcellent: { zh: '空气质量优秀', en: 'Excellent' },
  aqiGood: { zh: '空气质量良好', en: 'Good' },
  aqiModerate: { zh: '空气一般', en: 'Moderate' },
  radarTitle: { zh: '降水雷达图', en: 'Precipitation Radar' },
  legend: { zh: '图例', en: 'Legend' },
  heavy: { zh: '强', en: 'Heavy' },
  medium: { zh: '中', en: 'Medium' },
  light: { zh: '弱', en: 'Light' },
  dayNightCycle: { zh: '昼夜周期', en: 'Day/Night Cycle' },
  supportTitle: { zh: '支持与帮助', en: 'Support & Help' },
  supportDesc: { zh: '查阅常见问题，了解数据来源，或向我们提交反馈。我们致力于提供最纯粹的极简天气体验。', en: 'Browse FAQs, learn about our data sources, or submit feedback. We are committed to providing the purest minimalist weather experience.' },
  faqTitle: { zh: '常见问题 (FAQ)', en: 'FAQ' },
  dataSource: { zh: '数据来源', en: 'Data Sources' },
  dataSourceDesc1: { zh: '本应用的天气数据由', en: 'Weather data is provided by' },
  dataSourceDesc2: { zh: '提供支持。', en: '.' },
  dataSourceText: { zh: '和风天气提供全球范围内的实时天气、预报、空气质量等权威气象数据。我们承诺不对原始数据进行任何修改，仅以极简的视觉风格呈现。', en: 'QWeather provides authoritative global real-time weather, forecast, and air quality data. We present it without modification in a minimalist visual style.' },
  visitQWeather: { zh: '访问 QWeather 官网', en: 'Visit QWeather' },
  feedbackTitle: { zh: '问题反馈', en: 'Feedback' },
  feedbackType: { zh: '反馈类型', en: 'Feedback Type' },
  feedbackTypeBug: { zh: '程序故障', en: 'Bug Report' },
  feedbackTypeFeature: { zh: '功能建议', en: 'Feature Request' },
  feedbackTypeData: { zh: '数据异常', en: 'Data Issue' },
  feedbackTypeOther: { zh: '其他问题', en: 'Other' },
  feedbackDesc: { zh: '详细描述', en: 'Description' },
  feedbackPlaceholder: { zh: '请详细描述您遇到的问题或建议...', en: 'Please describe the issue or suggestion in detail...' },
  submitFeedback: { zh: '提交反馈', en: 'Submit Feedback' },
  legalTitle: { zh: '法律与关于', en: 'Legal & About' },
  privacy: { zh: '隐私政策 (Privacy Policy)', en: 'Privacy Policy' },
  terms: { zh: '服务条款 (Terms of Service)', en: 'Terms of Service' },
  currentVersion: { zh: '当前版本', en: 'Current Version' },
  minimalistWeather: { zh: '极简天气', en: 'Minimalist Weather' },
  clothingTitle: { zh: '穿衣推荐', en: 'Outfit Recommendation' },
  clothingCold: { zh: '天气较冷，建议穿棉衣、羽绒服、毛衣等保暖衣物。', en: 'Cold weather. Wear a down jacket, coat, and warm layers.' },
  clothingCool: { zh: '天气偏凉，建议穿外套、卫衣、长裤。', en: 'Cool weather. Wear a light jacket, hoodie, and long pants.' },
  clothingMild: { zh: '气温舒适，建议穿衬衫、T恤、薄外套，注意早晚温差。', en: 'Mild weather. A shirt or T-shirt with a light jacket for the evening.' },
  clothingWarm: { zh: '天气温暖，建议穿短袖、短裤、裙子等清凉衣物。', en: 'Warm weather. Short sleeves, shorts, or dresses are comfortable.' },
  clothingHot: { zh: '天气炎热，建议穿轻薄透气衣物，注意防晒补水。', en: 'Hot weather. Wear light, breathable clothing. Stay hydrated and use sun protection.' },
  umbrellaRain: { zh: '今天有雨，出门请携带雨伞！', en: "Rain expected. Don't forget your umbrella!" },
  umbrellaNoRain: { zh: '无降水，无需带伞。', en: 'No rain expected. Umbrella not needed.' },
  sunscreenHigh: { zh: '紫外线较强，建议涂抹防晒霜，佩戴太阳镜。', en: 'High UV. Apply sunscreen and wear sunglasses.' },
  windStrong: { zh: '风力较大，建议穿防风外套。', en: 'Strong winds. Wear a windbreaker.' },
  lastUpdated: { zh: '数据更新于', en: 'Last updated' },
  loading: { zh: '加载中...', en: 'Loading...' },
};
