# Omniform

Omniform is the declarative language at the bottom of the OmniSeed ecosystem. It describes **what one company is intended to be**—its capabilities, required primitive families, desired providers, resources, operations, outcomes, and autonomy constraints. It does not deploy anything and never claims that a provider or resource exists, is connected, or is healthy.

The repository owns the portable Company-as-Code contract:

- `schema/omniform.schema.json` is the structural authority for a company declaration.
- `src/io.js` loads YAML or JSON into the same canonical JavaScript object.
- `src/validate.js` adds semantic and referential checks that JSON Schema cannot express.
- `src/constants.js` exposes the shared vocabulary.
- `src/cli.js` provides declaration validation.

Capabilities are the stable unit of intent. A capability lists requirements by primitive family; resources may constrain how it should be realised; the provider map selects the desired provider for each family. Operations describe governed interfaces—including permissions, approval mode, mutation status, and allowed clients—but declaration does not make an operation executable.

## Place in the ecosystem

The repositories form a one-way dependency chain:

```text
Omniform declaration
        │ parsed and validated by @omniseed/omniform
        ▼
OmniSeed engine
        │ compiles runtime truth and controls plan/approve/apply
        ▼
OmniSeed OS
          presents one company's registry through UI, API, and Lily
```

- [OmniSeed](https://github.com/mikeajijola/omniseed) consumes the versioned `@omniseed/omniform` package. It resolves capabilities against registered providers and runtime state; that deployed/observed state must never be written back into an Omniform declaration.
- [OmniSeed OS](https://github.com/mikeajijola/omniseedos) normally consumes Omniform indirectly through OmniSeed, and directly only to load/validate the configured company declaration. UI- or deployment-specific fields do not belong in this schema.

A schema or semantic change here is therefore a contract change for both downstream repositories. Coordinate versions, update engine compiler/resolver tests, and update OS fixtures before release. Production consumers use versioned packages; sibling directories such as `../omniseed` and `../omniseedos` are only a convenient local checkout layout.

## Quick start

Requires Node.js 22 or newer.

```sh
npm install
npm test
npx omniform validate examples/company.omniform.yaml
```

YAML is recommended for human-authored declarations and JSON for generated declarations or APIs. Files may use `*.omniform.yaml`, `*.omniform.yml`, or `*.omniform.json`; both formats normalize to the same JSON-compatible object.

```js
import { loadOmniform, parseOmniform, validateOmniform } from "@omniseed/omniform";

const company = await loadOmniform("company.omniform.yaml");
```

See [`examples/company.omniform.yaml`](examples/company.omniform.yaml) for a minimal company and [`docs/architecture.md`](docs/architecture.md) for constitutional boundaries.

## Truth and ownership boundaries

Omniform owns desired, portable semantics. OmniSeed owns plans, approvals, provider status, deployed and observed resources, evidence, history, and state versions. OmniSeed OS owns presentation and request transport. Provider SDK calls, credentials, UI concerns, runtime health, and reconciliation logic must not enter this package.

`company_search` illustrates the boundary: Omniform can require search and select a desired provider, but it does not contain an index or claim that the provider is installed. Search may index canonical information for governed retrieval; it never becomes canonical company truth.

Licensing remains intentionally unresolved pending an explicit project decision; the Generation 1 package declares no license metadata.
