import React, { createContext, useContext, ReactNode } from 'react';
import { useAdminMode, AdminModeState } from '@/hooks/useAdminMode';

/**
 * Admin Context
 * Provides admin mode state and functions globally throughout the app
 */

interface AdminContextType extends AdminModeState {
  authenticate: (password: string) => Promise<boolean>;
  closePasswordPrompt: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const adminMode = useAdminMode();

  return (
    <AdminContext.Provider value={adminMode}>
      {children}
    </AdminContext.Provider>
  );
};
