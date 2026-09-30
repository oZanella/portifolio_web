import type { ReactNode } from 'react';
import { Accent, Section } from '@/components/portfolio/section';
import {
  ActionStatesDemo,
  CommandHint,
  SkeletonDemo,
  ThemeDemo,
  ValidationDemo,
} from '@/components/portfolio/lab-demos';

const experiments = [
  {
    title: 'Um botão, quatro estados',
    demo: <ActionStatesDemo />,
    why: 'A largura não muda entre estados, então nada pula na tela. Durante o carregamento uso aria-disabled em vez de disabled para o foco do teclado não se perder, e o resultado é anunciado para leitores de tela.',
  },
  {
    title: 'Validação no tempo certo',
    demo: <ValidationDemo />,
    why: 'O erro só aparece depois que você sai do campo e some assim que é corrigido. No celular abre o teclado de e-mail, sem autocorreção, e erros comuns de digitação como “gmial.com” ganham uma sugestão de um toque.',
  },
  {
    title: 'Carregamento sem pulo',
    demo: <SkeletonDemo />,
    why: 'O skeleton tem exatamente o tamanho do conteúdo final, então nada se move quando os dados chegam. Troque para “Spinner”, recarregue e repare no link de baixo pulando: é esse tipo de detalhe que eu evito.',
  },
  {
    title: 'Tema em tempo real',
    demo: <ThemeDemo />,
    why: 'As cores são tokens em OKLCH: cada tema é só um matiz e cada modo define a luminosidade, garantindo contraste nos dois. Trocar é mudar uma variável CSS, sem recarregar nada. A escolha fica salva e sincroniza entre abas.',
  },
];

function LabCard({
  index,
  title,
  why,
  children,
}: {
  index: number;
  title: string;
  why: string;
  children: ReactNode;
}) {
  return (
    <article className="spotlight reveal flex min-w-0 flex-col overflow-hidden rounded-[var(--radius)] border border-line bg-surface/70">
      <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <h3 className="flex min-w-0 items-center gap-3 text-sm font-medium text-ink">
          <span className="font-mono text-xs text-brand">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="truncate">{title}</span>
        </h3>
        <span aria-hidden className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
      </header>

      <div className="relative flex min-h-80 flex-1 items-center justify-center px-5 py-8 sm:px-8">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <div className="relative flex w-full justify-center">{children}</div>
      </div>

      <footer className="border-t border-line bg-canvas/30 px-5 py-4 text-sm leading-relaxed text-ink-muted">
        <span className="font-medium text-ink">Por quê: </span>
        {why}
      </footer>
    </article>
  );
}

export function Lab() {
  return (
    <Section
      id="laboratorio"
      index="03"
      eyebrow="Laboratório"
      title={
        <>
          Detalhes que ninguém vê, mas todo mundo <Accent>sente</Accent>.
        </>
      }
      description="Pequenos experimentos que mostram como eu penso interface. Tudo aqui funciona de verdade: clique, digite, erre de propósito."
      aside={<CommandHint />}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {experiments.map((experiment, index) => (
          <LabCard
            key={experiment.title}
            index={index}
            title={experiment.title}
            why={experiment.why}
          >
            {experiment.demo}
          </LabCard>
        ))}
      </div>
    </Section>
  );
}
