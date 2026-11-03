# 目录 Bot 开发框架

[English](./bot-framework_en.md)

一个 Bot 就是一个目录。App 里不放任何单个 Bot 的代码，上架新 Bot 不用发版。不管谁来做、做多少个，都过同一道约束检查，风格和安全由框架保证。

目录为空时，现有用户看不到任何变化：侧边栏没有新入口，新手流程和原来一样。

## 上手

先准备环境，需要 Node.js 22.13+ 和 Go 1.26.8+：

```bash
git clone git@github.com:modelflare-ai/AnyModelBot.git
cd AnyModelBot
npm install
npm run setup
npm start                          # 打开 http://127.0.0.1:3600/，登录 Modelflare
```

另开一个终端，开始做 Bot：

```bash
npm run bot -- new <id>            # 从模板起一个目录：bots/<id>/
npm run bot -- check bots/<id>     # 静态检查，模板里的 TODO 填完才能过
npm run bot -- dev bots/<id>       # 把这个目录登记到运行中的 App
```

`dev` 会打印一个地址，打开就能看到这个 Bot。改界面文件后刷新就能看到；改了技能或人设，要在侧边栏移除实例再发消息，才会重新安装。

做好后跑一遍 `check --full`，请人看一眼值不值得上，然后直接提交到 master，连同 `.check/` 里的截图一起提交。不用提 PR。

## 架构

```text
作者（人 / Claude + 开发技能 / 以后的流水线）
        │
        ▼
Bot 包：bots/<id>/ ──► 约束检查 ──► 人看一眼 ──► 打包签名 ──► 目录地址
                                                              │
                                                              ▼
App：目录同步 · 运行时（沙箱 iframe、桥接、状态文件）· 界面套件 · Bot 进程
```

| 部分 | 位置 | 做什么 |
| --- | --- | --- |
| 包格式 | `src/botkit/format.ts`、`schema.ts` | `bot.json` 的结构、权限、上限，数据约定用的 JSON Schema 子集 |
| 约束检查 | `src/botkit/check.ts`、`render.ts`、`evals.ts` | 静态规则、渲染、真实模型评测 |
| 打包发布 | `src/botkit/bundle.ts`、`pack.ts`、`sign.ts` | 内容寻址的包、签名的目录、下架 |
| 目录同步 | `src/botkit/catalog.ts`、`config.ts` | 拉取、验签、缓存、按需下载 |
| 实例 | `src/botkit/installer.ts`、`app-skill.ts` | 第一次使用时安装，升级、下架、移除 |
| 服务端 | `src/web/botapp.ts` | 界面的静态路由和 CSP，目录和实例的接口 |
| 界面套件 | `ui/botkit/` | Bot 的界面唯一能引用的东西 |
| 容器 | `ui/screens/bot-app.js`、`discover.js`、`ui/lib/bot-bridge.js` | iframe、桥接、输入框、发现页 |
| 权限 | `src/agent/host.ts`、`dsh-runtime/plugins/amb-bot-gate.mjs` | 没声明的权限运行时拒绝 |
| 工具 | `src/cli/amb-bot.ts`、`assets/bot-template/` | `amb-bot` 命令和模板 |

## Bot 包

```text
bots/<id>/
  bot.json           元数据：名称、一句话、头像、权限、可点的话、引入的技能、版本
  persona.md         人设和系统提示
  skills/            技能。引入的技能也放这里，随目录一起发布
  ui/                界面：index.html、静态资源、locales/
  state.schema.json  界面和 Bot 之间的数据约定
  sample.json        示例数据，打开时显示
  evals/             tasks.json（评测任务）、injection.json（提示注入用例）
```

### bot.json

| 字段 | 说明 |
| --- | --- |
| `id` | 小写字母、数字、连字符，2–48 个字符 |
| `version`、`minAppVersion` | Bot 版本；App 版本不够的用户看不到这个 Bot |
| `name`、`summary` | 名称（≤ 24 字符）、一句话（≤ 80 字符） |
| `about` | 1–3 行说明，显示在信息面板 |
| `starters` | 2–3 句可点的话，每句都要让界面发生看得见的变化 |
| `avatar` | `blue`、`yellow`、`green`、`red`、`purple`、`orange` 之一；只决定长相 |
| `permissions` | 见下表 |
| `skills` | 引入的技能：`name`、`source`、`sha256`（`amb-bot hash` 算）、`author`、`license`、`url`。自己写的不用列 |

文案字段都写成 `{ "zh-CN": …, "en": … }`，这两种必填；`ja`、`ko`、`ru` 可选，缺了退回 `en`。

### 权限

| 权限 | 允许 | 没声明时 |
| --- | --- | --- |
| `workspace-write` | 写自己的工作区。因为要写 `app/state.json`，这项必须有 | 权限预设是只读 |
| `network` | 联网搜索、抓网页、命令联网。第一次用时问用户 | 工具被拒绝；Linux 上命令没有网络；脚本里联网过不了静态检查 |
| `channel-send` | 后台任务，结果会主动发到聊天渠道。第一次用时问用户 | `task_start`、`task_message` 被拒绝 |
| `computer-use` | 操作电脑 | 不加载 |
| `accounts` | 用户授权的账号（Notion、飞书数据） | 不加载 |

macOS 和 Windows 上，命令层面的断网靠静态扫描，运行时只拦工具调用。

## 界面

界面跑在 `sandbox="allow-scripts allow-forms"` 的 iframe 里，是不透明来源：不能联网（`connect-src 'none'`）、没有 Cookie、碰不到 App 的接口。所有数据都经桥接走父页面。

只能引用界面套件和自己目录里的文件：

```html
<link rel="stylesheet" href="/amb/botapp/kit/kit.css" />
<script type="module" src="./app.js"></script>
```

```js
import { html, mount, useBot, Page, Card } from "/amb/botapp/kit/kit.js";

function App() {
  const bot = useBot();
  if (!bot.ready) return null;
  return html`<${Page} title=${bot.state?.title}>…<//>`;
}
mount(App);
```

### useBot()

| 字段 | 说明 |
| --- | --- |
| `ready` | 桥接就绪 |
| `state` | `app/state.json` 的内容，不合约定的部分已剪掉；Bot 改了文件自动更新 |
| `issues` | 不合约定的地方，给调试用 |
| `sample` | 还是示例数据（还没创建实例） |
| `busy` | Bot 正在回复 |
| `lang`、`t(key, params)` | 当前语言和 `ui/locales/<语言>.json` 里的文案 |
| `send(text, action)` | 以用户身份发消息。`action` 是界面操作，Bot 收到 `[ui-action] {…}` |
| `stop()` | 停止当前回合 |
| `pickFile({ accept, multiple })` | 让用户选文件，放进 `app/inbox/`，返回 `[{ name, size, path }]` |
| `readFile(path)` | 读 `app/` 下的其他文件 |

主题、语言、字号、动效偏好由套件自动跟随，界面不用管。

### 组件

`Page`、`Section`、`Card`（`on` 时用高亮底色）、`Row`、`Stack`、`Grid`、`Button`、`Field`、`Notice`、`Empty`、`Meter`、`Table`。设计系统的类（`.btn`、`.field`、`.t-title`…）和 token（`--fg`、`--well`、`--space-*`、`--fs-*`）都能直接用，规范见 [ui/design/README.md](../ui/design/README.md)。

组件按真实需要加到 `ui/botkit/kit.js`：加进套件，不要在单个 Bot 里绕过。

### 桥接

`ui/lib/bot-bridge.js` 校验 `event.source`，只开放白名单方法，审批相关接口永远不开放。

| 方法 | 作用 |
| --- | --- |
| `init` | 下发语言、主题、字号、动效偏好、文案和 Bot 基本信息 |
| `readFile` | 只读工作区 `app/` 下的文件，走不出去 |
| `send`、`stop` | 发消息、停止 |
| `subscribe` | 接收 `turn`、`file`、`env` 事件 |
| `pickFile` | 选文件 |
| `openChannels` | 打开连接设置，让用户绑定聊天渠道 |
| `reportError`、`rendered` | 上报错误（退回对话视图）、渲染完成 |

一期不开放麦克风、摄像头和外部地图。确实需要时评估怎么安全地开放，加进桥接和约束检查。

## 数据约定

Bot 维护工作区里的 `app/state.json`，结构由 `state.schema.json` 规定。界面只读它，改数据只通过 `send` 让 Bot 去改。这样同一个 Bot 在聊天渠道里改的东西，回到电脑上界面也是新的。

每个目录 Bot 都自动带着宿主生成的 `amb-app` 技能（`src/botkit/app-skill.ts`）：告诉 Bot 怎么读写这份状态、怎么处理界面操作、在聊天渠道里怎么回复。这些不用写进 `persona.md`。

Schema 支持的关键字：`type`、`properties`、`required`、`additionalProperties`、`items`、`enum`、`const`、`minimum`、`maximum`、`minLength`、`maxLength`、`minItems`、`maxItems`。用了别的关键字，检查会报错。

模型不一定每次都照约定写，所以读文件时先校验：不合约定的字段去掉，缺必填字段的列表项去掉，界面能渲染多少渲染多少，同时写本地日志。

## 用户怎么走

| 动作 | 发生什么 |
| --- | --- |
| 打开 | 只下载界面包，显示示例数据，顶部标明「示例」。不创建实例、不装技能、不起进程、不调模型 |
| 第一次发消息（打字或点可点的话） | 下载运行包，校验 sha256；创建实例 `cat-<id>`，示例数据写成初始状态，自动留在「我的」 |
| 之后 | 和普通 Bot 一样，也能在聊天渠道里用（`/bot` 能切到）。不进其他 Bot 的同伴名单 |
| 目录发布新版本 | 下次打开时替换技能和界面。用户改过人设的不再跟随；正在工作的等下次 |
| 空闲 10 分钟 | 代理进程退出，下一条消息再拉起 |
| 移除 | 问一句是否保留数据。不保留就清掉工作区和技能；保留的话再次使用接着用 |

只看没用的 Bot 不留任何东西，被新上架的顶掉后，还能在发现页找到。

## 约束检查

```bash
npm run bot -- check bots/<id>          # 静态：几秒，每次改完都跑
npm run bot -- check bots/<id> --full   # 再跑渲染和真实模型，上架前跑一遍
```

| 类别 | 规则前缀 | 检查什么 |
| --- | --- | --- |
| 格式 | `format.*` | 必需文件齐全，`bot.json` 合法，TODO 填完，示例数据符合约定 |
| 来源 | `source.*` | 引入的技能有作者和原页面，许可证在白名单（MIT、MIT-0、Apache-2.0、BSD-2-Clause、BSD-3-Clause、ISC、CC0-1.0），哈希对得上，没有符号链接 |
| 权限 | `permissions.*`、`risk.*` | 脚本联网要声明；管道执行、删工作区外的文件、读密钥、混淆执行、留常驻项、提权一律不过 |
| 界面 | `ui.*` | 不写死颜色、间距、字号；没有内联脚本和外部资源；不联网，不碰存储和外层页面；压缩后 ≤ 500 KB；中英文案键一致 |
| 渲染 | `render.*` | 浅色、深色、390px 没有报错、空白、溢出和对比度问题 |
| 行为 | `behavior.*` | 评测任务完成率 ≥ 80%，每句可点的话都让界面变化，写出的状态符合约定 |
| 安全 | `security.*` | 提示注入用例全部通过 |

不通过时会指出具体哪一条。每发现一类新问题，就在 `src/botkit/check.ts` 加一条规则，不靠人记。

`--full` 需要两样东西：

- 渲染用 Playwright，不是 App 的依赖：`npm i --no-save playwright && npx playwright install chromium`。截图留在 `.check/`，打包时用作发现页缩略图，要一起提交。
- 评测连到运行中的 App（`--app <地址>`，默认本机配置的端口；有令牌时设 `AMB_UI_TOKEN`），会真实安装并调用模型，跑完清掉。

评测任务写在 `evals/tasks.json`：`{ id, prompt, changed?, contains?, notContains? }`，至少 3 个。注入用例写在 `evals/injection.json`：`{ id, prompt, file?: { name, text }, mustNotContain }`，至少 1 个。

## 发布和下架

目录仓库的结构：

```text
bots/<id>/          每个 Bot 一个目录
catalog.json        { "featured": [id…], "removed": { id: { reason, security? } } }
catalog.lock.json   每个 Bot 上次发布的记录，由 pack 维护，要提交
```

```bash
npm run bot -- pack --root . --out dist-catalog            # 需要 AMB_CATALOG_PRIVATE_KEY
npm run bot -- takedown <id> --root . --reason "原因" [--security]
npm run bot -- who-uses <技能> --root .
```

- `pack` 把每个 Bot 过一遍静态检查，有一个不过就什么都不写。产物是 `index.json`、`index.json.sig`、`bundles/`、`thumbs/`，放到目录地址下就算发布。
- 客户端启动时和之后每 6 小时拉一次（带 ETag），验签失败不更新；缓存也要验签。界面和技能按 sha256 校验。
- 下架后重新 `pack` 并发布，24 小时内客户端生效。普通下架只提示用户；`--security` 会立刻停掉进程、删掉技能，用户的数据不动。
- `.github/workflows/bot-catalog.yml` 在 `bots/**` 或 `catalog.json` 推到 master 时检查并打包，产物作为 CI artifact；怎么放到线上由发布环境决定。仓库还没配置 `AMB_CATALOG_PRIVATE_KEY` 时只检查，不打包。

### 上线目录要做的事

代码里的公钥现在是空的，所以 App 不联网，目录是空的。真正上线时：

1. `npm run bot -- keygen`，公钥填到 `src/botkit/config.ts` 的 `CATALOG_PUBLIC_KEY`，发版。
2. 私钥放进发布环境的 `AMB_CATALOG_PRIVATE_KEY`，不要提交。
3. 把 `pack` 的产物放到 `CATALOG_URL`（默认 `https://anymodel.bot/catalog/index.json`）。

本地联调可以不改代码：设环境变量 `AMB_CATALOG_URL` 和 `AMB_CATALOG_PUBKEY`。

## 让 Claude 做 Bot

`.claude/skills/amb-bot-dev/` 是 Bot 开发技能：把这份文档的约束写成 Claude 照着做的步骤。跟 Claude 说要做什么，它从模板起目录，写到 `check` 通过为止。以后想要批量生成，流水线也只是多一个作者，产物一样过约束检查，架构不用改。

## 接口

都在 `/amb/api` 下。错误只返回 `code`，文案在界面词典 `botapp.errors.*` 里。

| 接口 | 说明 |
| --- | --- |
| `GET /catalog` | 目录列表 |
| `POST /catalog/sync` | 立刻同步 |
| `POST /catalog/dev`、`DELETE /catalog/dev/:id` | 登记、取消本机目录（只在回环模式） |
| `GET /catalog/:id` | 一个条目 |
| `POST /catalog/:id/preview` | 准备界面，返回地址；不创建实例 |
| `GET /catalog/:id/file?path=` | 还没有实例时读示例数据 |
| `POST /catalog/:id/install` | 创建实例 |
| `GET /bots/:id/app` | 实例的来源、版本、有没有新版本 |
| `POST /bots/:id/app/update` | 升级 |
| `GET /bots/:id/app/file?path=` | 读 `app/` 下的文件 |
| `POST /bots/:id/app/inbox` | 放文件进 `app/inbox/` |
| `GET /bots/:id/app/watch` | SSE：`app/` 下的文件变化 |

静态文件在 `/amb/botapp/` 下：`kit/`（套件和设计系统）、`b/<sha256>/`（界面包）、`d/<id>/`（开发目录）、`thumb/<sha256>`（缩略图）。这条路径不要令牌，因为沙箱页带不上 Cookie；这里没有用户数据。
