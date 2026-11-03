import type { TranslatedCatalog } from "../../index.js";
export default {
  no_binary_cli:
    "Исполняемый файл magpie не найден. Сначала выполните npm run setup",
  no_binary:
    "Исполняемый файл magpie не найден (выполните npm run setup, чтобы собрать его из vendor/magpie)",
  unsupported_url: "Неподдерживаемый адрес Modelflare",
  missing_key: "Отсутствует API-ключ",
  create_failed: "Не удалось создать подключение Modelflare: {detail}",
  not_running: "Шлюз моделей не работает. Повторите чуть позже",
  disconnect_failed: "Не удалось отключить: HTTP {status} {body}",
  save_failed: "Не удалось сохранить: HTTP {status} {body}",
  verify_failed: "Проверка после сохранения не пройдена",
} satisfies TranslatedCatalog["magpie"];
