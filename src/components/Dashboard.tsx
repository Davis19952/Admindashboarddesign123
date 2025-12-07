import { DollarSign, ShoppingBag, Ticket, UserPlus, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { date: '12/01', value: 4200 },
  { date: '12/02', value: 5100 },
  { date: '12/03', value: 4800 },
  { date: '12/04', value: 6200 },
  { date: '12/05', value: 5800 },
  { date: '12/06', value: 7200 },
  { date: '12/07', value: 6900 },
];

export function Dashboard() {
  const stats = [
    {
      title: '今日收入',
      value: '¥28,650',
      change: '+15.8%',
      trend: 'up',
      icon: ArrowUpRight,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: '今日出款',
      value: '¥12,340',
      change: '+5.2%',
      trend: 'up',
      icon: ArrowDownRight,
      color: 'from-red-500 to-red-600',
    },
    {
      title: '进行中订单',
      value: '248',
      change: '+8 今日',
      trend: 'up',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '待处理工单',
      value: '42',
      change: '-3 vs 昨日',
      trend: 'down',
      icon: Ticket,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: '今日新增用户',
      value: '127',
      change: '+18.2%',
      trend: 'up',
      icon: UserPlus,
      color: 'from-green-500 to-green-600',
    },
    {
      title: '总收入',
      value: '¥342,860',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: '总出款',
      value: '¥186,420',
      change: '+8.3%',
      trend: 'up',
      icon: Wallet,
      color: 'from-rose-500 to-rose-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">仪表盘概览</h1>
        <p className="text-gray-600">实时监控系统运营数据</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h2 className="text-gray-800 mb-1">交易趋势</h2>
          <p className="text-gray-600 text-sm">最近 7 天的交易金额走势</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => `¥${value}`}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="url(#colorGradient)" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}