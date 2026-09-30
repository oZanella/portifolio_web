'use client';

import type { ReactNode } from 'react';
import { CommandMenuProvider } from '@/components/providers/command-menu';
import { SpotlightTracker } from '@/components/providers/spotlight-tracker';
import { ToastProvider } from '@/components/providers/toast-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CommandMenuProvider>
        {children}
        <SpotlightTracker />
      </CommandMenuProvider>
    </ToastProvider>
  );
}
