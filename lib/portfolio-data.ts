import type { TechIconKey } from '@/lib/tech-icons';

export const profile = {
  name: 'Henrique Zanella Flores da Silva',
  shortName: 'Henrique Zanella',
  firstName: 'Henrique',
  initials: 'HZ',
  role: 'Desenvolvedor Fullstack',
  location: 'Caxias do Sul, RS',
  timeZone: 'America/Sao_Paulo',
  photo: '/eu2026.png',
  cv: '/CurriculoHenrique2026.pdf',
  intro:
    'Desenvolvedor fullstack focado em construir aplicações completas, escaláveis e de alto desempenho, das APIs e regras de negócio até a interface, com um cuidado especial pela camada que as pessoas realmente tocam.',
  about: [
    'Tenho domínio do ecossistema JavaScript e TypeScript, criando desde interfaces modernas com React e Next.js até APIs e regras de negócio no back-end.',
    'Minha vivência na transição do suporte técnico para o desenvolvimento me deu uma visão muito clara sobre a experiência do usuário final e a resolução de problemas críticos em sistemas de gestão complexos (ERP e CRM).',
    'Além da parte técnica, tenho base acadêmica em Engenharia de Software e Gestão de Projetos, com conhecimento em modelagem UML, PMBOK e normas de qualidade ISO 9001. Gosto de desafios que exigem visão sistêmica para unir tecnologia e eficiência operacional.',
  ],
  availability: 'Disponível para oportunidades CLT',
};

export const contact = {
  email: 'henriquezanella19@gmail.com',
  phone: '(54) 99671-4548',
  whatsapp: 'https://wa.me/5554996714548',
  linkedin: 'https://www.linkedin.com/in/henrique-zanella-74b9a9205/',
  github: 'https://github.com/oZanella',
  instagram: 'https://www.instagram.com/zanella_03/',
};

export const socials = [
  { label: 'LinkedIn', href: contact.linkedin, icon: 'linkedin' },
  { label: 'GitHub', href: contact.github, icon: 'github' },
  { label: 'WhatsApp', href: contact.whatsapp, icon: 'whatsapp' },
  { label: 'Instagram', href: contact.instagram, icon: 'instagram' },
] as const satisfies ReadonlyArray<{
  label: string;
  href: string;
  icon: TechIconKey;
}>;

export const metrics = [
  { value: '3+', label: 'anos construindo e sustentando software' },
  { value: '2', label: 'sistemas de gestão no currículo (ERP e CRM)' },
  { value: '2', label: 'equipes lideradas no suporte' },
];

export const principles = [
  {
    title: 'O usuário vem primeiro',
    description:
      'Anos no suporte me mostraram onde as interfaces falham: na mensagem de erro confusa, no botão que não responde, no fluxo que ninguém testou. Eu construo pensando em quem vai usar.',
  },
  {
    title: 'Componentes antes de telas',
    description:
      'Penso em sistema: peças reutilizáveis, acessíveis e consistentes que tornam cada nova tela mais rápida de construir e mais fácil de manter.',
  },
  {
    title: 'Todo estado importa',
    description:
      'Carregando, vazio, erro, sucesso. Uma interface só está pronta quando já pensou no que pode dar errado, e em como ajudar a pessoa quando der.',
  },
  {
    title: 'Visão de ponta a ponta',
    description:
      'Do banco de dados à interface: entendo a regra de negócio para desenhar soluções que fazem sentido no todo, não só na tela.',
  },
];

export const mainStack = [
  { label: 'React', icon: 'react' },
  { label: 'Next.js', icon: 'next' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'Node.js', icon: 'node' },
] as const satisfies ReadonlyArray<{ label: string; icon: TechIconKey }>;

export const skills = [
  {
    title: 'Frontend',
    description: 'Interfaces acessíveis, rápidas e consistentes.',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Radix UI',
      'Shadcn/UI',
      'Zustand / Redux',
    ],
  },
  {
    title: 'Backend & Dados',
    description: 'APIs, regras de negócio e dados bem modelados.',
    items: [
      'Node.js',
      'Express',
      'Prisma ORM',
      'PostgreSQL / MySQL',
      'REST APIs',
      'GraphQL',
      'TanStack Query',
    ],
  },
  {
    title: 'Ferramentas & Processo',
    description: 'Do design ao deploy, com qualidade no caminho.',
    items: [
      'Git / GitHub',
      'Postman',
      'Docker',
      'Figma',
      'CI/CD (GitHub Actions)',
      'UML',
      'PMBOK',
    ],
  },
];

export const techCarousel = [
  { label: 'React', icon: 'react' },
  { label: 'Next.js', icon: 'next' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'Tailwind CSS', icon: 'tailwind' },
  { label: 'Radix UI', icon: 'radix' },
  { label: 'Shadcn/UI', icon: 'shadcn' },
  { label: 'TanStack', icon: 'tanstack' },
  { label: 'GraphQL', icon: 'graphql' },
  { label: 'Node.js', icon: 'node' },
  { label: 'Prisma', icon: 'prisma' },
  { label: 'PostgreSQL', icon: 'postgresql' },
  { label: 'MySQL', icon: 'sql' },
  { label: 'Docker', icon: 'docker' },
  { label: 'Git', icon: 'git' },
  { label: 'Postman', icon: 'postman' },
  { label: 'Figma', icon: 'figma' },
  { label: 'Vercel', icon: 'vercel' },
] as const satisfies ReadonlyArray<{ label: string; icon: TechIconKey }>;

export type Project = {
  title: string;
  kind: string;
  year?: string;
  description: string;
  highlights: string[];
  stack: string[];
  link: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: 'LifeOS',
    kind: 'Projeto pessoal',
    description:
      'Dashboard para controle de hábitos, finanças e tarefas, com foco em usabilidade e design.',
    highlights: [
      'Painel único para hábitos, finanças e tarefas',
      'Componentes acessíveis com Radix UI e Shadcn',
      'Autenticação e persistência em banco SQL',
    ],
    stack: ['Next.js', 'TypeScript', 'Shadcn', 'Radix UI', 'SQL'],
    link: 'https://life-os-gray-iota.vercel.app/login',
    image: '/lifeOs-image.png',
  },
  {
    title: 'EcoRecicla',
    kind: 'Projeto acadêmico',
    description:
      'Plataforma de gestão de descarte de eletrônicos, com pontos de coleta, agendamento de coletas e conteúdo educativo.',
    highlights: [],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://ecoprojeto.vercel.app/',
    image: '/ecorecicla-image.png',
  },
  {
    title: 'Revitalize',
    kind: 'TCC',
    description:
      'Projeto de conclusão de curso para controle de treinos e alimentação, focado em saúde e bem-estar.',
    highlights: [],
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://projetorevitalize.github.io/Projeto-Empreendedor-II/',
    image: '/revitalize-image.png',
  },
];

export const experience = [
  {
    company: 'Windel Sistemas',
    role: 'Desenvolvedor',
    period: '2025 — Atual',
    current: true,
    summary:
      'Participei do desenvolvimento inicial do ERP e hoje contribuo com o CRM: construo as interfaces dos sistemas que antes eu ajudava a suportar.',
    bullets: [
      'Atuação no desenvolvimento inicial do sistema ERP e posterior contribuição no CRM da empresa.',
      'Desenvolvimento de interfaces responsivas utilizando Next.js, React e TypeScript.',
      'Construção de UI com Tailwind CSS e Radix UI, com foco em usabilidade, acessibilidade e performance.',
      'Integração com APIs REST e GraphQL, com TanStack Query para estado e requisições.',
      'Implementação de testes automatizados para garantir qualidade e estabilidade.',
    ],
  },
  {
    company: 'Windel Sistemas',
    role: 'Suporte Técnico · Supervisor',
    period: '2023 — 2025',
    current: false,
    summary:
      'Onde aprendi, na prática, como o software se comporta nas mãos de quem usa todo dia.',
    bullets: [
      'Supervisão de equipe: planejamento, distribuição e acompanhamento de atividades, garantindo prazos e qualidade.',
      'Suporte técnico e técnico de qualidade, com foco em identificar e resolver problemas complexos.',
      'Tratamento e análise de reclamações, promovendo melhorias contínuas nos processos.',
      'Auxiliar de desenvolvimento na evolução dos sistemas internos ERP e CRM.',
      'Geração e validação da Escrituração Fiscal Digital (EFD) e relatórios personalizados via SQL.',
    ],
  },
];

export const education = [
  {
    school: 'Centro Universitário UNIFTEC',
    course: 'Análise e Desenvolvimento de Sistemas',
    period: '2023 — 2025',
    topics: [
      'Engenharia de Software',
      'Gestão de Projetos',
      'UML',
      'PMBOK',
      'ISO 9001',
    ],
  },
];

export const navItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'laboratorio', label: 'Laboratório' },
  { id: 'stack', label: 'Stack' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
] as const;
