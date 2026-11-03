import type { TranslatedCatalog } from "../../index.js";
export default {
  entered: "(введено)",
  done: "Готово. Для запуска выполните npm start. Чтобы подключить WeChat, отсканируйте QR-код в разделе «Настройки > Подключения» или выполните npm run weixin:login.",
  title: "Первоначальная настройка anymodel bot (папка данных: {dir})",
  noMagpie:
    "Исполняемый файл magpie не найден. Сначала выполните npm run setup",
  alreadyConnected:
    "Modelflare уже подключён (окончание ключа: {tail}{account}). Сохраняем текущее подключение.",
  accountSuffix: ", аккаунт: {name}",
  signedIn: "вход выполнен",
  askHow:
    "Подключение Modelflare: Enter — войти в браузере этого компьютера, key — вставить API-ключ, skip — подключить позже через интерфейс: ",
  askLine:
    "Домен API: Enter — modelflare.dev, origin — origin.modelflare.dev, cf — cf.modelflare.dev: ",
  checkDomains:
    " (проверьте и выберите домен API в настройках, затем повторите попытку)",
  connected: "✓ Modelflare подключён. Найдено моделей: {count}",
  askFeishuId: "Feishu App ID (cli_xxx, оставьте пустым, чтобы пропустить): ",
  askFeishuSecret: "Feishu App Secret: ",
  savedToBot: "✓ Сохранено для бота «{name}»",
  openLink:
    "Откройте ссылку ниже в браузере этого компьютера, войдите или зарегистрируйтесь в Modelflare, затем нажмите Continue, чтобы разрешить подключение:",
  signedInConnected:
    "✓ Выполнен вход в {name}, ключ этого компьютера подключён. Найдено моделей: {count}",
  loginIncomplete: "Вход не завершён",
  setupFailed: "Не удалось выполнить настройку:",
  weixinConnected:
    "✓ WeChat подключён. Выполните npm start для отправки и получения сообщений. Если приложение уже работает, перезапустите его или заново включите канал WeChat в интерфейсе.",
} satisfies TranslatedCatalog["cli"];
