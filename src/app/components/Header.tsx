import { Building2, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { FC } from "react";
import { User } from "../../data/typeData";
interface HeaderProps {
  currentUser: User;
  handleLogout: () => void;
}
const Header: FC<HeaderProps> = ({ currentUser, handleLogout }) => {
  return (
    <header className="bg-white border-b">
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
  )
}
export default Header;