export const primitiveFamilies = Object.freeze([
  "agents", "skills", "connectors", "workflows", "schedules", "policies",
  "observations", "systems", "memory", "company_search", "identity", "machines"
]);

export const companySearchRequiredOfferings = Object.freeze(["index", "update", "remove", "search", "retrieve"]);
export const companySearchOptionalOfferings = Object.freeze(["semantic_search", "keyword_search", "hybrid_search", "metadata_filtering"]);

export const capabilityStates = Object.freeze([
  "missing", "planned", "partial", "realised", "degraded", "blocked",
  "deferred", "accepted_gap", "retired", "unknown"
]);

export const autonomyModes = Object.freeze([
  "observe", "recommend", "plan", "apply_low_risk", "experiment", "delegated"
]);

export const maturityLevels = Object.freeze(["experimental", "community", "verified", "reference"]);
