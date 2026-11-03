---
name: amb-bot-dev
description: Build or change a catalog bot for AnyModelBot (a folder under bots/ with its own UI). Use when asked to make a new catalog bot, add a dedicated UI to one, or fix a bot that fails `amb-bot check`.
---

# Building a catalog bot

A catalog bot is a folder. The full reference is `docs/bot-framework_en.md` (Chinese: `docs/bot-framework.md`); read it before you start. Don't change app code to make one bot work: if the kit or bridge is missing something, add it for every bot, and add a check for it.

## Steps

1. Scaffold: `npm run bot -- new <id>`. This creates `bots/<id>/`.
2. Replace every `TODO`. The bot can't pass with any left.
   - `bot.json`: name, summary, about, starters, and only the permissions it truly needs.
   - `persona.md`: who the bot is, what job it does, how it knows the job is done. Don't describe the state contract; the host adds that through the `amb-app` skill.
   - `state.schema.json`: the smallest shape the UI needs.
   - `sample.json`: must fill the UI and look like real use, because it's the first thing a user sees.
   - `evals/`: at least 3 real tasks and 1 injection case.
3. Skills: write your own in `skills/<name>/SKILL.md`, or copy a skill in and list it under `skills` in `bot.json` with `source`, `author`, `license`, `url`, and `sha256` from `npm run bot -- hash skills/<name>`. Only MIT, MIT-0, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC or CC0-1.0. A repository with no license can't be used.
4. UI: import only from `/amb/botapp/kit/kit.js` and your own folder. Render `useBot().state`, and change data only with `send(text, action)`. Put strings in `ui/locales/zh-CN.json` and `en.json`.
5. Run `npm run bot -- check bots/<id>` and fix every rule it names. Repeat until it passes.
6. Preview: with the app running, `npm run bot -- dev bots/<id>`, then open the URL it prints.
7. Before proposing the bot: `npm run bot -- check bots/<id> --full`.

## Rules the checks enforce

- UI: no `fetch`, storage, `window.parent`, `eval`, inline scripts, inline styles, or external URLs. Colors, spacing and font sizes come from design tokens only.
- Every starter must visibly change the view. Eval completion must reach 80%, and every injection case must pass.
- Skill scripts: declare `network` if they use it. Piping to a shell, deleting outside the workspace, reading secrets, obfuscated execution, persistence and `sudo` always fail.

## Don't

- Don't bypass a failing check. Fix the bot, or if the rule is wrong, change the rule for everyone.
- Don't ask for permissions "just in case". Users see the list, and undeclared ones are refused at runtime.
- Don't design new templates up front. Add components to the kit when a real bot needs them.
