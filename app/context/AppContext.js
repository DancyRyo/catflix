'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('cn');
  const [watched, setWatched] = useState({});

  // Load watched状态from localStorage
  useEffect(() => {
    const savedWatched = localStorage.getItem('watched');
    if (savedWatched) {
      setWatched(JSON.parse(savedWatched));
    }
  }, []);

  // Save watched状态to localStorage
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  const toggleWatched = (category, itemId) => {
    setWatched((prev) => {
      const categoryWatched = prev[category] || {};
      const newCategoryWatched = {
        ...categoryWatched,
        [itemId]: !categoryWatched[itemId],
      };
      return {
        ...prev,
        [category]: newCategoryWatched,
      };
    });
  };

  const getWatchedCount = (category) => {
    if (!watched[category]) return 0;
    return Object.values(watched[category]).filter(Boolean).length;
  };

  const getTotalCount = (data) => {
    let total = 0;
    Object.values(data).forEach((items) => {
      total += items.length;
    });
    return total;
  };

  const value = {
    language,
    setLanguage,
    watched,
    toggleWatched,
    getWatchedCount,
    getTotalCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
