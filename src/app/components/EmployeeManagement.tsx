import { useEffect, useState } from 'react';
import { Plus, UserCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Employee {
  id: string;
  username: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: '1',
    username: 'admin',
    name: 'Rakoto Jean',
    role: 'MAIRE',
    email: 'rakoto.jean@commune.mg',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    username: 'secretaire',
    name: 'Rabe Marie',
    role: 'SECRETAIRE',
    email: 'rabe.marie@commune.mg',
    createdAt: '2024-02-20T09:30:00Z',
  },
  {
    id: '3',
    username: 'agent',
    name: 'Randria Paul',
    role: 'AGENT_ETAT_CIVIL',
    email: 'randria.paul@commune.mg',
    createdAt: '2024-03-10T10:15:00Z',
  },
  {
    id: '4',
    username: 'archive',
    name: 'Ravelo Sophie',
    role: 'ARCHIVISTE',
    email: 'ravelo.sophie@commune.mg',
    createdAt: '2024-04-05T14:00:00Z',
  },
];

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    username: '',
    password: '',
    name: '',
    role: 'AGENT_ETAT_CIVIL',
    email: '',
  });

  const handleCreate = async () => {
    const employee: Employee = {
      id: String(employees.length + 1),
      username: newEmployee.username,
      name: newEmployee.name,
      role: newEmployee.role,
      email: newEmployee.email,
      createdAt: new Date().toISOString(),
    };
    
    setEmployees([...employees, employee]);
    setDialogOpen(false);
    setNewEmployee({
      username: '',
      password: '',
      name: '',
      role: 'AGENT_ETAT_CIVIL',
      email: '',
    });
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      MAIRE: { variant: 'default', label: 'Maire' },
      SECRETAIRE: { variant: 'secondary', label: 'Secrétaire' },
      AGENT_ETAT_CIVIL: { variant: 'outline', label: 'Agent d\'état civil' },
      ARCHIVISTE: { variant: 'outline', label: 'Archiviste' },
    };
    
    const config = variants[role] || { variant: 'outline', label: role };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl tracking-tight">Gestion des employés</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvel employé
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un compte employé</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer un nouveau compte
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  value={newEmployee.username}
                  onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                  placeholder="johndoe"
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <Label htmlFor="role">Rôle</Label>
                <Select value={newEmployee.role} onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAIRE">Maire</SelectItem>
                    <SelectItem value="SECRETAIRE">Secrétaire</SelectItem>
                    <SelectItem value="AGENT_ETAT_CIVIL">Agent d'état civil</SelectItem>
                    <SelectItem value="ARCHIVISTE">Archiviste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  placeholder="jean.dupont@commune.mg"
                />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Créer le compte
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d'utilisateur</TableHead>
              <TableHead>Nom complet</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Aucun employé trouvé
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.username}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{getRoleBadge(employee.role)}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{new Date(employee.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-green-600 text-sm">
                      <UserCheck className="w-4 h-4 mr-1" />
                      Actif
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}