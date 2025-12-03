import React, { createContext, useContext } from 'react';
import { AppData } from '@/lib/configLoader';

// Define the context type
interface DataContextType {
  appData: AppData;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Custom hook to use the data context
export const useAppData = (): AppData => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context.appData;
};

// Data Provider component
export const DataProvider: React.FC<{ appData: AppData, children: React.ReactNode }> = ({ appData, children }) => {
  return (
    <DataContext.Provider value={{ appData }}>
      {children}
    </DataContext.Provider>
  );
};
