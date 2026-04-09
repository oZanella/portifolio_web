'use client';

import React, { useState } from 'react';
import { Settings, Check, X, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioSettings } from './settings-provider';
import { cn } from '@/lib/utils';

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = usePortfolioSettings();

  const themes = [
    { id: 'default', name: 'Verde', color: 'bg-[#10b981]' },
    { id: 'blue', name: 'Azul', color: 'bg-[#3b82f6]' },
    { id: 'purple', name: 'Roxo', color: 'bg-[#a855f7]' },
    { id: 'amber', name: 'Amarelo', color: 'bg-[#f59e0b]' },
  ] as const;

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="h-10 w-10 md:h-9 md:w-9 p-0 rounded-xl border-tone/20 surface-muted hover:surface-card transition-all cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings
          className={cn(
            'h-5 w-5 md:h-4 md:w-4 text-tone-secondary transition-transform duration-500',
            isOpen && 'rotate-90',
          )}
        />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-4 z-50 w-72 bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-white flex items-center gap-2">
                <Palette className="h-4 w-4 text-tone-primary" />
                Personalização
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                  Escolha uma cor
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'group relative flex flex-col items-center gap-2 cursor-pointer',
                      )}
                    >
                      <div
                        className={cn(
                          'h-11 w-11 rounded-full border transition-all flex items-center justify-center',
                          t.color,
                          theme === t.id
                            ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105',
                        )}
                      >
                        {theme === t.id && (
                          <Check className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-[10px] font-bold transition-colors uppercase tracking-wider',
                          theme === t.id ? 'text-white' : 'text-white/30',
                        )}
                      >
                        {t.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-8 pt-5 border-t border-white/5">
              <p className="text-[10px] text-center text-white/20 font-medium">
                Configurações salvas automaticamente ao selecionar uma cor
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
