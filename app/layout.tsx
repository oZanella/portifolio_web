import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { AppProviders } from '@/components/providers/app-providers';
import { preferencesScript } from '@/lib/theme-config';
import { profile } from '@/lib/portfolio-data';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

const description =
  'Desenvolvedor fullstack. Aplicações completas com React, Next.js, TypeScript e Node.js, do back-end à interface, pensadas nos detalhes.';

export const metadata: Metadata = {
  title: `${profile.shortName} · ${profile.role}`,
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: `${profile.shortName} · ${profile.role}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#111216' },
    { media: '(prefers-color-scheme: light)', color: '#f9f8f6' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-mode="dark"
      data-accent="emerald"
      // O script abaixo ajusta tema/cor antes da hidratação.
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-on-brand shadow-lift transition-transform focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
