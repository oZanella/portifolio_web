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
  siNodedotjs,
  siExpress,
  siDocker,
  siFigma,
  siPrisma,
  siVercel,
  siPostgresql,
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
  | 'git'
  | 'node'
  | 'express'
  | 'docker'
  | 'figma'
  | 'prisma'
  | 'vercel'
  | 'postgresql';

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
  node: siNodedotjs,
  express: siExpress,
  docker: siDocker,
  figma: siFigma,
  prisma: siPrisma,
  vercel: siVercel,
  postgresql: siPostgresql,
} as const;
