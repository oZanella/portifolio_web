import type { Metadata } from 'next';
import { IBM_Plex_Mono, Merriweather, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const display = Merriweather({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
});

const body = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Portfólio | Henrique Zanella',
  description:
    'Portfólio profissional com sobre, habilidades, experiências, projetos e contato.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full scroll-smooth antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
