import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LANGS, NOTE_STATUS } from './consts.ts';

/**
 * Every collection is laid out as `<collection>/<lang>/<path>`.
 * The leading directory IS the language — that is the only i18n convention
 * in this codebase, and `translationKey` (everything after it) is what pairs
 * a zh doc with its en counterpart.
 */
const byLangEntry = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');

const langDir = z.enum(LANGS);

/**
 * Source anchoring. Harness/source-reading notes go stale in weeks — a note
 * without a version anchor becomes a liability, because future-you cannot tell
 * whether it still holds. Every note that reads someone else's code should fill
 * this in.
 */
const source = z.object({
  /** Human label, e.g. "deepseek-ai/DeepSeek-V3" */
  repo: z.string().optional(),
  /** Commit SHA, tag or release the note describes. */
  ref: z.string().optional(),
  /** Permalink — prefer a /blob/<sha>/ URL over /blob/main/. */
  url: z.string().url().optional(),
  /** When you actually read it. */
  studiedAt: z.coerce.date().optional(),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes', generateId: byLangEntry }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Series slug — must equal the directory name holding the series. */
    series: z.string().optional(),
    /** Display title for the series, only needed on the overview doc. */
    seriesTitle: z.string().optional(),
    /** Chapter order inside the series. `0` marks the series overview/map. */
    order: z.number().default(999),
    status: z.enum(NOTE_STATUS).default('seedling'),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    source: source.optional(),
    /** The most valuable section of a learning note. Rendered as its own block. */
    openQuestions: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const labs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/labs', generateId: byLangEntry }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Link out to the code. */
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    /** One line: what question this build was trying to answer. */
    premise: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/thoughts', generateId: byLangEntry }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    created: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, labs, thoughts };

export type CollectionName = keyof typeof collections;
export { langDir };
