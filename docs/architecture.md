# Omniform architecture

Omniform defines exactly one company. Its source is Git-friendly YAML, while its executable contract is the validated in-memory declaration exported by this package.

## Invariants

- Capability is primary; actors and implementations may change.
- Provider selection is per primitive family.
- The merged Git branch named by `spec.governance.desiredState` is desired-state authority; Omniform contains no shadow runtime copy.
- Resources are desired instances of primitives.
- Desired, deployed, and observed state never collapse into one record.
- Omniform contains no provider SDK calls, UI implementation, model execution, credentials, or runtime state.
- Stable IDs carry authority and audit identity; display names do not.
- JSON Schema is canonical for structure; code validates only cross-object semantics.
- Operations declare interface contracts but never claim a handler is implemented.
- Serialization is format-neutral: YAML and JSON normalize to one canonical object.
- Search and retrieval are ordinary replaceable operations over governed memory and connectors; they never become canonical company truth.

The initial schema is deliberately small. Extensions belong under resource `spec` until repeated use proves that they deserve portable semantics.

Capabilities may be high-level declarations with no resources. A named Realisation records how a Capability is intentionally assembled from primitive resources and which requirements each participant supplies. Runtime deployment and observation remain OmniSeed state; declaring a Realisation does not prove it works. The legacy inline `realisation` shape remains readable during the alpha migration but new definitions use `spec.realisations` and capability references.

Every real company names a canonical HTTPS Git repository, merged branch, Omniform path, and `pull_request` change mode. These fields identify approved desired state. Commit revisions, check results, deployments, observations, and evidence are runtime facts and therefore do not enter Omniform.

## Package and validation boundary

- `schema/omniform.schema.json` is the sole structural authority.
- `src/io.js` loads YAML and JSON into the same JSON-compatible representation.
- `src/validate.js` handles semantic and cross-reference rules that JSON Schema cannot express.
- `src/constants.js` exports shared vocabulary.
- `src/cli.js` exposes declaration validation.

The versioned `@omniseed/omniform` package is the contract consumed by OmniSeed. Schema, normalized object-shape, meaning, or export changes require coordinated engine and OmniSeed OS checks. Sibling source checkouts are a development convenience, not a production dependency model.

Governed company changes operate on this validated, canonical JSON-compatible object rather than YAML text. OmniSeed owns proposal hashing, authority, approval, persistence, and stale-definition checks; Omniform continues to own validation of the complete candidate definition. Runtime proposal fields never enter the language schema.

## Company manifestation vocabulary

A **Capability** is what the company needs to be able to do. A **Primitive** is a fundamental kind of thing the company intentionally needs manifested so a Capability can exist. A **Provider** is a replaceable implementation that realises one or more primitive families, selected independently per family. An **Agent** is agency that can act for the company under authority; it may be a person, AI system, deterministic software, service, team, or external organisation. A **Resource** is a desired instance associated with a primitive. **State** records concrete realised facts. An **Observation** is what reality currently reports, and **Evidence** is why OmniSeed believes it.

The canonical primitive families are:

- `agents`: agency that can act on behalf of the company;
- `skills`: abilities available to an agent, distinct from company Capabilities;
- `connectors`: governed reach across a boundary, not merely APIs;
- `workflows`: actor-neutral progression of coordinated work through steps or states;
- `schedules`: when work, obligations, checks, or activation occur;
- `policies`: constraints on what may, must, or must not happen;
- `observations`: desired mechanisms through which the company perceives reality, distinct from runtime observation records;
- `memory`: organisational continuity, retention, and recall rather than storage technology;
- `identity`: principals recognised by the company, separate from agency and authorization;
- `machines`: active physical capacity capable of affecting the physical world, not every non-human actor or passive asset.

A Provider realises primitive-family requirements. High-level Capabilities compose those requirements and never bind directly to vendors. A package may support several families, but selection remains independent for every family.

Persistent realised resources belong to deployed and observed state; persistence alone does not create a primitive family. The removed `systems` family has no universal replacement.

Company Search is an example of a Company Capability, not a primitive family. The `company_search` Capability means that the company can find and retrieve relevant company knowledge. A declared strategy may compose `skills` and `memory`, `skills` and `connectors`, or agents with skills, connectors, memory, policies, identity, and observations. No one primitive is synonymous with the Capability: `company_search` is not `memory` and is not `skills`. The ordinary `search_company` operation exposes authorized invocation through that Capability. Search results remain retrieval output rather than canonical company truth.
