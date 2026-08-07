# Omniform

**Omniform is the open Company-as-Code specification and organisational knowledge commons.** It defines what a portable company model means, independently of any runtime or user interface.

```
Omniform (meaning) → OmniSeed (execution) → OmniSeed OS (interaction)
```

It is for founders and domain experts describing organisations, architects building compatible systems, and developers implementing tooling. Start with the [guided example](docs/getting-started/minimal-company.md), read the [specification](spec/README.md), or run `npm test` to validate the examples and conformance fixtures.

## Ecosystem

- **Omniform** — this repository: specification, schemas, conformance, and reusable capability knowledge.
- [OmniSeed](https://github.com/mikeajijola/omniseed) — headless reference runtime for Omniform.
- [OmniSeed OS](https://github.com/mikeajijola/omniseedos) — capability-centric operating environment powered by OmniSeed.

## Choose where to contribute

| Change | Repository / location |
| --- | --- |
| Company-as-Code semantics, state semantics, core primitive | Omniform `spec/`, normally through an RFC |
| Reusable capability, policy, evidence model, semantic monitor | Omniform `library/` |
| Validation, planning, state, apply, CLI | OmniSeed |
| External integration/provider | OmniSeed provider contracts |
| Operating experience, accessibility, actor interfaces | OmniSeed OS, preserving shared capabilities |

See [CONTRIBUTING.md](CONTRIBUTING.md), the [documentation](docs/index.md), and [governance](GOVERNANCE.md). Canonical documentation lives in Git; GitHub Pages is a published projection.

## Core invariant

Keep **intent, capability, actor, interface, implementation, policy, state, and evidence** distinct. A capability says what can happen. Humans, software/AI, and embodied machines may access it through different interfaces, but authority, policy, state transition, audit, and evidence remain common.

## Status

This is an early `0.1` foundation. Missing required capabilities are valid gaps, not invalid companies. Compatibility is not yet guaranteed.
