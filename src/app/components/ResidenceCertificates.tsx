import { useEffect, useState } from 'react';
import { Search, Plus, CheckCircle, XCircle, Printer } from 'lucide-react';
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
import { Textarea } from './ui/textarea';

interface ResidenceCertificate {
  id: string;
  citizenName: string;
  address: string;
  fokontany: string;
  district: string;
  certificateNumber: string;
  requestDate: string;
  status: string;
  purpose: string;
  createdAt: string;
}

interface ResidenceCertificatesProps {
  currentUser: any;
  onAddToPrintQueue?: (item: any) => void;
}

// Mock data
const mockCertificates: ResidenceCertificate[] = [
  {
    id: '1',
    citizenName: 'RAKOTOMALALA Haja',
    address: 'Lot II A 45 Ambohimanarina',
    fokontany: 'Ambohimanarina',
    district: 'Antananarivo Renivohitra',
    certificateNumber: 'CR-2024-1215-001',
    requestDate: '2024-12-15',
    status: 'EN_ATTENTE',
    purpose: 'Demande d\'emploi',
    createdAt: '2024-12-15T09:30:00Z',
  },
  {
    id: '2',
    citizenName: 'RAZAFINDRABE Mialy',
    address: 'Lot VT 32 Antsahavola',
    fokontany: 'Antsahavola',
    district: 'Antananarivo Renivohitra',
    certificateNumber: 'CR-2024-1216-002',
    requestDate: '2024-12-16',
    status: 'APPROUVE',
    purpose: 'Inscription scolaire',
    createdAt: '2024-12-16T10:15:00Z',
  },
  {
    id: '3',
    citizenName: 'ANDRIANJAFY Solo',
    address: 'Lot IA 78 Mahamasina',
    fokontany: 'Mahamasina',
    district: 'Antananarivo Renivohitra',
    certificateNumber: 'CR-2024-1217-003',
    requestDate: '2024-12-17',
    status: 'EN_ATTENTE',
    purpose: 'Démarches administratives',
    createdAt: '2024-12-17T14:20:00Z',
  },
];

export function ResidenceCertificates({ currentUser, onAddToPrintQueue }: ResidenceCertificatesProps) {
  const [certificates, setCertificates] = useState<ResidenceCertificate[]>(mockCertificates);
  const [filteredCertificates, setFilteredCertificates] = useState<ResidenceCertificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    citizenName: '',
    address: '',
    fokontany: '',
    district: 'Antananarivo Renivohitra',
    purpose: '',
  });

  useEffect(() => {
    let filtered = certificates;
    
    if (searchTerm) {
      filtered = filtered.filter(cert =>
        cert.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.fokontany.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(cert => cert.status === statusFilter);
    }
    
    setFilteredCertificates(filtered);
  }, [searchTerm, statusFilter, certificates]);

  const handleCreate = async () => {
    const certificateNumber = `CR-${new Date().getFullYear()}-${new Date().getMonth() + 1}${new Date().getDate()}-${String(certificates.length + 1).padStart(3, '0')}`;
    
    const newCert: ResidenceCertificate = {
      id: String(certificates.length + 1),
      ...newCertificate,
      certificateNumber,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'EN_ATTENTE',
      createdAt: new Date().toISOString(),
    };
    
    setCertificates([...certificates, newCert]);
    setDialogOpen(false);
    setNewCertificate({
      citizenName: '',
      address: '',
      fokontany: '',
      district: 'Antananarivo Renivohitra',
      purpose: '',
    });
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, status } : cert
    ));
  };

  const handleAddToPrintQueue = async (certificate: ResidenceCertificate) => {
    if (onAddToPrintQueue) {
      onAddToPrintQueue({
        id: `print-${Date.now()}`,
        documentType: 'CERTIFICAT_RESIDENCE',
        documentId: certificate.id,
        documentNumber: certificate.certificateNumber,
        citizenName: certificate.citizenName,
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
        <h2 className="text-2xl tracking-tight">Gestion des certificats de résidence</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle demande
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle demande de certificat de résidence</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer une nouvelle demande
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="citizenName">Nom complet du citoyen</Label>
                <Input
                  id="citizenName"
                  value={newCertificate.citizenName}
                  onChange={(e) => setNewCertificate({ ...newCertificate, citizenName: e.target.value })}
                  placeholder="RAKOTO Jean"
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse complète</Label>
                <Input
                  id="address"
                  value={newCertificate.address}
                  onChange={(e) => setNewCertificate({ ...newCertificate, address: e.target.value })}
                  placeholder="Lot II A 45"
                />
              </div>
              <div>
                <Label htmlFor="fokontany">Fokontany</Label>
                <Input
                  id="fokontany"
                  value={newCertificate.fokontany}
                  onChange={(e) => setNewCertificate({ ...newCertificate, fokontany: e.target.value })}
                  placeholder="Ambohimanarina"
                />
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={newCertificate.district}
                  onChange={(e) => setNewCertificate({ ...newCertificate, district: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="purpose">Motif de la demande</Label>
                <Textarea
                  id="purpose"
                  value={newCertificate.purpose}
                  onChange={(e) => setNewCertificate({ ...newCertificate, purpose: e.target.value })}
                  placeholder="Ex: Demande d'emploi, inscription scolaire..."
                  rows={3}
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
            placeholder="Rechercher par nom, numéro, ou fokontany..."
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
              <TableHead>N° Certificat</TableHead>
              <TableHead>Nom du citoyen</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Fokontany</TableHead>
              <TableHead>Motif</TableHead>
              <TableHead>Date de demande</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  Aucun résultat trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell>{certificate.certificateNumber}</TableCell>
                  <TableCell>{certificate.citizenName}</TableCell>
                  <TableCell>{certificate.address}</TableCell>
                  <TableCell>{certificate.fokontany}</TableCell>
                  <TableCell className="max-w-xs truncate">{certificate.purpose}</TableCell>
                  <TableCell>{certificate.requestDate}</TableCell>
                  <TableCell>{getStatusBadge(certificate.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {certificate.status === 'EN_ATTENTE' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(certificate.id, 'APPROUVE')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(certificate.id, 'REJETE')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {certificate.status === 'APPROUVE' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToPrintQueue(certificate)}
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
