import type { TechIconKey } from '@/lib/tech-icons';

export const profile = {
  name: 'Henrique Zanella Flores da Silva',
  initials: 'HZ',
  role: 'Desenvolvedor Frontend',
  headline:
    'Desenvolvedor frontend focado em interfaces claras e produtos escaláveis.',
  summary:
    'Graduado em Análise e Desenvolvimento de Sistemas com experiência prática em ERP e CRM. Trabalho com React, Next.js, TypeScript e Tailwind CSS, criando interfaces consistentes, performáticas e acessíveis.',
  about: [
    'Tenho experiência em projetos corporativos e na evolução de sistemas críticos, sempre com foco em usabilidade, qualidade e manutenção de código.',
    'Busco atuar em times que valorizam boas práticas, colaboração e entrega contínua de valor ao usuário final.',
  ],
  availability: 'Disponível para oportunidades CLT ou PJ.',
};

export const contact = {
  address: 'Rua Princesa 333, São Ciro - Caxias do Sul',
  phone: '(54) 99671-4548',
  email: 'henriquezanella19@gmail.com',
  age: '23 anos',
  nationality: 'Brasileiro',
};

export const metrics = [
  { label: 'Sistemas ERP e CRM', value: '2' },
  { label: 'Anos de experiência', value: '3+' },
  { label: 'Times liderados', value: '2' },
];

export const highlights = [
  'Componentização consistente com Radix UI',
  'Gestão de estado e cache com TanStack Query',
  'Foco em acessibilidade e performance',
];

export const mainStack = [
  { label: 'React', icon: 'react', tone: 'tech-react' },
  { label: 'Next.js', icon: 'next', tone: 'tech-next' },
  { label: 'TypeScript', icon: 'typescript', tone: 'tech-typescript' },
  { label: 'Tailwind', icon: 'tailwind', tone: 'tech-tailwind' },
] as const satisfies ReadonlyArray<{
  label: string;
  icon: TechIconKey;
  tone: string;
}>;

export const skills = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
  },
  {
    title: 'Dados & APIs',
    items: ['REST APIs', 'GraphQL', 'TanStack Query', 'Postman'],
  },
  {
    title: 'Ferramentas',
    items: ['Git', 'GitHub', 'SQL / MySQL', 'Testes automatizados'],
  },
];

export const techCarousel = [
  { label: 'React', shorthand: 'React', icon: 'react', tone: 'tech-react' },
  { label: 'Next.js', shorthand: 'Next.js', icon: 'next', tone: 'tech-next' },
  {
    label: 'TypeScript',
    shorthand: 'TypeScript',
    icon: 'typescript',
    tone: 'tech-typescript',
  },
  {
    label: 'Tailwind',
    shorthand: 'Tailwind',
    icon: 'tailwind',
    tone: 'tech-tailwind',
  },
  {
    label: 'Radix UI',
    shorthand: 'Radix UI',
    icon: 'radix',
    tone: 'tech-radix',
  },
  {
    label: 'TanStack',
    shorthand: 'TanStack',
    icon: 'tanstack',
    tone: 'tech-tanstack',
  },
  {
    label: 'GraphQL',
    shorthand: 'GraphQL',
    icon: 'graphql',
    tone: 'tech-graphql',
  },
  {
    label: 'Postman',
    shorthand: 'Postman',
    icon: 'postman',
    tone: 'tech-postman',
  },
  { label: 'SQL', shorthand: 'SQL / MySQL', icon: 'sql', tone: 'tech-sql' },
  { label: 'Git', shorthand: 'Git', icon: 'git', tone: 'tech-git' },
] as const satisfies ReadonlyArray<{
  label: string;
  shorthand: string;
  icon: TechIconKey;
  tone: string;
}>;

export const projects = [
  {
    title: 'Windel ERP',
    description:
      'Atuação no desenvolvimento inicial do ERP, construindo fluxos essenciais e interfaces voltadas à produtividade.',
    stack: ['Next.js', 'TypeScript', 'REST'],
    link: '#',
  },
  {
    title: 'Windel CRM',
    description:
      'Evolução do CRM com integrações, otimização de performance e foco em experiência do usuário.',
    stack: ['React', 'Tailwind', 'TanStack Query'],
    link: '#',
  },
  {
    title: 'EFD Digital',
    description:
      'Validação e apoio à Escrituração Fiscal Digital, com foco em conformidade e qualidade dos dados.',
    stack: ['SQL', 'Postman', 'Processos'],
    link: '#',
  },
];

export const experience = [
  {
    company: 'Windel Sistemas',
    role: 'Desenvolvedor Frontend',
    period: '2025 - Atual',
    bullets: [
      'Desenvolvimento de interfaces responsivas utilizando Next.js, React e TypeScript.',
      'Construção de UI com Tailwind CSS e Radix UI, focando em acessibilidade e performance.',
      'Integração com APIs REST e GraphQL, com TanStack Query para cache e estado.',
      'Implementação de testes automatizados para garantir qualidade e estabilidade.',
    ],
  },
  {
    company: 'Windel Sistemas',
    role: 'Suporte Técnico / Supervisor',
    period: '2023 - 2025',
    bullets: [
      'Liderança de equipe e organização de processos operacionais e técnicos.',
      'Atendimento ao público e gestão de reclamações, promovendo melhorias contínuas.',
      'Apoio ao desenvolvimento e manutenção de sistemas internos ERP e CRM.',
    ],
  },
];

export const education = [
  {
    school: 'Centro Universitário UNIFTEC',
    course: 'Análise e Desenvolvimento de Sistemas',
    period: '2023 - 2025',
  },
];

export const socials = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Email', href: 'mailto:henriquezanella19@gmail.com' },
];
