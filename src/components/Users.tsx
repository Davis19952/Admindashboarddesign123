import { useState } from 'react';
import { Search, Filter, ArrowUpDown, Lock, Unlock, Edit, MoreVertical, ChevronLeft, ChevronRight, RefreshCw, X, Plus, Minus, Snowflake, User as UserIcon, Phone, Key, Shield, Download, Calendar } from 'lucide-react';

interface User {
  id: string;
  username: string;
  avatar: string;
  balance: number;
  frozenBalance: number;
  vipLevel: number;
  parentAccount: string;
  creditScore: number;
  inviteCode: string;
  ip: string;
  isFake: boolean;
  isDisabled: boolean;
  tradeStatus: 'normal' | 'restricted';
  withdrawStatus: 'normal' | 'restricted';
  lastLogin: string;
  registerTime: string;
  phone?: string;
}

interface AccountChange {
  id: string;
  username: string;
  orderNo: string;
  changeType: string;
  assetType: string;
  beforeBalance: number;
  changeAmount: number;
  afterBalance: number;
  remark: string;
  time: string;
}

export function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [operationType, setOperationType] = useState<'add' | 'subtract'>('add');
  const [freezeType, setFreezeType] = useState<'freeze' | 'unfreeze'>('freeze');
  const [amount, setAmount] = useState('');
  const [freezeAmount, setFreezeAmount] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetUser, setActionSheetUser] = useState<User | null>(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  
  // 新增状态
  const [showChangeLoginPasswordModal, setShowChangeLoginPasswordModal] = useState(false);
  const [showChangeTradePasswordModal, setShowChangeTradePasswordModal] = useState(false);
  const [showAccountChangeModal, setShowAccountChangeModal] = useState(false);
  const [showWithdrawAccountModal, setShowWithdrawAccountModal] = useState(false);
  const [showCreditScoreModal, setShowCreditScoreModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogConfig, setConfirmDialogConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  
  const [newLoginPassword, setNewLoginPassword] = useState('');
  const [confirmLoginPassword, setConfirmLoginPassword] = useState('');
  const [newTradePassword, setNewTradePassword] = useState('');
  const [confirmTradePassword, setConfirmTradePassword] = useState('');
  
  // 提现账户信息
  const [withdrawAccount, setWithdrawAccount] = useState({
    realName: '',
    bankCard: '',
    bankName: '',
  });
  
  // 信誉分
  const [creditScore, setCreditScore] = useState(0);
  
  // 列显示状态
  const [showFilterColumns, setShowFilterColumns] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    username: true,
    balance: true,
    frozenBalance: true,
    vipLevel: true,
    parentAccount: true,
    creditScore: true,
    inviteCode: true,
    ip: true,
    isFake: true,
    isDisabled: true,
    tradeStatus: true,
    withdrawStatus: true,
    lastLogin: true,
    registerTime: true,
  });
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  
  // 注册日期筛选
  const [registerStartDate, setRegisterStartDate] = useState('');
  const [registerEndDate, setRegisterEndDate] = useState('');
  
  // 账变信息筛选条件
  const [accountChangeType, setAccountChangeType] = useState('');
  const [assetType, setAssetType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  // 添加会员表单状态
  const [addMemberForm, setAddMemberForm] = useState({
    username: '',
    inviteCode: '',
    phone: '',
    vipLevel: 0,
    loginPassword: '',
    tradePassword: '',
    isFake: false,
    tradeStatus: 'normal' as 'normal' | 'restricted',
    withdrawStatus: 'normal' as 'normal' | 'restricted',
    isDisabled: false,
  });
  
  // 编辑会员表单状态
  const [editForm, setEditForm] = useState({
    phone: '',
    vipLevel: 0,
    loginPassword: '',
    tradePassword: '',
    isFake: false,
    tradeStatus: 'normal' as 'normal' | 'restricted',
    withdrawStatus: 'normal' as 'normal' | 'restricted',
    isDisabled: false,
  });
  
  const itemsPerPage = 10;

  const users: User[] = [
    { 
      id: 'U001', 
      username: '张三',
      avatar: '👨', 
      balance: 2580.50, 
      frozenBalance: 100.00,
      vipLevel: 3,
      parentAccount: 'U000',
      creditScore: 98,
      inviteCode: 'INV001',
      ip: '192.168.1.100',
      isFake: false,
      isDisabled: false,
      tradeStatus: 'normal',
      withdrawStatus: 'normal',
      lastLogin: '2024-12-06 14:30',
      registerTime: '2024-11-15'
    },
    { 
      id: 'U002', 
      username: '李四',
      avatar: '👩', 
      balance: 1288.00, 
      frozenBalance: 0,
      vipLevel: 2,
      parentAccount: 'U001',
      creditScore: 85,
      inviteCode: 'INV002',
      ip: '192.168.1.101',
      isFake: false,
      isDisabled: false,
      tradeStatus: 'normal',
      withdrawStatus: 'normal',
      lastLogin: '2024-12-06 13:15',
      registerTime: '2024-11-10'
    },
    { 
      id: 'U003', 
      username: '王五',
      avatar: '👨', 
      balance: 5632.80, 
      frozenBalance: 500.00,
      vipLevel: 5,
      parentAccount: '-',
      creditScore: 100,
      inviteCode: 'INV003',
      ip: '192.168.1.102',
      isFake: false,
      isDisabled: false,
      tradeStatus: 'normal',
      withdrawStatus: 'normal',
      lastLogin: '2024-12-06 11:28',
      registerTime: '2024-10-28'
    },
    { 
      id: 'U004', 
      username: '赵六',
      avatar: '👩', 
      balance: 0, 
      frozenBalance: 0,
      vipLevel: 1,
      parentAccount: 'U002',
      creditScore: 45,
      inviteCode: 'INV004',
      ip: '192.168.1.103',
      isFake: false,
      isDisabled: true,
      tradeStatus: 'restricted',
      withdrawStatus: 'restricted',
      lastLogin: '2024-11-20 10:45',
      registerTime: '2024-10-15'
    },
    { 
      id: 'U005', 
      username: '钱七',
      avatar: '👨', 
      balance: 3299.00, 
      frozenBalance: 200.00,
      vipLevel: 4,
      parentAccount: 'U001',
      creditScore: 92,
      inviteCode: 'INV005',
      ip: '192.168.1.104',
      isFake: true,
      isDisabled: false,
      tradeStatus: 'normal',
      withdrawStatus: 'normal',
      lastLogin: '2024-12-06 09:18',
      registerTime: '2024-09-22'
    },
    { 
      id: 'U006', 
      username: '孙八',
      avatar: '👩', 
      balance: 756.30, 
      frozenBalance: 0,
      vipLevel: 1,
      parentAccount: 'U003',
      creditScore: 78,
      inviteCode: 'INV006',
      ip: '192.168.1.105',
      isFake: false,
      isDisabled: false,
      tradeStatus: 'normal',
      withdrawStatus: 'normal',
      lastLogin: '2024-12-05 18:42',
      registerTime: '2024-09-08'
    },
    { 
      id: 'U007', 
      username: '周九',
      avatar: '👨', 
      balance: 8899.90, 
      frozenBalance: 1000.00,
      vipLevel: 6,
      parentAccount: '-',
      creditScore: 100,
      inviteCode: 'INV007',
      ip: '192.168.1.106',
      isFake: false,
      isDisabled: false,
      tradeStatus: 'normal',
      withdrawStatus: 'normal',
      lastLogin: '2024-12-05 17:25',
      registerTime: '2024-08-30'
    },
    { 
      id: 'U008', 
      username: '吴十',
      avatar: '👩', 
      balance: 428.00, 
      frozenBalance: 0,
      vipLevel: 1,
      parentAccount: 'U005',
      creditScore: 68,
      inviteCode: 'INV008',
      ip: '192.168.1.107',
      isFake: false,
      isDisabled: false,
      tradeStatus: 'restricted',
      withdrawStatus: 'normal',
      lastLogin: '2024-12-05 16:33',
      registerTime: '2024-08-12'
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 日期筛选
    let matchesDate = true;
    if (registerStartDate || registerEndDate) {
      const registerDate = new Date(user.registerTime);
      if (registerStartDate) {
        const startDate = new Date(registerStartDate);
        matchesDate = matchesDate && registerDate >= startDate;
      }
      if (registerEndDate) {
        const endDate = new Date(registerEndDate);
        endDate.setHours(23, 59, 59, 999); // 包含当天的所有时间
        matchesDate = matchesDate && registerDate <= endDate;
      }
    }
    
    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleBalanceAdjust = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setShowBalanceModal(true);
    }
  };

  const handleFreeze = (userId: string, isFrozen: boolean) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setFreezeType(isFrozen ? 'unfreeze' : 'freeze');
      setShowFreezeModal(true);
    }
  };

  const handleEditMember = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setEditForm({
        phone: user.phone || '',
        vipLevel: user.vipLevel,
        loginPassword: '',
        tradePassword: '',
        isFake: user.isFake,
        tradeStatus: user.tradeStatus,
        withdrawStatus: user.withdrawStatus,
        isDisabled: user.isDisabled,
      });
      setShowEditModal(true);
    }
  };

  const handleBalanceChange = () => {
    if (selectedUser) {
      const newBalance = operationType === 'add' ? selectedUser.balance + parseFloat(amount) : selectedUser.balance - parseFloat(amount);
      const updatedUser = { ...selectedUser, balance: newBalance };
      const updatedUsers = users.map(u => u.id === selectedUser.id ? updatedUser : u);
      // 这里可以更新状态或发送请求到服务器
      console.log(updatedUsers);
      setShowBalanceModal(false);
    }
  };

  const handleFreezeChange = () => {
    if (selectedUser) {
      const newFrozenBalance = freezeType === 'freeze' ? selectedUser.balance + parseFloat(freezeAmount) : selectedUser.balance - parseFloat(freezeAmount);
      const updatedUser = { ...selectedUser, frozenBalance: newFrozenBalance };
      const updatedUsers = users.map(u => u.id === selectedUser.id ? updatedUser : u);
      // 这里可以更新状态或发送请求到服务器
      console.log(updatedUsers);
      setShowFreezeModal(false);
    }
  };

  const handleEditChange = () => {
    if (selectedUser) {
      const updatedUser = { ...selectedUser, ...editForm };
      const updatedUsers = users.map(u => u.id === selectedUser.id ? updatedUser : u);
      // 这里可以更新状态或发送请求到服务器
      console.log(updatedUsers);
      setShowEditModal(false);
    }
  };

  const handleActionSheet = (user: User) => {
    setActionSheetUser(user);
    setShowActionSheet(true);
  };

  const handleAddMember = () => {
    // 这里可以发送请求到服务器创建新用户
    console.log('新增会员:', addMemberForm);
    setShowAddMemberModal(false);
    setAddMemberForm({
      username: '',
      inviteCode: '',
      phone: '',
      vipLevel: 0,
      loginPassword: '',
      tradePassword: '',
      isFake: false,
      tradeStatus: 'normal',
      withdrawStatus: 'normal',
      isDisabled: false,
    });
  };

  const handleChangeLoginPassword = () => {
    if (newLoginPassword !== confirmLoginPassword) {
      alert('两次密码输入不一致');
      return;
    }
    console.log('修改登录密码:', { user: actionSheetUser?.username, newPassword: newLoginPassword });
    setShowChangeLoginPasswordModal(false);
    setShowActionSheet(false);
    setNewLoginPassword('');
    setConfirmLoginPassword('');
  };

  const handleChangeTradePassword = () => {
    if (newTradePassword !== confirmTradePassword) {
      alert('两次密码输入不一致');
      return;
    }
    console.log('修改交易密码:', { user: actionSheetUser?.username, newPassword: newTradePassword });
    setShowChangeTradePasswordModal(false);
    setShowActionSheet(false);
    setNewTradePassword('');
    setConfirmTradePassword('');
  };

  const handleResetAccountChangeFilters = () => {
    setAccountChangeType('');
    setAssetType('');
    setStartTime('');
    setEndTime('');
  };

  const handleUpdateWithdrawAccount = () => {
    console.log('修改提现账户:', { user: actionSheetUser?.username, ...withdrawAccount });
    setShowWithdrawAccountModal(false);
    setShowActionSheet(false);
    setWithdrawAccount({ realName: '', bankCard: '', bankName: '' });
  };

  const handleUpdateCreditScore = () => {
    console.log('修改信誉分:', { user: actionSheetUser?.username, newScore: creditScore });
    setShowCreditScoreModal(false);
    setShowActionSheet(false);
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialogConfig({ title, message, onConfirm });
    setShowConfirmDialog(true);
    setShowActionSheet(false);
  };

  const handleRefreshIP = () => {
    console.log('刷新IP归属:', actionSheetUser?.username);
    setShowConfirmDialog(false);
  };

  const handleToggleDisabled = () => {
    console.log('切换禁用状态:', actionSheetUser?.username);
    setShowConfirmDialog(false);
  };

  const handleToggleTrade = () => {
    console.log('切换交易状态:', actionSheetUser?.username);
    setShowConfirmDialog(false);
  };

  const handleToggleWithdraw = () => {
    console.log('切换提现状态:', actionSheetUser?.username);
    setShowConfirmDialog(false);
  };

  const handleToggleFake = () => {
    console.log('切换假人状态:', actionSheetUser?.username);
    setShowConfirmDialog(false);
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleRefresh = () => {
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2000);
  };

  const handleExport = () => {
    console.log('导出用户数据');
    // 这里可以添加实际的导出逻辑
  };

  const handleClearDateFilter = () => {
    setRegisterStartDate('');
    setRegisterEndDate('');
  };

  // 账变信息模拟数据
  const accountChanges: AccountChange[] = [
    {
      id: 'AC001',
      username: actionSheetUser?.username || '张三',
      orderNo: 'ORD20241207001',
      changeType: '充值',
      assetType: '余额',
      beforeBalance: 2000.00,
      changeAmount: 580.50,
      afterBalance: 2580.50,
      remark: '支付宝充值',
      time: '2024-12-07 14:30:25'
    },
    {
      id: 'AC002',
      username: actionSheetUser?.username || '张三',
      orderNo: 'ORD20241207002',
      changeType: '后台冻结',
      assetType: '冻结金额',
      beforeBalance: 0,
      changeAmount: 100.00,
      afterBalance: 100.00,
      remark: '风控冻结',
      time: '2024-12-07 13:15:42'
    },
    {
      id: 'AC003',
      username: actionSheetUser?.username || '张三',
      orderNo: 'ORD20241206001',
      changeType: '提现',
      assetType: '余额',
      beforeBalance: 2600.00,
      changeAmount: -500.00,
      afterBalance: 2100.00,
      remark: '提现至银行卡',
      time: '2024-12-06 18:22:15'
    },
    {
      id: 'AC004',
      username: actionSheetUser?.username || '张三',
      orderNo: 'ORD20241206002',
      changeType: '后台上分',
      assetType: '余额',
      beforeBalance: 1600.00,
      changeAmount: 1000.00,
      afterBalance: 2600.00,
      remark: '活动奖励',
      time: '2024-12-06 11:08:33'
    },
    {
      id: 'AC005',
      username: actionSheetUser?.username || '张三',
      orderNo: 'ORD20241205001',
      changeType: '提现失败返还',
      assetType: '余额',
      beforeBalance: 1300.00,
      changeAmount: 300.00,
      afterBalance: 1600.00,
      remark: '提现失败退款',
      time: '2024-12-05 16:45:18'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800 mb-2">用户管理</h1>
        <p className="text-gray-600">查看和管理用户账户信息</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* 搜索栏 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索用户名或 ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddMemberModal(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                添加会员
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterColumns(!showFilterColumns)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  筛选
                </button>
                
                {/* 筛选下拉框 */}
                {showFilterColumns && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-800">显示列</h3>
                        <button 
                          onClick={() => setShowFilterColumns(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.id}
                            onChange={() => toggleColumn('id')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">ID</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.username}
                            onChange={() => toggleColumn('username')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">用户名</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.balance}
                            onChange={() => toggleColumn('balance')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">余额</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.frozenBalance}
                            onChange={() => toggleColumn('frozenBalance')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">冻结余额</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.vipLevel}
                            onChange={() => toggleColumn('vipLevel')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">VIP等级</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.parentAccount}
                            onChange={() => toggleColumn('parentAccount')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">上级账号</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.creditScore}
                            onChange={() => toggleColumn('creditScore')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">信誉分</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.inviteCode}
                            onChange={() => toggleColumn('inviteCode')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">邀请码</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.ip}
                            onChange={() => toggleColumn('ip')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">IP</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.isFake}
                            onChange={() => toggleColumn('isFake')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">是否假人</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.isDisabled}
                            onChange={() => toggleColumn('isDisabled')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">禁用状态</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.tradeStatus}
                            onChange={() => toggleColumn('tradeStatus')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">交易状态</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.withdrawStatus}
                            onChange={() => toggleColumn('withdrawStatus')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">提现状态</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.lastLogin}
                            onChange={() => toggleColumn('lastLogin')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">最近登录</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={visibleColumns.registerTime}
                            onChange={() => toggleColumn('registerTime')}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">注册时间</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
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
          <div className="flex flex-row items-center gap-3 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">注册时间：</span>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <input
                type="date"
                value={registerStartDate}
                onChange={(e) => setRegisterStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="date"
                value={registerEndDate}
                onChange={(e) => setRegisterEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              {(registerStartDate || registerEndDate) && (
                <button
                  onClick={handleClearDateFilter}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 text-gray-600"
                >
                  <X className="w-4 h-4" />
                  清除
                </button>
              )}
            </div>
            {(registerStartDate || registerEndDate) && (
              <div className="text-sm text-gray-600 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                共找到 {filteredUsers.length} 个会员
              </div>
            )}
          </div>
        </div>

        {/* 用户表格 - 横向滚动 */}
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.username && <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">用户名</th>}
                {visibleColumns.id && <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">用户ID</th>}
                {visibleColumns.balance && <th className="text-right py-4 px-4 text-gray-700 whitespace-nowrap">余额</th>}
                {visibleColumns.frozenBalance && <th className="text-right py-4 px-4 text-gray-700 whitespace-nowrap">冻结余额</th>}
                {visibleColumns.vipLevel && <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">VIP等级</th>}
                {visibleColumns.parentAccount && <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">上级账号</th>}
                {visibleColumns.creditScore && <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">信誉分</th>}
                {visibleColumns.inviteCode && <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">邀请码</th>}
                {visibleColumns.ip && <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">IP地址</th>}
                {visibleColumns.isFake && <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">假人</th>}
                {visibleColumns.isDisabled && <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">禁用状态</th>}
                {visibleColumns.tradeStatus && <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">交易状态</th>}
                {visibleColumns.withdrawStatus && <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap">提现状态</th>}
                {visibleColumns.lastLogin && <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">最近登录</th>}
                {visibleColumns.registerTime && <th className="text-left py-4 px-4 text-gray-700 whitespace-nowrap">注册时间</th>}
                <th className="text-center py-4 px-4 text-gray-700 whitespace-nowrap sticky right-0 bg-gray-50 z-10">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                  {visibleColumns.username && (
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                          {user.avatar}
                        </div>
                        <span className="text-gray-800">{user.username}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.id && (
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{user.id}</td>
                  )}
                  {visibleColumns.balance && (
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <span className="text-gray-800">¥{user.balance.toFixed(2)}</span>
                    </td>
                  )}
                  {visibleColumns.frozenBalance && (
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <span className={user.frozenBalance > 0 ? 'text-orange-600' : 'text-gray-600'}>
                        ¥{user.frozenBalance.toFixed(2)}
                      </span>
                    </td>
                  )}
                  {visibleColumns.vipLevel && (
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs">
                        VIP{user.vipLevel}
                      </span>
                    </td>
                  )}
                  {visibleColumns.parentAccount && (
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{user.parentAccount}</td>
                  )}
                  {visibleColumns.creditScore && (
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        user.creditScore >= 90 ? 'bg-green-100 text-green-700' :
                        user.creditScore >= 70 ? 'bg-blue-100 text-blue-700' :
                        user.creditScore >= 50 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {user.creditScore}
                      </span>
                    </td>
                  )}
                  {visibleColumns.inviteCode && (
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{user.inviteCode}</td>
                  )}
                  {visibleColumns.ip && (
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{user.ip}</td>
                  )}
                  {visibleColumns.isFake && (
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isFake ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.isFake ? '是' : '否'}
                      </span>
                    </td>
                  )}
                  {visibleColumns.isDisabled && (
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isDisabled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {user.isDisabled ? '已禁用' : '正常'}
                      </span>
                    </td>
                  )}
                  {visibleColumns.tradeStatus && (
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.tradeStatus === 'normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.tradeStatus === 'normal' ? '正常' : '受限'}
                      </span>
                    </td>
                  )}
                  {visibleColumns.withdrawStatus && (
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.withdrawStatus === 'normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.withdrawStatus === 'normal' ? '正常' : '受限'}
                      </span>
                    </td>
                  )}
                  {visibleColumns.lastLogin && (
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{user.lastLogin}</td>
                  )}
                  {visibleColumns.registerTime && (
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{user.registerTime}</td>
                  )}
                  <td className="py-4 px-4 whitespace-nowrap sticky right-0 bg-white">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleBalanceAdjust(user.id)}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                        title="上下分"
                      >
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFreeze(user.id, user.frozenBalance > 0)}
                        className={`px-2 py-1 text-xs rounded hover:opacity-80 transition-colors ${
                          user.frozenBalance > 0 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                        }`}
                        title={user.frozenBalance > 0 ? '解冻' : '冻结'}
                      >
                        {user.frozenBalance > 0 ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={() => handleEditMember(user.id)}
                        className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
                        title="编辑会员"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleActionSheet(user)}
                        className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
                        title="更多操作"
                      >
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页器 */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            显示 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} 条，
            共 {filteredUsers.length} 条记录
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

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 mb-2">总用户数</p>
          <p className="text-gray-900 mb-1">{users.length}</p>
          <p className="text-green-600 text-sm">+15 本周新增</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 mb-2">正常用户</p>
          <p className="text-gray-900 mb-1">{users.filter(u => !u.isDisabled).length}</p>
          <p className="text-blue-600 text-sm">{((users.filter(u => !u.isDisabled).length / users.length) * 100).toFixed(1)}% 占比</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 mb-2">总账户余额</p>
          <p className="text-gray-900 mb-1">¥{users.reduce((sum, u) => sum + u.balance, 0).toFixed(2)}</p>
          <p className="text-purple-600 text-sm">平台资金池</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 mb-2">冻总额</p>
          <p className="text-gray-900 mb-1">¥{users.reduce((sum, u) => sum + u.frozenBalance, 0).toFixed(2)}</p>
          <p className="text-orange-600 text-sm">风控冻结</p>
        </div>
      </div>

      {/* 余额调整模态框 */}
      {showBalanceModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">用户余额调整</h2>
              <button
                onClick={() => {
                  setShowBalanceModal(false);
                  setAmount('');
                  setOperationType('add');
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 space-y-5">
              {/* 会员账号 */}
              <div>
                <label className="block text-gray-700 mb-2">会员账号</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <p className="text-gray-800">{selectedUser.username}</p>
                    <p className="text-gray-500 text-sm">{selectedUser.id}</p>
                  </div>
                </div>
              </div>

              {/* 当前余额 */}
              <div>
                <label className="block text-gray-700 mb-2">当前余额</label>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700">¥{selectedUser.balance.toFixed(2)}</p>
                </div>
              </div>

              {/* 操作类型 */}
              <div>
                <label className="block text-gray-700 mb-2">操作类型</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setOperationType('add')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      operationType === 'add'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-md'
                        : 'border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    <span>加款</span>
                  </button>
                  <button
                    onClick={() => setOperationType('subtract')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      operationType === 'subtract'
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 border-red-500 text-white shadow-md'
                        : 'border-gray-300 text-gray-700 hover:border-red-400 hover:bg-red-50'
                    }`}
                  >
                    <Minus className="w-5 h-5" />
                    <span>扣款</span>
                  </button>
                </div>
              </div>

              {/* 金额输入 */}
              <div>
                <label className="block text-gray-700 mb-2">
                  {operationType === 'add' ? '加款' : '扣款'}金额
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="请输入金额"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* 预计余额 */}
              {amount && !isNaN(parseFloat(amount)) && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">预计余额：</span>
                    <span className={`text-purple-700 ${
                      operationType === 'add' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      ¥{(operationType === 'add' 
                        ? selectedUser.balance + parseFloat(amount) 
                        : selectedUser.balance - parseFloat(amount)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowBalanceModal(false);
                  setAmount('');
                  setOperationType('add');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleBalanceChange}
                disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认调整
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 冻结/解冻模态框 */}
      {showFreezeModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">{freezeType === 'freeze' ? '冻结用户' : '解冻用户'}</h2>
              <button
                onClick={() => {
                  setShowFreezeModal(false);
                  setFreezeAmount('');
                  setFreezeType('freeze');
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态内容 */}
            <div className="p-6 space-y-5">
              {/* 会员账号 */}
              <div>
                <label className="block text-gray-700 mb-2">会员账号</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <p className="text-gray-800">{selectedUser.username}</p>
                    <p className="text-gray-500 text-sm">{selectedUser.id}</p>
                  </div>
                </div>
              </div>

              {/* 当前余额 */}
              <div>
                <label className="block text-gray-700 mb-2">当前余额</label>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700">¥{selectedUser.balance.toFixed(2)}</p>
                </div>
              </div>

              {/* 操作类型 */}
              <div>
                <label className="block text-gray-700 mb-2">操作类型</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFreezeType('freeze')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      freezeType === 'freeze'
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 border-red-500 text-white shadow-md'
                        : 'border-gray-300 text-gray-700 hover:border-red-400 hover:bg-red-50'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    <span>冻结</span>
                  </button>
                  <button
                    onClick={() => setFreezeType('unfreeze')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      freezeType === 'unfreeze'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-md'
                        : 'border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    <Unlock className="w-5 h-5" />
                    <span>解冻</span>
                  </button>
                </div>
              </div>

              {/* 金额输入 */}
              <div>
                <label className="block text-gray-700 mb-2">
                  {freezeType === 'freeze' ? '冻结' : '解冻'}金额
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                  <input
                    type="number"
                    value={freezeAmount}
                    onChange={(e) => setFreezeAmount(e.target.value)}
                    placeholder="请输入金额"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* 预计余额 */}
              {freezeAmount && !isNaN(parseFloat(freezeAmount)) && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">预计余额：</span>
                    <span className={`text-purple-700 ${
                      freezeType === 'freeze' ? 'text-red-700' : 'text-green-700'
                    }`}>
                      ¥{(freezeType === 'freeze' 
                        ? selectedUser.balance + parseFloat(freezeAmount) 
                        : selectedUser.balance - parseFloat(freezeAmount)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowFreezeModal(false);
                  setFreezeAmount('');
                  setFreezeType('freeze');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleFreezeChange}
                disabled={!freezeAmount || isNaN(parseFloat(freezeAmount)) || parseFloat(freezeAmount) <= 0}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认调整
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑会员模态框 */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">编辑会员信息</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditForm({
                    phone: '',
                    vipLevel: 0,
                    loginPassword: '',
                    tradePassword: '',
                    isFake: false,
                    tradeStatus: 'normal' as 'normal' | 'restricted',
                    withdrawStatus: 'normal' as 'normal' | 'restricted',
                    isDisabled: false,
                  });
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框内容 - 可滚动 */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-5">
                {/* 会员账号 */}
                <div>
                  <label className="block text-gray-700 mb-2">会员账号</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <p className="text-gray-800">{selectedUser.username}</p>
                      <p className="text-gray-500 text-sm">{selectedUser.id}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-blue-700">¥{selectedUser.balance.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs text-right">当前余额</p>
                    </div>
                  </div>
                </div>

                {/* 两列布局 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 手机号 */}
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">手机号</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="请输入手机号"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* VIP等级 */}
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">VIP等级</label>
                    <select
                      value={editForm.vipLevel}
                      onChange={(e) => setEditForm({ ...editForm, vipLevel: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                    >
                      <option value={0}>VIP 0</option>
                      <option value={1}>VIP 1</option>
                      <option value={2}>VIP 2</option>
                      <option value={3}>VIP 3</option>
                      <option value={4}>VIP 4</option>
                      <option value={5}>VIP 5</option>
                      <option value={6}>VIP 6</option>
                      <option value={7}>VIP 7</option>
                      <option value={8}>VIP 8</option>
                      <option value={9}>VIP 9</option>
                    </select>
                  </div>

                  {/* 登录密码 */}
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">登录密码</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={editForm.loginPassword}
                        onChange={(e) => setEditForm({ ...editForm, loginPassword: e.target.value })}
                        placeholder="留空则不修改"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* 交易密码 */}
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">交易密码</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={editForm.tradePassword}
                        onChange={(e) => setEditForm({ ...editForm, tradePassword: e.target.value })}
                        placeholder="留空则不修改"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* 状态设置区域 */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="text-gray-700 text-sm mb-3">状态设置</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* 是否假人 */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">用户类型</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditForm({ ...editForm, isFake: false })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            !editForm.isFake
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-blue-400'
                          }`}
                        >
                          <UserIcon className="w-4 h-4 mx-auto mb-1" />
                          <span className="block text-xs">真实用户</span>
                        </button>
                        <button
                          onClick={() => setEditForm({ ...editForm, isFake: true })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            editForm.isFake
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-orange-400'
                          }`}
                        >
                          <UserIcon className="w-4 h-4 mx-auto mb-1" />
                          <span className="block text-xs">假人</span>
                        </button>
                      </div>
                    </div>

                    {/* 禁用状态 */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">账户状态</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditForm({ ...editForm, isDisabled: false })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            !editForm.isDisabled
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-green-400'
                          }`}
                        >
                          <Unlock className="w-4 h-4 mx-auto mb-1" />
                          <span className="block text-xs">正常</span>
                        </button>
                        <button
                          onClick={() => setEditForm({ ...editForm, isDisabled: true })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            editForm.isDisabled
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-red-400'
                          }`}
                        >
                          <Lock className="w-4 h-4 mx-auto mb-1" />
                          <span className="block text-xs">禁用</span>
                        </button>
                      </div>
                    </div>

                    {/* 交易状态 */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">交易权限</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditForm({ ...editForm, tradeStatus: 'normal' })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            editForm.tradeStatus === 'normal'
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-green-400'
                          }`}
                        >
                          <span className="block text-xs">启用</span>
                        </button>
                        <button
                          onClick={() => setEditForm({ ...editForm, tradeStatus: 'restricted' })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            editForm.tradeStatus === 'restricted'
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-red-400'
                          }`}
                        >
                          <span className="block text-xs">禁用</span>
                        </button>
                      </div>
                    </div>

                    {/* 提现状态 */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">提现权限</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditForm({ ...editForm, withdrawStatus: 'normal' })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            editForm.withdrawStatus === 'normal'
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-green-400'
                          }`}
                        >
                          <span className="block text-xs">启用</span>
                        </button>
                        <button
                          onClick={() => setEditForm({ ...editForm, withdrawStatus: 'restricted' })}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                            editForm.withdrawStatus === 'restricted'
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-red-400'
                          }`}
                        >
                          <span className="block text-xs">禁用</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditForm({
                    phone: '',
                    vipLevel: 0,
                    loginPassword: '',
                    tradePassword: '',
                    isFake: false,
                    tradeStatus: 'normal' as 'normal' | 'restricted',
                    withdrawStatus: 'normal' as 'normal' | 'restricted',
                    isDisabled: false,
                  });
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleEditChange}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加会员模态框 */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">添加会员</h2>
              <button
                onClick={() => {
                  setShowAddMemberModal(false);
                  setAddMemberForm({
                    username: '',
                    inviteCode: '',
                    phone: '',
                    vipLevel: 0,
                    loginPassword: '',
                    tradePassword: '',
                    isFake: false,
                    tradeStatus: 'normal',
                    withdrawStatus: 'normal',
                    isDisabled: false,
                  });
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框内容 - 可滚动 */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-5">
                {/* 两列布局 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 会员账号 - 必填 */}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      <span className="text-red-500 mr-1">*</span>
                      会员账号
                    </label>
                    <input
                      type="text"
                      value={addMemberForm.username}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, username: e.target.value })}
                      placeholder="请输入会员账号"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* 上级邀请码 - 必填 */}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      <span className="text-red-500 mr-1">*</span>
                      上级邀请码
                    </label>
                    <input
                      type="text"
                      value={addMemberForm.inviteCode}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, inviteCode: e.target.value })}
                      placeholder="请输入上级邀请码"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* 手机号 */}
                  <div>
                    <label className="block text-gray-700 mb-2">手机号</label>
                    <input
                      type="text"
                      value={addMemberForm.phone}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, phone: e.target.value })}
                      placeholder="请输入手机号"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* 会员等级 */}
                  <div>
                    <label className="block text-gray-700 mb-2">会员等级</label>
                    <select
                      value={addMemberForm.vipLevel}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, vipLevel: parseInt(e.target.value) })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                    >
                      <option value="">请选择会员等级</option>
                      <option value={0}>VIP 0</option>
                      <option value={1}>VIP 1</option>
                      <option value={2}>VIP 2</option>
                      <option value={3}>VIP 3</option>
                      <option value={4}>VIP 4</option>
                      <option value={5}>VIP 5</option>
                      <option value={6}>VIP 6</option>
                      <option value={7}>VIP 7</option>
                      <option value={8}>VIP 8</option>
                      <option value={9}>VIP 9</option>
                    </select>
                  </div>

                  {/* 登录密码 */}
                  <div>
                    <label className="block text-gray-700 mb-2">登录密码</label>
                    <input
                      type="password"
                      value={addMemberForm.loginPassword}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, loginPassword: e.target.value })}
                      placeholder="请输入登录密码"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* 交易密码 */}
                  <div>
                    <label className="block text-gray-700 mb-2">交易密码</label>
                    <input
                      type="password"
                      value={addMemberForm.tradePassword}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, tradePassword: e.target.value })}
                      placeholder="请输入交易密码"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* 状态设置区域 */}
                <div className="bg-gray-50 rounded-lg p-5 space-y-5">
                  {/* 是否假人 */}
                  <div>
                    <label className="block text-gray-700 mb-3">
                      <span className="text-red-500 mr-1">*</span>
                      是否假人
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, isFake: false })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          !addMemberForm.isFake
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>用户</span>
                      </button>
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, isFake: true })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          addMemberForm.isFake
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:bg-orange-50'
                        }`}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>假人</span>
                      </button>
                    </div>
                  </div>

                  {/* 交易状态 */}
                  <div>
                    <label className="block text-gray-700 mb-3">
                      <span className="text-red-500 mr-1">*</span>
                      交易状态
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, tradeStatus: 'normal' })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          addMemberForm.tradeStatus === 'normal'
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        <span>启用</span>
                      </button>
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, tradeStatus: 'restricted' })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          addMemberForm.tradeStatus === 'restricted'
                            ? 'bg-gray-500 border-gray-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <span>禁用</span>
                      </button>
                    </div>
                  </div>

                  {/* 提现状态 */}
                  <div>
                    <label className="block text-gray-700 mb-3">
                      <span className="text-red-500 mr-1">*</span>
                      提现状态
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, withdrawStatus: 'normal' })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          addMemberForm.withdrawStatus === 'normal'
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <span>启用</span>
                      </button>
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, withdrawStatus: 'restricted' })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          addMemberForm.withdrawStatus === 'restricted'
                            ? 'bg-red-500 border-red-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-red-400 hover:bg-red-50'
                        }`}
                      >
                        <span>禁用</span>
                      </button>
                    </div>
                  </div>

                  {/* 禁用状态 */}
                  <div>
                    <label className="block text-gray-700 mb-3">
                      <span className="text-red-500 mr-1">*</span>
                      禁用状态
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, isDisabled: false })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          !addMemberForm.isDisabled
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        <span>正常</span>
                      </button>
                      <button
                        onClick={() => setAddMemberForm({ ...addMemberForm, isDisabled: true })}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          addMemberForm.isDisabled
                            ? 'bg-gray-500 border-gray-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <span>禁用</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddMemberModal(false);
                  setAddMemberForm({
                    username: '',
                    inviteCode: '',
                    phone: '',
                    vipLevel: 0,
                    loginPassword: '',
                    tradePassword: '',
                    isFake: false,
                    tradeStatus: 'normal',
                    withdrawStatus: 'normal',
                    isDisabled: false,
                  });
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddMember}
                disabled={!addMemberForm.username || !addMemberForm.inviteCode}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底���动作面板 (Action Sheet) */}
      {showActionSheet && actionSheetUser && (
        <div className="fixed inset-0 z-50">
          {/* 半透明遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowActionSheet(false)}
          />
          
          {/* 底部面板 */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform">
            {/* 顶部拖拽指示器 */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* 用户信息头部 */}
            <div className="px-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                  {actionSheetUser.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{actionSheetUser.username}</p>
                  <p className="text-gray-500 text-sm">{actionSheetUser.id} · 余额 ¥{actionSheetUser.balance.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setShowActionSheet(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 操作选项列表 */}
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="p-4 space-y-1">
                <button 
                  onClick={() => {
                    setShowActionSheet(false);
                    setShowChangeLoginPasswordModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-blue-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">修改登录密码</p>
                    <p className="text-gray-500 text-xs">重置用户登录凭证</p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    setShowActionSheet(false);
                    setShowChangeTradePasswordModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-blue-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">修改交易密码</p>
                    <p className="text-gray-500 text-xs">重置交易安全密码</p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    setShowActionSheet(false);
                    setShowAccountChangeModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors">
                    <ArrowUpDown className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">账变信息</p>
                    <p className="text-gray-500 text-xs">查看账户变动记录</p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    setShowActionSheet(false);
                    setShowWithdrawAccountModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-green-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">修改提现账户</p>
                    <p className="text-gray-500 text-xs">更新银行卡或钱包信息</p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    setCreditScore(actionSheetUser?.creditScore || 0);
                    setShowActionSheet(false);
                    setShowCreditScoreModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-yellow-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-yellow-50 group-hover:bg-yellow-100 rounded-full flex items-center justify-center transition-colors">
                    <span className="text-yellow-600 text-xl">★</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">修改信誉分</p>
                    <p className="text-gray-500 text-xs">调整用户信用评分</p>
                  </div>
                </button>

                <button 
                  onClick={() => showConfirm(
                    '系统提示',
                    `确定刷新 ${actionSheetUser?.username} IP归属地吗？`,
                    handleRefreshIP
                  )}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-indigo-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-indigo-50 group-hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors">
                    <RefreshCw className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">刷新IP归属</p>
                    <p className="text-gray-500 text-xs">重新获取地理位置信息</p>
                  </div>
                </button>

                <div className="border-t border-gray-200 my-2" />

                <button 
                  onClick={() => showConfirm(
                    '系统提示',
                    `确定${actionSheetUser?.isDisabled ? '启用' : '禁用'} ${actionSheetUser?.username} 账号吗？`,
                    handleToggleDisabled
                  )}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left rounded-xl transition-colors group ${
                    actionSheetUser?.isDisabled 
                      ? 'bg-red-100 hover:bg-red-200' 
                      : 'hover:bg-red-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    actionSheetUser?.isDisabled
                      ? 'bg-red-200 group-hover:bg-red-300'
                      : 'bg-red-50 group-hover:bg-red-100'
                  }`}>
                    <Lock className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">账号禁用</p>
                    <p className="text-gray-500 text-xs">暂停用户所有功能</p>
                  </div>
                </button>

                <button 
                  onClick={() => showConfirm(
                    '系统提示',
                    `确定${actionSheetUser?.tradeStatus === 'restricted' ? '启用' : '禁止'}交易 ${actionSheetUser?.username} 账号吗？`,
                    handleToggleTrade
                  )}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left rounded-xl transition-colors group ${
                    actionSheetUser?.tradeStatus === 'restricted'
                      ? 'bg-red-100 hover:bg-red-200' 
                      : 'hover:bg-red-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    actionSheetUser?.tradeStatus === 'restricted'
                      ? 'bg-red-200 group-hover:bg-red-300'
                      : 'bg-red-50 group-hover:bg-red-100'
                  }`}>
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">禁止交易</p>
                    <p className="text-gray-500 text-xs">限制用户交易功能</p>
                  </div>
                </button>

                <button 
                  onClick={() => showConfirm(
                    '系统提示',
                    `确定${actionSheetUser?.withdrawStatus === 'restricted' ? '启用' : '禁止'}提现 ${actionSheetUser?.username} 账号吗？`,
                    handleToggleWithdraw
                  )}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left rounded-xl transition-colors group ${
                    actionSheetUser?.withdrawStatus === 'restricted'
                      ? 'bg-red-100 hover:bg-red-200' 
                      : 'hover:bg-red-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    actionSheetUser?.withdrawStatus === 'restricted'
                      ? 'bg-red-200 group-hover:bg-red-300'
                      : 'bg-red-50 group-hover:bg-red-100'
                  }`}>
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">禁止提现</p>
                    <p className="text-gray-500 text-xs">限制用户提现功能</p>
                  </div>
                </button>

                <button 
                  onClick={() => showConfirm(
                    '系统提示',
                    `确定设置${actionSheetUser?.isFake ? '为真实用户' : '为假人'} ${actionSheetUser?.username} 账号吗？`,
                    handleToggleFake
                  )}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left rounded-xl transition-colors group ${
                    actionSheetUser?.isFake
                      ? 'bg-orange-100 hover:bg-orange-200' 
                      : 'hover:bg-orange-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    actionSheetUser?.isFake
                      ? 'bg-orange-200 group-hover:bg-orange-300'
                      : 'bg-orange-50 group-hover:bg-orange-100'
                  }`}>
                    <UserIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">设为假人</p>
                    <p className="text-gray-500 text-xs">标记为测试账户</p>
                  </div>
                </button>
              </div>
            </div>

            {/* 底部安全区域 */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* 修改登录密码模态框 */}
      {showChangeLoginPasswordModal && actionSheetUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">修改登录密码</h2>
              <button
                onClick={() => {
                  setShowChangeLoginPasswordModal(false);
                  setNewLoginPassword('');
                  setConfirmLoginPassword('');
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 space-y-5">
              {/* 会员信息 */}
              <div>
                <label className="block text-gray-700 mb-2">会员账号</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {actionSheetUser.avatar}
                  </div>
                  <div>
                    <p className="text-gray-800">{actionSheetUser.username}</p>
                    <p className="text-gray-500 text-sm">{actionSheetUser.id}</p>
                  </div>
                </div>
              </div>

              {/* 新密码 */}
              <div>
                <label className="block text-gray-700 mb-2">新密码</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={newLoginPassword}
                    onChange={(e) => setNewLoginPassword(e.target.value)}
                    placeholder="请输入新密码"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* 确认密码 */}
              <div>
                <label className="block text-gray-700 mb-2">确认密码</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={confirmLoginPassword}
                    onChange={(e) => setConfirmLoginPassword(e.target.value)}
                    placeholder="请再次输入新密码"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowChangeLoginPasswordModal(false);
                  setNewLoginPassword('');
                  setConfirmLoginPassword('');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleChangeLoginPassword}
                disabled={!newLoginPassword || !confirmLoginPassword}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 修改交易密码模态框 */}
      {showChangeTradePasswordModal && actionSheetUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">修改交易密码</h2>
              <button
                onClick={() => {
                  setShowChangeTradePasswordModal(false);
                  setNewTradePassword('');
                  setConfirmTradePassword('');
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 space-y-5">
              {/* 会员信息 */}
              <div>
                <label className="block text-gray-700 mb-2">会员账号</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {actionSheetUser.avatar}
                  </div>
                  <div>
                    <p className="text-gray-800">{actionSheetUser.username}</p>
                    <p className="text-gray-500 text-sm">{actionSheetUser.id}</p>
                  </div>
                </div>
              </div>

              {/* 新密码 */}
              <div>
                <label className="block text-gray-700 mb-2">新交易密码</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={newTradePassword}
                    onChange={(e) => setNewTradePassword(e.target.value)}
                    placeholder="请输入新交易密码"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* 确认密码 */}
              <div>
                <label className="block text-gray-700 mb-2">确认交易密码</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={confirmTradePassword}
                    onChange={(e) => setConfirmTradePassword(e.target.value)}
                    placeholder="请再次输入新交易密码"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowChangeTradePasswordModal(false);
                  setNewTradePassword('');
                  setConfirmTradePassword('');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleChangeTradePassword}
                disabled={!newTradePassword || !confirmTradePassword}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 账变信息模态框 */}
      {showAccountChangeModal && actionSheetUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-gray-800 mb-1">账变信息</h2>
                <p className="text-gray-600 text-sm">{actionSheetUser.username} ({actionSheetUser.id})</p>
              </div>
              <button
                onClick={() => setShowAccountChangeModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 筛选条件 */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-4 gap-4">
                {/* 账变类型 */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">账变类型</label>
                  <select
                    value={accountChangeType}
                    onChange={(e) => setAccountChangeType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">全部</option>
                    <option value="提现申请">提现申请</option>
                    <option value="提现">提现</option>
                    <option value="提现失败返还">提现失败返还</option>
                    <option value="充值">充值</option>
                    <option value="后台上分">后台上分</option>
                    <option value="后台冻结">后台冻结</option>
                    <option value="后台下分">后台下分</option>
                    <option value="后台解冻">后台解冻</option>
                  </select>
                </div>

                {/* 资产类型 */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">资产类型</label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">全部</option>
                    <option value="余额">余额</option>
                    <option value="冻结金额">冻结金额</option>
                  </select>
                </div>

                {/* 开始时间 */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">开始时间</label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* 结束时间 */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">结束时间</label>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* 按钮组 */}
              <div className="flex gap-3 mt-4">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                  查询
                </button>
                <button 
                  onClick={handleResetAccountChangeFilters}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  重置
                </button>
              </div>
            </div>

            {/* 表格内容 - 可滚动 */}
            <div className="flex-1 overflow-auto p-6">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-700 text-sm whitespace-nowrap">ID</th>
                    <th className="text-left py-3 px-4 text-gray-700 text-sm whitespace-nowrap">会员账号</th>
                    <th className="text-left py-3 px-4 text-gray-700 text-sm whitespace-nowrap">订单号</th>
                    <th className="text-left py-3 px-4 text-gray-700 text-sm whitespace-nowrap">账变类型</th>
                    <th className="text-left py-3 px-4 text-gray-700 text-sm whitespace-nowrap">资产类型</th>
                    <th className="text-right py-3 px-4 text-gray-700 text-sm whitespace-nowrap">变动前余额</th>
                    <th className="text-right py-3 px-4 text-gray-700 text-sm whitespace-nowrap">变动金额</th>
                    <th className="text-right py-3 px-4 text-gray-700 text-sm whitespace-nowrap">变动后余额</th>
                    <th className="text-left py-3 px-4 text-gray-700 text-sm whitespace-nowrap">备注</th>
                    <th className="text-left py-3 px-4 text-gray-700 text-sm whitespace-nowrap">时间</th>
                  </tr>
                </thead>
                <tbody>
                  {accountChanges.map((change) => (
                    <tr key={change.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600 text-sm whitespace-nowrap">{change.id}</td>
                      <td className="py-3 px-4 text-gray-800 text-sm whitespace-nowrap">{change.username}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm whitespace-nowrap">{change.orderNo}</td>
                      <td className="py-3 px-4 text-sm whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          change.changeType.includes('充值') || change.changeType.includes('上分') || change.changeType.includes('返还') 
                            ? 'bg-green-100 text-green-700'
                            : change.changeType.includes('提现') || change.changeType.includes('下分')
                            ? 'bg-red-100 text-red-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {change.changeType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          change.assetType === '余额' 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {change.assetType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-800 text-sm whitespace-nowrap">
                        ¥{change.beforeBalance.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm whitespace-nowrap">
                        <span className={change.changeAmount >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {change.changeAmount >= 0 ? '+' : ''}¥{change.changeAmount.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-800 text-sm whitespace-nowrap">
                        ¥{change.afterBalance.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm whitespace-nowrap">{change.remark}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm whitespace-nowrap">{change.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 模态框底部 */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <p className="text-gray-600 text-sm">
                共 {accountChanges.length} 条记录
              </p>
              <button
                onClick={() => setShowAccountChangeModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 修改提现账户模态框 */}
      {showWithdrawAccountModal && actionSheetUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">修改提现账户</h2>
              <button
                onClick={() => {
                  setShowWithdrawAccountModal(false);
                  setWithdrawAccount({ realName: '', bankCard: '', bankName: '' });
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 space-y-5">
              {/* 会员信息 */}
              <div>
                <label className="block text-gray-700 mb-2">会员账号</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {actionSheetUser.avatar}
                  </div>
                  <div>
                    <p className="text-gray-800">{actionSheetUser.username}</p>
                    <p className="text-gray-500 text-sm">{actionSheetUser.id}</p>
                  </div>
                </div>
              </div>

              {/* 真实姓名 */}
              <div>
                <label className="block text-gray-700 mb-2">真实姓名</label>
                <input
                  type="text"
                  value={withdrawAccount.realName}
                  onChange={(e) => setWithdrawAccount({ ...withdrawAccount, realName: e.target.value })}
                  placeholder="请输入真实姓名"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* 银行卡号 */}
              <div>
                <label className="block text-gray-700 mb-2">银行卡号</label>
                <input
                  type="text"
                  value={withdrawAccount.bankCard}
                  onChange={(e) => setWithdrawAccount({ ...withdrawAccount, bankCard: e.target.value })}
                  placeholder="请输入银行卡号"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* 银行名称 */}
              <div>
                <label className="block text-gray-700 mb-2">银行名称</label>
                <input
                  type="text"
                  value={withdrawAccount.bankName}
                  onChange={(e) => setWithdrawAccount({ ...withdrawAccount, bankName: e.target.value })}
                  placeholder="请输入银行名称"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowWithdrawAccountModal(false);
                  setWithdrawAccount({ realName: '', bankCard: '', bankName: '' });
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleUpdateWithdrawAccount}
                disabled={!withdrawAccount.realName || !withdrawAccount.bankCard || !withdrawAccount.bankName}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 修改信誉分模态框 */}
      {showCreditScoreModal && actionSheetUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-800">修改信誉分</h2>
              <button
                onClick={() => setShowCreditScoreModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 space-y-5">
              {/* 会员信息 */}
              <div>
                <label className="block text-gray-700 mb-2">会员账号</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {actionSheetUser.avatar}
                  </div>
                  <div>
                    <p className="text-gray-800">{actionSheetUser.username}</p>
                    <p className="text-gray-500 text-sm">{actionSheetUser.id}</p>
                  </div>
                </div>
              </div>

              {/* 当前信誉分 */}
              <div>
                <label className="block text-gray-700 mb-2">当前信誉分</label>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700">{actionSheetUser.creditScore} 分</p>
                </div>
              </div>

              {/* 新信誉分 - 滑块 */}
              <div>
                <label className="block text-gray-700 mb-2">新信誉分</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={creditScore}
                    onChange={(e) => setCreditScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    style={{
                      background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(147, 51, 234) ${creditScore}%, rgb(229, 231, 235) ${creditScore}%, rgb(229, 231, 235) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              {/* 数字输入框 */}
              <div>
                <label className="block text-gray-700 mb-2">精确值</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={creditScore}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 0 && val <= 100) {
                      setCreditScore(val);
                    }
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* 预览 */}
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">新信誉分：</span>
                  <span className={`text-xl ${
                    creditScore >= 90 ? 'text-green-600' :
                    creditScore >= 70 ? 'text-blue-600' :
                    creditScore >= 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {creditScore} 分
                  </span>
                </div>
              </div>
            </div>

            {/* 模态框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowCreditScoreModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleUpdateCreditScore}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 确认对话框 */}
      {showConfirmDialog && confirmDialogConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
            {/* 对话框头部 */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-800 text-center">{confirmDialogConfig.title}</h2>
            </div>

            {/* 对话框内容 */}
            <div className="p-6">
              <p className="text-gray-600 text-center">{confirmDialogConfig.message}</p>
            </div>

            {/* 对话框底部 */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  setConfirmDialogConfig(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  confirmDialogConfig.onConfirm();
                  setConfirmDialogConfig(null);
                }}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                确定
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