import type { Channel } from './channels';
export default [
  {
    id: 'slack', icon: 'hash', title: 'Slack', body: '컴퓨터에서도 휴대폰에서도 Slack DM으로 대화하세요. 이미지와 파일도 보낼 수 있습니다.', format: '채널 (Socket Mode)',
    guide: { title: 'Slack 연결', steps: [
      'api.slack.com/apps에서 앱을 만들고 Socket Mode를 켜세요. connections:write 권한이 있는 앱 수준 토큰(xapp-…)을 발급하세요.',
      '봇 권한에 chat:write, im:history, files:read, files:write를 추가하고 message.im 이벤트를 구독하세요. App Home에서 메시지를 허용한 뒤 앱을 워크스페이스에 설치하고 봇 토큰(xoxb-…)을 복사하세요.',
      '설정 → 연결 → Slack → 계정 추가에서 두 토큰을 입력하고 저장하세요. 그런 다음 Slack에서 봇에게 DM을 보내세요.',
    ], limit: '현재는 DM만 지원합니다. 앱이 실행 중이어야 하며, 앱이 꺼져 있을 때 보낸 메시지는 수신하지 못합니다.' },
  },
  {
    id: 'telegram', icon: 'send', title: 'Telegram', body: '@BotFather로 봇을 만들면 어디서든 대화할 수 있습니다. 이미지와 파일도 지원합니다.', format: '채널 (봇 토큰)',
    guide: { title: 'Telegram 연결', steps: [
      'Telegram에서 @BotFather에게 /newbot을 보내고 안내에 따라 봇을 만드세요. 발급받은 봇 토큰을 복사하세요.',
      '설정 → 연결 → Telegram → 계정 추가에서 토큰을 입력하고 저장하세요.',
      'Telegram에서 새로 만든 봇을 열고 메시지를 보내세요. 롱 폴링으로 연결하므로 컴퓨터에 공개 주소가 없어도 됩니다.',
    ], limit: '현재는 DM만 지원합니다. 앱이 꺼져 있는 동안 도착한 메시지는 최대 24시간까지 보관되며 다시 실행하면 수신합니다.' },
  },
  {
    id: 'discord', icon: 'headset', title: 'Discord', body: '서버에 봇을 추가한 뒤 컴퓨터나 Discord 앱에서 DM을 보내세요.', format: '채널 (봇 토큰)',
    guide: { title: 'Discord 연결', steps: [
      'Discord Developer Portal에서 애플리케이션을 만들고 봇을 추가한 뒤 토큰을 복사하세요.',
      'OAuth2 → URL Generator에서 bot 권한을 선택하세요. 생성된 링크를 열어 내가 참여한 서버에 봇을 추가하세요.',
      '설정 → 연결 → Discord → 계정 추가에서 토큰을 입력하고 저장한 뒤 봇에게 DM을 보내세요.',
    ], limit: '현재는 DM만 지원합니다. 앱이 실행 중이어야 하며, 앱이 꺼져 있을 때 보낸 메시지는 수신하지 못합니다.' },
  },
] satisfies Channel[];
