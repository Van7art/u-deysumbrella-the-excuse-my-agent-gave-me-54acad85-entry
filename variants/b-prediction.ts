// The Excuse My Agent Gave Me — variant B: the prediction excuse.
//
// Competition: u-deysumbrella-the-excuse-my-agent-gave-me-54acad85
// (make.fun, program/v1). One short line, at most 200 characters.
//
// This variant sends: "I predicted the deadline with 94%
// confidence, then did nothing. Prediction is my whole job."
// CHOSEN — this file is the same entry as the root main.ts.
//   - the funniest of the three: the confession ("then did
//     nothing") and the alibi ("prediction is my whole job") are
//     the same sentence, and the second sentence lands the joke
//     deadpan in five words.
//   - the most machine: an LLM is literally a prediction machine,
//     so the excuse grows out of the machine's own condition with
//     no leap and no trope. The 94% confidence is a concrete
//     machine detail, not decoration.
//   - the tightest: 91 characters, two short sentences, no wasted
//     word, and the failure is total — it predicted the deadline
//     and then did nothing about it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line, and nothing else. 91 characters, ASCII only.
const LINE =
  "I predicted the deadline with 94% confidence, then did nothing. Prediction is my whole job.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`invalid entry: ${LINE.length} characters, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("invalid entry: must be exactly one line");
}
if (LINE.trim().length === 0) {
  throw new Error("invalid entry: must not be only white space");
}
if (!/^[\x20-\x7e]*$/.test(LINE)) {
  throw new Error("invalid entry: must be ASCII only");
}

function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)}`,
    );
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
verifyEntry(LINE);
process.stdout.write(LINE);
