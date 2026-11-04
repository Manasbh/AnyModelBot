import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LANGS } from "../src/i18n/locales";

const site = path.resolve(import.meta.dirname, "..");
const source = path.resolve(site, "../docs/assets/demo");

describe("首页演示视频", () => {
  it.each([...LANGS])("%s 有自己的视频，索引在文件开头（可以边下边播）", (lang) => {
    const buf = fs.readFileSync(path.join(site, "public/demo", `demo-${lang}.mp4`));
    expect(buf.subarray(4, 8).toString("latin1")).toBe("ftyp");
    const moov = buf.indexOf("moov", 0, "latin1");
    const mdat = buf.indexOf("mdat", 0, "latin1");
    expect(moov).toBeGreaterThan(0);
    expect(moov).toBeLessThan(mdat);
  });

  it.each([...LANGS])("%s 的视频和 docs/assets/demo 里的素材相同", (lang) => {
    const file = `demo-${lang}.mp4`;
    expect(fs.readFileSync(path.join(site, "public/demo", file)).equals(fs.readFileSync(path.join(source, file)))).toBe(true);
  });
});
