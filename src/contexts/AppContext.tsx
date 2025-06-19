
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredPins: any[];
  setFilteredPins: (pins: any[]) => void;
  allPins: any[];
  setAllPins: (pins: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPins, setFilteredPins] = useState<any[]>([]);
  const [allPins, setAllPins] = useState<any[]>([]);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        filteredPins,
        setFilteredPins,
        allPins,
        setAllPins,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
