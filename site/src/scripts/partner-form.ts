// 合作申请表（/partners）。表单和各个状态都写在 HTML 里，这里只负责校验、提交和切换显示。
// - 配了 PARTNER_APPLY_URL：POST JSON，成功才显示“已收到”，失败留在表单上，填的内容不丢。
// - 没配：不假装提交成功，显示邮件内容，让申请人自己发出去。
// - 地址加 ?apply=preview：走一遍成功流程但不发送，用来看样式（和 ?banner=preview 同一种做法）。
import { track } from "./client";
import { applicationPayload, mailBody, mailtoHref, missingFields, readApplication, type MailText, type RequiredField } from "../lib/partner-form";

const TIMEOUT_MS = 15_000;

function mount(form: HTMLFormElement) {
  const root = form.closest<HTMLElement>("[data-partner-apply]")!;
  const done = root.querySelector<HTMLElement>("[data-partner-done]")!;
  const mail = root.querySelector<HTMLElement>("[data-partner-mail]")!;
  const failed = form.querySelector<HTMLElement>("[data-partner-failed]")!;
  const submit = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const email = form.dataset.email!;
  const text = JSON.parse(form.dataset.mail!) as MailText;
  let sending = false;

  const show = (panel: HTMLElement) => {
    for (const el of [form, done, mail]) el.hidden = el !== panel;
    panel.querySelector<HTMLElement>("[data-partner-focus]")?.focus();
  };
  const markField = (name: string, invalid: boolean) => {
    const field = form.querySelector<HTMLElement>(`[data-field="${name}"]`);
    if (!field) return;
    field.toggleAttribute("data-invalid", invalid);
    field.querySelector<HTMLElement>(".pt-err")!.hidden = !invalid;
    field.querySelectorAll("input").forEach((i) => (invalid ? i.setAttribute("aria-invalid", "true") : i.removeAttribute("aria-invalid")));
  };
  const showMissing = (missing: RequiredField[]) => {
    (["type", "name", "contact"] as const).forEach((k) => markField(k, missing.includes(k)));
    if (missing[0]) form.querySelector<HTMLInputElement>(`[data-field="${missing[0]}"] input`)?.focus();
  };

  form.addEventListener("input", (e) => {
    const field = (e.target as Element).closest<HTMLElement>("[data-field]");
    if (field?.hasAttribute("data-invalid")) markField(field.dataset.field!, false);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return;
    const raw = Object.fromEntries(new FormData(form));
    // 蜜罐：正常人看不到这个输入框，填了的当作机器人，不发送
    if (raw.website) { show(done); return; }
    const app = readApplication(raw);
    const missing = missingFields(app);
    showMissing(missing);
    if (missing.length) return;
    failed.hidden = true;

    if (new URLSearchParams(location.search).get("apply") === "preview") { show(done); return; }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      const body = mailBody(app, text);
      mail.querySelector("code")!.textContent = body;
      mail.querySelector<HTMLAnchorElement>("[data-partner-open]")!.href = mailtoHref(email, text.subject, body);
      show(mail);
      track("partner_apply", { via: "email", type: app.type });
      return;
    }

    sending = true;
    submit.disabled = true;
    submit.textContent = submit.dataset.sending!;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationPayload(app, form.dataset.lang!)),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      show(done);
      track("partner_apply", { via: "api", type: app.type });
    } catch {
      failed.hidden = false;
      track("partner_apply_failed", { type: app.type });
    } finally {
      sending = false;
      submit.disabled = false;
      submit.textContent = submit.dataset.label!;
    }
  });

  root.querySelector("[data-partner-back]")?.addEventListener("click", () => show(form));
}

const form = document.querySelector<HTMLFormElement>("[data-partner-form]");
if (form) mount(form);
