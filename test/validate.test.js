import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { parseOmniform, validateSemantics, validateStructure } from "../src/index.js";

const validSource = await readFile(new URL("../examples/omniseed/omniform.yaml", import.meta.url), "utf8");
const valid = parse(validSource);

test("valid Omniform passes canonical JSON Schema", () => assert.equal(validateStructure(valid).valid, true));
test("reference company passes semantic validation", () => assert.equal(validateSemantics(valid).valid, true));
test("malformed provider map fails schema", () => assert.equal(validateStructure(structuredCloneWith(valid, value => { value.spec.providers.agents = "reference_agents"; })).valid, false));
test("malformed capability fails schema", () => assert.equal(validateStructure(structuredCloneWith(valid, value => { delete value.spec.capabilities[0].requires; })).valid, false));
test("missing required structural field fails schema", () => assert.equal(validateStructure(structuredCloneWith(valid, value => { delete value.metadata; })).valid, false));
test("semantic invalid reference passes schema then fails semantics", () => {
  const input = structuredCloneWith(valid, value => { value.spec.operations[0].capability = "unknown_capability"; });
  assert.equal(validateStructure(input).valid, true);
  assert.equal(validateSemantics(input).valid, false);
});
test("parser runs structural then semantic validation", () => assert.equal(parseOmniform(validSource).metadata.id, "omniseed"));

function structuredCloneWith(value, mutate) { const clone = structuredClone(value); mutate(clone); return clone; }
