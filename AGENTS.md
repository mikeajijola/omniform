# Working in Omniform

Omniform is the source-language and validation repository for the OmniSeed ecosystem. Changes here define portable desired-state contracts; they must not implement runtime behaviour.

## Repository responsibilities

- Keep `schema/omniform.schema.json` the sole structural authority.
- Keep YAML and JSON serialization-neutral: both must normalize into the same canonical object.
- Put only cross-object, semantic, or referential checks in `src/validate.js`; do not duplicate structural schema rules in code.
- Treat capability IDs, resource IDs, operation IDs, and provider IDs as stable authority/audit identifiers. Display names are not identity.
- Keep the schema provider-neutral. Vendor-specific configuration may live under declared provider configuration or resource `spec`, not in core portable semantics without repeated evidence.
- Do not add provider SDKs, credentials, network calls, deployment state, observations, plans, approvals, UI code, or model execution.

## Ecosystem contract

- [OmniSeed](https://github.com/mikeajijola/omniseed) depends on `@omniseed/omniform` and owns compilation, resolution, providers, state, planning, approval, apply, and reconciliation.
- [OmniSeed OS](https://github.com/mikeajijola/omniseedos) depends on both packages and owns per-company UI/API/Lily projection. It must not drive schema design with presentation-only fields.
- Dependency direction is `omniform → omniseed → omniseedos`; never import either downstream repository here.
- Sibling checkouts are a development convenience only. Cross-repository contracts must work through versioned package exports and artifacts.

When changing schema, constants, normalized object shape, or exports:

1. Add positive and negative fixtures/tests in this repository.
2. Decide whether the change is backward compatible and update the package version accordingly.
3. Check OmniSeed's compiler, resolver, planner hashes, operation registry, and tests against the new contract.
4. Check OmniSeed OS declarations/fixtures and distribution test against matching package versions.
5. Document migration expectations; never silently reinterpret an existing field.

## Invariants

- Capabilities express intent; resources and providers express a desired realisation, not actual deployment.
- Desired, deployed, observed, and indexed state never collapse into one record.
- Declaring a provider does not assert an installed implementation or health.
- Declaring an operation does not assert that a handler is registered or available.
- Company Search is a first-class replaceable primitive for governed discovery and retrieval, not canonical truth.
- Every Company Search request is scoped by company/namespace; provenance remains attached to results.
- Lily and all other actors reach search through executable OmniSeed operations, never a vendor API declared here.

Run `npm test` after every contract change. Keep examples valid under the published schema and update `docs/architecture.md` when an architectural boundary changes.
