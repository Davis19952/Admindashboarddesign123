import { useState } from 'react';
import { Search, Bell, Settings, X, Shield, AlertCircle, UserPlus, DollarSign, ShoppingBag, CheckCircle, Moon, Sun, Globe, Lock, User, LogOut, Mail, Phone, Calendar, MapPin, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Notification {
  id: string;
  type: 'auth' | 'alert' | 'user' | 'transaction' | 'order';
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface TopBarProps {
  onLogout?: () => void;
}

export function TopBar({ onLogout }: TopBarProps = {}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'auth',
      title: '新的认证申请',
      message: '用户 "张三" 提交了身份认证申请，请及时审核',
      time: '5分钟前',
      unread: true,
    },
    {
      id: '2',
      type: 'alert',
      title: '系统警告',
      message: '检测到异常登录行为，IP: 192.168.1.100',
      time: '15分钟前',
      unread: true,
    },
    {
      id: '3',
      type: 'user',
      title: '新用户注册',
      message: '今日新增用户 15 人，较昨日增长 25%',
      time: '1小时前',
      unread: true,
    },
    {
      id: '4',
      type: 'transaction',
      title: '大额充值',
      message: '用户 "李四" 充值 ¥50,000，请关注资金流向',
      time: '2小时前',
      unread: false,
    },
    {
      id: '5',
      type: 'order',
      title: '订单异常',
      message: '订单 #20251207001 支付超时，已自动取消',
      time: '3小时前',
      unread: false,
    },
    {
      id: '6',
      type: 'auth',
      title: '认证审核',
      message: '用户 "王五" 的认证申请已通过',
      time: '5小时前',
      unread: false,
    },
  ]);

  const [profileData, setProfileData] = useState({
    name: '系统管理员',
    email: 'admin@system.com',
    phone: '+86 138 0000 0000',
    role: '超级管理员',
    department: '技术部',
    joinDate: '2024-01-15',
    location: '中国 · 北京',
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginNotifications: true,
  });

  const languages = [
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'auth':
        return <Shield className="w-5 h-5 text-purple-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'user':
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'transaction':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'order':
        return <ShoppingBag className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // 这里可以添加实际的主题切换逻辑
    console.log('深色模式:', !darkMode ? '开启' : '关闭');
  };

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setShowLanguageModal(false);
    setShowSettings(false);
    console.log('切换语言:', langCode);
  };

  const handleSecuritySave = () => {
    // 验证密码
    if (securityData.newPassword && securityData.newPassword !== securityData.confirmPassword) {
      alert('新密码与确认密码不匹配');
      return;
    }
    console.log('保存安全设置:', securityData);
    setShowSecurityModal(false);
    setShowSettings(false);
  };

  const handleProfileSave = () => {
    toast.loading('正在保存个人资料...', { id: 'save-profile' });
    
    setTimeout(() => {
      toast.success('个人资料已保存！', {
        id: 'save-profile',
        description: '您的个人信息已成功更新',
        duration: 3000,
      });
      console.log('保存个人资料:', profileData);
      setShowProfileModal(false);
      setShowSettings(false);
    }, 1000);
  };

  const handleLogout = () => {
    console.log('用户退出登录');
    setShowLogoutModal(false);
    setShowSettings(false);
    // 这里添加实际的退出逻辑
    if (onLogout) {
      onLogout();
    }
  };

  const getCurrentLanguageName = () => {
    return languages.find(lang => lang.code === selectedLanguage)?.name || '简体中文';
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative z-10">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索功能、订单、用户..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 通知按钮 */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowSettings(false);
              }}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* 通知下拉框 */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowNotifications(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 max-h-[600px] flex flex-col">
                  {/* 通知头部 */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-800">通知中心</h3>
                      <p className="text-sm text-gray-500">{unreadCount} 条未读消息</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-purple-600 hover:text-purple-700 px-2 py-1 rounded hover:bg-purple-50 transition-colors"
                        >
                          全部已读
                        </button>
                      )}
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* 通知列表 */}
                  <div className="flex-1 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Bell className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-gray-500">暂无通知</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 transition-colors relative group ${
                              notification.unread ? 'bg-purple-50/30' : ''
                            }`}
                          >
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded transition-all"
                              title="删除通知"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                            
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-gray-800 text-sm">{notification.title}</h4>
                                  {notification.unread && (
                                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                                <p className="text-gray-400 text-xs">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 通知底部 */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
                        查看全部通知
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* 设置按钮 */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowSettings(!showSettings);
                setShowNotifications(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* 设置下拉框 */}
            {showSettings && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowSettings(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-20">
                  {/* 设置头部 */}
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-gray-800">快捷设置</h3>
                    <p className="text-sm text-gray-500">系统偏好和账户管理</p>
                  </div>

                  {/* 设置选项 */}
                  <div className="p-2">
                    {/* 主题设置 */}
                    <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors mb-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            {darkMode ? (
                              <Moon className="w-4 h-4 text-white" />
                            ) : (
                              <Sun className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="text-gray-700 text-sm">深色模式</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={darkMode}
                            onChange={handleDarkModeToggle}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* 语言设置 */}
                    <button 
                      onClick={() => {
                        setShowLanguageModal(true);
                        setShowSettings(false);
                      }}
                      className="w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm">语言</p>
                        <p className="text-gray-400 text-xs">{getCurrentLanguageName()}</p>
                      </div>
                    </button>

                    {/* 安设置 */}
                    <button 
                      onClick={() => {
                        setShowSecurityModal(true);
                        setShowSettings(false);
                      }}
                      className="w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm">安全设置</p>
                        <p className="text-gray-400 text-xs">修改密码、双重认证</p>
                      </div>
                    </button>

                    <div className="my-2 border-t border-gray-200"></div>

                    {/* 个人资料 */}
                    <button 
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowSettings(false);
                      }}
                      className="w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm">个人资料</p>
                        <p className="text-gray-400 text-xs">查看和编辑资料</p>
                      </div>
                    </button>

                    <div className="my-2 border-t border-gray-200"></div>

                    {/* 退出登录 */}
                    <button 
                      onClick={() => {
                        setShowLogoutModal(true);
                        setShowSettings(false);
                      }}
                      className="w-full p-3 hover:bg-red-50 rounded-lg transition-colors text-left flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 bg-gray-100 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
                        <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors" />
                      </div>
                      <p className="text-gray-700 group-hover:text-red-600 text-sm transition-colors">退出登录</p>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 语言选择模态框 */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-gray-800">选择语言</h2>
                <p className="text-sm text-gray-500">切换系统显示语言</p>
              </div>
              <button 
                onClick={() => setShowLanguageModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                      selectedLanguage === lang.code
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-gray-800">{lang.name}</span>
                    </div>
                    {selectedLanguage === lang.code && (
                      <Check className="w-5 h-5 text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 安全设置模态框 */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-gray-800">安全设置</h2>
                <p className="text-sm text-gray-500">管理账户安全和隐私</p>
              </div>
              <button 
                onClick={() => setShowSecurityModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* 修改密码 */}
              <div>
                <h3 className="text-gray-800 mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                  修改密码
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">当前密码</label>
                    <input
                      type="password"
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="请输入当前密码"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">新密码</label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="请输入新密码"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">确认新密码</label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="请再次输入新密码"
                    />
                  </div>
                </div>
              </div>

              {/* 安全选项 */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 text-sm">双重认证</p>
                    <p className="text-gray-500 text-xs">增强账户安全性</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={securityData.twoFactorEnabled}
                      onChange={(e) => setSecurityData({...securityData, twoFactorEnabled: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 text-sm">登录通知</p>
                    <p className="text-gray-500 text-xs">新设备登录时通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={securityData.loginNotifications}
                      onChange={(e) => setSecurityData({...securityData, loginNotifications: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* 按钮 */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSecurityModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSecuritySave}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 个人资料模态框 */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-gray-800">个人资料</h2>
                <p className="text-sm text-gray-500">查看和编辑您的个人信息</p>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              {/* 头像 */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-xs">✏️</span>
                  </button>
                </div>
              </div>

              {/* 资料表单 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    姓名
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    邮箱
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    手机号
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    地区
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">角色</label>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">部门</label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    加入日期
                  </label>
                  <input
                    type="text"
                    value={profileData.joinDate}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              {/* 按钮 */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleProfileSave}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  保存资料
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 退出登录确认模态框 */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4">
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <LogOut className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-gray-800 mb-2">确认退出登录？</h2>
                <p className="text-gray-500 text-sm">退出后需要重新登录才能访问系统</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors"
                >
                  确认退出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}