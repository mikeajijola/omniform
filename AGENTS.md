# Agent instructions

Omniform owns the portable specification and knowledge commons. Read `README.md`, `spec/README.md`, and relevant ADRs before changing it.

- Do not add runtime execution, product UI, vendor-specific fields, or secrets.
- Keep intent, capability, actor, interface, implementation, policy, state, and evidence separate.
- Capabilities are actor-neutral. Human, software/AI, and embodied-machine interfaces must share underlying semantics.
- Keep desired, deployment, and observed state separate. Missing required capabilities are valid and produce gaps.
- Semantic-monitor definitions belong here; execution and presentation do not.
- Use an RFC for substantive semantics. Library contributions intentionally have a lighter path.
- Give important concepts readable documentation and structured representations where appropriate.
- Make the smallest coherent change; update schemas, fixtures, examples, and tests when semantics change.
- Run `npm test && npm run docs:check` and report the evidence. Do not duplicate responsibilities owned by OmniSeed or OmniSeed OS.
