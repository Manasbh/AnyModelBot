import type { TranslatedCatalog } from "../../index.js";
export default {
  revoked: "Срок авторизации Modelflare истёк. Войдите снова",
  unreachable: "Не удалось подключиться к Modelflare ({reason}). Проверьте сеть. Если вы используете прокси или VPN, включите системный прокси или режим TUN и повторите попытку",
  already_signed_in: "Вход в аккаунт Modelflare уже выполнен",
  no_new_key: "Modelflare не вернул новый ключ",
  login_incomplete: "Вход не завершён: {reason}",
  revoked_elsewhere:
    "Авторизация Modelflare истекла — возможно, доступ отозван на сайте. Войдите снова",
  sign_in_first: "Сначала войдите в аккаунт Modelflare",
  low_balance:
    "Баланс Modelflare снизился до ${balance}, ниже порога уведомления ${threshold}. Пополнить: {url}",
  budget_needs_login: "Войдите в аккаунт Modelflare, чтобы задать бюджет бота",
  key_reissued:
    "API-ключ Modelflare этого компьютера был удалён; новый ключ выпущен автоматически",
  bot_key_reissued:
    "Бюджетный ключ бота «{name}» был удалён; выпущен новый с бюджетом ${limit} (учёт расходов начинается с нуля)",
  routing_invalid: "Неизвестный вариант выгоды",
  routing_unsupported:
    "Modelflare пока не поддерживает эту настройку для ключей приложений",
  host_unreachable: "Не удалось подключиться к {host} ({reason}). Проверьте сеть. Если вы используете прокси или VPN, включите системный прокси или режим TUN и повторите попытку",
  discovery_failed: "Не удалось прочитать конфигурацию входа (HTTP {status})",
  discovery_bad_endpoint: "Недопустимый {key} в конфигурации входа",
  discovery_issuer_mismatch: "Издатель в конфигурации входа не совпадает",
  tokens_incomplete: "Modelflare вернул неполный набор токенов",
  logout_failed: "Не удалось выйти (HTTP {status})",
  page_not_done_title: "Вход не завершён",
  page_denied:
    "Вы отменили авторизацию. Вернитесь в AnyModelBot, чтобы войти снова.",
  page_not_done:
    "Авторизация не завершена. Вернитесь в AnyModelBot и попробуйте снова.",
  page_done_title: "Вход выполнен",
  page_done: "Вернитесь в AnyModelBot и начните работать с ассистентом.",
  page_pending_title: "Завершаем вход",
  page_pending: "Подключаем ваш аккаунт, подождите…",
  page_noscript: "Вернитесь в AnyModelBot, чтобы увидеть результат.",
  page_open: "Открыть AnyModelBot",
  page_open_hint: "Если браузер спросит, выберите «Открыть AnyModelBot».",
  page_open_retry: "Если приложение не открылось, попробуйте ещё раз или переключитесь на AnyModelBot вручную.",
  page_returned: "Вы вернулись в AnyModelBot. Эту страницу можно закрыть.",
  page_switch_back: "Вернитесь в AnyModelBot, чтобы продолжить.",
  page_failed_back: "Вернитесь в AnyModelBot и войдите снова.",
  denied: "Вы отменили авторизацию",
  not_done: "Авторизация не завершена",
  login_timeout: "Время ожидания входа истекло. Начните заново",
  login_cancelled: "Вход отменён",
  login_ended: "Этот вход уже завершён. Начните заново",
  login_link_invalid: "Эта ссылка не относится к текущему входу. Скопируйте полную ссылку из адресной строки после входа",
  pasted_key_retired: "Теперь AnyModelBot работает через вход в аккаунт, поэтому введённый ранее API-ключ удалён с этого устройства. Войдите в Modelflare — боты и разговоры продолжат работу.",
  vault_bad_version: "Неизвестная версия файла аккаунта",
  vault_encrypted:
    "Учётные данные зашифрованы настольным приложением и недоступны в этом режиме",
  vault_incomplete: "Файл аккаунта неполон",
} satisfies TranslatedCatalog["account"];
