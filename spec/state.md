# State

Omniform distinguishes three views:

- **Desired state**: what the definition says should exist.
- **Deployment state**: what has been provisioned, assigned, or connected.
- **Observed state**: what current evidence indicates is true.

They MUST NOT be represented as one concept. State is runtime output, separate from desired configuration. Provider identifiers and timestamps belong in deployment state; evidence-backed assertions belong in observed state.
