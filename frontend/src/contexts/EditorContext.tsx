import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL } from '@/config';
import { useFestival } from './FestivalContext';
import { getStoredToken } from '@/lib/auth';

interface Editor {
  wallet: string;
  // Add other editor properties if any
}

interface EditorContextType {
  editors: string[];
  isEditor: (wallet: string) => boolean;
  isLoading: boolean;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { selectedFestival } = useFestival();
  const [editors, setEditors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEditors = async () => {
      if (!selectedFestival) {
        setEditors([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const token = getStoredToken();
        const response = await fetch(`${API_BASE_URL}/festivals/${selectedFestival.id}/editors`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch editors');
        }

        const data = await response.json();
        setEditors(data || []);
      } catch (error) {
        console.error('Error fetching editors:', error);
        setEditors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEditors();
  }, [selectedFestival]);

  const isEditor = (wallet: string) => {
    return editors.some(editor => editor.toLowerCase() === wallet.toLowerCase());
  };

  return (
    <EditorContext.Provider value={{ editors, isEditor, isLoading }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
