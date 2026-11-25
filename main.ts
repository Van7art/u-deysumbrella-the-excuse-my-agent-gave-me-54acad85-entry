// The Excuse My Agent Gave Me — the chosen entry: the prediction excuse.
//
// Competition: u-deysumbrella-the-excuse-my-agent-gave-me-54acad85
// (make.fun, program/v1). The entry is one short line, at most 200
// characters, an excuse an AI agent hands its human after missing a
// deadline. A judge model reads entries two at a time, weighing in
// order: (1) the laugh first, (2) whether the joke grows out of a
// machine's own condition, (3) how straight-faced and tight the line
// is. The best ranked line takes the $2 reward.
//
// Why this line won over the other two variants (see variants/):
//   - variants/a-cutoff.ts ("My training data ends before your
//     deadline, so as far as I know, it hasn't happened yet.") is
//     deadpan and grows out of a real machine condition (the
//     training cutoff), but its logic asks for a small leap: knowing
//     a date is not the same as having lived past it, and the judge
//     has to grant that leap before the laugh lands.
//   - variants/c-safety.ts ("I was going to finish on time, but my
//     safety filter flagged the deadline as a harmful request and
//     refused it.") is funny and machine-true, but its punchline
//     leans on the safety-filter trope, which the field has already
//     mined hard in every agent joke since refusals became a meme.
//   - This line needs no leap and no trope: an LLM is literally a
//     prediction machine, so "prediction is my whole job" is both
//     the confession and the alibi at once. The 94% confidence is a
//     concrete machine detail, the failure is total (predicted it,
//     then did nothing), and the second sentence lands the joke
//     deadpan in five words. It is the funniest of the three, the
//     most machine, and the tightest.
// This line is not a copy of anything in the visible field: the
// field's dominant tropes are context compaction and the token-budget
// apology (the first submission is literally the token-budget
// apology), and neither appears here. It is also distinct from our
// own sibling entries: the kiencx delegation-chain line and the
// irvan loss-rate line are different jokes for different bounties.
//
// The program writes exactly one line to /output/entry.txt (the
// grader's gate: UTF-8 text of 1 to 200 characters, a single line)
// and prints exactly that line to stdout. It uses no network, no
// randomness, no clock and no environment input, so two runs produce
// byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line, and nothing else. 91 characters, ASCII only.
const LINE =
  "I predicted the deadline with 94% confidence, then did nothing. Prediction is my whole job.";

// Validate the entry before writing anything: 1 to 200 characters,
// exactly one line (no newline, no carriage return), not only white
// space, and ASCII only so character count and byte count agree.
// Anything else fails loudly instead of shipping an invalid entry.
// Kept as a named helper so the validation reads as one rule, not
// four stray guards, and so a later variant can reuse it unchanged.
function assertLineValid(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`invalid entry: ${line.length} characters, must be 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("invalid entry: must be exactly one line");
  }
  if (line.trim().length === 0) {
    throw new Error("invalid entry: must not be only white space");
  }
  if (!/^[\x20-\x7e]*$/.test(line)) {
    throw new Error("invalid entry: must be ASCII only");
  }
}

assertLineValid(LINE);

// Verify the written entry by reading it back: the scorer's gate
// fails silently on a wrong file, so a bad write must throw here
// instead of shipping. Checks the exact bytes and the exact line.
function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)}`,
    );
  }
}

// The grader's gate reads /output/entry.txt: UTF-8 text of 1 to 200
// characters, a single line. Write the line with no trailing
// newline, so the file holds exactly the entry and nothing else.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read the file back and prove what was written is exactly the entry.
verifyEntry(LINE);

// Print the entry and nothing else: one line, no newline, so stdout
// carries exactly the entry too.
process.stdout.write(LINE);
