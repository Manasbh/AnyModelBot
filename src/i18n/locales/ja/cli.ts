import type { TranslatedCatalog } from "../../index.js";
export default {
  "entered": "（入力済み）",
  "done": "設定が完了しました。npm start で起動できます。WeChat を使うには、画面の「設定 > 接続」で QR コードをスキャンするか、npm run weixin:login を実行してください。",
  "title": "anymodel bot の初期設定（データディレクトリ：{dir}）",
  "noMagpie": "magpie の実行ファイルが見つかりません。先に npm run setup を実行してください",
  "alreadyConnected": "Modelflare は接続済みです（キー末尾：{tail}{account}）。既存の接続を使用します。",
  "accountSuffix": "、アカウント：{name}",
  "signedIn": "ログイン済み",
  "askHow": "Modelflare の接続方法：Enter = この端末のブラウザーでログイン、remote = 別の端末でログイン、skip = 後で画面から接続： ",
  "askLoginLink": "上のリンクをブラウザーで開いてログインしてください。開けないアドレスに移動したら、アドレスバーの完全なリンクをここに貼り付けてください： ",
  "askLine": "API ドメイン：Enter = modelflare.dev、origin = origin.modelflare.dev、cf = cf.modelflare.dev： ",
  "askFeishuId": "Feishu App ID（cli_xxx、空欄でスキップ）： ",
  "askFeishuSecret": "Feishu App Secret： ",
  "savedToBot": "✓ ボット「{name}」に保存しました",
  "openLink": "以下のリンクをこの端末のブラウザーで開き、Modelflare にログイン（または新規登録）して、Continue をクリックして連携を許可してください：",
  "signedInConnected": "✓ {name} としてログインし、この端末のキーを接続しました。利用できるモデル：{count}",
  "loginIncomplete": "ログインが完了しませんでした",
  "setupFailed": "設定に失敗しました：",
  "weixinConnected": "✓ WeChat に接続しました。npm start でメッセージの送受信を開始できます。すでに起動中なら、再起動するか、画面から WeChat チャネルを有効にし直してください。"
} satisfies TranslatedCatalog["cli"];
