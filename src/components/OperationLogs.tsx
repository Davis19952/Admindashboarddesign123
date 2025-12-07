import { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Eye, Download, User, Settings, FileText, Trash2, Edit, Plus } from 'lucide-react';

interface OperationLog {
  id: string;
  userId: string;
  username: string;
  operationType: 'create' | 'update' | 'delete' | 'view' | 'export' | 'import' | 'config';
  module: string;
  action: string;
  description: string;
  operationTime: string;
  ipAddress: string;
  status: 'success' | 'failed';
  duration: number; // 操作耗时（毫秒）
  details?: string;
}

export function OperationLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<OperationLog | null>(null);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  
  const itemsPerPage = 15;

  const operationLogs: OperationLog[] = [
    {
      id: '1',
      userId: 'U10001',
      username: '张三',
      operationType: 'create',
      module: '用户管理',
      action: '创建用户',
      description: '创建新用户账号 "test_user_001"',
      operationTime: '2024-12-07 14:35:28',
      ipAddress: '192.168.1.100',
      status: 'success',
      duration: 234
    },
    {
      id: '2',
      userId: 'U10002',
      username: '李四',
      operationType: 'update',
      module: '系统配置',
      action: '修改配置',
      description: '更新前端资源配置：修改Logo和Banner',
      operationTime: '2024-12-07 14:30:15',
      ipAddress: '192.168.1.105',
      status: 'success',
      duration: 567
    },
    {
      id: '3',
      userId: 'U10003',
      username: '王五',
      operationType: 'delete',
      module: '商品管理',
      action: '删除商品',
      description: '删除商品 "iPhone 14 Pro"',
      operationTime: '2024-12-07 14:25:42',
      ipAddress: '192.168.1.120',
      status: 'success',
      duration: 189
    },
    {
      id: '4',
      userId: 'U10004',
      username: '赵六',
      operationType: 'export',
      module: '订单管理',
      action: '导出数据',
      description: '导出订单数据（2024年11月）',
      operationTime: '2024-12-07 14:20:33',
      ipAddress: '192.168.1.88',
      status: 'success',
      duration: 3421
    },
    {
      id: '5',
      userId: 'U10005',
      username: '孙七',
      operationType: 'update',
      module: '用户管理',
      action: '编辑会员',
      description: '修改用户 "U10088" 的会员等级为VIP3',
      operationTime: '2024-12-07 14:15:21',
      ipAddress: '192.168.1.92',
      status: 'success',
      duration: 312
    },
    {
      id: '6',
      userId: 'U10001',
      username: '张三',
      operationType: 'config',
      module: '系统配置',
      action: '系统设置',
      description: '修改系统维护公告内容',
      operationTime: '2024-12-07 14:10:17',
      ipAddress: '192.168.1.100',
      status: 'failed',
      duration: 125,
      details: '权限不足'
    },
    {
      id: '7',
      userId: 'U10006',
      username: '周八',
      operationType: 'view',
      module: '认证管理',
      action: '查看详情',
      description: '查看用户实名认证详情 "U10234"',
      operationTime: '2024-12-07 14:05:48',
      ipAddress: '192.168.1.75',
      status: 'success',
      duration: 89
    },
    {
      id: '8',
      userId: 'U10007',
      username: '吴九',
      operationType: 'create',
      module: '商品管理',
      action: '添加商品',
      description: '添加新商品 "MacBook Pro 16寸"',
      operationTime: '2024-12-07 14:00:35',
      ipAddress: '192.168.1.66',
      status: 'success',
      duration: 421
    },
    {
      id: '9',
      userId: 'U10008',
      username: '郑十',
      operationType: 'update',
      module: '订单管理',
      action: '订单审核',
      description: '审核通过订单 "ORD20241207001"',
      operationTime: '2024-12-07 13:55:22',
      ipAddress: '192.168.1.54',
      status: 'success',
      duration: 256
    },
    {
      id: '10',
      userId: 'U10009',
      username: '冯十一',
      operationType: 'delete',
      module: '用户管理',
      action: '删除用户',
      description: '删除违规用户 "test_spam_001"',
      operationTime: '2024-12-07 13:50:14',
      ipAddress: '192.168.1.42',
      status: 'success',
      duration: 187
    },
    {
      id: '11',
      userId: 'U10010',
      username: '陈十二',
      operationType: 'import',
      module: '用户管理',
      action: '批量导入',
      description: '批量导入用户数据（100条）',
      operationTime: '2024-12-07 13:45:08',
      ipAddress: '192.168.1.38',
      status: 'success',
      duration: 5678
    },
    {
      id: '12',
      userId: 'U10011',
      username: '楚十三',
      operationType: 'config',
      module: '系统配置',
      action: '修改配置',
      description: '更新邮件服务器配置',
      operationTime: '2024-12-07 13:40:52',
      ipAddress: '192.168.1.29',
      status: 'success',
      duration: 234
    },
    {
      id: '13',
      userId: 'U10012',
      username: '卫十四',
      operationType: 'update',
      module: '交易管理',
      action: '处理提款',
      description: '审核提款申请 "WD20241207032"',
      operationTime: '2024-12-07 13:35:43',
      ipAddress: '192.168.1.18',
      status: 'failed',
      duration: 156,
      details: '银行卡信息验证失败'
    },
    {
      id: '14',
      userId: 'U10013',
      username: '蒋十五',
      operationType: 'view',
      module: '登录日志',
      action: '查看日志',
      description: '查看用户登录日志',
      operationTime: '2024-12-07 13:30:28',
      ipAddress: '192.168.1.12',
      status: 'success',
      duration: 67
    },
    {
      id: '15',
      userId: 'U10014',
      username: '沈十六',
      operationType: 'export',
      module: '财务报表',
      action: '导出报表',
      description: '导出月度财务报表',
      operationTime: '2024-12-07 13:25:15',
      ipAddress: '192.168.1.8',
      status: 'success',
      duration: 4321
    },
  ];

  const getOperationIcon = (type: OperationLog['operationType']) => {
    switch (type) {
      case 'create':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'update':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'view':
        return <Eye className="w-4 h-4 text-purple-600" />;
      case 'export':
        return <Download className="w-4 h-4 text-orange-600" />;
      case 'import':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'config':
        return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const getOperationTypeLabel = (type: OperationLog['operationType']) => {
    const labels = {
      create: '创建',
      update: '更新',
      delete: '删除',
      view: '查看',
      export: '导出',
      import: '导入',
      config: '配置'
    };
    return labels[type];
  };

  const getOperationTypeColor = (type: OperationLog['operationType']) => {
    const colors = {
      create: 'bg-green-100 text-green-700',
      update: 'bg-blue-100 text-blue-700',
      delete: 'bg-red-100 text-red-700',
      view: 'bg-purple-100 text-purple-700',
      export: 'bg-orange-100 text-orange-700',
      import: 'bg-indigo-100 text-indigo-700',
      config: 'bg-gray-100 text-gray-700'
    };
    return colors[type];
  };

  const getStatusConfig = (status: OperationLog['status']) => {
    switch (status) {
      case 'success':
        return { label: '成功', className: 'bg-green-100 text-green-700' };
      case 'failed':
        return { label: '失败', className: 'bg-red-100 text-red-700' };
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) {
      return `${ms}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const filteredLogs = operationLogs.filter(log => {
    const matchesSearch = log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesType = typeFilter === 'all' || log.operationType === typeFilter;
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesStatus && matchesType && matchesModule;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const handleRefresh = () => {
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2000);
  };

  const handleViewDetail = (log: OperationLog) => {
    setSelectedLog(log);
    setShowDetailModal(true);
  };

  const handleExport = () => {
    console.log('导出操作��志数据');
  };

  // 获取所有模块列表
  const modules = Array.from(new Set(operationLogs.map(log => log.module)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">操作日志</h1>
        <p className="text-gray-600">追踪管理员操作记录和系统变更历史</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* 搜索和筛选栏 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索用户名、操作类型或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3">
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

            {/* 筛选器行 */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="all">全部状态</option>
                  <option value="success">操作成功</option>
                  <option value="failed">操作失败</option>
                </select>
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">全部类型</option>
                <option value="create">创建</option>
                <option value="update">更新</option>
                <option value="delete">删除</option>
                <option value="view">查看</option>
                <option value="export">导出</option>
                <option value="import">导入</option>
                <option value="config">配置</option>
              </select>

              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">全部模块</option>
                {modules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 日志表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">操作人</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">操作类型</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">所属模块</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">操作描述</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">操作时间</th>
                <th className="text-left py-4 px-6 text-gray-700 whitespace-nowrap">IP地址</th>
                <th className="text-center py-4 px-6 text-gray-700 whitespace-nowrap">耗时</th>
                <th className="text-center py-4 px-6 text-gray-700 whitespace-nowrap">状态</th>
                <th className="text-center py-4 px-6 text-gray-700 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((log) => {
                const statusConfig = getStatusConfig(log.status);
                
                return (
                  <tr key={log.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-800 text-sm">{log.username}</p>
                          <p className="text-gray-500 text-xs">{log.userId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getOperationIcon(log.operationType)}
                        <span className={`px-2 py-1 rounded-full text-xs ${getOperationTypeColor(log.operationType)}`}>
                          {getOperationTypeLabel(log.operationType)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {log.module}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-600 text-sm line-clamp-2 max-w-md">
                        {log.description}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm whitespace-nowrap">
                      {log.operationTime}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <code className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                        {log.ipAddress}
                      </code>
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className={`text-xs ${log.duration > 1000 ? 'text-orange-600' : 'text-gray-600'}`}>
                        {formatDuration(log.duration)}
                      </span>
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
              <h2 className="text-gray-800">操作日志详情</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* 操作人信息 */}
              <div>
                <h3 className="text-gray-700 mb-3">操作人信息</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">用户ID</p>
                    <p className="text-gray-800">{selectedLog.userId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">用户名</p>
                    <p className="text-gray-800">{selectedLog.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">IP地址</p>
                    <code className="px-2 py-1 bg-white rounded text-sm text-gray-800 border border-gray-200">
                      {selectedLog.ipAddress}
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">操作时间</p>
                    <p className="text-gray-800">{selectedLog.operationTime}</p>
                  </div>
                </div>
              </div>

              {/* 操作详情 */}
              <div>
                <h3 className="text-gray-700 mb-3">操作详情</h3>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">操作类型</p>
                      <div className="flex items-center gap-2">
                        {getOperationIcon(selectedLog.operationType)}
                        <span className={`px-2 py-1 rounded-full text-xs ${getOperationTypeColor(selectedLog.operationType)}`}>
                          {getOperationTypeLabel(selectedLog.operationType)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">所属模块</p>
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {selectedLog.module}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">操作动作</p>
                    <p className="text-gray-800">{selectedLog.action}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">操作描述</p>
                    <p className="text-gray-800">{selectedLog.description}</p>
                  </div>
                </div>
              </div>

              {/* 执行结果 */}
              <div>
                <h3 className="text-gray-700 mb-3">执行结果</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">执行状态</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusConfig(selectedLog.status).className}`}>
                      {getStatusConfig(selectedLog.status).label}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">执行耗时</p>
                    <p className={`${selectedLog.duration > 1000 ? 'text-orange-600' : 'text-gray-800'}`}>
                      {formatDuration(selectedLog.duration)}
                    </p>
                  </div>
                  {selectedLog.status === 'failed' && selectedLog.details && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-1">失败原因</p>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600">{selectedLog.details}</p>
                      </div>
                    </div>
                  )}
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
