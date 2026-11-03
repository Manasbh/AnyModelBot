import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("README checks across checkout line endings", () => {
  for (const ending of ["\n", "\r\n", "\r"]) {
    it(`accepts the complete documentation with ${JSON.stringify(ending)} line endings`, () => {
      // Change reads in a child process, never rewrite the working tree or touch a database.
      const script = `
        import fs from 'node:fs';
        import path from 'node:path';
        import { pathToFileURL } from 'node:url';
        const read = fs.readFileSync.bind(fs);
        fs.readFileSync = (file, options) => {
          const value = read(file, options);
          return typeof value === 'string' && String(file).endsWith('.md')
            ? value.replace(/\\r\\n?|\\n/g, ${JSON.stringify(ending)}) : value;
        };
        await import(pathToFileURL(path.resolve('scripts/check-readme.mjs')).href);
      `;
      const result = spawnSync(process.execPath, ["--input-type=module", "--eval", script], { encoding: "utf8" });
      expect(result.status, result.stdout + result.stderr).toBe(0);
      expect(result.stdout).toContain("0 个错误，0 个警告");
    });
  }
});
