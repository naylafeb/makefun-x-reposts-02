// Entry for make.fun bounty makefun-x-reposts-02 (Node 22, standard library only).
// It hands in POSTS.json: the addresses of the entrant's own X posts, each a quote
// of, or a direct reply to, a different one of make.fun's newest posts on X.
// The program copies POSTS.json from the repository root to /output/POSTS.json,
// where the gate reads it. That is all the program has to do: the house reads the
// posts themselves from X and scores their reposts, quotes and likes. Nothing this
// program writes about the posts is scored.
//
// Before copying, it reads POSTS.json and checks its shape: a JSON object with a
// "posts" array of 1 to 15 items, each an X post address string. A file that is
// not that shape is refused here with a clear error instead of being copied.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in
// for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'POSTS.json');
const targetPath = join(OUTPUT_DIR, 'POSTS.json');

let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  console.error(`POSTS.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`POSTS.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

const posts = (parsed as { posts?: unknown }).posts;
if (!Array.isArray(posts) || posts.length < 1 || posts.length > 15 || posts.some((p) => typeof p !== 'string')) {
  console.error('POSTS.json must be {"posts": [...]} with 1 to 15 X post addresses.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  console.error(`POSTS.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Verify the copy landed byte for byte before finishing.
let copied: string;
try {
  copied = readFileSync(targetPath, 'utf8');
} catch (err) {
  console.error(`POSTS.json copy could not be read back: ${(err as Error).message}`);
  process.exit(1);
}
if (copied !== raw) {
  console.error('POSTS.json copy does not match the source.');
  process.exit(1);
}
