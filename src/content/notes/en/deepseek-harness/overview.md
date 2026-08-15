---
title: Reading DeepSeek's harness
seriesTitle: Taking apart the DeepSeek harness
description: What an agent harness is actually responsible for, worked out backwards from a real implementation.
series: deepseek-harness
order: 0
status: seedling
created: 2026-08-15
tags: [agent, harness, source-reading]
openQuestions:
  - After finishing this series, should I be able to rebuild an equivalent harness from scratch? If not, I read it too shallowly.
---

> **Series skeleton — content pending.** The chapter plan below is what I intend to answer, not what
> I have answered. Status moves from `Seedling` to `Growing` as each chapter lands.

## Why read the harness instead of the prompt

In an agent system, the prompt is the most visible part and the most over-weighted. What decides
whether the thing works is the ring around it: how context gets assembled, how tools are exposed,
how failure is absorbed, and when the loop is allowed to stop. That ring is the harness.

By reading a real implementation, I want to answer one question: **which responsibilities does a
harness carry, and why can't they be handed to the model?**

## Questions this series is trying to answer

Ordered by dependency — the later ones only make sense once the earlier ones are settled.

1. **Boundaries** — what exactly goes into and comes out of one agent call? Who holds the state?
2. **Context** — how is the context assembled? When it overflows, what gets cut, what survives, and on what basis?
3. **Tools** — how are tool schemas defined? How are dispatch, concurrency and result write-back handled?
4. **Failure** — a tool raising, a malformed model output, a loop that won't stop: which layer catches each?
5. **Termination** — what justifies calling it "done"? Is that judgement hard-coded or left to the model?
6. **Evaluation** — after changing the harness, how do I know it got better rather than worse?

## How to read this series

- Each chapter opens with a **version anchor** naming the commit it describes. This code moves fast;
  an un-anchored note becomes unusable within months because you can't tell if it still holds.
- Each chapter closes with **what I haven't figured out**. That section usually carries more
  information than the conclusions.
- The `Seedling / Growing / Evergreen` marker is how much I trust the chapter, not how finished it is.
