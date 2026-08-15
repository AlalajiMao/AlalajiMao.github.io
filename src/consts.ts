export const SITE = {
  /**
   * Canonical origin. Used for sitemap, RSS and og:url.
   * When you attach a custom domain: change this, and add `public/CNAME`
   * containing just the bare hostname. Nothing else in the codebase cares.
   */
  url: 'https://alalajimao.github.io',
  author: 'Yukai Jiang',
  /** Optional external links rendered in the footer. Leave a value empty to hide it. */
  links: {
    github: 'https://github.com/AlalajiMao',
    email: '',
  },
} as const;

export const LANGS = ['zh', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'zh';

/** Note maturity — lets you publish unfinished notes instead of hoarding drafts. */
export const NOTE_STATUS = ['seedling', 'growing', 'evergreen'] as const;
export type NoteStatus = (typeof NOTE_STATUS)[number];
