import { FC, useState } from "react";
import { Button } from "./ui/button";
interface SideBarProps {
  onNavigate: (page: string) => void;
}
const Sidebar: FC<SideBarProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const onNavigateChange = (currentPage: string) => {
    onNavigate(currentPage);
    setCurrentPage(currentPage);
  }
  return (
    <nav className="bg-white border-b">
      <div className="px-6 py-3">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigateChange('dashboard')}
          >
            Tableau de bord
          </Button>
          <Button
            variant={currentPage === 'births' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigateChange('births')}
          >
            Actes de naissance
          </Button>
          <Button
            variant={currentPage === 'cin' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigateChange('cin')}
          >
            Vérification CIN
          </Button>
          <Button
            variant={currentPage === 'residence' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigateChange('residence')}
          >
            Certificats de résidence
          </Button>
          <Button
            variant={currentPage === 'print' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigateChange('print')}
          >
            File d'impression
          </Button>
          <Button
            variant={currentPage === 'employees' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigateChange('employees')}
          >
            Employés
          </Button>
          <Button
            variant={currentPage === 'history' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigateChange('history')}
          >
            Historique
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar;