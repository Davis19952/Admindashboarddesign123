import { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Eye, Download, MapPin, Monitor, Smartphone, Tablet } from 'lucide-react';

interface LoginLog {
  id: string;
  userId: string;
  username: string;
  loginTime: string;
  ipAddress: string;
  location: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  status: 'success' | 'failed';
  failReason?: string;
}

export function LoginLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LoginLog | null>(null);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  
  const itemsPerPage = 15;

  const loginLogs: LoginLog[] = [
    {
      id: '1',
      userId: 'U10001',
      username: '张三',
      loginTime: '2024-12-07 14:32:15',
      ipAddress: '192.168.1.100',
      location: '中国 广东省 深圳市',
      device: 'Windows 11',
      deviceType: 'desktop',
      browser: 'Chrome 120.0',
      status: 'success'
    },
    {
      id: '2',
      userId: 'U10002',
      username: '李四',
      loginTime: '2024-12-07 14:28:43',
      ipAddress: '192.168.1.105',
      location: '中国 北京市',
      device: 'iPhone 15 Pro',
      deviceType: 'mobile',
      browser: 'Safari 17.0',
      status: 'success'
    },
    {
      id: '3',
      userId: 'U10003',
      username: '王五',
      loginTime: '2024-12-07 14:15:22',
      ipAddress: '192.168.1.120',
      location: '中国 上海市',
      device: 'MacBook Pro',
      deviceType: 'desktop',
      browser: 'Chrome 120.0',
      status: 'failed',
      failReason: '密码错误'
    },
    {
      id: '4',
      userId: 'U10004',
      username: '赵六',
      loginTime: '2024-12-07 14:05:18',
      ipAddress: '192.168.1.88',
      location: '中国 浙江省 杭州市',
      device: 'iPad Air',
      deviceType: 'tablet',
      browser: 'Safari 17.0',
      status: 'success'
    },
    {
      id: '5',
      userId: 'U10005',
      username: '孙七',
      loginTime: '2024-12-07 13:58:56',
      ipAddress: '192.168.1.92',
      location: '中国 江苏省 南京市',
      device: 'Samsung Galaxy S24',
      deviceType: 'mobile',
      browser: 'Chrome Mobile 120.0',
      status: 'success'
    },
    {
      id: '6',
      userId: 'U10001',
      username: '张三',
      loginTime: '2024-12-07 13:45:32',
      ipAddress: '192.168.1.100',
      location: '中国 广东省 深圳市',
      device: 'Windows 11',
      deviceType: 'desktop',
      browser: 'Edge 120.0',
      status: 'failed',
      failReason: '账号已被锁定'
    },
    {
      id: '7',
      userId: 'U10006',
      username: '周八',
      loginTime: '2024-12-07 13:32:11',
      ipAddress: '192.168.1.75',
      location: '中国 四川省 成都市',
      device: 'Huawei Mate 60',
      deviceType: 'mobile',
      browser: 'Chrome Mobile 119.0',
      status: 'success'
    },
    {
      id: '8',
      userId: 'U10007',
      username: '吴九',
      loginTime: '2024-12-07 13:18:47',
      ipAddress: '192.168.1.66',
      location: '中国 湖北省 武汉市',
      device: 'Windows 10',
      deviceType: 'desktop',
      browser: 'Firefox 121.0',
      status: 'success'
    },
    {
      id: '9',
      userId: 'U10008',
      username: '郑十',
      loginTime: '2024-12-07 13:05:23',
      ipAddress: '192.168.1.54',
      location: '中国 陕西省 西安市',
      device: 'Xiaomi 14',
      deviceType: 'mobile',
      browser: 'Chrome Mobile 120.0',
      status: 'failed',
      failReason: '验证码错误'
    },
    {
      id: '10',
      userId: 'U10009',
      username: '冯十一',
      loginTime: '2024-12-07 12:52:39',
      ipAddress: '192.168.1.42',
      location: '中国 河南省 郑州市',
      device: 'iPad Pro',
      deviceType: 'tablet',
      browser: 'Safari 17.0',
      status: 'success'
    },
    {
      id: '11',
      userId: 'U10010',
      username: '陈十二',
      loginTime: '2024-12-07 12:38:15',
      ipAddress: '192.168.1.38',
      location: '中国 山东省 青岛市',
      device: 'MacBook Air',
      deviceType: 'desktop',
      browser: 'Chrome 120.0',
      status: 'success'
    },
    {
      id: '12',
      userId: 'U10011',
      username: '楚十三',
      loginTime: '2024-12-07 12:25:58',
      ipAddress: '192.168.1.29',
      location: '中国 福建省 厦门市',
      device: 'OPPO Find X7',
      deviceType: 'mobile',
      browser: 'Chrome Mobile 120.0',
      status: 'success'
    },
    {
      id: '13',
      userId: 'U10012',
      username: '卫十四',
      loginTime: '2024-12-07 12:12:44',
      ipAddress: '192.168.1.18',
      location: '中国 辽宁省 沈阳市',
      device: 'Windows 11',
      deviceType: 'desktop',
      browser: 'Chrome 120.0',
      status: 'failed',
      failReason: 'IP地址异常'
    },
    {
      id: '14',
      userId: 'U10013',
      username: '蒋十五',
      loginTime: '2024-12-07 11:58:31',
      ipAddress: '192.168.1.12',
      location: '中国 湖南省 长沙市',
      device: 'vivo X100',
      deviceType: 'mobile',
      browser: 'Chrome Mobile 119.0',
      status: 'success'
    },
    {
      id: '15',
      userId: 'U10014',
      username: '沈十六',
      loginTime: '2024-12-07 11:45:17',
      ipAddress: '192.168.1.8',
      location: '中国 重庆市',
      device: 'Surface Pro 9',
      deviceType: 'tablet',
      browser: 'Edge 120.0',
      status: 'success'
    },
  ];

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getStatusConfig = (status: LoginLog['status']) => {
    switch (status) {
      case 'success':
        return { label: '成功', className: 'bg-green-100 text-green-700' };
      case 'failed':
        return { label: '失败', className: 'bg-red-100 text-red-700' };
    }
  };

  const filteredLogs = loginLogs.filter(log => {
    const matchesSearch = log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesDevice = deviceFilter === 'all' || log.deviceType === deviceFilter;
    return matchesSearch && matchesStatus && matchesDevice;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const handleRefresh = () => {
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2000);
  };

  const handleViewDetail = (log: LoginLog) => {
    setSelectedLog(log);
    setShowDetailModal(true);
  };

  const handleExport = () => {
    console.log('导出登录日志数据');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">登录日志</h1>
        <p className="text-gray-600">查看用户登录历史记录和安全信息</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* 搜索和筛选栏 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索用户名、用户ID或IP地址..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="all">全部状态</option>
                  <option value="success">登录成功</option>
                  <option value="failed">登录失败</option>
                </select>
              </div>

              <select
                value={deviceFilter}
                onChange={(e) => setDeviceFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">全部设备</option>
                <option value="desktop">桌面端</option>
                <option value="mobile">移动端</option>
                <option value="tablet">平板端</option>
              </select>
              
              <button 
                onClick={handleRefresh}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                刷新
              </button>

              <button 
                onClick={handleExport}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                导出
              </button>
            </div>
          </div>
        </div>

        {/* 日志表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">用户ID</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">用户名</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">登录时间</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">IP地址</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">登录地点</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">设备类型</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">浏览器</th>
                <th className="text-center py-4 px-6 text-gray-700 whitespace-nowrap">状态</th>
                <th className="text-center py-4 px-6 text-gray-700 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((log) => {
                const statusConfig = getStatusConfig(log.status);
                
                return (
                  <tr key={log.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-600 text-sm whitespace-nowrap">
                      {log.userId}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-gray-800">{log.username}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm whitespace-nowrap">
                      {log.loginTime}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm whitespace-nowrap">
                      <code className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {log.ipAddress}
                      </code>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">{log.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(log.deviceType)}
                        <span className="text-gray-600 text-sm">{log.device}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm whitespace-nowrap">
                      {log.browser}
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs ${statusConfig.className}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetail(log)}
                        className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1 mx-auto"
                      >
                        <Eye className="w-3 h-3" />
                        详情
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 分页器 */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            显示 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLogs.length)} 条，
            共 {filteredLogs.length} 条记录
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 详情模态框 */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800">登录日志详情</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* 用户信息 */}
              <div>
                <h3 className="text-gray-700 mb-3">用户信息</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">用户ID</p>
                    <p className="text-gray-800">{selectedLog.userId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">用户名</p>
                    <p className="text-gray-800">{selectedLog.username}</p>
                  </div>
                </div>
              </div>

              {/* 登录信息 */}
              <div>
                <h3 className="text-gray-700 mb-3">登录信息</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">登录时间</p>
                    <p className="text-gray-800">{selectedLog.loginTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">登录状态</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusConfig(selectedLog.status).className}`}>
                      {getStatusConfig(selectedLog.status).label}
                    </span>
                  </div>
                  {selectedLog.status === 'failed' && selectedLog.failReason && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-1">失败原因</p>
                      <p className="text-red-600">{selectedLog.failReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 网络信息 */}
              <div>
                <h3 className="text-gray-700 mb-3">网络信息</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">IP地址</p>
                    <code className="px-2 py-1 bg-white rounded text-sm text-gray-800 border border-gray-200">
                      {selectedLog.ipAddress}
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">登录地点</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800">{selectedLog.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 设备信息 */}
              <div>
                <h3 className="text-gray-700 mb-3">设备信息</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">设备类型</p>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(selectedLog.deviceType)}
                      <p className="text-gray-800">{selectedLog.device}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">浏览器</p>
                    <p className="text-gray-800">{selectedLog.browser}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 刷新提示 Toast */}
      {showRefreshToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>刷新成功！</span>
          </div>
        </div>
      )}
    </div>
  );
}
