import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { BirthCertificates } from './components/BirthCertificates';
import { CINVerification } from './components/CINVerification';
import { ResidenceCertificates } from './components/ResidenceCertificates';
import { PrintQueue } from './components/PrintQueue';
import { EmployeeManagement } from './components/EmployeeManagement';
import { AuditHistory } from './components/AuditHistory';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import { User } from '../data/typeData';

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>({ name: 'Admin User', role: 'admin', email: 'michaelnadrasana@gmail.com', id: 1 });
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [printQueue, setPrintQueue] = useState<any[]>([]);

  const handleLogin = (employee: User) => {
    setCurrentUser(employee);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  }
  const handleAddToPrintQueue = (item: any) => {
    setPrintQueue([...printQueue, item]);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'births':
        return <BirthCertificates currentUser={currentUser} onAddToPrintQueue={handleAddToPrintQueue} />;
      case 'cin':
        return <CINVerification currentUser={currentUser} />;
      case 'residence':
        return <ResidenceCertificates currentUser={currentUser} onAddToPrintQueue={handleAddToPrintQueue} />;
      case 'print':
        return <PrintQueue printQueue={printQueue} />;
      case 'employees':
        return <EmployeeManagement />;
      case 'history':
        return <AuditHistory />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <div className="flex h-full">
        <Sidebar onNavigate={handleNavigate} />
        {/* Main Content */}
        <main className="container px-6 py-8 flex-1 max-h-[85vh] overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;