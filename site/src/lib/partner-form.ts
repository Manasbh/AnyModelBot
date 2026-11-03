// 合作申请表的纯逻辑（样式在 pages.css，页面交互在 scripts/partner-form.ts）。
// 提交的 JSON 就是 applicationPayload 的返回值，后台接入时按它来收。
export const PARTNER_TYPES = ["training", "creator", "sales", "other"] as const;
export type PartnerType = (typeof PARTNER_TYPES)[number];

/** 每个文本字段的最大长度：表单的 maxlength 和 readApplication 用同一份 */
export const PARTNER_LIMITS = { name: 80, company: 120, contact: 120, audience: 200, message: 1000 } as const;
type TextField = keyof typeof PARTNER_LIMITS;
const TEXT_FIELDS = Object.keys(PARTNER_LIMITS) as TextField[];

export interface PartnerApplication extends Record<TextField, string> {
  type: PartnerType | "";
}
export type RequiredField = "type" | "name" | "contact";

export function readApplication(raw: Record<string, unknown>): PartnerApplication {
  const type = PARTNER_TYPES.find((t) => t === raw.type) ?? "";
  const text = Object.fromEntries(TEXT_FIELDS.map((k) => [k, String(raw[k] ?? "").trim().slice(0, PARTNER_LIMITS[k])])) as Record<TextField, string>;
  return { type, ...text };
}

/** 没填的必填项，顺序和表单一致（第一个用来聚焦） */
export function missingFields(app: PartnerApplication): RequiredField[] {
  return (["type", "name", "contact"] as const).filter((k) => !app[k]);
}

export function applicationPayload(app: PartnerApplication, lang: string) {
  return { ...app, lang, source: "site-partners" };
}

export interface MailText {
  subject: string;
  /** 字段名 → 显示名，邮件正文按这个顺序写 */
  labels: Record<"type" | TextField, string>;
  types: Record<PartnerType, string>;
}

/** 没接后台时让申请人发邮件的正文：只写填了的项 */
export function mailBody(app: PartnerApplication, text: MailText): string {
  return (Object.keys(text.labels) as (keyof MailText["labels"])[])
    .map((k) => {
      const value = k === "type" ? (app.type ? text.types[app.type] : "") : app[k];
      return value ? `${text.labels[k]}: ${value}` : "";
    })
    .filter(Boolean)
    .join("\n");
}

/** 中文转义后很长，过长的地址有些邮件应用打不开：超过上限就只带主题，正文由申请人从页面上复制 */
const MAILTO_MAX = 1800;
export function mailtoHref(email: string, subject: string, body: string): string {
  const base = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const full = `${base}&body=${encodeURIComponent(body)}`;
  return full.length <= MAILTO_MAX ? full : base;
}
