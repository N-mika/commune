import { useEffect, useState } from 'react';
import { Search, CheckCircle, XCircle, Printer, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BirthCerticat, User } from '../../data/typeData';
import AddBirth from './Modal/AddBirth';
import { newBirthVoid } from '../../data/DataVoid';
import { useSelector } from "react-redux";
import { RootState } from '../../redux';
import BirthCertifcatModal from './Modal/BirthCertifcatModal';
interface BirthCertificatesProps {
  currentUser: User;
  onAddToPrintQueue?: (item: any) => void;
}

export function BirthCertificates({ currentUser, onAddToPrintQueue }: BirthCertificatesProps) {
  const allBirth = useSelector((state: RootState) => state.birthAct.births);
  const [filteredBirths, setFilteredBirths] = useState<BirthCerticat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [birthCertifcat, setBirthCertifcat] = useState<BirthCerticat>(newBirthVoid);

  useEffect(() => {
    let filtered = allBirth;

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
  }, [searchTerm, statusFilter, allBirth]);

  const handleUpdateStatus = async (id: string, status: string) => {
    // setBirths(allBirth.map(birth =>
    //   birth.id === id ? { ...birth, status } : birth
    // ));
  };
  const handleShowModale = (birth: BirthCerticat) => {
    setBirthCertifcat(birth);
    setShowModal(true);
  }
  const handleAddToPrintQueue = async (birth: BirthCerticat) => {
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
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle demande
        </Button>
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
                <TableRow key={birth.id} onClick={() => handleShowModale(birth)}>
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
      <AddBirth dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      {showModal && <BirthCertifcatModal birth={birthCertifcat} onClose={() => setShowModal(false)} />}
    </div>
  );
}