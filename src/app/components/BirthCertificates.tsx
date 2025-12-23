import { useEffect, useState } from 'react';
import { Search, Plus, Edit, CheckCircle, XCircle, Printer } from 'lucide-react';
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

interface Birth {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  fokontany: string;
  dateOfBirth: string;
  registrationNumber: string;
  requestDate: string;
  status: string;
  createdAt: string;
}

interface BirthCertificatesProps {
  currentUser: any;
  onAddToPrintQueue?: (item: any) => void;
}

// Mock data
const mockBirths: Birth[] = [
  {
    id: '1',
    name: 'RAZAFY Miora',
    fatherName: 'RAZAFY Jean Pierre',
    motherName: 'RASOAMIARAMANANA Marie',
    fokontany: 'Ambohimanarina',
    dateOfBirth: '2024-03-15',
    registrationNumber: 'AC-2024-0315-001',
    requestDate: '2024-12-10',
    status: 'EN_ATTENTE',
    createdAt: '2024-12-10T08:30:00Z',
  },
  {
    id: '2',
    name: 'RAKOTO Tantely',
    fatherName: 'RAKOTO Paul',
    motherName: 'RAVELO Sophie',
    fokontany: 'Antsahavola',
    dateOfBirth: '2024-05-20',
    registrationNumber: 'AC-2024-0520-002',
    requestDate: '2024-12-12',
    status: 'APPROUVE',
    createdAt: '2024-12-12T10:15:00Z',
  },
  {
    id: '3',
    name: 'RANDRIA Feno',
    fatherName: 'RANDRIA Jacques',
    motherName: 'RABARY Nicole',
    fokontany: 'Mahamasina',
    dateOfBirth: '2024-08-05',
    registrationNumber: 'AC-2024-0805-003',
    requestDate: '2024-12-15',
    status: 'EN_ATTENTE',
    createdAt: '2024-12-15T14:20:00Z',
  },
];

export function BirthCertificates({ currentUser, onAddToPrintQueue }: BirthCertificatesProps) {
  const [births, setBirths] = useState<Birth[]>(mockBirths);
  const [filteredBirths, setFilteredBirths] = useState<Birth[]>(mockBirths);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newBirth, setNewBirth] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    fokontany: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    let filtered = births;
    
    if (searchTerm) {
      filtered = filtered.filter(birth =>
        birth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        birth.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        birth.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        birth.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(birth => birth.status === statusFilter);
    }
    
    setFilteredBirths(filtered);
  }, [searchTerm, statusFilter, births]);

  const handleCreate = async () => {
    const registrationNumber = `AC-${new Date().getFullYear()}-${new Date().getMonth() + 1}${new Date().getDate()}-${String(births.length + 1).padStart(3, '0')}`;
    
    const newBirthRecord: Birth = {
      id: String(births.length + 1),
      ...newBirth,
      registrationNumber,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'EN_ATTENTE',
      createdAt: new Date().toISOString(),
    };
    
    setBirths([...births, newBirthRecord]);
    setDialogOpen(false);
    setNewBirth({
      name: '',
      fatherName: '',
      motherName: '',
      fokontany: '',
      dateOfBirth: '',
    });
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setBirths(births.map(birth => 
      birth.id === id ? { ...birth, status } : birth
    ));
  };

  const handleAddToPrintQueue = async (birth: Birth) => {
    if (onAddToPrintQueue) {
      onAddToPrintQueue({
        id: `print-${Date.now()}`,
        documentType: 'ACTE_NAISSANCE',
        documentId: birth.id,
        documentNumber: birth.registrationNumber,
        citizenName: birth.name,
        assignedTo: currentUser.id,
        urgency: 'NORMALE',
        status: 'EN_ATTENTE',
        createdAt: new Date().toISOString(),
      });
    }
    alert('Ajouté à la file d\'impression');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      EN_ATTENTE: { variant: 'outline', label: 'En attente' },
      APPROUVE: { variant: 'default', label: 'Approuvé' },
      REJETE: { variant: 'destructive', label: 'Rejeté' },
    };
    
    const config = variants[status] || variants.EN_ATTENTE;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl tracking-tight">Gestion des actes de naissance</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle demande
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle demande d'acte de naissance</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer une nouvelle demande
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={newBirth.name}
                  onChange={(e) => setNewBirth({ ...newBirth, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="fatherName">Nom du père</Label>
                <Input
                  id="fatherName"
                  value={newBirth.fatherName}
                  onChange={(e) => setNewBirth({ ...newBirth, fatherName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="motherName">Nom de la mère</Label>
                <Input
                  id="motherName"
                  value={newBirth.motherName}
                  onChange={(e) => setNewBirth({ ...newBirth, motherName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="fokontany">Fokontany</Label>
                <Input
                  id="fokontany"
                  value={newBirth.fokontany}
                  onChange={(e) => setNewBirth({ ...newBirth, fokontany: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date de naissance</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={newBirth.dateOfBirth}
                  onChange={(e) => setNewBirth({ ...newBirth, dateOfBirth: e.target.value })}
                />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Créer la demande
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher par nom, parents, ou numéro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tous les statuts</SelectItem>
            <SelectItem value="EN_ATTENTE">En attente</SelectItem>
            <SelectItem value="APPROUVE">Approuvé</SelectItem>
            <SelectItem value="REJETE">Rejeté</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Parents</TableHead>
              <TableHead>Fokontany</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>N° d'enregistrement</TableHead>
              <TableHead>Date de demande</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBirths.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  Aucun résultat trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredBirths.map((birth) => (
                <TableRow key={birth.id}>
                  <TableCell>{birth.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>P: {birth.fatherName}</div>
                      <div>M: {birth.motherName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{birth.fokontany}</TableCell>
                  <TableCell>{birth.dateOfBirth}</TableCell>
                  <TableCell>{birth.registrationNumber}</TableCell>
                  <TableCell>{birth.requestDate}</TableCell>
                  <TableCell>{getStatusBadge(birth.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {birth.status === 'EN_ATTENTE' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(birth.id, 'APPROUVE')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(birth.id, 'REJETE')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {birth.status === 'APPROUVE' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToPrintQueue(birth)}
                        >
                          <Printer className="w-4 h-4" />
                        </Button>
                      )}
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