import { FileText, IdCard, FileCheck, Printer, Users, History, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const tiles = [
  {
    id: 'births',
    title: 'Actes de naissance',
    description: 'Gérer les demandes d\'actes de naissance',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    id: 'cin',
    title: 'Vérification CIN',
    description: 'Valider les demandes de carte d\'identité',
    icon: IdCard,
    color: 'bg-green-500',
  },
  {
    id: 'residence',
    title: 'Certificats de résidence',
    description: 'Traiter les certificats de résidence',
    icon: FileCheck,
    color: 'bg-purple-500',
  },
  {
    id: 'print',
    title: 'File d\'impression',
    description: 'Gérer les documents à imprimer',
    icon: Printer,
    color: 'bg-orange-500',
  },
  {
    id: 'employees',
    title: 'Base de données employés',
    description: 'Gérer les comptes employés',
    icon: Users,
    color: 'bg-indigo-500',
  },
  {
    id: 'history',
    title: 'Historique',
    description: 'Consulter l\'historique des actions',
    icon: History,
    color: 'bg-gray-500',
  },
];

const stats = [
  {
    title: 'Documents en attente',
    value: '12',
    change: '+3 aujourd\'hui',
    icon: Clock,
    color: 'text-orange-600',
  },
  {
    title: 'Documents traités (mois)',
    value: '156',
    change: '+23% vs mois dernier',
    icon: TrendingUp,
    color: 'text-green-600',
  },
  {
    title: 'Demandes CIN',
    value: '8',
    change: '3 en attente',
    icon: IdCard,
    color: 'text-blue-600',
  },
  {
    title: 'Employés actifs',
    value: '4',
    change: 'Tous en service',
    icon: Users,
    color: 'text-purple-600',
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl tracking-tight">Tableau de bord</h2>
        <p className="text-gray-600">
          Bienvenue dans l'application de gestion administrative
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main navigation tiles */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Modules disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Card
                key={tile.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate(tile.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`${tile.color} text-white p-3 rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle>{tile.title}</CardTitle>
                      <CardDescription>{tile.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}