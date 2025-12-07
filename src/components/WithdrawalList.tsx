import { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Check, X, Download } from 'lucide-react';

interface Withdrawal {
  id: string;
  orderNo: string;
  username: string;
  withdrawalAddress: string;
  amount: number;
  fee: number;
  actualAmount: number;
  isFake: boolean;
  remark: string;
  applyTime: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function WithdrawalList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const itemsPerPage = 10;

  const withdrawals: Withdrawal[] = [
    {
      id: '1',
      orderNo: 'WTD20241207001',
      username: '张三',
      withdrawalAddress: 'TRX7x8K9mNpQrStUvWxYz2A3bC4dE5fG6h',
      amount: 3000.00,
      fee: 30.00,
      actualAmount: 2970.00,
      isFake: false,
      remark: '正常提现',
      applyTime: '2024-12-07 14:32:18',
      status: 'pending'
    },
    {
      id: '2',
      orderNo: 'WTD20241207002',
      username: '李四',
      withdrawalAddress: 'TRX9a1B2cD3eF4gH5iJ6kL7mN8oP9qR0s',
      amount: 8000.00,
      fee: 80.00,
      actualAmount: 7920.00,
      isFake: false,
      remark: '大额提现',
      applyTime: '2024-12-07 13:15:42',
      status: 'approved'
    },
    {
      id: '3',
      orderNo: 'WTD20241207003',
      username: '王五',
      withdrawalAddress: 'TRX2b3C4dE5fG6hI7jK8lM9nO0pQ1rS2t',
      amount: 2500.00,
      fee: 25.00,
      actualAmount: 2475.00,
      isFake: true,
      remark: '测试账户提现',
      applyTime: '2024-12-07 11:28:35',
      status: 'pending'
    },
    {
      id: '4',
      orderNo: 'WTD20241207004',
      username: '赵六',
      withdrawalAddress: 'TRX3c4D5eF6gH7iJ8kL9mN0oP1qR2sT3u',
      amount: 1000.00,
      fee: 10.00,
      actualAmount: 990.00,
      isFake: false,
      remark: '',
      applyTime: '2024-12-07 10:45:22',
      status: 'rejected'
    },
    {
      id: '5',
      orderNo: 'WTD20241207005',
      username: '钱七',
      withdrawalAddress: 'TRX4d5E6fG7hI8jK9lM0nO1pQ2rS3tU4v',
      amount: 5000.00,
      fee: 50.00,
      actualAmount: 4950.00,
      isFake: false,
      remark: 'VIP提现',
      applyTime: '2024-12-07 09:18:57',
      status: 'approved'
    },
    {
      id: '6',
      orderNo: 'WTD20241206001',
      username: '孙八',
      withdrawalAddress: 'TRX5e6F7gH8iJ9kL0mN1oP2qR3sT4uV5w',
      amount: 1200.00,
      fee: 12.00,
      actualAmount: 1188.00,
      isFake: false,
      remark: '紧急提现',
      applyTime: '2024-12-06 18:42:13',
      status: 'pending'
    },
    {
      id: '7',
      orderNo: 'WTD20241206002',
      username: '周九',
      withdrawalAddress: 'TRX6f7G8hI9jK0lM1nO2pQ3rS4tU5vW6x',
      amount: 10000.00,
      fee: 100.00,
      actualAmount: 9900.00,
      isFake: false,
      remark: '活动奖励提现',
      applyTime: '2024-12-06 17:25:48',
      status: 'approved'
    },
    {
      id: '8',
      orderNo: 'WTD20241206003',
      username: '吴十',
      withdrawalAddress: 'TRX7g8H9iJ0kL1mN2oP3qR4sT5uV6wX7y',
      amount: 500.00,
      fee: 5.00,
      actualAmount: 495.00,
      isFake: true,
      remark: '假人测试',
      applyTime: '2024-12-06 16:33:26',
      status: 'rejected'
    },
    {
      id: '9',
      orderNo: 'WTD20241206004',
      username: '郑十一',
      withdrawalAddress: 'TRX8h9I0jK1lM2nO3pQ4rS5tU6vW7xY8z',
      amount: 6500.00,
      fee: 65.00,
      actualAmount: 6435.00,
      isFake: false,
      remark: '正常提现',
      applyTime: '2024-12-06 15:12:54',
      status: 'approved'
    },
    {
      id: '10',
      orderNo: 'WTD20241206005',
      username: '王十二',
      withdrawalAddress: 'TRX9i0J1kL2mN3oP4qR5sT6uV7wX8yZ9a',
      amount: 4200.00,
      fee: 42.00,
      actualAmount: 4158.00,
      isFake: false,
      remark: '',
      applyTime: '2024-12-06 14:08:31',
      status: 'pending'
    },
  ];

  const getStatusConfig = (status: Withdrawal['status']) => {
    switch (status) {
      case 'pending':
        return { label: '待审核', className: 'bg-yellow-100 text-yellow-700' };
      case 'approved':
        return { label: '通过', className: 'bg-green-100 text-green-700' };
      case 'rejected':
        return { label: '拒绝', className: 'bg-red-100 text-red-700' };
    }
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = withdrawal.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.withdrawalAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || withdrawal.status === statusFilter;
    const matchesDateRange = !startDate || !endDate || (
      new Date(withdrawal.applyTime) >= new Date(startDate) && new Date(withdrawal.applyTime) <= new Date(endDate)
    );
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWithdrawals = filteredWithdrawals.slice(startIndex, startIndex + itemsPerPage);

  const handleApprove = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowApproveModal(true);
  };

  const handleReject = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    console.log('批准提款:', selectedWithdrawal?.orderNo);
    setShowApproveModal(false);
    setSelectedWithdrawal(null);
  };

  const confirmReject = () => {
    console.log('拒绝提款:', selectedWithdrawal?.orderNo);
    setShowRejectModal(false);
    setSelectedWithdrawal(null);
  };

  const handleRefresh = () => {
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2000);
  };

  const handleExport = () => {
    console.log('导出提款列表数据');
    // 这里可以添加实际的导出逻辑
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">提款列表</h1>
        <p className="text-gray-600">查看和审核用户提款申请</p>
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
                  placeholder="搜索订单号、用户名或提现地址..."
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
                    <option value="pending">待审核</option>
                    <option value="rejected">拒绝</option>
                    <option value="approved">通过</option>
                  </select>
                </div>
                
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

            {/* 日期筛选 */}
            <div className="flex flex-row gap-4 items-center">
              <span className="text-gray-700 text-sm whitespace-nowrap">时间筛选：</span>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">创建时间：</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">结束时间：</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
                {(startDate || endDate) && (
                  <button
                    onClick={() => {
                      setStartDate('');
                      setEndDate('');
                    }}
                    className="px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    清除
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 提款表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">ID</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">订单号</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">用户名</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">提现地址</th>
                <th className="text-right py-4 px-3 text-gray-700 whitespace-nowrap">金额</th>
                <th className="text-right py-4 px-3 text-gray-700 whitespace-nowrap">手续费</th>
                <th className="text-right py-4 px-3 text-gray-700 whitespace-nowrap">到账金额</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap">是否假人</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">备注</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">申请时间</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap">状态</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWithdrawals.map((withdrawal) => {
                const statusConfig = getStatusConfig(withdrawal.status);
                return (
                  <tr key={withdrawal.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-3 text-gray-600 text-sm whitespace-nowrap">{withdrawal.id}</td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="text-purple-600">{withdrawal.orderNo}</span>
                    </td>
                    <td className="py-4 px-3 text-gray-800 whitespace-nowrap">{withdrawal.username}</td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="text-gray-600 text-xs font-mono">
                        {withdrawal.withdrawalAddress.substring(0, 10)}...{withdrawal.withdrawalAddress.substring(withdrawal.withdrawalAddress.length - 6)}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <span className="text-gray-800">¥{withdrawal.amount.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <span className="text-orange-600">-¥{withdrawal.fee.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <span className="text-green-600">¥{withdrawal.actualAmount.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      {withdrawal.isFake ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">是</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">否</span>
                      )}
                    </td>
                    <td className="py-4 px-3 text-gray-600 text-sm whitespace-nowrap">
                      {withdrawal.remark || '-'}
                    </td>
                    <td className="py-4 px-3 text-gray-600 text-xs whitespace-nowrap">{withdrawal.applyTime}</td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs ${statusConfig.className}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-center gap-2">
                        {withdrawal.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(withdrawal)}
                              className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                              title="批准提款"
                            >
                              <Check className="w-3 h-3" />
                              通过
                            </button>
                            <button
                              onClick={() => handleReject(withdrawal)}
                              className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                              title="拒绝提款"
                            >
                              <X className="w-3 h-3" />
                              拒绝
                            </button>
                          </>
                        )}
                        {withdrawal.status !== 'pending' && (
                          <span className="text-gray-400 text-xs">已处理</span>
                        )}
                      </div>
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
            显示 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredWithdrawals.length)} 条，
            共 {filteredWithdrawals.length} 条记录
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

      {/* 批准提款确认对话框 */}
      {showApproveModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">批准提款</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 mb-2">确定要批准以下提款申请吗？</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号：</span>
                    <span className="text-purple-600">{selectedWithdrawal.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">用户名：</span>
                    <span className="text-gray-800">{selectedWithdrawal.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">提现地址：</span>
                    <span className="text-gray-800 text-xs font-mono break-all">{selectedWithdrawal.withdrawalAddress}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-600">提现金额：</span>
                    <span className="text-gray-800">¥{selectedWithdrawal.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">手续费：</span>
                    <span className="text-orange-600">-¥{selectedWithdrawal.fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-700">到账金额：</span>
                    <span className="text-green-600">¥{selectedWithdrawal.actualAmount.toFixed(2)}</span>
                  </div>
                  {selectedWithdrawal.isFake && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">是否假人：</span>
                      <span className="text-red-600">是</span>
                    </div>
                  )}
                  {selectedWithdrawal.remark && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">备注：</span>
                      <span className="text-gray-800">{selectedWithdrawal.remark}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedWithdrawal(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmApprove}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确认通过
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 拒绝提款确认对话框 */}
      {showRejectModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">拒绝提款</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-gray-600 mb-2">确定要拒绝以下提款申请吗？</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号：</span>
                    <span className="text-purple-600">{selectedWithdrawal.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">用户名：</span>
                    <span className="text-gray-800">{selectedWithdrawal.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">提款金额：</span>
                    <span className="text-gray-800">¥{selectedWithdrawal.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">到账金额：</span>
                    <span className="text-gray-800">¥{selectedWithdrawal.actualAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">拒绝后提款金额将退回用户账户！</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedWithdrawal(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确认拒绝
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