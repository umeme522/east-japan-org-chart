import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "build", "github-upload");

const entries = [
  "index.html",
  "styles.css",
  "script.js",
  "package.json",
  "README.md",
  "wrangler.jsonc",
  "data",
  "functions",
  "tools",
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const entry of entries) {
  await cp(path.join(rootDir, entry), path.join(outputDir, entry), {
    recursive: true,
  });
}

console.log("build/github-upload を更新しました。");
