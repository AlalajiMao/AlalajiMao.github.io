// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/consts.ts';

export default defineConfig({
  // Change this to your custom domain when you buy one — nothing else needs to move.
  site: SITE.url,

  integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'zh', locales: { zh: 'zh-CN', en: 'en' } } })],

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: true },
  },

  // "/" is a meta-refresh stub into the default locale. Works on GitHub Pages.
  redirects: { '/': '/zh/' },

  markdown: {
    processor: unified({ rehypePlugins: [rehypeTableScroll] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});

/**
 * Wrap every markdown table in a horizontally scrollable div, so a wide table
 * scrolls inside itself instead of making the whole page scroll sideways on
 * mobile. Hand-rolled to avoid pulling in unist-util-visit for six lines.
 */
function rehypeTableScroll() {
  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'] },
            children: [child],
          };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}
