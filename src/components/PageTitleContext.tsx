'use client';
import React, { createContext, useContext, useState } from 'react';

interface PageTitleContextType {
  title: string;
  setTitle: (title: string) => void;
  showBackButton: boolean;
  setShowBackButton: (show: boolean) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export const PageTitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);
  return (
    <PageTitleContext.Provider value={{ title, setTitle, showBackButton, setShowBackButton }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error('usePageTitle must be used within a PageTitleProvider');
  }
  return context;
}

