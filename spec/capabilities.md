# Capabilities

A Capability describes what can be done and why. It is actor-neutral. `required: true` expresses intent even when no resource realises it; that definition remains valid and produces a capability gap. Implementations calculate `missing`, `planned`, `partial`, `realised`, `degraded`, `retired`, or `unknown` from state and evidence rather than embedding these labels in desired configuration.
