# Contributing

Domain knowledge is as welcome as code. Start by choosing the owning layer in the contribution map in `README.md`. Small library additions usually need a manifest, readable explanation, structured definition, example, and evidence of validation. Specification changes begin as an RFC.

1. Fork or branch from `main`; keep the change focused.
2. Read applicable ADRs and open an issue for uncertain semantics.
3. Update both Learn documentation and machine contracts when applicable.
4. Run `npm test && npm run docs:check`.
5. Open a pull request explaining outcome, actors considered, and evidence.

Commons directories cover capabilities, policies, observations, semantic observations, evidence models, and viewpoints. Library maturity is `experimental`, `community`, `reviewed`, or `reference`; experimental work is not held to core-spec governance. Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).
