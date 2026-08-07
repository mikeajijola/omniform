# Operations

An Operation is a versioned, actor-neutral contract for something a capability can do. It declares portable meaning, input and output schemas, permissions, mutation and approval semantics, risk, interfaces, expected evidence and events, and optional presentation hints. It MUST NOT declare routes, components, provider SDK calls, or implementation code.

Capabilities expose operation identifiers. Implementations bind handlers separately and MUST report a declared operation as unavailable when its handler, provider, policy, or dependency is missing. An implementation-only handler is non-conformant.

Semantic compatibility is versioned independently from HTTP endpoints. Breaking input, output, permission, or behavioral changes require a new incompatible operation version.
