import type { TechIconKey } from '@/lib/tech-icons';

export const profile = {
  name: 'Henrique Zanella Flores da Silva',
  initials: 'HZ',
  role: 'Desenvolvedor de Software | Especialista em Front-end & Sistemas ERP/CRM',
  headline:
    'Desenvolvedor frontend focado em interfaces claras e produtos escaláveis.',
  about: [
    'Sou um desenvolvedor de software com foco em criar interfaces modernas, intuitivas e de alto desempenho. Minha experiência central envolve o ecossistema JavaScript, com domínio em React, Next.js, TypeScript e Tailwind CSS.',
    'Tenho um histórico sólido na transição de suporte técnico para o desenvolvimento, o que me proporcionou uma visão única sobre a experiência do usuário final e a resolução de problemas críticos em sistemas de gestão (ERP e CRM).',
    'Além da parte técnica, possuo sólida base acadêmica em Engenharia de Software e Gestão de Projetos, com conhecimento em modelagem UML, diretrizes do PMBOK e normas de qualidade como a ISO9001. Sou movido por desafios que unam tecnologia de ponta à eficiência operacional.',
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
  { label: 'Sistemas trabalhados', value: '2' },
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
    title: 'Projeto pessoal - LifeOs',
    description:
      'Dashboard para controle de hábitos, finanças e tarefas, com foco em usabilidade e design.',
    stack: [
      'Next.js',
      'TypeScript',
      'Shadcn',
      'Radix UI',
      'SQL',
      'Lucide Icons',
    ],
    link: 'https://life-os-gray-iota.vercel.app/login',
    image: '/lifeOs-image.png',
  },
  {
    title: 'Revitalize',
    description:
      'Projeto de finalização de graduação (TCC) para controle de treinos e alimentação, focado em saúde e bem-estar.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://projetorevitalize.github.io/Projeto-Empreendedor-II/',
    image: '/revitalize-image.png',
  },
  {
    title: 'EcoRecicla',
    description:
      'Validação e apoio à Escrituração Fiscal Digital, com foco em conformidade e qualidade dos dados.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
    link: 'https://ecoprojeto.vercel.app/',
    image: '/ecorecicla-image.png',
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
