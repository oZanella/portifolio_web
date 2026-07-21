'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'sky' | 'violet' | 'rose' | 'amber' | 'cyan';

const THEMES: Theme[] = ['default', 'sky', 'violet', 'rose', 'amber', 'cyan'];

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedTheme && THEMES.includes(savedTheme)) setTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('portfolio-theme', theme);

    const body = document.body;
    body.classList.forEach((cls) => {
      if (cls.startsWith('theme-')) {
        body.classList.remove(cls);
      }
    });

    if (theme !== 'default') body.classList.add(`theme-${theme}`);
  }, [theme, mounted]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function usePortfolioSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(
      'usePortfolioSettings must be used within a SettingsProvider',
    );
  }
  return context;
}
