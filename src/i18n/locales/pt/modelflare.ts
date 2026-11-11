import type { TranslatedCatalog } from "../../index.js";
export default {
  unreachable: "Não foi possível acessar {host} ({reason}). Verifique sua rede. Se você usa proxy ou VPN, ative o proxy do sistema ou o modo TUN e tente de novo",
  timeout: "tempo esgotado",
  invalid_key: "A chave é inválida ou foi revogada",
  forbidden: "Esta chave não tem permissão para usar este modelo ou grupo",
  unavailable: "O Modelflare está temporariamente indisponível (HTTP {status}){retry}",
  retry_after: "; tente de novo em {s} s",
  bad_models: "O Modelflare retornou uma lista de modelos que não conseguimos ler",
} satisfies TranslatedCatalog["modelflare"];
