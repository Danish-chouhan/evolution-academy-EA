'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ContentContextType = {
  isAdmin: boolean;
  page: string;
  content: Record<string, string>;
  updateContent: (key: string, value: string) => Promise<void>;
};

const ContentContext = createContext<ContentContextType | null>(null);

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

export function ContentProvider({
  children,
  initialContent,
  page,
  isAdmin = false,
}: {
  children: ReactNode;
  initialContent: Record<string, string>;
  page: string;
  isAdmin?: boolean;
}) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);

  const updateContent = async (key: string, value: string) => {
    // Optimistic UI update
    setContent((prev) => ({ ...prev, [key]: value }));

    if (!isAdmin) return;

    try {
      // Fetch current complete object from API or just merge with existing locally
      const updatedData = { ...content, [key]: value };

      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          section: 'global', // We'll store all keys for the page in 'global' section for simplicity
          data: updatedData,
        }),
      });
    } catch (error) {
      console.error('Failed to save content:', error);
      // Revert optimistic update on failure (optional)
      setContent(content);
    }
  };

  return (
    <ContentContext.Provider value={{ isAdmin, page, content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}
