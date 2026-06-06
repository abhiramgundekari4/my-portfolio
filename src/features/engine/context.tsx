'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppState {
  activeAppId: string;
  datasets: Record<string, Record<string, any>[]>;
  formValues: Record<string, Record<string, any>>;
  validationErrors: Record<string, Record<string, string>>;
}

interface AppContextType {
  state: AppState;
  setActiveApp: (appId: string) => void;
  updateFormField: (formId: string, fieldName: string, value: any) => void;
  submitForm: (formId: string, tableId: string) => boolean;
  deleteRecord: (tableId: string, index: number) => void;
  resetForm: (formId: string) => void;
  loadRawConfig: (jsonString: string) => { success: boolean; error: string | null };
  customConfig: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialDatasets: Record<string, Record<string, any>[]> = {
  studentTable: [
    { name: 'Abhiram Gundekari', email: 'abhiram@university.edu', age: 21, department: 'Computer Science' },
    { name: 'Jane Smith', email: 'jane.smith@university.edu', age: 22, department: 'Data Science' },
    { name: 'Robert Johnson', email: 'robert.j@university.edu', age: 20, department: 'Electrical Engineering' }
  ],
  employeeTable: [
    { name: 'Sarah Connor', email: 'sconnor@company.com', role: 'Software Engineer', salary: 95000, remote: true },
    { name: 'John Doe', email: 'jdoe@company.com', role: 'Project Manager', salary: 110000, remote: false }
  ],
  eventTable: [
    { name: 'Alice Vance', email: 'alice@summit.com', ticketType: 'VIP Access Pass', ticketsCount: 2, vip: true },
    { name: 'Bob Vance', email: 'bob@summit.com', ticketType: 'General Admission', ticketsCount: 1, vip: false }
  ]
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeAppId, setActiveAppId] = useState('student-mgmt');
  const [datasets, setDatasets] = useState(initialDatasets);
  const [formValues, setFormValues] = useState<Record<string, Record<string, any>>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, Record<string, string>>>({});
  const [customConfig, setCustomConfig] = useState<string | null>(null);

  const setActiveApp = (appId: string) => {
    setActiveAppId(appId);
  };

  const updateFormField = (formId: string, fieldName: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [formId]: {
        ...(prev[formId] || {}),
        [fieldName]: value
      }
    }));
    
    // Clear validation error when editing
    if (validationErrors[formId]?.[fieldName]) {
      setValidationErrors(prev => ({
        ...prev,
        [formId]: {
          ...prev[formId],
          [fieldName]: ''
        }
      }));
    }
  };

  const resetForm = (formId: string) => {
    setFormValues(prev => {
      const copy = { ...prev };
      delete copy[formId];
      return copy;
    });
    setValidationErrors(prev => {
      const copy = { ...prev };
      delete copy[formId];
      return copy;
    });
  };

  const submitForm = (formId: string, tableId: string): boolean => {
    const values = formValues[formId] || {};
    
    // A simplified validation lookup - usually forms will declare required in fields
    // We pass validation checks back to caller or do it here dynamically.
    // For simplicity, we return true if validation passes and let form handle detailed visual errors.
    const newRecord = { ...values };
    
    setDatasets(prev => ({
      ...prev,
      [tableId]: [...(prev[tableId] || []), newRecord]
    }));
    
    resetForm(formId);
    return true;
  };

  const deleteRecord = (tableId: string, index: number) => {
    setDatasets(prev => {
      const list = [...(prev[tableId] || [])];
      list.splice(index, 1);
      return {
        ...prev,
        [tableId]: list
      };
    });
  };

  const loadRawConfig = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.appId || !parsed.layout) {
        return { success: false, error: 'JSON config must contain "appId" and "layout" properties.' };
      }
      setCustomConfig(jsonString);
      setActiveAppId(parsed.appId);
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Invalid JSON format.' };
    }
  };

  const state: AppState = {
    activeAppId,
    datasets,
    formValues,
    validationErrors
  };

  return (
    <AppContext.Provider value={{
      state,
      setActiveApp,
      updateFormField,
      submitForm,
      deleteRecord,
      resetForm,
      loadRawConfig,
      customConfig
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const store = useContext(AppContext);
  if (!store) {
    throw new Error('useAppStore must be used inside an AppProvider');
  }
  return store;
}
