
import React, { useState } from 'react';
import ValorantHome from '@/components/ValorantHome';
import AdminPanel from '@/components/AdminPanel';
import AdminAuth from '@/components/AdminAuth';

type ViewState = 'home' | 'admin-login' | 'admin-panel';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminClick = () => {
    if (isAdmin) {
      setCurrentView('admin-panel');
    } else {
      setCurrentView('admin-login');
    }
  };

  const handleLogin = (adminStatus: boolean) => {
    setIsAdmin(adminStatus);
    if (adminStatus) {
      setCurrentView('admin-panel');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  switch (currentView) {
    case 'admin-login':
      return <AdminAuth onLogin={handleLogin} />;
    
    case 'admin-panel':
      return <AdminPanel onBack={handleBackToHome} />;
    
    default:
      return (
        <ValorantHome 
          isAdmin={isAdmin} 
          onAdminClick={handleAdminClick} 
        />
      );
  }
};

export default Index;
