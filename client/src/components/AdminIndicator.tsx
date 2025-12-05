import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

/**
 * Admin Indicator
 * Shows a floating indicator when admin mode is active
 * Provides quick access to admin panel and logout
 */

export const AdminIndicator: React.FC = () => {
  const { isAuthenticated, logout } = useAdmin();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) return null;

  const handleGoToAdmin = () => {
    setLocation('/admin');
  };

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-bottom-5">
      <Shield className="h-4 w-4" />
      <span className="text-sm font-medium">Admin Mode</span>
      
      <div className="flex items-center gap-1 ml-2">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={handleGoToAdmin}
        >
          Editor
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={handleLogout}
        >
          <LogOut className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
