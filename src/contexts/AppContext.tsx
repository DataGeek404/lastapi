
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  toggleLoading: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  const value = {
    isLoading,
    setIsLoading,
    toggleLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
