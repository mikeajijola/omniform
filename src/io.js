import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { parseDocument } from "yaml";
import { assertOmniform } from "./validate.js";

const supportedExtensions = new Set([".yaml", ".yml", ".json"]);

export async function loadOmniform(path) {
  const extension = extname(path instanceof URL ? path.pathname : String(path)).toLowerCase();
  if (!supportedExtensions.has(extension)) throw new Error(`Unsupported Omniform serialization: ${extension || "none"}`);
  const source = await readFile(path, "utf8");
  return parseOmniform(source, extension === ".json" ? "json" : "yaml");
}

export function parseOmniform(source, format = "auto") {
  const parsed = parseSerialization(source, format);
  const canonical = canonicalize(parsed);
  return assertOmniform(canonical);
}

export function parseSerialization(source, format = "auto") {
  const selected = format === "auto" ? (/^\s*[\[{]/.test(source) ? "json" : "yaml") : format;
  if (selected === "json") return JSON.parse(source);
  if (selected !== "yaml") throw new Error(`Unsupported Omniform serialization: ${selected}`);
  const document = parseDocument(source, { schema: "core", merge: false, uniqueKeys: true, prettyErrors: false });
  if (document.errors.length) throw new Error(`Invalid YAML: ${document.errors.map(error => error.message).join("; ")}`);
  return document.toJS({ mapAsMap: false, maxAliasCount: 0 });
}

/** Produces plain JSON-compatible data with recursively sorted object keys. */
export function canonicalize(value, path = "$") {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error(`${path} must contain a finite JSON number`);
    return value;
  }
  if (Array.isArray(value)) return value.map((item, index) => canonicalize(item, `${path}[${index}]`));
  if (typeof value !== "object" || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) throw new Error(`${path} contains a non-JSON value`);
  return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalize(value[key], `${path}.${key}`)]));
}

export function serializeCanonical(value) { return JSON.stringify(canonicalize(value)); }
