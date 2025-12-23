import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LoginProps {
  onLogin: (employee: any) => void;
}

// Mock employees - simulating different roles
const mockEmployees = [
  { id: '1', username: 'admin', password: 'admin123', name: 'Rakoto Jean', role: 'MAIRE' },
  { id: '2', username: 'secretaire', password: 'sec123', name: 'Rabe Marie', role: 'SECRETAIRE' },
  { id: '3', username: 'agent', password: 'agent123', name: 'Randria Paul', role: 'AGENT_ETAT_CIVIL' },
  { id: '4', username: 'archive', password: 'arch123', name: 'Ravelo Sophie', role: 'ARCHIVISTE' },
];

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const employee = mockEmployees.find(
        emp => emp.username === username && emp.password === password
      );

      if (employee) {
        // Remove password before passing to parent
        const { password, ...employeeData } = employee;
        onLogin(employeeData);
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Application Interne Commune</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à l'espace administratif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold">Comptes de démonstration:</p>
              <p>• Maire: admin / admin123</p>
              <p>• Secrétaire: secretaire / sec123</p>
              <p>• Agent: agent / agent123</p>
              <p>• Archiviste: archive / arch123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}