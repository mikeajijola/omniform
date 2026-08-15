import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";

const schema = JSON.parse(readFileSync(new URL("../schema/omniform.schema.json", import.meta.url), "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateSchema = ajv.compile(schema);

export class OmniformValidationError extends Error {
  constructor(issues) {
    super(`Invalid Omniform declaration (${issues.length} issue${issues.length === 1 ? "" : "s"})`);
    this.name = "OmniformValidationError";
    this.issues = issues;
  }
}

/** JSON Schema is the sole authority for required fields, types and shapes. */
export function validateStructure(input) {
  const valid = validateSchema(input);
  return {
    valid,
    issues: valid ? [] : validateSchema.errors.map(error => ({
      path: error.instancePath || "$",
      message: error.message,
      keyword: error.keyword
    }))
  };
}

/** Semantic validation only covers relationships JSON Schema cannot express. */
export function validateSemantics(input) {
  const structural = validateStructure(input);
  if (!structural.valid) return { valid: false, issues: [], skipped: true };
  const issues = [];
  const issue = (path, message) => issues.push({ path, message });
  const capabilities = new Set();
  const capabilityById = new Map();
  const resources = new Set();
  const globalIds = new Map();
  const unique = (id, path) => {
    if (globalIds.has(id)) issue(path, `duplicates ${globalIds.get(id)}`);
    else globalIds.set(id, path);
  };
  input.spec.capabilities.forEach((capability, index) => {
    capabilities.add(capability.id);
    capabilityById.set(capability.id, capability);
    unique(capability.id, `spec.capabilities.${index}.id`);
    const requirements = new Set();
    capability.requires.forEach((requirement, ri) => {
      if (requirements.has(requirement.id)) issue(`spec.capabilities.${index}.requires.${ri}.id`, "duplicates a requirement in this capability");
      requirements.add(requirement.id);
    });
  });
  for (const [family, items] of Object.entries(input.spec.resources ?? {})) {
    items.forEach((resource, index) => {
      resources.add(resource.id);
      unique(resource.id, `spec.resources.${family}.${index}.id`);
    });
  }
  input.spec.capabilities.forEach((capability, index) => {
    capability.realisation?.resources?.forEach((id, ri) => {
      if (!resources.has(id)) issue(`spec.capabilities.${index}.realisation.resources.${ri}`, `references unknown resource ${id}`);
    });
  });
  input.spec.operations.forEach((operation, index) => {
    unique(operation.id, `spec.operations.${index}.id`);
    if (!capabilities.has(operation.capability)) issue(`spec.operations.${index}.capability`, `references unknown capability ${operation.capability}`);
    const requiredFamilies = new Set((capabilityById.get(operation.capability)?.requires ?? []).map(item => item.primitiveFamily));
    operation.providerDependencies?.forEach((family, di) => {
      if (!requiredFamilies.has(family)) issue(`spec.operations.${index}.providerDependencies.${di}`, `family ${family} is not required by capability ${operation.capability}`);
    });
  });
  return { valid: issues.length === 0, issues, skipped: false };
}

export function validateOmniform(input) {
  const structural = validateStructure(input);
  if (!structural.valid) return { valid: false, phase: "structural", issues: structural.issues };
  const semantic = validateSemantics(input);
  return { valid: semantic.valid, phase: semantic.valid ? null : "semantic", issues: semantic.issues };
}

export function assertOmniform(input) {
  const result = validateOmniform(input);
  if (!result.valid) throw new OmniformValidationError(result.issues);
  return input;
}
