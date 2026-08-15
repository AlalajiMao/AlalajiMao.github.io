import type { Lang } from '../consts.ts';

/**
 * UI chrome strings only. Article bodies live in src/content/<collection>/<lang>/.
 * Keep both maps in sync — a missing key falls back to zh at runtime.
 */
export const ui = {
  zh: {
    'nav.notes': '学习笔记',
    'nav.labs': '实现',
    'nav.thoughts': '想法',
    'nav.about': '关于',
    'site.tagline': '关于 AI Agent 的学习记录,以及一些想法。',

    'home.notes.blurb': '按系列组织的学习笔记。源码阅读、机制拆解、踩过的坑。',
    'home.labs.blurb': 'idea 的实现。每个项目一页,写清前提、做法和结果。',
    'home.thoughts.blurb': '对 AI、生活、创作的一些看法。按时间排,写完不改。',
    'home.recent': '最近更新',
    'home.viewAll': '全部',

    'notes.title': '学习笔记',
    'notes.intro': '按系列组织,而不是按时间。每篇都标了成熟度和它所依据的版本。',
    'notes.series': '系列',
    'notes.standalone': '单篇',
    'notes.chapters': '章',
    'notes.empty': '还没有笔记。',
    'notes.inSeries': '所属系列',
    'notes.prev': '上一篇',
    'notes.next': '下一篇',
    'notes.toc': '本页目录',
    'notes.openQuestions': '还没搞懂的',
    'notes.openQuestions.hint': '这些是我目前答不上来的问题。比上面的结论更值得关注。',
    'notes.seriesMap': '系列地图',
    'notes.seriesMap.hint': '这个系列想回答什么,以及章节之间的依赖。',

    'labs.title': '实现',
    'labs.intro': 'idea 落地成代码的记录。',
    'labs.empty': '还没有内容。第一个实现在路上。',
    'labs.premise': '前提',
    'labs.repo': '代码',
    'labs.demo': 'Demo',

    'thoughts.title': '想法',
    'thoughts.intro': '观点性的文字。时间戳是它的一部分——一年后回看当时怎么想,才是价值所在。',
    'thoughts.empty': '还没有内容。',

    'status.seedling': '萌芽',
    'status.growing': '在长',
    'status.evergreen': '稳定',
    'status.seedling.hint': '粗糙的想法或不完整的笔记,随时会改。',
    'status.growing.hint': '主体成型,还在补充和修正。',
    'status.evergreen.hint': '我认为可靠,只做小幅维护。',

    'source.label': '本文依据的版本',
    'source.repo': '来源',
    'source.ref': '版本',
    'source.studiedAt': '阅读于',
    'source.permalink': '固定链接',
    'source.warning': '这类代码变化很快。如果你在很久之后读到,请以上面的版本为准来判断本文是否还成立。',

    'meta.created': '写于',
    'meta.updated': '更新于',
    'meta.readingTime': '约 {n} 分钟',

    'fallback.title': '这篇还没有中文版',
    'fallback.body': '这篇内容目前只有 {lang} 版。翻译是慢慢补的,不是每篇都会有两个版本。',
    'fallback.cta': '阅读 {lang} 版',
    'fallback.back': '返回列表',
    'lang.name.zh': '中文',
    'lang.name.en': '英文',

    'footer.builtWith': '用 Astro 搭的,源码在',
    'footer.rss': '订阅',
    'theme.toggle': '切换主题',
    'lang.switch': 'English',
  },

  en: {
    'nav.notes': 'Notes',
    'nav.labs': 'Labs',
    'nav.thoughts': 'Thoughts',
    'nav.about': 'About',
    'site.tagline': 'Learning notes on AI agents, and a few opinions.',

    'home.notes.blurb': 'Learning notes, grouped into series. Source reading, mechanisms, dead ends.',
    'home.labs.blurb': 'Ideas turned into code. One page each: premise, approach, result.',
    'home.thoughts.blurb': 'Opinions on AI, living, and making things. Dated, and left alone after.',
    'home.recent': 'Recently updated',
    'home.viewAll': 'All',

    'notes.title': 'Notes',
    'notes.intro':
      'Organized by series, not by date. Each note carries a maturity level and the exact version it describes.',
    'notes.series': 'Series',
    'notes.standalone': 'Standalone',
    'notes.chapters': 'ch.',
    'notes.empty': 'No notes yet.',
    'notes.inSeries': 'Part of',
    'notes.prev': 'Previous',
    'notes.next': 'Next',
    'notes.toc': 'On this page',
    'notes.openQuestions': "What I haven't figured out",
    'notes.openQuestions.hint': "Questions I currently can't answer. Worth more than the conclusions above.",
    'notes.seriesMap': 'Series map',
    'notes.seriesMap.hint': 'What this series is trying to answer, and how the chapters depend on each other.',

    'labs.title': 'Labs',
    'labs.intro': 'Ideas that made it into code.',
    'labs.empty': 'Nothing here yet. First build is on the way.',
    'labs.premise': 'Premise',
    'labs.repo': 'Code',
    'labs.demo': 'Demo',

    'thoughts.title': 'Thoughts',
    'thoughts.intro':
      'Opinion pieces. The timestamp is part of the content — the value is reading back what I thought at the time.',
    'thoughts.empty': 'Nothing here yet.',

    'status.seedling': 'Seedling',
    'status.growing': 'Growing',
    'status.evergreen': 'Evergreen',
    'status.seedling.hint': 'Rough idea or partial note. Expect it to change.',
    'status.growing.hint': 'Shape is there, still filling gaps and correcting things.',
    'status.evergreen.hint': 'I believe this one. Only light maintenance from here.',

    'source.label': 'What this note describes',
    'source.repo': 'Source',
    'source.ref': 'Version',
    'source.studiedAt': 'Read on',
    'source.permalink': 'Permalink',
    'source.warning':
      'This code moves fast. If you are reading long after the date above, check it against that version before trusting this note.',

    'meta.created': 'Written',
    'meta.updated': 'Updated',
    'meta.readingTime': '{n} min read',

    'fallback.title': 'Not available in English yet',
    'fallback.body':
      'This one currently exists only in {lang}. Translations get filled in gradually — not every piece gets both.',
    'fallback.cta': 'Read the {lang} version',
    'fallback.back': 'Back to the list',
    'lang.name.zh': 'Chinese',
    'lang.name.en': 'English',

    'footer.builtWith': 'Built with Astro. Source on',
    'footer.rss': 'RSS',
    'theme.toggle': 'Toggle theme',
    'lang.switch': '中文',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['zh'];
