# ADR 0007: Persistence is an implementation concern

## Status

Accepted.

## Decision

Omniform defines portable organisational intent, lifecycle semantics, evidence expectations, and operation contracts. It does not define a database, cache, queue, hosting platform, or storage topology.

OmniSeed may use one SQLite database locally and a SQLite-compatible remote service when hosted. That choice must not change an Omniform company definition.

## Consequences

A company remains portable across local, hosted, and self-contained runtimes. Desired, deployed, and observed state plus evidence remain distinct concepts regardless of whether their records share one physical database.
