import { useEffect, useState } from 'react';
import { Printer, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface PrintJob {
  id: string;
  documentType: string;
  documentNumber: string;
  citizenName: string;
  assignedTo: string;
  urgency: string;
  status: string;
  createdAt: string;
}

interface PrintQueueProps {
  printQueue?: PrintJob[];
}

export function PrintQueue({ printQueue = [] }: PrintQueueProps) {
  const [printJobs, setPrintJobs] = useState<PrintJob[]>(printQueue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrintJobs(printQueue);
  }, [printQueue]);

  const handlePrint = async (id: string) => {
    setPrintJobs(printJobs.map(job =>
      job.id === id ? { ...job, status: 'IMPRIME' } : job
    ));
    alert('Document marqué comme imprimé');
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      ACTE_NAISSANCE: 'Acte de naissance',
      CIN: 'Demande CIN',
      CERTIFICAT_RESIDENCE: 'Certificat de résidence',
    };
    return labels[type] || type;
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      URGENTE: { variant: 'destructive', label: 'Urgent' },
      NORMALE: { variant: 'outline', label: 'Normal' },
    };
    
    const config = variants[urgency] || variants.NORMALE;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      EN_ATTENTE: { variant: 'outline', label: 'En attente' },
      IMPRIME: { variant: 'default', label: 'Imprimé' },
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
        <h2 className="text-2xl tracking-tight">File d'impression</h2>
        <div className="text-sm text-gray-600">
          {printJobs.filter(j => j.status === 'EN_ATTENTE').length} document(s) en attente
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de document</TableHead>
              <TableHead>N° Document</TableHead>
              <TableHead>Nom du citoyen</TableHead>
              <TableHead>Employé assigné</TableHead>
              <TableHead>Urgence</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {printJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  Aucun document en attente
                </TableCell>
              </TableRow>
            ) : (
              printJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{getDocumentTypeLabel(job.documentType)}</TableCell>
                  <TableCell>{job.documentNumber}</TableCell>
                  <TableCell>{job.citizenName}</TableCell>
                  <TableCell>{job.assignedTo}</TableCell>
                  <TableCell>{getUrgencyBadge(job.urgency)}</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>
                    {job.status === 'EN_ATTENTE' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePrint(job.id)}
                      >
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimer
                      </Button>
                    )}
                    {job.status === 'IMPRIME' && (
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Terminé
                      </div>
                    )}
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