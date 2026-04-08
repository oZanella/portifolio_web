import {
  siGit,
  siGraphql,
  siMysql,
  siNextdotjs,
  siPostman,
  siRadixui,
  siReact,
  siTailwindcss,
  siTanstack,
  siTypescript,
} from 'simple-icons/icons';

export type TechIconKey =
  | 'react'
  | 'next'
  | 'typescript'
  | 'tailwind'
  | 'radix'
  | 'tanstack'
  | 'graphql'
  | 'postman'
  | 'sql'
  | 'git';

export const techIconMap = {
  react: siReact,
  next: siNextdotjs,
  typescript: siTypescript,
  tailwind: siTailwindcss,
  radix: siRadixui,
  tanstack: siTanstack,
  graphql: siGraphql,
  postman: siPostman,
  sql: siMysql,
  git: siGit,
} as const;
