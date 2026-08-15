import rss from '@astrojs/rss';
import type { APIRoute, GetStaticPaths } from 'astro';
import { LANGS, SITE, type Lang } from '../consts.ts';
import { noteSlug, path, published, splitId, t, touched } from '../i18n/utils.ts';

export const getStaticPaths: GetStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const tr = t(lang);

  const [notes, thoughts, labs] = await Promise.all([
    published('notes', lang),
    published('thoughts', lang),
    published('labs', lang),
  ]);

  const items = [
    ...notes.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      link: path(lang, 'notes', noteSlug(e)),
      pubDate: touched(e),
      categories: [tr('nav.notes'), ...e.data.tags],
    })),
    ...thoughts.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      link: path(lang, 'thoughts', splitId(e.id).key),
      pubDate: e.data.created,
      categories: [tr('nav.thoughts'), ...e.data.tags],
    })),
    ...labs.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      link: path(lang, 'labs', splitId(e.id).key),
      pubDate: touched(e),
      categories: [tr('nav.labs'), ...e.data.tags],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: `${SITE.author} — ${tr('site.tagline')}`,
    description: tr('site.tagline'),
    site: site ?? SITE.url,
    items,
    customData: `<language>${lang === 'zh' ? 'zh-cn' : 'en-us'}</language>`,
  });
};
