import { useState } from 'react';
import { Menu, LogOut, Building2 } from 'lucide-react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { BirthCertificates } from './components/BirthCertificates';
import { CINVerification } from './components/CINVerification';
import { ResidenceCertificates } from './components/ResidenceCertificates';
import { PrintQueue } from './components/PrintQueue';
import { EmployeeManagement } from './components/EmployeeManagement';
import { AuditHistory } from './components/AuditHistory';
import { Button } from './components/ui/button';
import Sidebar from './components/SideBar';

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [printQueue, setPrintQueue] = useState<any[]>([]);

  const handleLogin = (employee: any) => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="font-semibold">Application Interne Commune</h1>
              <p className="text-sm text-gray-600">District de Madagascar</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-gray-600">{currentUser.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <Sidebar onNavigate={handleNavigate} />
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {renderPage()}
      </main>
    </div>
  );
}