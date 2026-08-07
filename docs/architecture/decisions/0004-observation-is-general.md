# ADR 0004: Observation is the general monitoring primitive

- Status: Accepted

## Context

Semantic monitoring is important but does not cover deterministic metrics, events, assertions, or external state.

## Decision

Model an extensible Observation primitive. Semantic observation is one type. Keep definition, execution, evidence, finding, observed state, gap/drift, and response separate.

## Consequences

Omniform stays implementation-neutral. Alerts are responses, not observations, and runtimes can add executors without changing the portable core.
