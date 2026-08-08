import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseOmniform, validateOmniform } from "../src/index.js";

test("reference company is valid", async () => {
  const source = await readFile(new URL("../examples/omniseed/omniform.yaml", import.meta.url), "utf8");
  const company = parseOmniform(source);
  assert.equal(company.metadata.id, "omniseed");
});

test("desired declarations cannot claim deployed state", () => {
  const result = validateOmniform({ apiVersion: "omniform.org/v1alpha1", kind: "Company", metadata: { id: "x", name: "X" }, spec: { providers: {}, capabilities: [] } });
  assert.equal(result.valid, false);
});
