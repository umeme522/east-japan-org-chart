import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "build", "cloudflare-pages");
const staticFiles = ["index.html", "styles.css", "script.js"];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const fileName of staticFiles) {
  await cp(path.join(rootDir, fileName), path.join(outputDir, fileName));
}

console.log("build/cloudflare-pages を更新しました。");
