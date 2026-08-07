# Observations

An `Observation` declares what must be learned about organisational reality. It is a general, extensible primitive—not a synonym for semantic monitoring. The initial well-known types are `metric`, `event`, `semantic`, `assertion`, and `external-state`; implementations MUST accept extension type names that follow the identifier convention.

The portable flow is:

`observation requirement → observing resources → evidence → finding → observed state → gap/drift → response`

An observation definition states its subject or capability, type, condition/evidence needs, and possible responses. Runtime execution records an `ObservationExecution`; it does not modify the desired definition.

## Semantic Alerts terminology

**Semantic Alerts** is a user-facing product concept. The underlying concepts remain distinct:

- **Semantic Observation:** the meaning-based question to monitor.
- **Semantic Evaluation:** execution against referenced evidence.
- **Semantic Finding:** a structured result of that evaluation.
- **Alert:** one possible routed response to a finding.

A finding may instead update capability health, create work, trigger a workflow, notify an agent or person, produce drift, or generate a plan. Free-form model prose is never the portable state contract.
