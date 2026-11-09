/** 模型：列表、Modelflare 线路与测速、官方 API、生图 / 生视频模型、模型资料。 */
import { normalizeLine } from "../../providers/modelflare.js";
import { officialProvider } from "../../providers/official.js";
import { testModelflareDomains } from "../../providers/modelflare-domains.js";
import { t } from "../../i18n/index.js";
import { HttpError, readJson, send, type Route, type WebContext } from "../http.js";

export function modelsRoutes(ctx: WebContext): Route {
  const { app } = ctx;
  return async (req, res, url, seg, p, m) => {
    if (p === "/models" && m === "GET") {
      try {
        return send(res, 200, { models: await app.runtime.listModels(true) });
      } catch (e) {
        return send(res, 200, { models: [], error: (e as Error).message });
      }
    }
    if (p === "/modelflare/domains/test" && m === "POST") return send(res, 200, { results: await testModelflareDomains() });
    if (p === "/modelflare" && m === "GET") return send(res, 200, app.modelflareStatus());
    if (p === "/modelflare/line" && m === "PUT") {
      if (!app.magpie) throw new HttpError(409, t("web.externalNoConnection"));
      const b = await readJson(req);
      await app.setModelflareLine(normalizeLine(b.line));
      return send(res, 200, app.modelflareStatus());
    }
    if (seg[0] === "official") {
      if (!app.magpie) throw new HttpError(409, t("web.externalNoConnection"));
      if (seg.length === 1 && m === "GET") return send(res, 200, { providers: app.officialStatus() });
      const id = decodeURIComponent(seg[1] ?? "");
      // 只认表里的厂商：接口上不能填地址，Key 不会被发到别处
      if (seg.length !== 2 || !officialProvider(id)) throw new HttpError(404, "not found");
      if (m === "DELETE") {
        await app.disconnectOfficial(id);
        return send(res, 200, { providers: app.officialStatus() });
      }
      if (m === "PUT") {
        const b = await readJson(req);
        const key = typeof b.key === "string" ? b.key.trim() : "";
        if (!key || key.length > 1024 || /\s/.test(key)) throw new HttpError(400, t("web.officialBadKey"));
        const r = await app.connectOfficial(id, key);
        if (!r.ok) throw new HttpError(r.code === "invalid_key" ? 400 : 502, r.message);
        return send(res, 200, { providers: app.officialStatus(), models: r.models });
      }
      throw new HttpError(405, "method not allowed");
    }
    if (p === "/media/models" && m === "GET") return send(res, 200, await app.mediaModels());
    if (p === "/models/info" && m === "GET") {
      if (!app.magpie) return send(res, 200, { models: {} });
      return send(res, 200, { models: await app.modelInfo(url.searchParams.get("refresh") === "1") });
    }
    return false;
  };
}
