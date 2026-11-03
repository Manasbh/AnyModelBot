import type { Channel } from './channels';
export default [
  {
    id: 'slack', icon: 'hash', title: 'Slack', body: 'デスクでも外出先でも、Slack の DM で話しかけられます。画像やファイルも送れます。', format: 'チャネル（Socket Mode）',
    guide: { title: 'Slack に接続する', steps: [
      'api.slack.com/apps でアプリを作成し、Socket Mode を有効にします。connections:write を付けたアプリレベルトークン（xapp-…）を発行してください。',
      'ボットの権限に chat:write、im:history、files:read、files:write を追加し、message.im イベントを購読します。App Home でメッセージを許可し、ワークスペースにアプリをインストールして、ボットトークン（xoxb-…）をコピーしてください。',
      '「設定 → 接続 → Slack → アカウントを追加」で2つのトークンを入力して保存し、Slack でボットに DM を送ってください。',
    ], limit: '現在は DM のみに対応しています。アプリを起動しておく必要があり、終了中に送られたメッセージは受信できません。' },
  },
  {
    id: 'telegram', icon: 'send', title: 'Telegram', body: '@BotFather でボットを作成すれば、どこからでも話しかけられます。画像やファイルにも対応しています。', format: 'チャネル（ボットトークン）',
    guide: { title: 'Telegram に接続する', steps: [
      'Telegram で @BotFather に /newbot を送り、案内に従ってボットを作成します。発行されたボットトークンをコピーしてください。',
      '「設定 → 接続 → Telegram → アカウントを追加」でトークンを入力して保存してください。',
      'Telegram で作成したボットを開き、メッセージを送ってください。ロングポーリングで接続するため、パソコンに公開アドレスは不要です。',
    ], limit: '現在は DM のみに対応しています。アプリの終了中に届いたメッセージは、最大24時間分を次回起動時に受信できます。' },
  },
  {
    id: 'discord', icon: 'headset', title: 'Discord', body: 'ボットをサーバーに追加して、パソコンや Discord アプリから DM を送れます。', format: 'チャネル（ボットトークン）',
    guide: { title: 'Discord に接続する', steps: [
      'Discord Developer Portal でアプリケーションを作成し、ボットを追加してトークンをコピーしてください。',
      '「OAuth2 → URL Generator」で bot スコープを選択します。生成されたリンクを開き、自分が参加しているサーバーにボットを追加してください。',
      '「設定 → 接続 → Discord → アカウントを追加」でトークンを入力して保存し、ボットに DM を送ってください。',
    ], limit: '現在は DM のみに対応しています。アプリを起動しておく必要があり、終了中に送られたメッセージは受信できません。' },
  },
] satisfies Channel[];
