// Configuração de tema segura para o servidor (sem hooks): usada pelo
// layout (script anti-flash) e pelos componentes de cliente.

export const ACCENTS = [
  { id: 'emerald', name: 'Esmeralda', hue: 160, chroma: 0.15 },
  { id: 'sky', name: 'Céu', hue: 235, chroma: 0.14 },
  { id: 'violet', name: 'Violeta', hue: 290, chroma: 0.17 },
  { id: 'rose', name: 'Rosa', hue: 10, chroma: 0.18 },
  { id: 'amber', name: 'Âmbar', hue: 70, chroma: 0.16 },
  { id: 'cyan', name: 'Ciano', hue: 200, chroma: 0.13 },
] as const;

export type Accent = (typeof ACCENTS)[number]['id'];
export type Mode = 'light' | 'dark';

export const DEFAULT_ACCENT: Accent = 'emerald';
export const MODE_KEY = 'pf-mode';
export const ACCENT_KEY = 'pf-accent';

/**
 * Script executado no <head> antes da primeira pintura: aplica o tema salvo
 * (ou o do sistema) para que a página nunca "pisque" no tema errado.
 */
export const preferencesScript = `(function(){
var d=document.documentElement,m,a;
try{m=localStorage.getItem('${MODE_KEY}');a=localStorage.getItem('${ACCENT_KEY}')}catch(e){}
if(m!=='light'&&m!=='dark'){m=window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}
if(${JSON.stringify(ACCENTS.map((a) => a.id))}.indexOf(a)<0){a='${DEFAULT_ACCENT}'}
d.setAttribute('data-mode',m);d.setAttribute('data-accent',a);
})();`;
