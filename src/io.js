import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { assertOmniform } from "./validate.js";

export async function loadOmniform(path) {
  const source = await readFile(path, "utf8");
  return parseOmniform(source);
}

export function parseOmniform(source) {
  return assertOmniform(parse(source));
}
