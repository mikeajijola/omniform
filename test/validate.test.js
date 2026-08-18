import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { parseOmniform, primitiveFamilies, validateSemantics, validateStructure } from "../src/index.js";

const validSource = await readFile(new URL("../examples/omniseed/omniform.yaml", import.meta.url), "utf8");
const valid = parse(validSource);
const companySearch = parse(await readFile(new URL("../examples/company.omniform.yaml", import.meta.url), "utf8"));

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
test("canonical primitive-family vocabulary contains exactly ten families", () => assert.deepEqual(primitiveFamilies, ["agents", "skills", "connectors", "workflows", "schedules", "policies", "observations", "memory", "identity", "machines"]));
test("removed primitive families fail clearly instead of being silently remapped", () => {
  for (const family of ["systems", "company_search"]) {
    const requirement = structuredCloneWith(valid, value => { value.spec.capabilities[0].requires[0].primitiveFamily = family; });
    const provider = structuredCloneWith(valid, value => { value.spec.providers[family] = { provider: "legacy" }; });
    const resource = structuredCloneWith(valid, value => { value.spec.resources ??= {}; value.spec.resources[family] = [{ id: "legacy", name: "Legacy" }]; });
    assert.equal(validateStructure(requirement).valid, false);
    assert.equal(validateStructure(provider).valid, false);
    assert.equal(validateStructure(resource).valid, false);
  }
});
test("capabilities compose families and Provider selection remains independent", () => {
  assert.deepEqual(valid.spec.capabilities[0].requires.map(item => item.primitiveFamily), ["agents", "skills", "connectors", "workflows", "policies", "observations", "memory", "identity"]);
  assert.notEqual(valid.spec.providers.workflows.provider, valid.spec.providers.identity.provider);
  assert.equal(valid.spec.resources.agents[0].spec.kind, "person");
});
test("primitive instances can select different Providers within one family", () => {
  const input = structuredCloneWith(valid, value => {
    value.spec.resources.workflows[0].provider = "github";
    value.spec.resources.workflows.push({
      id: "package_registry_release",
      name: "Package registry release",
      provider: "npm",
      offers: ["software_change_manage"]
    });
  });
  assert.equal(validateStructure(input).valid, true);
  assert.equal(validateSemantics(input).valid, true);
  assert.equal(input.spec.resources.workflows[0].provider, "github");
  assert.equal(input.spec.resources.workflows[1].provider, "npm");
});
test("named realisations trace capability requirements through primitive resources", () => {
  const capability = valid.spec.capabilities[0];
  const realisation = valid.spec.realisations.find(item => item.id === capability.realisations[0]);
  assert.equal(realisation.capability, capability.id);
  assert.deepEqual(new Set(realisation.participants.flatMap(item => item.supplies)), new Set(capability.requires.map(item => item.id)));
  assert.equal(validateSemantics(valid).valid, true);
});
test("realisations cannot bypass resources or claim requirements a resource does not offer", () => {
  const unknown = structuredCloneWith(valid, value => { value.spec.realisations[0].participants[0].resource = "missing_actor"; });
  const falseClaim = structuredCloneWith(valid, value => { value.spec.realisations[0].participants[0].supplies = ["repository_access"]; });
  assert.match(validateSemantics(unknown).issues[0].message, /unknown resource/);
  assert.match(validateSemantics(falseClaim).issues[0].message, /does not offer/);
});
test("canonical desired state is Git-backed and PR-governed", () => {
  assert.equal(valid.spec.governance.desiredState.branch, "main");
  assert.equal(valid.spec.governance.desiredState.changeMode, "pull_request");
  const hidden = structuredCloneWith(valid, value => { value.spec.governance.desiredState.changeMode = "runtime_store"; });
  assert.equal(validateStructure(hidden).valid, false);
});
test("desired observation mechanisms cannot contain runtime observation records", () => {
  const mechanism = structuredCloneWith(valid, value => { value.spec.resources.observations[0].spec = { measures: ["check_state"] }; });
  assert.equal(validateStructure(mechanism).valid, true);
  const runtimeRecord = structuredCloneWith(mechanism, value => { value.spec.resources.observations[0].observedAt = "2026-08-15T00:00:00.000Z"; });
  assert.equal(validateStructure(runtimeRecord).valid, false);
});
test("company_search is a normal multi-primitive Capability, never a family alias", () => {
  assert.equal(validateStructure(companySearch).valid, true);
  assert.equal(validateSemantics(companySearch).valid, true);
  const capability = companySearch.spec.capabilities.find(item => item.id === "company_search");
  assert.deepEqual(capability.requires.map(item => item.primitiveFamily), ["skills", "memory", "connectors"]);
  assert.equal(companySearch.spec.operations.find(item => item.id === "search_company").capability, "company_search");
  assert.equal(primitiveFamilies.includes("company_search"), false);
});
test("company_search strategies can omit memory or connectors without changing Capability identity", () => {
  const memoryBacked = structuredCloneWith(companySearch, value => { value.spec.capabilities[0].requires = value.spec.capabilities[0].requires.filter(item => item.primitiveFamily !== "connectors"); value.spec.operations[0].providerDependencies = ["skills", "memory"]; });
  const connectorBacked = structuredCloneWith(companySearch, value => { value.spec.capabilities[0].requires = value.spec.capabilities[0].requires.filter(item => item.primitiveFamily !== "memory"); value.spec.operations[0].providerDependencies = ["skills", "connectors"]; });
  assert.equal(validateSemantics(memoryBacked).valid, true);
  assert.equal(validateSemantics(connectorBacked).valid, true);
  assert.equal(memoryBacked.spec.capabilities[0].id, connectorBacked.spec.capabilities[0].id);
});

function structuredCloneWith(value, mutate) { const clone = structuredClone(value); mutate(clone); return clone; }
