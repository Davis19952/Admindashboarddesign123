import { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Check, X, Eye, Download } from 'lucide-react';

interface Deposit {
  id: string;
  orderNo: string;
  username: string;
  amount: number;
  type: string;
  certificate: string;
  status: 'pending' | 'approved' | 'rejected';
  remark: string;
  applyTime: string;
  reviewTime: string;
}

export function DepositList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const itemsPerPage = 10;

  const deposits: Deposit[] = [
    {
      id: '1',
      orderNo: 'DEP20241207001',
      username: '张三',
      amount: 5000.00,
      type: '微信支付',
      certificate: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      status: 'pending',
      remark: '首次充值',
      applyTime: '2024-12-07 14:32:18',
      reviewTime: '-'
    },
    {
      id: '2',
      orderNo: 'DEP20241207002',
      username: '李四',
      amount: 10000.00,
      type: '支付宝',
      certificate: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400',
      status: 'approved',
      remark: '大额充值',
      applyTime: '2024-12-07 13:15:42',
      reviewTime: '2024-12-07 13:20:15'
    },
    {
      id: '3',
      orderNo: 'DEP20241207003',
      username: '王五',
      amount: 3000.00,
      type: '银行转账',
      certificate: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
      status: 'pending',
      remark: '',
      applyTime: '2024-12-07 11:28:35',
      reviewTime: '-'
    },
    {
      id: '4',
      orderNo: 'DEP20241207004',
      username: '赵六',
      amount: 2000.00,
      type: '微信支付',
      certificate: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400',
      status: 'rejected',
      remark: '测试充值',
      applyTime: '2024-12-07 10:45:22',
      reviewTime: '2024-12-07 10:50:30'
    },
    {
      id: '5',
      orderNo: 'DEP20241207005',
      username: '钱七',
      amount: 8000.00,
      type: '支付宝',
      certificate: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400',
      status: 'approved',
      remark: '活动充值',
      applyTime: '2024-12-07 09:18:57',
      reviewTime: '2024-12-07 09:25:10'
    },
    {
      id: '6',
      orderNo: 'DEP20241206001',
      username: '孙八',
      amount: 1500.00,
      type: '微信支付',
      certificate: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      status: 'pending',
      remark: '补充余额',
      applyTime: '2024-12-06 18:42:13',
      reviewTime: '-'
    },
    {
      id: '7',
      orderNo: 'DEP20241206002',
      username: '周九',
      amount: 12000.00,
      type: '银行转账',
      certificate: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400',
      status: 'approved',
      remark: 'VIP充值',
      applyTime: '2024-12-06 17:25:48',
      reviewTime: '2024-12-06 17:35:22'
    },
    {
      id: '8',
      orderNo: 'DEP20241206003',
      username: '吴十',
      amount: 500.00,
      type: '支付宝',
      certificate: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
      status: 'rejected',
      remark: '',
      applyTime: '2024-12-06 16:33:26',
      reviewTime: '2024-12-06 16:40:15'
    },
    {
      id: '9',
      orderNo: 'DEP20241206004',
      username: '郑十一',
      amount: 6500.00,
      type: '微信支付',
      certificate: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400',
      status: 'approved',
      remark: '正常充值',
      applyTime: '2024-12-06 15:12:54',
      reviewTime: '2024-12-06 15:20:08'
    },
    {
      id: '10',
      orderNo: 'DEP20241206005',
      username: '王十二',
      amount: 4200.00,
      type: '银行转账',
      certificate: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      status: 'pending',
      remark: '紧急充值',
      applyTime: '2024-12-06 14:08:31',
      reviewTime: '-'
    },
  ];

  const getStatusConfig = (status: Deposit['status']) => {
    switch (status) {
      case 'pending':
        return { label: '待审核', className: 'bg-yellow-100 text-yellow-700' };
      case 'approved':
        return { label: '通过', className: 'bg-green-100 text-green-700' };
      case 'rejected':
        return { label: '拒绝', className: 'bg-red-100 text-red-700' };
    }
  };

  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch = deposit.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deposit.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deposit.status === statusFilter;
    const matchesDateRange = !startDate || !endDate || (
      new Date(deposit.applyTime) >= new Date(startDate) && new Date(deposit.applyTime) <= new Date(endDate)
    );
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDeposits = filteredDeposits.slice(startIndex, startIndex + itemsPerPage);

  const handleApprove = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setShowApproveModal(true);
  };

  const handleReject = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setShowRejectModal(true);
  };

  const handleViewCertificate = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setShowCertificateModal(true);
  };

  const confirmApprove = () => {
    console.log('批准充值:', selectedDeposit?.orderNo);
    setShowApproveModal(false);
    setSelectedDeposit(null);
  };

  const confirmReject = () => {
    console.log('拒绝充值:', selectedDeposit?.orderNo);
    setShowRejectModal(false);
    setSelectedDeposit(null);
  };

  const handleRefresh = () => {
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2000);
  };

  const handleExport = () => {
    console.log('导出充值列表数据');
    // 这里可以添加实际的导出逻辑
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">充值列表</h1>
        <p className="text-gray-600">查看和审核用户充值记录</p>
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
                  placeholder="搜索订单号或用户名..."
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

        {/* 充值表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">ID</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">订单号</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">用户名</th>
                <th className="text-right py-4 px-3 text-gray-700 whitespace-nowrap">金额</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">类型</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">凭证</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap">状态</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">备注</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">申请时间</th>
                <th className="text-left py-4 px-3 text-gray-700 whitespace-nowrap">审核时间</th>
                <th className="text-center py-4 px-3 text-gray-700 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDeposits.map((deposit) => {
                const statusConfig = getStatusConfig(deposit.status);
                return (
                  <tr key={deposit.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-3 text-gray-600 text-sm whitespace-nowrap">{deposit.id}</td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="text-purple-600">{deposit.orderNo}</span>
                    </td>
                    <td className="py-4 px-3 text-gray-800 whitespace-nowrap">{deposit.username}</td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <span className="text-green-600">+¥{deposit.amount.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-3 text-gray-800 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {deposit.type}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleViewCertificate(deposit)}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-xs"
                      >
                        <Eye className="w-3 h-3" />
                        查看
                      </button>
                    </td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs ${statusConfig.className}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-gray-600 text-sm whitespace-nowrap">
                      {deposit.remark || '-'}
                    </td>
                    <td className="py-4 px-3 text-gray-600 text-xs whitespace-nowrap">{deposit.applyTime}</td>
                    <td className="py-4 px-3 text-gray-600 text-xs whitespace-nowrap">
                      {deposit.reviewTime}
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-center gap-2">
                        {deposit.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(deposit)}
                              className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                              title="批准充值"
                            >
                              <Check className="w-3 h-3" />
                              通过
                            </button>
                            <button
                              onClick={() => handleReject(deposit)}
                              className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                              title="拒绝充值"
                            >
                              <X className="w-3 h-3" />
                              拒绝
                            </button>
                          </>
                        )}
                        {deposit.status !== 'pending' && (
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
            显示 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDeposits.length)} 条，
            共 {filteredDeposits.length} 条记录
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

      {/* 凭证查看模态框 */}
      {showCertificateModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-800">支付凭证</h2>
              <button
                onClick={() => {
                  setShowCertificateModal(false);
                  setSelectedDeposit(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">订单号：</span>
                  <span className="text-purple-600">{selectedDeposit.orderNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">用户名：</span>
                  <span className="text-gray-800">{selectedDeposit.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">充值金额：</span>
                  <span className="text-green-600">+¥{selectedDeposit.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">支付类型：</span>
                  <span className="text-gray-800">{selectedDeposit.type}</span>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={selectedDeposit.certificate}
                  alt="支付凭证"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCertificateModal(false);
                  setSelectedDeposit(null);
                }}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 批准充值确认对话框 */}
      {showApproveModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">批准充值</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 mb-2">确定要批准以下充值申请吗？</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号：</span>
                    <span className="text-purple-600">{selectedDeposit.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">用户名：</span>
                    <span className="text-gray-800">{selectedDeposit.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">充值金额：</span>
                    <span className="text-green-600">+¥{selectedDeposit.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">支付类型：</span>
                    <span className="text-gray-800">{selectedDeposit.type}</span>
                  </div>
                  {selectedDeposit.remark && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">备注：</span>
                      <span className="text-gray-800">{selectedDeposit.remark}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedDeposit(null);
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

      {/* 拒绝充值确认对话框 */}
      {showRejectModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">拒绝充值</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-gray-600 mb-2">确定要拒绝以下充值申请吗？</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号：</span>
                    <span className="text-purple-600">{selectedDeposit.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">用户名：</span>
                    <span className="text-gray-800">{selectedDeposit.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">充值金额：</span>
                    <span className="text-gray-800">¥{selectedDeposit.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">拒绝后该充值申请将无法恢复！</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedDeposit(null);
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