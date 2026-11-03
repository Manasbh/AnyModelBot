# Changelog

[简体中文](./CHANGELOG.md) | English | [日本語](./CHANGELOG_ja.md) | [한국어](./CHANGELOG_ko.md) | [Русский](./CHANGELOG_ru.md)

This covers changes you'll notice in the app. For older versions, see the [GitHub releases](https://github.com/modelflare-ai/AnyModelBot/releases).

## 0.1.17 - 2026-11-03

### New

- **Five languages:** Japanese, Korean and Russian join Simplified Chinese and English across the app, tray, system messages, authorization prompts, website and documentation. Switch languages during onboarding, in Settings or from the command palette.
- **API domains and latency checks:** Manually choose `modelflare.dev`, `origin.modelflare.dev` or `cf.modelflare.dev` and compare response times from the device running the app. Checks send no API key, make no model calls and never switch domains automatically.
- **Update reminders:** The sidebar and About page show available updates. Open the download page or dismiss the reminder for that version.
- **Website partner page:** Learn about partnerships and fill in an application. Without a submission endpoint, the form clearly uses email instead of claiming the application was sent.

### Improved and fixed

- Translation files are organized by module. Release checks validate missing content, placeholders, plurals and documentation links. Russian plurals, localized amounts and dates, Japanese and Korean input methods, and mobile line breaks are improved.
- Feishu and Notion authorization errors follow the current language. Refused connections to a local proxy now include actionable guidance while retaining the original error.
- Refined the website's sky effects, download page and mobile layouts, with localized sharing images, search-engine language annotations and 404 pages.

## 0.1.16 - 2026-11-02

### New

- **Group chats:** With two or more bots, click ＋ in the sidebar to create a group chat and talk to several bots at once. Whoever you @ answers; with no @, the bot that answered last carries on. Bots can also @ another member to hand off. Each bot keeps its own model, workspace and memory, and costs are tracked per bot.

### Changed

- **Balance stays out of the way:** The bottom-left corner now shows only your avatar, name and the settings button. Click the avatar to see your balance and top up. You still get a sidebar reminder when your balance drops below the alert level.

## 0.1.15 - 2026-11-02

### New

- **Accounts shared by all bots:** Add chat and Notion accounts once in Settings › Connections, and every bot can use them. Each service can have several accounts, each with its own alias.
- **Switch bots from a chat:** Send `/bot` in a chat app to see your bots, and `/bot name` once to switch. That chat stays with the new bot, so you don't repeat it on every message. Each bot also knows about the others, so it can answer when you ask.
- **Telegram, Slack and Discord:** Paste a token to connect. No public address needed, and images and files work both ways.
- **Notion:** Connect with one-click authorization or a token. Bots can search, read, create and edit pages, and query databases. They can't delete pages.
- **Read Feishu messages:** Authorize with a QR code, then ask any bot to "check my second Feishu". It reads chats and searches messages as you, read-only.
- **Add Feishu by scanning:** When adding a Feishu chat account, scan a QR code to create the app instead of entering an App ID and Secret.

### Improved

- **Web search no longer needs a DeepSeek key:** It's free by default, and you can switch to Tavily, Exa, Bocha, Zhipu or your own SearXNG.
- **Characters are separate from roles:** An avatar only sets a bot's looks, and picking a template doesn't change it.

### Changed

- Chat channel setup moved from each bot's info panel to Settings › Connections. Existing accounts move over automatically with no new sign-in, and the same bot still answers by default.
- Owners and allow lists now belong to the account, so anyone allowed on it can talk to any bot. Deleting a bot no longer affects accounts.
