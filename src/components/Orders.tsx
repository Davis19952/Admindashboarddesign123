import { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Trash2, RotateCcw, Download } from 'lucide-react';

interface Order {
  id: string;
  orderNo: string;
  username: string;
  quantity: number;
  productName: string;
  unitPrice: number;
  totalPrice: number;
  buybackPrice: number;
  orderTime: string;
  status: 'pending' | 'paid' | 'buyback_applied' | 'buyback_completed' | 'cancelled';
}

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBuybackConfirm, setShowBuybackConfirm] = useState(false);
  const [showBuybackPriceModal, setShowBuybackPriceModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  const [buybackPrice, setBuybackPrice] = useState('');
  
  const itemsPerPage = 10;

  const orders: Order[] = [
    { 
      id: '1', 
      orderNo: 'ORD20241207001', 
      username: '张三', 
      quantity: 2, 
      productName: 'iPhone 15 Pro Max',
      unitPrice: 9999.00,
      totalPrice: 19998.00,
      buybackPrice: 17998.20,
      orderTime: '2024-12-07 14:32:18', 
      status: 'paid'
    },
    { 
      id: '2', 
      orderNo: 'ORD20241207002', 
      username: '李四', 
      quantity: 1, 
      productName: 'MacBook Pro 14寸',
      unitPrice: 15999.00,
      totalPrice: 15999.00,
      buybackPrice: 14399.10,
      orderTime: '2024-12-07 13:15:42', 
      status: 'buyback_completed'
    },
    { 
      id: '3', 
      orderNo: 'ORD20241207003', 
      username: '王五', 
      quantity: 3, 
      productName: 'AirPods Pro 2',
      unitPrice: 1899.00,
      totalPrice: 5697.00,
      buybackPrice: 5127.30,
      orderTime: '2024-12-07 11:28:35', 
      status: 'buyback_applied'
    },
    { 
      id: '4', 
      orderNo: 'ORD20241207004', 
      username: '赵六', 
      quantity: 1, 
      productName: 'iPad Air',
      unitPrice: 4799.00,
      totalPrice: 4799.00,
      buybackPrice: 4319.10,
      orderTime: '2024-12-07 10:45:22', 
      status: 'cancelled'
    },
    { 
      id: '5', 
      orderNo: 'ORD20241207005', 
      username: '钱七', 
      quantity: 2, 
      productName: 'Apple Watch Ultra 2',
      unitPrice: 6499.00,
      totalPrice: 12998.00,
      buybackPrice: 11698.20,
      orderTime: '2024-12-07 09:18:57', 
      status: 'paid'
    },
    { 
      id: '6', 
      orderNo: 'ORD20241206001', 
      username: '孙八', 
      quantity: 1, 
      productName: 'Mac Studio',
      unitPrice: 14999.00,
      totalPrice: 14999.00,
      buybackPrice: 13499.10,
      orderTime: '2024-12-06 18:42:13', 
      status: 'pending'
    },
    { 
      id: '7', 
      orderNo: 'ORD20241206002', 
      username: '周九', 
      quantity: 2, 
      productName: 'HomePod mini',
      unitPrice: 749.00,
      totalPrice: 1498.00,
      buybackPrice: 1348.20,
      orderTime: '2024-12-06 17:25:48', 
      status: 'buyback_completed'
    },
    { 
      id: '8', 
      orderNo: 'ORD20241206003', 
      username: '吴十', 
      quantity: 1, 
      productName: 'iMac 24寸',
      unitPrice: 10499.00,
      totalPrice: 10499.00,
      buybackPrice: 9449.10,
      orderTime: '2024-12-06 16:33:26', 
      status: 'cancelled'
    },
    { 
      id: '9', 
      orderNo: 'ORD20241206004', 
      username: '郑十一', 
      quantity: 3, 
      productName: 'Magic Keyboard',
      unitPrice: 1099.00,
      totalPrice: 3297.00,
      buybackPrice: 2967.30,
      orderTime: '2024-12-06 15:12:54', 
      status: 'paid'
    },
    { 
      id: '10', 
      orderNo: 'ORD20241206005', 
      username: '王十二', 
      quantity: 1, 
      productName: 'Apple TV 4K',
      unitPrice: 1499.00,
      totalPrice: 1499.00,
      buybackPrice: 1349.10,
      orderTime: '2024-12-06 14:08:31', 
      status: 'pending'
    },
  ];

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { label: '下单', className: 'bg-gray-100 text-gray-700' };
      case 'paid':
        return { label: '已支付', className: 'bg-blue-100 text-blue-700' };
      case 'buyback_applied':
        return { label: '申请回购', className: 'bg-yellow-100 text-yellow-700' };
      case 'buyback_completed':
        return { label: '已回购', className: 'bg-green-100 text-green-700' };
      case 'cancelled':
        return { label: '取消', className: 'bg-red-100 text-red-700' };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDeleteConfirm(true);
  };

  const handleBuybackOrder = (order: Order) => {
    setSelectedOrder(order);
    setBuybackPrice(order.buybackPrice.toString());
    setShowBuybackPriceModal(true);
  };

  const confirmDelete = () => {
    console.log('删除订单:', selectedOrder?.orderNo);
    setShowDeleteConfirm(false);
    setSelectedOrder(null);
  };

  const handleSubmitBuybackPrice = () => {
    if (!buybackPrice || parseFloat(buybackPrice) <= 0) {
      alert('请输入有效的回购价格');
      return;
    }
    setShowBuybackPriceModal(false);
    setShowBuybackConfirm(true);
  };

  const confirmBuyback = () => {
    console.log('申请回购:', selectedOrder?.orderNo, '回购价:', buybackPrice);
    setShowBuybackConfirm(false);
    setSelectedOrder(null);
    setBuybackPrice('');
  };

  const handleRefresh = () => {
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2000);
  };

  const handleExport = () => {
    console.log('导出订单数据');
    // 这里可以添加实际的导出逻辑
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">订单管理</h1>
        <p className="text-gray-600">查看和管理所有订单信息</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* 搜索和筛选栏 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索订单号、用户名或商品名称..."
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
                  <option value="pending">下单</option>
                  <option value="paid">已支付</option>
                  <option value="buyback_applied">申请回购</option>
                  <option value="buyback_completed">已回购</option>
                  <option value="cancelled">取消</option>
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
        </div>

        {/* 订单表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">ID</th>
                <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">订单号</th>
                <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">用户名</th>
                <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">数量</th>
                <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">商品名称</th>
                <th className="text-right py-4 px-4 text-gray-700 whitespace-nowrap">单价</th>
                <th className="text-right py-4 px-4 text-gray-700 whitespace-nowrap">总价</th>
                <th className="text-right py-4 px-4 text-gray-700 whitespace-nowrap">回收价</th>
                <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">下单时间</th>
                <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">订单状态</th>
                <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                return (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{order.id}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-purple-600">{order.orderNo}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-800 whitespace-nowrap">{order.username}</td>
                    <td className="py-4 px-4 text-center text-gray-800 whitespace-nowrap">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{order.quantity}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-800 whitespace-nowrap">{order.productName}</td>
                    <td className="py-4 px-4 text-right text-gray-600 whitespace-nowrap">
                      ¥{order.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <span className="text-gray-800">¥{order.totalPrice.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-4 text-right text-green-600 whitespace-nowrap">
                      ¥{order.buybackPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{order.orderTime}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusConfig.className}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleBuybackOrder(order)}
                          disabled={order.status === 'buyback_applied' || order.status === 'buyback_completed' || order.status === 'cancelled'}
                          className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="申请回购"
                        >
                          <RotateCcw className="w-3 h-3" />
                          回购
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order)}
                          className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                          title="删除订单"
                        >
                          <Trash2 className="w-3 h-3" />
                          删除
                        </button>
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
            显示 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} 条，
            共 {filteredOrders.length} 条记录
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

      {/* 删除订单确认对话框 */}
      {showDeleteConfirm && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">删除订单</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-gray-600 mb-2">确定要删除以下订单吗？</p>
                <p className="text-gray-800">订单号：<span className="text-purple-600">{selectedOrder.orderNo}</span></p>
                <p className="text-gray-600 text-sm mt-1">商品：{selectedOrder.productName}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">此操作不可撤销，请谨慎操作！</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 申请回购确认对话框 */}
      {showBuybackConfirm && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">申请回购</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 mb-2">确定要申请回购以下订单吗？</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号：</span>
                    <span className="text-purple-600">{selectedOrder.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">商品：</span>
                    <span className="text-gray-800">{selectedOrder.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">数量：</span>
                    <span className="text-gray-800">{selectedOrder.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">原价：</span>
                    <span className="text-gray-800">¥{selectedOrder.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="text-gray-700">回购价：</span>
                    <span className="text-green-600">¥{parseFloat(buybackPrice).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowBuybackConfirm(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmBuyback}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确认回购
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 设置回购价格模态框 */}
      {showBuybackPriceModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">设置回购价格</h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 mb-2">设置以下订单的回购价格：</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号：</span>
                    <span className="text-purple-600">{selectedOrder.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">商品：</span>
                    <span className="text-gray-800">{selectedOrder.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">数量：</span>
                    <span className="text-gray-800">{selectedOrder.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">原价：</span>
                    <span className="text-gray-800">¥{selectedOrder.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="text-gray-700">回购价：</span>
                    <input
                      type="number"
                      value={buybackPrice}
                      onChange={(e) => setBuybackPrice(e.target.value)}
                      className="text-gray-800 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowBuybackPriceModal(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmitBuybackPrice}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确认设置
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