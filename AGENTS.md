# Agent instructions

Omniform owns the portable specification and knowledge commons. Read `README.md`, `spec/README.md`, and relevant ADRs before changing it.

- Do not add runtime execution, product UI, vendor-specific fields, or secrets.
- Do not add SQLite, Turso, Redis, Vercel, or another persistence/hosting choice to portable semantics. Omniform declares meaning; OmniSeed chooses storage and deployment implementations.
- Keep intent, capability, actor, interface, implementation, policy, state, and evidence separate.
- Capabilities are actor-neutral. Human, software/AI, and embodied-machine interfaces must share underlying semantics.
- Keep desired, deployment, and observed state separate. Missing required capabilities are valid and produce gaps.
- Observation definitions, including semantic observations, belong here; execution, findings, and presentation do not.
- Use an RFC for substantive semantics. Library contributions intentionally have a lighter path.
- Give important concepts readable documentation and structured representations where appropriate.
- Treat Omniform operation definitions as the generative semantic source for runtime registries, interface metadata, tools, CLI/API contracts, and reference docs. Keep handlers and presentation implementations downstream.
- Do not introduce a resource abstraction that competes with Capability. Agents, Skills, Connectors, Workflows, Schedules, Providers, People, and Machines exist to realise capabilities; natural language must hand off structured capability intent to governed deterministic execution.
- Make the smallest coherent change; update schemas, fixtures, examples, and tests when semantics change.
- Run `npm test && npm run docs:check` and report the evidence. Do not duplicate responsibilities owned by OmniSeed or OmniSeed OS.
