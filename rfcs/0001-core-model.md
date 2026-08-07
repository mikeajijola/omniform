# RFC 0001: Core model

- Status: Accepted as initial foundation

## Decision

The portable core comprises Company, Outcome, Capability, Resource, Policy, Evidence, and SemanticMonitor. Capabilities are actor-neutral. Desired, deployment, and observed state are distinct. A missing required capability is a valid gap.

## Consequences

Implementations can interoperate without sharing a UI or provider. Runtime status is calculated outside desired definitions. New core primitives require another RFC.
