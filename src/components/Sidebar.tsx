import { useState } from 'react';
import { LayoutDashboard, Settings, FileText, ShoppingCart, Users, BarChart3, CreditCard, ChevronDown, ChevronRight, Shield, FileCheck, Activity } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: '仪表盘概览', icon: LayoutDashboard },
    { id: 'system-config', label: '系统配置中心', icon: Settings },
    { id: 'cms', label: '内容运营管理', icon: FileText },
    { id: 'orders', label: '订单管理', icon: ShoppingCart },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'auth-management', label: '认证管理', icon: Shield },
    { id: 'login-logs', label: '登录日志', icon: FileCheck },
    { id: 'operation-logs', label: '操作日志', icon: Activity },
  ];

  const transactionSubMenu = [
    { id: 'deposit-list', label: '充值列表' },
    { id: 'withdrawal-list', label: '提款列表' },
    { id: 'product-list', label: '商品列表' },
  ];

  const handleTransactionToggle = () => {
    setIsTransactionOpen(!isTransactionOpen);
  };

  const handleSubMenuClick = (subId: string) => {
    onNavigate(subId);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold">Admin Dashboard</h1>
            <p className="text-slate-400 text-xs">管理控制台</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-700/50'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* 交易管理菜单（带子菜单） */}
        <div className="space-y-1">
          <button
            onClick={handleTransactionToggle}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${(currentPage === 'deposit-list' || currentPage === 'withdrawal-list' || currentPage === 'product-list' || isTransactionOpen)
                ? 'bg-slate-700/50 text-white' 
                : 'text-slate-300 hover:bg-slate-700/50'
              }
            `}
          >
            <CreditCard className="w-5 h-5" />
            <span className="flex-1 text-left">交易管理</span>
            {isTransactionOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* 子菜单 */}
          {isTransactionOpen && (
            <div className="ml-4 space-y-1 border-l-2 border-slate-700 pl-2">
              {transactionSubMenu.map((subItem) => {
                const isSubActive = currentPage === subItem.id;
                return (
                  <button
                    key={subItem.id}
                    onClick={() => handleSubMenuClick(subItem.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm
                      ${isSubActive
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700/50'
                      }
                    `}
                  >
                    <span>{subItem.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span>管</span>
          </div>
          <div className="flex-1">
            <p className="text-sm">管理员</p>
            <p className="text-xs text-slate-400">admin@system.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}