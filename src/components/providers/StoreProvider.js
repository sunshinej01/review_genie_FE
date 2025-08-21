'use client';

import { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState('카페페퍼');

  const handleStoreChange = (storeName) => {
    setSelectedStore(storeName);
  };

  const value = {
    selectedStore,
    handleStoreChange,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
