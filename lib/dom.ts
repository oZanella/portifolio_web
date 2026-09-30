export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Rola até a seção respeitando o header fixo (scroll-padding) e o
 * "reduzir movimento", e move o foco para ela: quem navega por teclado
 * ou leitor de tela continua a leitura do lugar certo.
 */
export function goToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
  target.focus({ preventScroll: true });
  history.replaceState(null, '', `#${id}`);
}

/** Copia texto com fallback para contextos sem Clipboard API (http, webviews). */
export async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // cai no fallback abaixo
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    return ok;
  } catch {
    return false;
  }
}

export function downloadFile(href: string) {
  const link = document.createElement('a');
  link.href = href;
  link.download = '';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function openExternal(href: string) {
  if (href.startsWith('mailto:')) {
    window.location.href = href;
    return;
  }
  window.open(href, '_blank', 'noopener,noreferrer');
}
