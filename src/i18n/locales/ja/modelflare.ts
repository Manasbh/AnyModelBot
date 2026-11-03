import type { TranslatedCatalog } from "../../index.js";
export default {
  "unreachable": "{host} に接続できません（{reason}）",
  "timeout": "タイムアウト",
  "invalid_key": "キーが無効か、取り消されています",
  "forbidden": "このキーには、このモデルまたはグループの利用権限がありません",
  "unavailable": "Modelflare は一時的に利用できません（HTTP {status}）{retry}",
  "retry_after": "。{s} 秒後に再試行してください",
  "bad_models": "Modelflare から返されたモデル一覧を読み取れませんでした",
} satisfies TranslatedCatalog["modelflare"];
