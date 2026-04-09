'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'blue' | 'purple' | 'amber';
type Layout = 'default' | 'compact';

interface SettingsContextType {
  theme: Theme;
  layout: Layout;
  setTheme: (theme: Theme) => void;
  setLayout: (layout: Layout) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');
  const [layout, setLayout] = useState<Layout>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    const savedLayout = localStorage.getItem('portfolio-layout') as Layout;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedTheme) setTheme(savedTheme);
    if (savedLayout) setLayout(savedLayout);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-layout', layout);

    // Apply classes to body
    const body = document.body;
    body.classList.forEach((cls) => {
      if (cls.startsWith('theme-') || cls.startsWith('layout-')) {
        body.classList.remove(cls);
      }
    });

    if (theme !== 'default') body.classList.add(`theme-${theme}`);
    if (layout !== 'default') body.classList.add(`layout-${layout}`);
  }, [theme, layout, mounted]);

  return (
    <SettingsContext.Provider value={{ theme, layout, setTheme, setLayout }}>
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
