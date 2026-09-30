'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import {
  Check,
  CircleAlert,
  CircleCheck,
  Command,
  GitPullRequest,
  LoaderCircle,
  RotateCcw,
  Rocket,
  Save,
  Zap,
} from 'lucide-react';
import { AccentPicker } from '@/components/portfolio/appearance-controls';
import { useCommandMenu } from '@/components/providers/command-menu';
import { Kbd } from '@/components/ui/kbd';
import {
  ACCENTS,
  originFromEvent,
  toggleMode,
  usePreferences,
} from '@/lib/preferences';
import { useIsApple } from '@/lib/use-platform';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Utilitários                                                                */
/* -------------------------------------------------------------------------- */

/** setTimeout que é cancelado automaticamente ao desmontar. */
function useTimeouts() {
  const ids = useRef<number[]>([]);

  useEffect(
    () => () => {
      ids.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  return {
    later(callback: () => void, ms: number) {
      ids.current.push(window.setTimeout(callback, ms));
    },
    clear() {
      ids.current.forEach((id) => window.clearTimeout(id));
      ids.current = [];
    },
  };
}

function Switch({
  checked,
  onChange,
  label,
  tone = 'brand',
}: {
  checked: boolean;
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: ReactNode;
  tone?: 'brand' | 'danger';
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="group inline-flex min-h-11 items-center gap-3 rounded-full text-sm text-ink-muted transition-colors hover:text-ink"
    >
      <span
        aria-hidden
        className={cn(
          'relative h-6 w-10 shrink-0 rounded-full border transition-colors duration-300',
          checked
            ? tone === 'danger'
              ? 'border-danger bg-danger'
              : 'border-brand bg-brand'
            : 'border-line-strong bg-elevated',
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 size-4.5 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.35)] transition-transform duration-300 ease-[var(--ease-spring)]',
            checked ? 'translate-x-4' : 'translate-x-0',
          )}
        />
      </span>
      {label}
    </button>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = options.findIndex((option) => option.value === value);

  const move = (next: number) => {
    const wrapped = (next + options.length) % options.length;
    onChange(options[wrapped].value);
    refs.current[wrapped]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          move(index + 1);
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          move(index - 1);
        }
      }}
      className="relative grid rounded-full border border-line bg-elevated p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 rounded-full bg-surface shadow-soft transition-transform duration-300 ease-[var(--ease-out-expo)]"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option, i) => (
        <button
          key={option.value}
          ref={(node) => {
            refs.current[i] = node;
          }}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          tabIndex={option.value === value ? 0 : -1}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative z-10 h-8 rounded-full px-4 text-xs font-medium transition-colors',
            option.value === value ? 'text-ink' : 'text-ink-subtle hover:text-ink',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 01 · Um botão, quatro estados                                              */
/* -------------------------------------------------------------------------- */

type ActionStatus = 'idle' | 'loading' | 'success' | 'error';

const ACTION_LABELS: Record<ActionStatus, { label: string; icon: ReactNode }> = {
  idle: { label: 'Salvar alterações', icon: <Save aria-hidden /> },
  loading: { label: 'Salvando…', icon: <LoaderCircle aria-hidden className="animate-spin" /> },
  success: { label: 'Salvo', icon: <Check aria-hidden strokeWidth={3} /> },
  error: { label: 'Tentar de novo', icon: <RotateCcw aria-hidden /> },
};

const ACTION_MESSAGES: Record<ActionStatus, string> = {
  idle: 'Clique para simular uma requisição.',
  loading: 'Enviando para o servidor…',
  success: 'Alterações salvas com sucesso.',
  error: 'Não foi possível salvar. Verifique a conexão e tente de novo.',
};

export function ActionStatesDemo() {
  const [status, setStatus] = useState<ActionStatus>('idle');
  const [shouldFail, setShouldFail] = useState(false);
  const timeouts = useTimeouts();
  const messageId = useId();

  const save = () => {
    if (status === 'loading') return;
    timeouts.clear();
    setStatus('loading');
    const fail = shouldFail;
    timeouts.later(() => {
      if (fail) {
        setStatus('error');
        return;
      }
      setStatus('success');
      timeouts.later(() => setStatus('idle'), 1800);
    }, 1300);
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <button
        type="button"
        onClick={save}
        aria-disabled={status === 'loading'}
        aria-describedby={messageId}
        className={cn(
          'relative inline-grid h-12 place-items-center rounded-full border px-6 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:scale-[0.97] [&_svg]:size-4',
          status === 'error'
            ? 'border-danger/50 bg-danger/10 text-danger [animation:shake_420ms_ease-in-out]'
            : 'border-transparent bg-brand text-on-brand shadow-[0_8px_24px_-10px_var(--brand)]',
          status === 'loading' && 'cursor-progress opacity-85',
        )}
      >
        {/* Todos os rótulos ocupam a mesma célula do grid: a largura do botão
            é a do maior rótulo e nunca muda entre estados. */}
        {(Object.keys(ACTION_LABELS) as ActionStatus[]).map((key) => (
          <span
            key={key}
            aria-hidden={key !== status}
            className={cn(
              'col-start-1 row-start-1 flex items-center gap-2 transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)]',
              key === status ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
            )}
          >
            {ACTION_LABELS[key].icon}
            {ACTION_LABELS[key].label}
          </span>
        ))}
      </button>

      <p
        id={messageId}
        aria-live="polite"
        className={cn(
          'flex min-h-10 max-w-xs items-start justify-center gap-1.5 text-center text-sm transition-colors',
          status === 'error' ? 'text-danger' : status === 'success' ? 'text-ink' : 'text-ink-subtle',
        )}
      >
        {ACTION_MESSAGES[status]}
      </p>

      <Switch
        checked={shouldFail}
        onChange={() => setShouldFail((value) => !value)}
        tone="danger"
        label="Simular falha de rede"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 · Validação no tempo certo                                              */
/* -------------------------------------------------------------------------- */

const DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.com.br': 'gmail.com',
  'gnail.com': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'yahoo.com.b': 'yahoo.com.br',
  'icloud.co': 'icloud.com',
};

function validateEmail(value: string) {
  const email = value.trim();
  if (!email) return 'Informe um e-mail.';
  if (!email.includes('@')) return 'Falta o “@”. Ex.: nome@empresa.com';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return 'Parece incompleto. Ex.: nome@empresa.com';
  }
  return null;
}

function suggestEmail(value: string) {
  const [user, domain] = value.trim().toLowerCase().split('@');
  const fixed = domain ? DOMAIN_TYPOS[domain] : undefined;
  return user && fixed ? `${user}@${fixed}` : null;
}

export function ValidationDemo() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeouts = useTimeouts();
  const inputId = useId();
  const messageId = useId();

  const error = validateEmail(value);
  const suggestion = error ? null : suggestEmail(value);
  const showError = touched && Boolean(error);
  const isValid = touched && !error;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (error) {
      inputRef.current?.focus();
      return;
    }
    setSent(true);
    timeouts.clear();
    timeouts.later(() => {
      setSent(false);
      setValue('');
      setTouched(false);
    }, 2600);
  };

  let message: ReactNode = 'Digite um e-mail e saia do campo.';
  if (sent) {
    message = (
      <span className="inline-flex items-center gap-1.5 text-ink">
        <CircleCheck aria-hidden className="size-4 shrink-0 text-success" />
        Tudo certo! (É só uma demo, nada foi enviado.)
      </span>
    );
  } else if (showError) {
    message = (
      <span className="inline-flex items-center gap-1.5 text-danger">
        <CircleAlert aria-hidden className="size-4 shrink-0" />
        {error}
      </span>
    );
  } else if (suggestion) {
    message = (
      <span>
        Você quis dizer{' '}
        <button
          type="button"
          onClick={() => {
            setValue(suggestion);
            inputRef.current?.focus();
          }}
          className="font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
        >
          {suggestion}
        </button>
        ?
      </span>
    );
  } else if (isValid) {
    message = <span className="text-ink-muted">Formato válido.</span>;
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        E-mail
      </label>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            id={inputId}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="nome@empresa.com"
            value={value}
            disabled={sent}
            onChange={(event) => setValue(event.target.value)}
            onBlur={() => {
              if (value) setTouched(true);
            }}
            aria-invalid={showError}
            aria-describedby={messageId}
            className={cn(
              'h-11 w-full rounded-xl border bg-canvas pl-3.5 pr-10 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-subtle/70 focus-visible:outline-none sm:text-sm',
              showError
                ? 'border-danger/70 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--danger)_25%,transparent)]'
                : 'border-line focus:border-brand/70 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_22%,transparent)]',
            )}
          />
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-success transition-[opacity,transform] duration-300 ease-[var(--ease-spring)]',
              isValid && !suggestion ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
            )}
          >
            <CircleCheck className="size-4.5" />
          </span>
        </div>
        <button
          type="submit"
          disabled={sent}
          className="h-11 shrink-0 rounded-xl bg-ink px-4 text-sm font-medium text-canvas transition-[opacity,transform] hover:opacity-90 active:scale-[0.97] disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
      <p
        id={messageId}
        aria-live="polite"
        className="min-h-10 text-sm leading-snug text-ink-subtle"
      >
        {message}
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 · Carregamento sem pulo                                                 */
/* -------------------------------------------------------------------------- */

const FEED = [
  { icon: Rocket, title: 'Deploy em produção concluído', meta: 'há 2 min' },
  { icon: GitPullRequest, title: 'Revisão aprovada no PR #128', meta: 'há 18 min' },
  { icon: Zap, title: 'Build finalizado em 42s', meta: 'há 1 h' },
];

export function SkeletonDemo() {
  const [strategy, setStrategy] = useState<'skeleton' | 'spinner'>('skeleton');
  const [loading, setLoading] = useState(false);
  const timeouts = useTimeouts();

  const reload = () => {
    timeouts.clear();
    setLoading(true);
    timeouts.later(() => setLoading(false), 1500);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Estratégia de carregamento"
          value={strategy}
          onChange={setStrategy}
          options={[
            { value: 'skeleton', label: 'Skeleton' },
            { value: 'spinner', label: 'Spinner' },
          ]}
        />
        <button
          type="button"
          onClick={reload}
          aria-disabled={loading}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-3.5 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink aria-disabled:cursor-progress"
        >
          <RotateCcw
            aria-hidden
            className={cn('size-3.5', loading && 'animate-spin [animation-direction:reverse]')}
          />
          Recarregar
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-canvas/60 p-2">
        <div aria-busy={loading} aria-live="polite">
          {loading ? <span className="sr-only">Carregando atividades…</span> : null}

          {loading && strategy === 'spinner' ? (
            <div className="flex h-12 items-center justify-center text-ink-subtle">
              <LoaderCircle aria-hidden className="size-5 animate-spin" />
            </div>
          ) : (
            <ul>
              {FEED.map((item) => (
                <li key={item.title} className="flex h-14 items-center gap-3 rounded-xl px-2">
                  {loading ? (
                    <>
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-elevated">
                        <Shimmer />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-2">
                        <span className="relative h-3 w-4/5 overflow-hidden rounded-full bg-elevated">
                          <Shimmer />
                        </span>
                        <span className="relative h-2.5 w-1/4 overflow-hidden rounded-full bg-elevated">
                          <Shimmer />
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-brand [animation:fade-in_400ms_ease-out]">
                        <item.icon aria-hidden className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col [animation:fade-in_400ms_ease-out]">
                        <span className="truncate text-sm font-medium leading-5 text-ink">
                          {item.title}
                        </span>
                        <span className="text-xs leading-4 text-ink-subtle">{item.meta}</span>
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-1 border-t border-line px-2 pt-2 text-center text-xs font-medium text-brand">
          Ver todas as atividades
        </div>
      </div>
    </div>
  );
}

function Shimmer() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 bg-linear-to-r from-transparent via-ink/8 to-transparent [animation:shimmer_1.4s_ease-in-out_infinite]"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* 04 · Tema em tempo real                                                    */
/* -------------------------------------------------------------------------- */

export function ThemeDemo() {
  const { mode, accent } = usePreferences();
  const current = ACCENTS.find((item) => item.id === accent) ?? ACCENTS[0];
  const lightness = mode === 'light' ? '0.52' : '0.80';

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <AccentPicker showLabel />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <Switch
          checked={mode !== 'light'}
          onChange={(event) => toggleMode(originFromEvent(event))}
          label="Tema escuro"
        />
        <span className="font-mono text-xs text-ink-subtle">salvo neste navegador</span>
      </div>
      <pre
        className="overflow-x-auto rounded-xl border border-line bg-canvas/70 px-4 py-3 font-mono text-[0.75rem] leading-relaxed text-ink-muted"
      >
        <code>
          <span className="text-ink-subtle">{'/* gerado agora */'}</span>
          {'\n'}
          <span className="text-brand">--brand</span>: oklch({lightness}{' '}
          {current.chroma.toFixed(2)} {current.hue});
        </code>
      </pre>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dica de atalho                                                             */
/* -------------------------------------------------------------------------- */

export function CommandHint() {
  const openCommandMenu = useCommandMenu();
  const isApple = useIsApple();

  return (
    <button
      type="button"
      onClick={openCommandMenu}
      className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 pr-6 text-left transition-colors hover:border-line-strong md:w-auto"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105">
        <Command aria-hidden className="size-4.5" />
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium text-ink">Paleta de comandos</span>
        <span className="flex flex-wrap items-center gap-1.5 text-xs text-ink-subtle">
          <span className="whitespace-nowrap [@media(hover:none)]:hidden">
            Aperte{' '}
            <Kbd className={cn(isApple === null && 'opacity-0')}>{isApple ? '⌘' : 'Ctrl'}</Kbd>{' '}
            <Kbd>K</Kbd> em qualquer lugar
          </span>
          <span className="hidden [@media(hover:none)]:inline">Toque para abrir</span>
        </span>
      </span>
    </button>
  );
}
