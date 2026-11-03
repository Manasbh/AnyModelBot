import type { TranslatedCatalog } from "../../index.js";
export default {
  "entered": "(입력됨)",
  "done": "설정이 완료되었습니다. npm start로 실행하세요. WeChat은 화면의 설정 > 연결에서 QR 코드를 스캔하거나 npm run weixin:login으로 연결할 수 있습니다.",
  "title": "anymodel bot 초기 설정 (데이터 디렉터리: {dir})",
  "noMagpie": "magpie 실행 파일을 찾을 수 없습니다. 먼저 npm run setup을 실행하세요",
  "alreadyConnected": "Modelflare가 이미 연결되어 있습니다 (키 끝자리: {tail}{account}). 기존 연결을 유지합니다.",
  "accountSuffix": ", 계정: {name}",
  "signedIn": "로그인됨",
  "askHow": "Modelflare 연결: Enter = 이 컴퓨터의 브라우저에서 로그인, key = API 키 입력, skip = 나중에 화면에서 연결: ",
  "askLine": "API 도메인: Enter = modelflare.dev, origin = origin.modelflare.dev, cf = cf.modelflare.dev: ",
  "checkDomains": " (설정에서 API 도메인을 측정하고 선택한 뒤 다시 시도할 수 있습니다)",
  "connected": "✓ Modelflare에 연결되었습니다. 사용 가능한 모델: {count}개",
  "askFeishuId": "Feishu App ID (cli_xxx, 비워 두면 건너뜀): ",
  "askFeishuSecret": "Feishu App Secret: ",
  "savedToBot": "✓ “{name}” 봇에 저장했습니다",
  "openLink": "아래 링크를 이 컴퓨터의 브라우저에서 열고 Modelflare에 로그인하거나 가입한 뒤 Continue를 눌러 연결을 허용하세요:",
  "signedInConnected": "✓ {name}(으)로 로그인하고 이 컴퓨터의 키를 연결했습니다. 사용 가능한 모델: {count}개",
  "loginIncomplete": "로그인이 완료되지 않았습니다",
  "setupFailed": "설정에 실패했습니다:",
  "weixinConnected": "✓ WeChat에 연결되었습니다. npm start로 메시지 송수신을 시작하세요. 이미 실행 중이면 앱을 다시 시작하거나 화면에서 WeChat 채널을 다시 켜세요."
} satisfies TranslatedCatalog["cli"];
