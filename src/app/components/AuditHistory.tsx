import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface AuditLog {
  id: string;
  action: string;
  timestamp: string;
  userId?: string;
  documentId?: string;
  employeeId?: string;
  printJobId?: string;
}

// Mock data
const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'CREATE_BIRTH',
    timestamp: '2024-12-21T09:30:00Z',
    userId: 'Rakoto Jean',
    documentId: 'AC-2024-0315-001',
  },
  {
    id: '2',
    action: 'UPDATE_BIRTH',
    timestamp: '2024-12-21T10:15:00Z',
    userId: 'Rabe Marie',
    documentId: 'AC-2024-0520-002',
  },
  {
    id: '3',
    action: 'CREATE_CIN',
    timestamp: '2024-12-21T11:00:00Z',
    userId: 'Randria Paul',
    documentId: 'CIN-2024-1012',
  },
  {
    id: '4',
    action: 'ADD_TO_PRINT_QUEUE',
    timestamp: '2024-12-21T13:45:00Z',
    userId: 'Rakoto Jean',
    printJobId: 'print-1734789900',
  },
  {
    id: '5',
    action: 'UPDATE_CIN',
    timestamp: '2024-12-21T14:20:00Z',
    userId: 'Randria Paul',
    documentId: 'CIN-2024-1013',
  },
  {
    id: '6',
    action: 'CREATE_EMPLOYEE',
    timestamp: '2024-12-21T15:00:00Z',
    userId: 'Rakoto Jean',
    employeeId: '5',
  },
];

export function AuditHistory() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [loading, setLoading] = useState(false);

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      CREATE_EMPLOYEE: 'Création d\'employé',
      CREATE_BIRTH: 'Création d\'acte de naissance',
      UPDATE_BIRTH: 'Mise à jour d\'acte de naissance',
      CREATE_CIN: 'Création de demande CIN',
      UPDATE_CIN: 'Mise à jour de demande CIN',
      ADD_TO_PRINT_QUEUE: 'Ajout à la file d\'impression',
    };
    return labels[action] || action;
  };

  const getActionBadge = (action: string) => {
    if (action.startsWith('CREATE')) {
      return <Badge>Création</Badge>;
    } else if (action.startsWith('UPDATE')) {
      return <Badge variant="secondary">Modification</Badge>;
    } else {
      return <Badge variant="outline">Action</Badge>;
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl tracking-tight">Historique administratif</h2>
        <div className="text-sm text-gray-600">
          {auditLogs.length} action(s) enregistrée(s)
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date et heure</TableHead>
              <TableHead>Type d'action</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Référence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Aucune action enregistrée
                </TableCell>
              </TableRow>
            ) : (
              auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>
                        {new Date(log.timestamp).toLocaleString('fr-FR', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>{getActionLabel(log.action)}</TableCell>
                  <TableCell>{log.userId || '-'}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {log.documentId || log.employeeId || log.printJobId || '-'}
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