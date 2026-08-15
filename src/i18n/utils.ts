import { getCollection, type CollectionEntry } from 'astro:content';
import { ui, type UIKey } from './ui.ts';
import { DEFAULT_LANG, LANGS, type Lang } from '../consts.ts';

export type AnyEntry = CollectionEntry<'notes'> | CollectionEntry<'labs'> | CollectionEntry<'thoughts'>;

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** Translator bound to a language, falling back to the default locale per key. */
export function t(lang: Lang) {
  return (key: UIKey, vars?: Record<string, string | number>): string => {
    const raw: string = ui[lang][key] ?? ui[DEFAULT_LANG][key] ?? key;
    if (!vars) return raw;
    return Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), raw);
  };
}

/** `/zh/notes` — every internal link in the site goes through here. */
export function path(lang: Lang, ...segments: string[]): string {
  const tail = segments.filter(Boolean).join('/').replace(/^\/+|\/+$/g, '');
  return tail ? `/${lang}/${tail}/` : `/${lang}/`;
}

/**
 * Entry ids are `<lang>/<rest>`. The `rest` half is the translation key: two
 * entries sharing it are the same document in different languages.
 */
export function splitId(id: string): { lang: Lang; key: string } {
  const [head, ...rest] = id.split('/');
  return isLang(head) ? { lang: head, key: rest.join('/') } : { lang: DEFAULT_LANG, key: id };
}

export function otherLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}

/**
 * A note's public slug. The series overview (`order: 0`) is hoisted to the
 * series root, so a series reads as
 *   /zh/notes/deepseek-harness/            <- the map
 *   /zh/notes/deepseek-harness/01-foo/     <- a chapter
 */
export function noteSlug(entry: CollectionEntry<'notes'>): string {
  const { key } = splitId(entry.id);
  if (entry.data.order === 0 && entry.data.series) return entry.data.series;
  return key;
}

export function isDraft(entry: AnyEntry): boolean {
  return entry.data.draft === true;
}

/** Published entries of one collection, in one language. */
export async function published<C extends 'notes' | 'labs' | 'thoughts'>(
  collection: C,
  lang: Lang,
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection);
  return all.filter((e) => {
    if (import.meta.env.PROD && isDraft(e as AnyEntry)) return false;
    return splitId(e.id).lang === lang;
  }) as CollectionEntry<C>[];
}

/** Same, across every language — used to build the translation-fallback routes. */
export async function publishedAllLangs<C extends 'notes' | 'labs' | 'thoughts'>(
  collection: C,
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection);
  return all.filter((e) => !(import.meta.env.PROD && isDraft(e as AnyEntry))) as CollectionEntry<C>[];
}

export type Series = {
  slug: string;
  title: string;
  description: string;
  overview: CollectionEntry<'notes'> | undefined;
  chapters: CollectionEntry<'notes'>[];
  updated: Date;
};

/** Group a language's notes into series + standalone, sorted for display. */
export function groupNotes(notes: CollectionEntry<'notes'>[]): {
  series: Series[];
  standalone: CollectionEntry<'notes'>[];
} {
  const buckets = new Map<string, CollectionEntry<'notes'>[]>();
  const standalone: CollectionEntry<'notes'>[] = [];

  for (const note of notes) {
    const s = note.data.series;
    if (!s) {
      standalone.push(note);
      continue;
    }
    const bucket = buckets.get(s) ?? [];
    bucket.push(note);
    buckets.set(s, bucket);
  }

  const series: Series[] = [...buckets.entries()].map(([slug, entries]) => {
    const sorted = entries.sort((a, b) => a.data.order - b.data.order);
    const overview = sorted.find((e) => e.data.order === 0);
    const chapters = sorted.filter((e) => e.data.order !== 0);
    return {
      slug,
      title: overview?.data.seriesTitle ?? overview?.data.title ?? slug,
      description: overview?.data.description ?? '',
      overview,
      chapters,
      updated: latest(sorted),
    };
  });

  series.sort((a, b) => b.updated.getTime() - a.updated.getTime());
  standalone.sort((a, b) => touched(b).getTime() - touched(a).getTime());
  return { series, standalone };
}

export function touched(entry: CollectionEntry<'notes'> | CollectionEntry<'labs'>): Date;
export function touched(entry: CollectionEntry<'thoughts'>): Date;
export function touched(entry: AnyEntry): Date {
  const data = entry.data as { created: Date; updated?: Date };
  return data.updated ?? data.created;
}

function latest(entries: CollectionEntry<'notes'>[]): Date {
  return entries.reduce<Date>((max, e) => {
    const d = touched(e);
    return d > max ? d : max;
  }, new Date(0));
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: lang === 'zh' ? 'numeric' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** CJK has no spaces, so word-splitting undercounts badly. Count chars for zh. */
export function readingTime(body: string, lang: Lang): number {
  if (lang === 'zh') {
    const cjk = (body.match(/[一-鿿㐀-䶿]/g) ?? []).length;
    const words = (body.replace(/[一-鿿㐀-䶿]/g, ' ').match(/\S+/g) ?? []).length;
    return Math.max(1, Math.round(cjk / 400 + words / 220));
  }
  return Math.max(1, Math.round((body.match(/\S+/g) ?? []).length / 220));
}
