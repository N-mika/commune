import { useEffect, useState } from 'react';
import { Search, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
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

interface CINRequest {
  id: string;
  citizenName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  address: string;
  requestNumber: string;
  status: string;
  notes?: string;
  createdAt: string;
}

interface CINVerificationProps {
  currentUser: any;
}

// Mock data
const mockCINRequests: CINRequest[] = [
  {
    id: '1',
    citizenName: 'RABENORO Hery',
    dateOfBirth: '1990-05-12',
    placeOfBirth: 'Antananarivo',
    address: 'Lot II A 45 Ambohimanarina',
    requestNumber: 'CIN-2024-1012',
    status: 'EN_ATTENTE',
    createdAt: '2024-12-18T09:00:00Z',
  },
  {
    id: '2',
    citizenName: 'RAKOTOZAFY Lalaina',
    dateOfBirth: '1985-08-22',
    placeOfBirth: 'Fianarantsoa',
    address: 'Lot VT 32 Antsahavola',
    requestNumber: 'CIN-2024-1013',
    status: 'VERIFIE',
    notes: 'Documents conformes',
    createdAt: '2024-12-17T14:30:00Z',
  },
  {
    id: '3',
    citizenName: 'ANDRIAMASY Voahirana',
    dateOfBirth: '1995-03-18',
    placeOfBirth: 'Toamasina',
    address: 'Lot IA 78 Mahamasina',
    requestNumber: 'CIN-2024-1014',
    status: 'EN_ATTENTE',
    createdAt: '2024-12-19T10:15:00Z',
  },
];

export function CINVerification({ currentUser }: CINVerificationProps) {
  const [cinRequests, setCinRequests] = useState<CINRequest[]>(mockCINRequests);
  const [filteredRequests, setFilteredRequests] = useState<CINRequest[]>(mockCINRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CINRequest | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let filtered = cinRequests;
    
    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requestNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredRequests(filtered);
  }, [searchTerm, cinRequests]);

  const handleUpdateStatus = async (id: string, status: string) => {
    setCinRequests(cinRequests.map(req =>
      req.id === id ? { ...req, status, notes } : req
    ));
    setSelectedRequest(null);
    setNotes('');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      EN_ATTENTE: { variant: 'outline', label: 'En attente' },
      VERIFIE: { variant: 'default', label: 'Vérifié' },
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
        <h2 className="text-2xl tracking-tight">Vérification des demandes CIN</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher par nom ou numéro de demande..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Demande</TableHead>
              <TableHead>Nom du citoyen</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>Lieu de naissance</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.requestNumber}</TableCell>
                  <TableCell>{request.citizenName}</TableCell>
                  <TableCell>{request.dateOfBirth}</TableCell>
                  <TableCell>{request.placeOfBirth}</TableCell>
                  <TableCell>{request.address}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest(request);
                            setNotes(request.notes || '');
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Vérification de la demande CIN</DialogTitle>
                          <DialogDescription>
                            Numéro: {request.requestNumber}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Nom complet</Label>
                              <p className="mt-1">{request.citizenName}</p>
                            </div>
                            <div>
                              <Label>Date de naissance</Label>
                              <p className="mt-1">{request.dateOfBirth}</p>
                            </div>
                            <div>
                              <Label>Lieu de naissance</Label>
                              <p className="mt-1">{request.placeOfBirth}</p>
                            </div>
                            <div>
                              <Label>Adresse</Label>
                              <p className="mt-1">{request.address}</p>
                            </div>
                          </div>

                          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
                            <p className="text-gray-500">Aperçu du document scanné</p>
                            <p className="text-sm text-gray-400 mt-2">
                              (Fonctionnalité de prévisualisation à implémenter)
                            </p>
                          </div>

                          <div>
                            <Label htmlFor="notes">Notes de vérification</Label>
                            <Textarea
                              id="notes"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Ajouter des notes sur la vérification..."
                              rows={4}
                            />
                          </div>

                          {request.status === 'EN_ATTENTE' && (
                            <div className="flex gap-2">
                              <Button
                                className="flex-1"
                                onClick={() => handleUpdateStatus(request.id, 'VERIFIE')}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approuver
                              </Button>
                              <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() => handleUpdateStatus(request.id, 'REJETE')}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Rejeter
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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