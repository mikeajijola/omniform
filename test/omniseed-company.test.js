import test from "node:test";
import assert from "node:assert/strict";
import { loadOmniform, serializeCanonical } from "../src/index.js";

test("OmniSeed dogfood YAML and JSON are one valid canonical company", async () => {
  const yaml = await loadOmniform(new URL("../examples/omniseed-company/company.omniform.yaml", import.meta.url));
  const json = await loadOmniform(new URL("../examples/omniseed-company/company.omniform.json", import.meta.url));
  assert.equal(yaml.metadata.id, "omniseed");
  assert.equal(yaml.spec.capabilities.length, 4);
  assert.equal(serializeCanonical(yaml), serializeCanonical(json));
});
