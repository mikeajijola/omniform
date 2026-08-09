import test from "node:test";
import assert from "node:assert/strict";
import { canonicalize, loadOmniform, parseOmniform, parseSerialization, serializeCanonical } from "../src/index.js";

const yamlPath = new URL("../examples/company.omniform.yaml", import.meta.url);
const jsonPath = new URL("../examples/company.omniform.json", import.meta.url);

test("YAML and JSON normalize to the identical canonical object", async () => {
  const yaml = await loadOmniform(yamlPath), json = await loadOmniform(jsonPath);
  assert.deepEqual(yaml, json);
  assert.equal(serializeCanonical(yaml), serializeCanonical(json));
});

test("YAML comments and key formatting do not alter canonical semantics", () => {
  const a = parseSerialization("# comment\nb: 2\na: 1\n", "yaml");
  const b = parseSerialization('{"a":1,"b":2}', "json");
  assert.equal(serializeCanonical(a), serializeCanonical(b));
});

test("malformed YAML is rejected", () => assert.throws(() => parseOmniform("spec: [broken"), /Invalid YAML/));
test("aliases are rejected to avoid magical portable semantics", () => assert.throws(() => parseSerialization("a: &value [1]\nb: *value", "yaml"), /disabled/));
test("non-JSON YAML values are rejected by canonicalization", () => assert.throws(() => canonicalize(parseSerialization("value: !!binary SGVsbG8=", "yaml")), /non-JSON/));
test("explicit plain YAML and JSON extensions are supported", async () => {
  assert.equal((await loadOmniform(yamlPath)).metadata.id, "acme");
  assert.equal((await loadOmniform(jsonPath)).metadata.id, "acme");
});
