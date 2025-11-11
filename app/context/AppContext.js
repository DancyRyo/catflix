'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('cn');
  const [watched, setWatched] = useState({});
  const [records, setRecords] = useState([]);

  // Load watched状态from localStorage
  useEffect(() => {
    const savedWatched = localStorage.getItem('watched');
    if (savedWatched) {
      setWatched(JSON.parse(savedWatched));
    }

    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Save watched状态to localStorage
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  // Save records to localStorage
  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

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

  // Records management
  const addRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateRecord = (id, updatedRecord) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, ...updatedRecord } : record
      )
    );
  };

  const deleteRecord = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const getRecordsByType = (type) => {
    return records.filter((record) => record.type === type);
  };

  const clearRecordsByType = (type) => {
    setRecords((prev) => prev.filter((record) => record.type !== type));
  };

  const clearAllRecords = () => {
    if (window.confirm(language === 'cn' ? '确定要清空所有记录吗？此操作无法撤销。' : 'Are you sure you want to clear all records? This action cannot be undone.')) {
      setRecords([]);
    }
  };

  const value = {
    language,
    setLanguage,
    watched,
    toggleWatched,
    getWatchedCount,
    getTotalCount,
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordsByType,
    clearRecordsByType,
    clearAllRecords,
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
