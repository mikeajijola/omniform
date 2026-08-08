import { autonomyModes, primitiveFamilies } from "./constants.js";

const idPattern = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;
const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);

export class OmniformValidationError extends Error {
  constructor(issues) {
    super(`Invalid Omniform declaration (${issues.length} issue${issues.length === 1 ? "" : "s"})`);
    this.name = "OmniformValidationError";
    this.issues = issues;
  }
}

export function validateOmniform(input) {
  const issues = [];
  const issue = (path, message) => issues.push({ path, message });
  if (!isObject(input)) return { valid: false, issues: [{ path: "$", message: "must be an object" }] };
  if (input.apiVersion !== "omniform.org/v1alpha1") issue("apiVersion", "must equal omniform.org/v1alpha1");
  if (input.kind !== "Company") issue("kind", "must equal Company");
  if (!isObject(input.metadata)) issue("metadata", "is required");
  else {
    if (!idPattern.test(input.metadata.id ?? "")) issue("metadata.id", "must be a stable snake_case identifier");
    if (typeof input.metadata.name !== "string" || !input.metadata.name.trim()) issue("metadata.name", "is required");
  }
  if (!isObject(input.spec)) issue("spec", "is required");
  else {
    validateProviders(input.spec.providers, issue);
    validateCapabilities(input.spec.capabilities, issue);
    validateResources(input.spec.resources, issue);
    validateUniqueIds(input.spec, issue);
  }
  return { valid: issues.length === 0, issues };
}

function validateProviders(providers, issue) {
  if (!isObject(providers)) return issue("spec.providers", "provider map is required");
  for (const [family, selection] of Object.entries(providers)) {
    if (!primitiveFamilies.includes(family)) issue(`spec.providers.${family}`, "is not a recognised primitive family");
    if (!isObject(selection) || !idPattern.test(selection.provider ?? "")) issue(`spec.providers.${family}.provider`, "must identify a provider");
  }
}

function validateCapabilities(capabilities, issue) {
  if (!Array.isArray(capabilities) || capabilities.length === 0) return issue("spec.capabilities", "must contain at least one capability");
  capabilities.forEach((capability, index) => {
    const path = `spec.capabilities.${index}`;
    if (!isObject(capability)) return issue(path, "must be an object");
    if (!idPattern.test(capability.id ?? "")) issue(`${path}.id`, "must be a stable snake_case identifier");
    if (typeof capability.name !== "string" || !capability.name.trim()) issue(`${path}.name`, "is required");
    if (!Array.isArray(capability.requires) || capability.requires.length === 0) issue(`${path}.requires`, "must contain requirements");
    else capability.requires.forEach((requirement, ri) => {
      if (!idPattern.test(requirement.id ?? "")) issue(`${path}.requires.${ri}.id`, "must be a stable snake_case identifier");
    });
    if (capability.autonomy && !autonomyModes.includes(capability.autonomy.mode)) issue(`${path}.autonomy.mode`, "is not recognised");
  });
}

function validateResources(resources, issue) {
  if (resources === undefined) return;
  if (!isObject(resources)) return issue("spec.resources", "must be grouped by primitive family");
  for (const [family, values] of Object.entries(resources)) {
    if (!primitiveFamilies.includes(family)) issue(`spec.resources.${family}`, "is not a recognised primitive family");
    if (!Array.isArray(values)) issue(`spec.resources.${family}`, "must be an array");
  }
}

function validateUniqueIds(spec, issue) {
  const seen = new Map();
  const visit = (id, path) => {
    if (!id) return;
    if (seen.has(id)) issue(path, `duplicates ${seen.get(id)}`);
    else seen.set(id, path);
  };
  (spec.capabilities ?? []).forEach((item, i) => visit(item.id, `spec.capabilities.${i}.id`));
  for (const [family, items] of Object.entries(spec.resources ?? {})) {
    if (Array.isArray(items)) items.forEach((item, i) => visit(item.id, `spec.resources.${family}.${i}.id`));
  }
}

export function assertOmniform(input) {
  const result = validateOmniform(input);
  if (!result.valid) throw new OmniformValidationError(result.issues);
  return input;
}
