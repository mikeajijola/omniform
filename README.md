# Omniform

Omniform is the open, declarative Company-as-Code semantic model. It describes what one company should be; it never claims what is deployed or observed.

```sh
npm install
npm test
npx omniform validate examples/omniseed/omniform.yaml
```

Omniform supports YAML and JSON authoring (`*.omniform.yaml`, `*.omniform.yml`, `*.omniform.json`, or an explicitly supplied plain extension). YAML is recommended for human-authored company definitions; JSON is useful for machine generation and APIs. Both normalize into the same canonical JSON-compatible object and use the same JSON Schema.

The stable unit is a capability. Requirements state the abilities that must be covered, optional resources constrain or prescribe a realisation, and the provider map selects a desired provider per primitive family. Declaring a provider does not assert that its implementation is installed or healthy. Runtime state belongs to OmniSeed, not this declaration.

The published JSON Schema is the sole structural authority. Custom validation handles only semantic and referential rules. Minimal operation declarations generate downstream runtime contracts.

`company_search` is the governed, replaceable primitive for organisational discovery and retrieval. Search indexes canonical information but never owns definitions, state, plans, approvals, permissions, or authoritative evidence metadata.

See [`docs/architecture.md`](docs/architecture.md) for the constitutional boundaries.

Licensing remains intentionally unresolved pending an explicit project decision; the Generation 1 package declares no license metadata.
