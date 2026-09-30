'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Check,
  Copy,
  CornerDownLeft,
  Download,
  Hash,
  Mail,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import { TechIcon } from '@/components/portfolio/tech-icon';
import { Kbd } from '@/components/ui/kbd';
import { downloadFile, goToSection, openExternal } from '@/lib/dom';
import { contact, navItems, profile, socials } from '@/lib/portfolio-data';
import {
  ACCENTS,
  accentSwatch,
  setAccent,
  toggleMode,
  usePreferences,
} from '@/lib/preferences';
import { useCopy } from '@/lib/use-copy';
import { cn } from '@/lib/utils';

type CommandItem = {
  id: string;
  group: string;
  label: string;
  keywords?: string;
  icon: ReactNode;
  trailing?: ReactNode;
  run: () => void;
};

const CommandMenuContext = createContext<(() => void) | null>(null);

export function useCommandMenu() {
  const open = useContext(CommandMenuContext);
  if (!open) throw new Error('useCommandMenu precisa do <CommandMenuProvider>');
  return open;
}

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === 'k';
      if (!isShortcut) return;
      event.preventDefault();
      setIsOpen((value) => !value);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <CommandMenuContext.Provider value={open}>
      {children}
      <CommandMenu open={isOpen} onClose={() => setIsOpen(false)} />
    </CommandMenuContext.Provider>
  );
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pressedBackdrop = useRef(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const { mode, accent } = usePreferences();
  const { copy } = useCopy();
  const listId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const items = useMemo<CommandItem[]>(() => {
    const navigation: CommandItem[] = [
      { id: 'inicio', label: 'Início' },
      ...navItems,
    ].map((item) => ({
      id: `nav-${item.id}`,
      group: 'Navegar',
      label: item.label,
      keywords: 'ir secao',
      icon: <Hash aria-hidden />,
      run: () => goToSection(item.id),
    }));

    const actions: CommandItem[] = [
      {
        id: 'copy-email',
        group: 'Ações',
        label: 'Copiar e-mail',
        keywords: contact.email,
        icon: <Copy aria-hidden />,
        run: () => void copy(contact.email, 'E-mail copiado'),
      },
      {
        id: 'send-email',
        group: 'Ações',
        label: 'Enviar e-mail',
        keywords: 'contato mensagem',
        icon: <Mail aria-hidden />,
        run: () => openExternal(`mailto:${contact.email}`),
      },
      {
        id: 'download-cv',
        group: 'Ações',
        label: 'Baixar currículo (PDF)',
        keywords: 'cv curriculo resume',
        icon: <Download aria-hidden />,
        run: () => downloadFile(profile.cv),
      },
      ...socials.map<CommandItem>((social) => ({
        id: `social-${social.icon}`,
        group: 'Ações',
        label:
          social.label === 'WhatsApp'
            ? 'Conversar no WhatsApp'
            : `Abrir ${social.label}`,
        keywords: 'rede social perfil',
        icon: <TechIcon name={social.icon} />,
        run: () => openExternal(social.href),
      })),
    ];

    const appearance: CommandItem[] = [
      {
        id: 'toggle-mode',
        group: 'Aparência',
        label: mode === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro',
        keywords: 'tema dark light modo claro escuro',
        icon: mode === 'light' ? <Moon aria-hidden /> : <Sun aria-hidden />,
        run: () => toggleMode(),
      },
      ...ACCENTS.map<CommandItem>((item) => ({
        id: `accent-${item.id}`,
        group: 'Aparência',
        label: `Cor de destaque: ${item.name}`,
        keywords: 'tema cor paleta accent',
        icon: (
          <span
            aria-hidden
            className="size-3.5 rounded-full"
            style={{ backgroundImage: accentSwatch(item.hue, item.chroma) }}
          />
        ),
        trailing:
          accent === item.id ? (
            <Check className="size-4 text-brand" aria-label="(atual)" />
          ) : null,
        run: () => setAccent(item.id),
      })),
    ];

    return [...navigation, ...actions, ...appearance];
  }, [mode, accent, copy]);

  const filtered = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items.filter((item) => {
      const haystack = normalize(`${item.label} ${item.group} ${item.keywords ?? ''}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [items, query]);

  const groups = useMemo(() => {
    const map = new Map<string, { item: CommandItem; index: number }[]>();
    filtered.forEach((item, index) => {
      const list = map.get(item.group) ?? [];
      list.push({ item, index });
      map.set(item.group, list);
    });
    return [...map.entries()];
  }, [filtered]);

  const activeIndex = Math.min(active, Math.max(filtered.length - 1, 0));
  const activeItem = filtered[activeIndex];

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const run = (item: CommandItem) => {
    // Fecha primeiro (o navegador devolve o foco ao gatilho) e só então
    // executa, para a ação poder mover o foco/scroll sem ser desfeita.
    // Tudo no mesmo gesto do usuário: popups e clipboard continuam liberados.
    dialogRef.current?.close();
    item.run();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((activeIndex + 1) % filtered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((activeIndex - 1 + filtered.length) % filtered.length);
    } else if (event.key === 'Enter' && activeItem) {
      event.preventDefault();
      run(activeItem);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      data-lock-scroll
      aria-label="Paleta de comandos"
      onClose={() => {
        setQuery('');
        setActive(0);
        onClose();
      }}
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        // Só fecha se o clique começou E terminou fora do painel
        // (evita fechar ao arrastar uma seleção de texto para fora).
        if (pressedBackdrop.current && event.target === event.currentTarget) {
          event.currentTarget.close();
        }
        pressedBackdrop.current = false;
      }}
      className="fixed inset-0 m-0 h-dvh w-full bg-transparent p-3 pt-[min(12vh,7rem)] backdrop:[animation:fade-in_200ms_ease-out] open:flex open:items-start open:justify-center sm:p-6 sm:pt-[min(14vh,8rem)]"
    >
      <div className="flex max-h-[min(34rem,calc(100dvh-8rem))] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift [animation:pop-in_260ms_var(--ease-out-expo)]">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-ink-subtle" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Buscar seção, ação ou tema…"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeItem ? `${listId}-${activeItem.id}` : undefined}
            spellCheck={false}
            autoComplete="off"
            className="h-14 w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-ink-subtle focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="hidden shrink-0 sm:block"
            aria-label="Fechar paleta de comandos"
          >
            <Kbd>esc</Kbd>
          </button>
        </div>

        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Comandos"
          className="min-h-0 flex-1 overscroll-contain overflow-y-auto p-2"
        >
          {groups.length ? (
            groups.map(([group, entries]) => (
              <div key={group} role="group" aria-label={group} className="pb-1">
                <p aria-hidden className="eyebrow px-3 pb-1.5 pt-3 text-[0.65rem]">
                  {group}
                </p>
                {entries.map(({ item, index }) => {
                  const selected = index === activeIndex;
                  return (
                    <div
                      key={item.id}
                      id={`${listId}-${item.id}`}
                      role="option"
                      aria-selected={selected}
                      data-index={index}
                      onPointerMove={() => {
                        if (!selected) setActive(index);
                      }}
                      onClick={() => run(item)}
                      className={cn(
                        'flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm transition-colors [&_svg]:size-4',
                        selected ? 'bg-elevated text-ink' : 'text-ink-muted',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-7 shrink-0 items-center justify-center rounded-lg border transition-colors',
                          selected
                            ? 'border-brand/30 bg-brand/10 text-brand'
                            : 'border-line text-ink-subtle',
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {item.trailing}
                      {selected ? (
                        <CornerDownLeft
                          className="hidden text-ink-subtle sm:block"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <p className="px-3 py-10 text-center text-sm text-ink-subtle">
              Nada encontrado para “{query}”.
            </p>
          )}
        </div>

        <div className="hidden items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-ink-subtle [@media(hover:hover)]:flex">
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            navegar
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>↵</Kbd>
            selecionar
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Kbd>esc</Kbd>
            fechar
          </span>
        </div>
      </div>
    </dialog>
  );
}
