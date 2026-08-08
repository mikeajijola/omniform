# Omniform architecture

Omniform defines exactly one company. Its source is Git-friendly YAML, while its executable contract is the validated in-memory declaration exported by this package.

## Invariants

- Capability is primary; actors and implementations may change.
- Provider selection is per primitive family.
- Resources are desired instances of primitives.
- Desired, deployed, and observed state never collapse into one record.
- Omniform contains no provider SDK calls, UI implementation, model execution, credentials, or runtime state.
- Stable IDs carry authority and audit identity; display names do not.

The initial schema is deliberately small. Extensions belong under resource `spec` until repeated use proves that they deserve portable semantics.
