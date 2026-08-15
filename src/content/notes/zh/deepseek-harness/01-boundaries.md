---
title: 一次调用的边界在哪
description: agent loop 的输入输出契约,以及状态由谁持有。
series: deepseek-harness
order: 1
status: seedling
created: 2026-08-15
tags: [agent, harness, agent-loop]
source:
  repo: TODO — 填成 owner/repo
  ref: TODO — 填成具体 commit sha 或 tag
  url: https://github.com/
  studiedAt: 2026-08-15
openQuestions:
  - 状态放在调用方还是 harness 内部,这个选择会往下游传导出哪些约束?
  - 如果要支持中断后恢复,现在这个边界够不够?
---

> **本章是模板,内容待填。** 保留了我想让每章都长成的样子:先锚版本,再给结论,
> 然后才是推导过程,最后留下没搞懂的。frontmatter 里的 `source` 三个 TODO 记得替换掉。

## 一句话结论

<!-- 先写结论。如果写不出一句话,说明这章还不该开始写。 -->

TODO

## 代码里实际发生了什么

引用代码时用固定 commit 的 permalink,不要用 `/blob/main/` —— main 会动,链接过几个月就指向别的东西了。

```python
# TODO 换成真实代码片段,并在下面给出 permalink
def run(messages, tools):
    ...
```

来源:[TODO permalink](https://github.com/)

## 我的读法

TODO —— 这里写推导:为什么作者这么切分,换一种切法会失去什么。

## 对照表

写这种笔记的时候,列一张「职责归属」表比大段文字有用得多。

| 职责 | 谁持有 | 备注 |
| --- | --- | --- |
| 对话历史 | TODO | |
| 工具注册表 | TODO | |
| 循环计数 / 预算 | TODO | |
| 终止判断 | TODO | |
