import { useState } from 'react';
import { Shield, CheckCircle, XCircle, Clock, FileText, User, Mail, Calendar, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthRequest {
  id: string;
  user: string;
  email: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  submitTime: string;
  documents: number;
  phone?: string;
  idNumber?: string;
  address?: string;
  reason?: string;
}

export function AuthManagement() {
  const [authRequests, setAuthRequests] = useState<AuthRequest[]>([
    {
      id: '1',
      user: '张三',
      email: 'zhangsan@example.com',
      type: '身份认证',
      status: 'pending',
      submitTime: '2025-12-07 10:30',
      documents: 2,
      phone: '+86 138 0000 0001',
      idNumber: '110101199001011234',
      address: '北京市朝阳区xxx街道xxx号',
    },
    {
      id: '2',
      user: '李四',
      email: 'lisi@example.com',
      type: '企业认证',
      status: 'pending',
      submitTime: '2025-12-07 09:15',
      documents: 5,
      phone: '+86 138 0000 0002',
      idNumber: '91110000MA01ABC123',
      address: '上海市浦东新区xxx路xxx号',
    },
    {
      id: '3',
      user: '王五',
      email: 'wangwu@example.com',
      type: '身份认证',
      status: 'approved',
      submitTime: '2025-12-06 16:45',
      documents: 2,
      phone: '+86 138 0000 0003',
      idNumber: '440101199002021234',
      address: '广州市天河区xxx街xxx号',
    },
    {
      id: '4',
      user: '赵六',
      email: 'zhaoliu@example.com',
      type: '高级认证',
      status: 'rejected',
      submitTime: '2025-12-06 14:20',
      documents: 3,
      phone: '+86 138 0000 0004',
      idNumber: '330101199003031234',
      address: '杭州市西湖区xxx路xxx号',
      reason: '提交的证件照片不清晰，无法识别关键信息',
    },
    {
      id: '5',
      user: '孙七',
      email: 'sunqi@example.com',
      type: '实名认证',
      status: 'pending',
      submitTime: '2025-12-07 08:45',
      documents: 3,
      phone: '+86 138 0000 0005',
      idNumber: '510101199004041234',
      address: '成都市锦江区xxx街xxx号',
    },
  ]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<AuthRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleViewDetail = (request: AuthRequest) => {
    setCurrentRequest(request);
    setShowDetailModal(true);
  };

  const handleApprove = (request: AuthRequest) => {
    setCurrentRequest(request);
    setShowApproveModal(true);
  };

  const handleReject = (request: AuthRequest) => {
    setCurrentRequest(request);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const handleConfirmApprove = () => {
    if (!currentRequest) return;

    toast.loading('正在处理审核...', { id: 'approve-auth' });

    setTimeout(() => {
      setAuthRequests(authRequests.map(req =>
        req.id === currentRequest.id
          ? { ...req, status: 'approved' as const }
          : req
      ));

      setShowApproveModal(false);
      
      toast.success('认证审核已通过！', {
        id: 'approve-auth',
        description: `${currentRequest.user} 的${currentRequest.type}已通过审核`,
        duration: 3000,
      });

      console.log('审核通过:', currentRequest);
    }, 1000);
  };

  const handleConfirmReject = () => {
    if (!currentRequest) return;

    if (!rejectReason.trim()) {
      toast.error('请输入拒绝原因');
      return;
    }

    toast.loading('正在处理审核...', { id: 'reject-auth' });

    setTimeout(() => {
      setAuthRequests(authRequests.map(req =>
        req.id === currentRequest.id
          ? { ...req, status: 'rejected' as const, reason: rejectReason }
          : req
      ));

      setShowRejectModal(false);
      
      toast.success('认证审核已拒绝', {
        id: 'reject-auth',
        description: `已向 ${currentRequest.user} 发送拒绝通知`,
        duration: 3000,
      });

      console.log('审核拒绝:', { ...currentRequest, reason: rejectReason });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">认证管理</h1>
        <p className="text-gray-600">审核和管理用户提交的认证申请</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-gray-600 mb-2">待审核</p>
          <p className="text-gray-900">{authRequests.filter(r => r.status === 'pending').length}</p>
          <p className="text-yellow-600 text-sm">需要处理</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-gray-600 mb-2">已通过</p>
          <p className="text-gray-900">{authRequests.filter(r => r.status === 'approved').length}</p>
          <p className="text-green-600 text-sm">审核通过</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-gray-600 mb-2">已拒绝</p>
          <p className="text-gray-900">{authRequests.filter(r => r.status === 'rejected').length}</p>
          <p className="text-red-600 text-sm">审核拒绝</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-gray-600 mb-2">总申请</p>
          <p className="text-gray-900">{authRequests.length}</p>
          <p className="text-purple-600 text-sm">全部认证</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-800 mb-1">认证请求列表</h2>
            <p className="text-gray-600 text-sm">待审核的用户认证申请</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>待审核: {authRequests.filter(r => r.status === 'pending').length}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {authRequests.map((request) => {
            const statusConfig = {
              pending: { 
                label: '待审核', 
                icon: Clock, 
                className: 'bg-yellow-50 text-yellow-700 border-yellow-200' 
              },
              approved: { 
                label: '已通过', 
                icon: CheckCircle, 
                className: 'bg-green-50 text-green-700 border-green-200' 
              },
              rejected: { 
                label: '已拒绝', 
                icon: XCircle, 
                className: 'bg-red-50 text-red-700 border-red-200' 
              },
            }[request.status];
            
            const StatusIcon = statusConfig.icon;
            
            return (
              <div 
                key={request.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-800">{request.user}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${statusConfig.className} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                      <span>{request.email}</span>
                      <span>•</span>
                      <span>{request.type}</span>
                      <span>•</span>
                      <span>{request.documents} 个文件</span>
                      <span>•</span>
                      <span>{request.submitTime}</span>
                    </div>
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button 
                      onClick={() => handleApprove(request)}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                    >
                      通过
                    </button>
                    <button 
                      onClick={() => handleReject(request)}
                      className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      拒绝
                    </button>
                    <button 
                      onClick={() => handleViewDetail(request)}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      查看详情
                    </button>
                  </div>
                )}
                
                {request.status !== 'pending' && (
                  <button 
                    onClick={() => handleViewDetail(request)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm ml-4 flex-shrink-0"
                  >
                    查看详情
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        {authRequests.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无认证请求</p>
          </div>
        )}
      </div>

      {/* 查看详情模态框 */}
      {showDetailModal && currentRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  认证详情
                </h2>
                <p className="text-sm text-gray-500">查看认证申请的详细信息</p>
              </div>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              {/* 状态标识 */}
              <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-800">{currentRequest.type}</h3>
                      <p className="text-sm text-gray-500">申请编号: #{currentRequest.id}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                    currentRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    currentRequest.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentRequest.status === 'pending' && <Clock className="w-4 h-4" />}
                    {currentRequest.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                    {currentRequest.status === 'rejected' && <XCircle className="w-4 h-4" />}
                    {currentRequest.status === 'pending' ? '待审核' :
                     currentRequest.status === 'approved' ? '已通过' : '已拒绝'}
                  </span>
                </div>
              </div>

              {/* 申请人信息 */}
              <div className="mb-6">
                <h3 className="text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  申请人信息
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">姓名</p>
                    <p className="text-gray-800">{currentRequest.user}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">邮箱</p>
                    <p className="text-gray-800">{currentRequest.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">手机号</p>
                    <p className="text-gray-800">{currentRequest.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">证件号码</p>
                    <p className="text-gray-800">{currentRequest.idNumber}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                    <p className="text-gray-500 text-sm mb-1">地址</p>
                    <p className="text-gray-800">{currentRequest.address}</p>
                  </div>
                </div>
              </div>

              {/* 提交信息 */}
              <div className="mb-6">
                <h3 className="text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  提交信息
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">提交时间</p>
                    <p className="text-gray-800">{currentRequest.submitTime}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-1">附件数量</p>
                    <p className="text-gray-800">{currentRequest.documents} 个文件</p>
                  </div>
                </div>
              </div>

              {/* 拒绝原因 */}
              {currentRequest.status === 'rejected' && currentRequest.reason && (
                <div className="mb-6">
                  <h3 className="text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    拒绝原因
                  </h3>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-700">{currentRequest.reason}</p>
                  </div>
                </div>
              )}

              {/* 上传的文件 */}
              <div className="mb-6">
                <h3 className="text-gray-800 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  认证材料
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: currentRequest.documents }).map((_, index) => (
                    <div key={index} className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">文件 {index + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              {currentRequest.status === 'pending' ? (
                <>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleReject(currentRequest);
                    }}
                    className="flex-1 px-4 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    拒绝申请
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleApprove(currentRequest);
                    }}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    通过审核
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  关闭
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 通过审核确认模态框 */}
      {showApproveModal && currentRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-gray-800 mb-2">确认通过审核？</h2>
                <p className="text-gray-500 text-sm mb-3">
                  您即将通过以下认证申请：
                </p>
                <div className="w-full p-4 bg-gray-50 rounded-lg text-left mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-800">{currentRequest.user}</p>
                      <p className="text-sm text-gray-500">{currentRequest.type}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📧 {currentRequest.email}</p>
                    <p>📱 {currentRequest.phone}</p>
                  </div>
                </div>
                <p className="text-green-600 text-sm">
                  通过后用户将收到审核通过通知
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmApprove}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all"
                >
                  确认通过
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 拒绝审核模态框 */}
      {showRejectModal && currentRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-gray-800 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  拒绝审核
                </h2>
                <p className="text-sm text-gray-500">请填写拒绝原因</p>
              </div>
              <button 
                onClick={() => setShowRejectModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800">{currentRequest.user}</p>
                    <p className="text-sm text-gray-500">{currentRequest.type}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  拒绝原因 *
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  rows={4}
                  placeholder="请详细说明拒绝此认证申请的原因，例如：证件照片不清晰、信息不完整等..."
                />
                <p className="text-gray-500 text-xs mt-2">
                  拒绝原因将发送给用户，请确保信息准确清晰
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-md transition-all"
                >
                  确认拒绝
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
