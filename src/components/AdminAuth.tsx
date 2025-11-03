
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

interface AdminAuthProps {
  onLogin: (isAdmin: boolean) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Simple demo auth - in production use proper authentication
      if (credentials.username === 'admin' && credentials.password === 'valorant123') {
        onLogin(true);
        toast({
          title: "Succesvol ingelogd",
          description: "Welkom in het admin paneel!",
        });
      } else {
        toast({
          title: "Login mislukt",
          description: "Onjuiste gebruikersnaam of wachtwoord.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-valorant-dark via-valorant-light to-valorant-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-valorant-light-90 border-valorant-red/30">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-valorant-red/20 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-valorant-red" />
          </div>
          <CardTitle className="text-2xl font-bold text-valorant-white">Admin Login</CardTitle>
          <CardDescription className="text-gray-300">
            Log in om toegang te krijgen tot het admin paneel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-valorant-white">Gebruikersnaam</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="mt-1 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-valorant-white">Wachtwoord</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="mt-1 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full admin-button"
              disabled={isLoading}
            >
              {isLoading ? 'Inloggen...' : 'Inloggen'}
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-valorant-dark/50 rounded-lg">
            <p className="text-sm text-gray-400 text-center">
              Demo credentials:<br />
              Gebruikersnaam: <span className="text-valorant-red">admin</span><br />
              Wachtwoord: <span className="text-valorant-red">valorant123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
