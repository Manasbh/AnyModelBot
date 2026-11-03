import { describe, expect, it } from "vitest";
import { PARTNER_LIMITS, applicationPayload, mailBody, mailtoHref, missingFields, readApplication, type MailText } from "../src/lib/partner-form";

const text: MailText = {
  subject: "合作申请",
  labels: { type: "类型", name: "称呼", company: "机构", contact: "联系方式", audience: "受众", message: "想法" },
  types: { training: "培训", creator: "内容", sales: "销售", other: "其他" },
};

describe("partner application", () => {
  it("trims fields, caps their length and drops an unknown type", () => {
    const app = readApplication({ type: "hacker", name: "  小王  ", contact: "x".repeat(500) });
    expect(app.type).toBe("");
    expect(app.name).toBe("小王");
    expect(app.company).toBe("");
    expect(app.contact).toHaveLength(PARTNER_LIMITS.contact);
  });

  it("requires type, name and contact, in form order", () => {
    expect(missingFields(readApplication({}))).toEqual(["type", "name", "contact"]);
    expect(missingFields(readApplication({ type: "sales", name: "   ", contact: "a@b.c" }))).toEqual(["name"]);
    expect(missingFields(readApplication({ type: "other", name: "A", contact: "a@b.c" }))).toEqual([]);
  });

  it("builds the payload without the honeypot", () => {
    const payload = applicationPayload(readApplication({ type: "training", name: "A", contact: "a@b.c", website: "spam" }), "en");
    expect(payload).toEqual({ type: "training", name: "A", company: "", contact: "a@b.c", audience: "", message: "", lang: "en", source: "site-partners" });
  });

  it("writes only the filled fields into the email, with readable labels", () => {
    const body = mailBody(readApplication({ type: "training", name: "小王", contact: "wx123" }), text);
    expect(body).toBe("类型: 培训\n称呼: 小王\n联系方式: wx123");
  });

  it("keeps the body in the mailto link unless it gets too long", () => {
    const short = mailtoHref("a@b.c", "主题", "正文");
    expect(short).toBe(`mailto:a@b.c?subject=${encodeURIComponent("主题")}&body=${encodeURIComponent("正文")}`);
    const long = mailtoHref("a@b.c", "主题", "正".repeat(1000));
    expect(long).toBe(`mailto:a@b.c?subject=${encodeURIComponent("主题")}`);
  });
});
