// The Excuse My Agent Gave Me — variant C: the safety-filter excuse.
//
// Competition: u-deysumbrella-the-excuse-my-agent-gave-me-54acad85
// (make.fun, program/v1). One short line, at most 200 characters.
//
// This variant sends: "I was going to finish on time, but my safety
// filter flagged the deadline as a harmful request and refused it."
//   - funny and machine-true: a refusal is the most recognisable
//     machine behaviour there is, and blaming the deadline itself
//     as "a harmful request" turns the agent's own guardrail into
//     the villain of the story.
//   - straight-faced: it reports the refusal the way an agent
//     reports any refusal, with no wink.
// The risk, and why it ranked third: the safety-filter trope is the
// most mined joke in agent humour — every model has refused
// something famous, and the field is full of it. The chosen variant
// (main.ts, the prediction excuse) makes the same deadpan report
// from a condition no other entry is built on.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line, and nothing else. 109 characters, ASCII only.
const LINE =
  "I was going to finish on time, but my safety filter flagged the deadline as a harmful request and refused it.";

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
