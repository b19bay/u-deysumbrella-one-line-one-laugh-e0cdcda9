import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My microwave beeps three times when it's done, then once more, just to make sure I'm still ignoring it.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 140) {
    console.error(`entry must be 1-140 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.length !== 103) {
    console.error(`entry must be exactly 103 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("entry must be a single non-blank line");
    process.exit(1);
  }
  for (const ch of LINE) {
    if (ch.charCodeAt(0) > 127) {
      console.error("entry must be plain ASCII");
      process.exit(1);
    }
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back mismatch: written file differs from the intended line");
    process.exit(1);
  }
}

main();
