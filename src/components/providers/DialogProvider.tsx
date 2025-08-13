'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import Dialog from '../components/Dialog';

export const DialogContext = createContext<{
  isOpen: boolean;
  handleClick: (
    content: ReactNode,
    headline?: string,
    className?: string
  ) => void;
} | null>(null);

export default function DialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [headline, setHeadline] = useState('');
  const [className, setClassName] = useState('');

  const handleClick = (
    customContent: ReactNode,
    headline?: string,
    className?: string
  ) => {
    setIsOpen(true);
    setContent(customContent);
    setHeadline(headline || '');
    setClassName(className || '');
  };

  return (
    <DialogContext.Provider value={{ isOpen, handleClick }}>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        headline={headline}
        className={className}
      >
        {content}
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
}
