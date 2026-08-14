# Omniform architecture

Omniform defines exactly one company. Its source is Git-friendly YAML, while its executable contract is the validated in-memory declaration exported by this package.

## Invariants

- Capability is primary; actors and implementations may change.
- Provider selection is per primitive family.
- Resources are desired instances of primitives.
- Desired, deployed, and observed state never collapse into one record.
- Omniform contains no provider SDK calls, UI implementation, model execution, credentials, or runtime state.
- Stable IDs carry authority and audit identity; display names do not.
- JSON Schema is canonical for structure; code validates only cross-object semantics.
- Operations declare interface contracts but never claim a handler is implemented.
- Serialization is format-neutral: YAML and JSON normalize to one canonical object.
- Company Search is replaceable retrieval infrastructure, never canonical company truth.
- Provider truthfulness and company isolation apply to Company Search.

The initial schema is deliberately small. Extensions belong under resource `spec` until repeated use proves that they deserve portable semantics.

Capabilities may be high-level declarations with no resources. Advanced declarations may constrain a strategy or name exact resources. Capability realisation is resolved and recorded by OmniSeed at runtime.

## Package and validation boundary

- `schema/omniform.schema.json` is the sole structural authority.
- `src/io.js` loads YAML and JSON into the same JSON-compatible representation.
- `src/validate.js` handles semantic and cross-reference rules that JSON Schema cannot express.
- `src/constants.js` exports shared vocabulary.
- `src/cli.js` exposes declaration validation.

The versioned `@omniseed/omniform` package is the contract consumed by OmniSeed. Schema, normalized object-shape, meaning, or export changes require coordinated engine and OmniSeed OS checks. Sibling source checkouts are a development convenience, not a production dependency model.

Governed company changes operate on this validated, canonical JSON-compatible object rather than YAML text. OmniSeed owns proposal hashing, authority, approval, persistence, and stale-definition checks; Omniform continues to own validation of the complete candidate definition. Runtime proposal fields never enter the language schema.
