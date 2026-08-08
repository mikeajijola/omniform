# Omniform

Omniform is the open, declarative Company-as-Code language. It describes what one company should be; it never claims what is deployed or observed.

```sh
npm install
npm test
npx omniform validate examples/omniseed/omniform.yaml
```

The stable unit is a capability. Requirements state the abilities that must be covered, optional resources constrain or prescribe a realisation, and the provider map selects a desired provider per primitive family. Declaring a provider does not assert that its implementation is installed or healthy. Runtime state belongs to OmniSeed, not this declaration.

The published JSON Schema is the sole structural authority. Custom validation handles only semantic and referential rules. Minimal operation declarations generate downstream runtime contracts.

See [`docs/architecture.md`](docs/architecture.md) for the constitutional boundaries.

Licensing remains intentionally unresolved pending an explicit project decision; the Generation 1 package declares no license metadata.
