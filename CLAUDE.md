# AlalajiMao.github.io

Personal site: AI-agent learning notes, builds, and opinion pieces. Astro 7, static output,
deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.

## Commands

```bash
npm run dev      # localhost:4321
npm run build    # → dist/, also type-checks content frontmatter
npm run preview  # serve dist/
```

## The three content lines — keep them separate

They are separated on purpose, because they are organized and maintained differently. Do not
collapse them into one chronological blog.

| Collection | Route | Organized by | Lifecycle |
| --- | --- | --- | --- |
| `notes` | `/[lang]/notes/` | **series** + chapter order | rewritten repeatedly |
| `labs` | `/[lang]/labs/` | per project | fixed once written |
| `thoughts` | `/[lang]/thoughts/` | reverse chronological | never edited after publishing |

Schemas live in `src/content.config.ts`.

## The one i18n convention

**Every content path is `<collection>/<lang>/<rest>`.** The leading directory *is* the language;
`<rest>` is the "translation key" that pairs a zh document with its en counterpart.

```
src/content/notes/zh/deepseek-harness/01-boundaries.md
src/content/notes/en/deepseek-harness/01-boundaries.md   ← same key ⇒ same document
```

Routes are generated for **every** language of every document, including untranslated ones. A
missing translation renders `TranslationFallback` (a notice linking to the version that exists)
instead of 404ing or dropping out of the nav — so a half-translated site degrades one page at a
time. Never "fix" a missing translation by deleting the pairing.

UI chrome strings are in `src/i18n/ui.ts` (both maps must have every key; a missing key falls back
to zh). Article bodies are never in `ui.ts`.

Build all internal links with `path(lang, ...segments)` from `src/i18n/utils.ts` — never hand-write
`/zh/notes/...`.

## Notes-specific conventions

- **`order: 0` marks the series overview** and is hoisted to the series root URL:
  `/zh/notes/deepseek-harness/`. Chapters (`order: 1..n`) sit beneath it. `noteSlug()` encodes this.
- **`source` frontmatter is a version anchor**, and any note that reads someone else's code should
  fill it in. Use a permalink pinned to a commit SHA, never `/blob/main/`. Renders as the warning
  panel at the top of the article.
- **`openQuestions`** renders as its own block after the body. Treated as a first-class part of a
  note, not an afterthought.
- **`status`** is `seedling | growing | evergreen` — confidence, not completeness. It exists so
  unfinished notes can ship.

## Adding content

New chapter in an existing series:

```
src/content/notes/zh/<series-slug>/NN-<slug>.md
```

with `series: <series-slug>` and `order: NN` in frontmatter. The series map and prev/next links
regenerate automatically — no index to update.

New series: create the directory plus an `overview.md` carrying `order: 0`, `series`, and
`seriesTitle`.

`draft: true` hides an entry in production builds but keeps it visible in `npm run dev`.

## Styling

One stylesheet: `src/styles/global.css`, tokens at the top, dark overrides in the single
`:root[data-theme='dark']` block. Component-specific rules go in the component's own `<style>`
block. Prose styling is all under `.prose`.

Both themes must work — the toggle stamps `data-theme` on `<html>`, and an inline script in
`BaseLayout.astro` applies it before first paint to avoid a flash.

## Custom domain

Change `SITE.url` in `src/consts.ts` and add `public/CNAME` containing the bare hostname. Nothing
else in the codebase reads the origin.
