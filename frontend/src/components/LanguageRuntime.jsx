import { useEffect } from 'react';
import { useLanguage, translateText } from '../context/LanguageContext';

const ATTRS = ['placeholder', 'aria-label', 'title'];

export default function LanguageRuntime() {
  const { language } = useLanguage();

  useEffect(() => {
    const translate = () => {
      const root = document.getElementById('root');
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.forEach((n) => {
        const value = n.nodeValue;
        if (!value || !value.trim()) return;
        const leading = value.match(/^\s*/)?.[0] || '';
        const trailing = value.match(/\s*$/)?.[0] || '';
        const core = value.trim();
        const translated = translateText(core, language);
        if (translated !== core) n.nodeValue = `${leading}${translated}${trailing}`;
      });
      root.querySelectorAll('*').forEach((el) => {
        ATTRS.forEach((attr) => {
          const value = el.getAttribute(attr);
          if (!value) return;
          const translated = translateText(value, language);
          if (translated !== value) el.setAttribute(attr, translated);
        });
      });
    };

    const observer = new MutationObserver(() => requestAnimationFrame(translate));
    observer.observe(document.getElementById('root'), { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    translate();
    return () => observer.disconnect();
  }, [language]);

  return null;
}
