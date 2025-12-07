import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { SystemConfig } from './components/SystemConfig';
import { CMS } from './components/CMS';
import { Orders } from './components/Orders';
import { Users } from './components/Users';
import { DepositList } from './components/DepositList';
import { WithdrawalList } from './components/WithdrawalList';
import { ProductList } from './components/ProductList';
import { AuthManagement } from './components/AuthManagement';
import { LoginLogs } from './components/LoginLogs';
import { OperationLogs } from './components/OperationLogs';
import { Login } from './components/Login';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 如果未登录，显示登录页面
  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={() => setIsLoggedIn(true)} />
        <Toaster position="top-right" richColors closeButton />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'system-config':
        return <SystemConfig />;
      case 'cms':
        return <CMS />;
      case 'orders':
        return <Orders />;
      case 'users':
        return <Users />;
      case 'deposit-list':
        return <DepositList />;
      case 'withdrawal-list':
        return <WithdrawalList />;
      case 'product-list':
        return <ProductList />;
      case 'auth-management':
        return <AuthManagement />;
      case 'login-logs':
        return <LoginLogs />;
      case 'operation-logs':
        return <OperationLogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" richColors closeButton />
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onLogout={() => setIsLoggedIn(false)} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}