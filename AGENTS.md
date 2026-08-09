# Generation 1 invariants

- Omniform serialization is format-neutral; YAML and JSON normalize to one canonical object.
- JSON Schema remains the sole structural authority.
- Company Search is a first-class primitive family with a replaceable provider.
- Search performs governed discovery, retrieval and indexing; it is not canonical truth.
- Lily and other actors use OmniSeed operations and never call a search vendor directly.
- Declaring a Company Search provider never fabricates an implementation.
- Every Company Search request is scoped to one company/namespace.
