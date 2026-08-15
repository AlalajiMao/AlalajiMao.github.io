# AlalajiMao.github.io

个人主页 —— AI Agent 学习笔记、实现记录,以及一些想法。中英双语。

Astro 7 · 静态输出 · push 到 `main` 后由 GitHub Actions 自动部署。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:4321
```

`npm run build` 会顺带校验所有 frontmatter,写错字段会直接构建失败。

## 三条内容线

分开是刻意的 —— 三者的组织方式和生命周期不同,不要合成一个按时间排的 blog。

| 板块 | 路径 | 组织方式 | 生命周期 |
| --- | --- | --- | --- |
| `notes` 学习笔记 | `/[lang]/notes/` | 按**系列** + 章节顺序 | 会被反复重写 |
| `labs` 实现 | `/[lang]/labs/` | 按项目 | 定稿后基本不动 |
| `thoughts` 想法 | `/[lang]/thoughts/` | 按时间倒序 | 发布后不改 |

## 加内容

所有内容路径都是 `<collection>/<lang>/<rest>`。**开头那层目录就是语言。**

给现有系列加一章:

```
src/content/notes/zh/deepseek-harness/02-context.md
```

frontmatter 里写 `series: deepseek-harness` 和 `order: 2`。系列地图、上一篇/下一篇、
首页列表、RSS 全部自动更新,没有索引文件要手动改。

开新系列:建目录,加一个 `overview.md`,frontmatter 里 `order: 0` + `series` + `seriesTitle`。

`draft: true` 的内容只在 `npm run dev` 里可见,不会发布。

### 双语

同名文件放到另一个语言目录下就配成一对:

```
src/content/notes/zh/deepseek-harness/01-boundaries.md
src/content/notes/en/deepseek-harness/01-boundaries.md   ← 同名 ⇒ 同一篇
```

**没写译文不会导致死链。** 缺的那一边会生成一个「暂无译文」页,链回存在的那个版本。
所以可以只写中文,以后想补再补。

## 笔记的三个约定

1. **`source` 是版本锚点。** 读别人代码的笔记必须填,permalink 要钉到 commit sha,
   不要用 `/blob/main/`。渲染成文章顶部那个提示框。
2. **`openQuestions` 是正式内容**,不是脚注。渲染成正文后面的独立区块。
3. **`status` 表示信心,不是完成度**(`seedling` / `growing` / `evergreen`)。
   它存在的意义就是让没写完的笔记也能发出来。

## 换自定义域名

改 `src/consts.ts` 里的 `SITE.url`,加一个 `public/CNAME` 文件写裸域名。
代码里没有别的地方读 origin。
