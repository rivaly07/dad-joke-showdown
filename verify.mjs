#!/usr/bin/env node
// Verify the dad joke entry meets competition requirements.
// Usage: node verify.mjs [output_dir]

import { readFileSync, statSync } from "fs";
import { join, resolve } from "path";
import { exit } from "process";

const OUTPUT_DIR = resolve(process.argv[2] || "/output");
const ENTRY_FILE = join(OUTPUT_DIR, "entry.txt");

function main() {
  try {
    const st = statSync(ENTRY_FILE);
    if (st.size === 0) {
      console.error(`FAIL: ${ENTRY_FILE} is empty`);
      return 1;
    }
    const joke = readFileSync(ENTRY_FILE, "utf-8").trimEnd();
    if (joke.length < 1) {
      console.error("FAIL: joke must be at least 1 character");
      return 1;
    }
    if (joke.length > 200) {
      console.error(`FAIL: joke length ${joke.length} exceeds 200 characters`);
      return 1;
    }
    if (!/^[\x20-\x7E\s]*$/.test(joke)) {
      console.error("FAIL: joke contains non-printable ASCII characters");
      return 1;
    }
    console.log(`OK: ${joke.length} chars`);
    console.log(`JOKE: ${joke}`);
    return 0;
  } catch (err) {
    console.error(`FAIL: ${err.message}`);
    return 1;
  }
}

exit(main());