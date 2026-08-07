# 0005 — Omniform is the generative source model

Status: accepted

## Decision

Portable capability and operation meaning is defined once in Omniform. OmniSeed compiles those declarations with separately registered handlers into an executable registry. UI, Lily, CLI, API, agent tools, machine interfaces, and generated reference documentation are projections over that registry.

Declaration remains separate from implementation: Omniform contains no runtime handler, provider SDK, route, component, or prompt. Missing implementations remain visible as unavailable contracts. Evidence flows back through OmniSeed state and reconciliation rather than altering desired meaning.

## Consequences

Interfaces cannot independently invent operation permissions, schemas, risk, or approval semantics. Generated/materialized artifacts identify their Omniform source and are checked for drift. The architectural rule is: define once in Omniform; execute through OmniSeed; experience through any interface.
