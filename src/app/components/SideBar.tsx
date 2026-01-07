import { FC, useState } from "react";
import { Button } from "./ui/button";

interface SideBarProps {
  onNavigate: (page: string) => void;
}

const menuItems = [
  { key: "dashboard", label: "Tableau de bord" },
  { key: "births", label: "Actes de naissance" },
  { key: "cin", label: "Vérification CIN" },
  { key: "residence", label: "Certificats de résidence" },
  { key: "print", label: "File d'impression" },
  { key: "employees", label: "Employés" },
  { key: "history", label: "Historique" },
];

const Sidebar: FC<SideBarProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const onNavigateChange = (page: string) => {
    setCurrentPage(page);
    onNavigate(page);
  };

  return (
    <nav className="bg-white border-b h-full border-r-2 border-r-black w-54">
      <div className="px-6 py-3">
        <div className="flex flex-col gap-2">
          {menuItems.map((menuItem) => (
            <Button
              key={menuItem.key}
              variant={currentPage === menuItem.key ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigateChange(menuItem.key)}
              className="justify-normal"
            >
              {menuItem.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
