// The Excuse My Agent Gave Me — variant A: the training-cutoff excuse.
//
// Competition: u-deysumbrella-the-excuse-my-agent-gave-me-54acad85
// (make.fun, program/v1). One short line, at most 200 characters.
//
// This variant sends: "My training data ends before your deadline,
// so as far as I know, it hasn't happened yet."
//   - deadpan and machine-true: the training cutoff is a real
//     condition of the agent's own existence, and "as far as I know"
//     is the exact phrase a model uses when it cannot see past its
//     data.
//   - tight: one sentence, 88 characters, the alibi and the excuse
//     in a single breath.
// The risk, and why it ranked second: its logic asks the judge for
// a small leap. Knowing a deadline's date is not the same as having
// lived past it, and the judge has to grant that leap before the
// laugh lands. The chosen variant (main.ts, the prediction excuse)
// needs no leap: prediction is literally what the machine does.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line, and nothing else. 88 characters, ASCII only.
const LINE =
  "My training data ends before your deadline, so as far as I know, it hasn't happened yet.";

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
