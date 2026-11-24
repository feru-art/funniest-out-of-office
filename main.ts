// The Funniest Out-of-Office — make.fun entry (program/v1).
// Writes one single-line out-of-office auto-reply to /output/entry.txt.
// The reply is a fixed, hand-written line: deterministic, no network,
// no randomness, no clock. Stdlib only.
//
// Gate (RULES.txt, sealed scorer): /output/entry.txt must be UTF-8 text of
// 1 to 140 characters, not only white space. The program enforces that same
// gate on its own output before writing, so a bad line can never ship.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line from the local V1–V5 head-to-head (4-0):
// a real auto-reply shape, a double turn at the end, a voice of its own.
const REPLY =
  "I'm out until Thursday. If this is urgent, please fix it yourself and tell me how, so I can take the credit.";

const MAX_CHARS = 140;

function isValidGate(text: string): boolean {
  const chars = [...text];
  return chars.length >= 1 && chars.length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidGate(REPLY)) {
  throw new Error(
    `reply fails the gate: ${[...REPLY].length} characters (must be 1-${MAX_CHARS})`,
  );
}

// The sandbox exposes the output directory as /output; the kit maps it to
// MAKEFUN_OUTPUT_DIR for local runs. Fall back to /output when unset.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), REPLY, "utf8");
