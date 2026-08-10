# Working on Omniform

When you work on Omniform, protect the meaning of the company.

Read these rules before you learn the code.

## What must stay true

- Omniform describes a company. It does not run one.
- Capabilities say what the company must be able to do.
- Providers are choices for how things may be made real.
- Do not put vendor behaviour into the core language.
- Do not say something exists just because it was declared.
- YAML and JSON must mean the same thing.
- Keep IDs stable. Names can change. IDs carry history.
- Search helps find company knowledge. Search is not the source of truth.
- If a change only belongs to OmniSeed or OmniSeed OS, do not put it here.

Use simple words in public docs. Explain a core product word the first time you use it.

Ask one question when adding a field: “Does this describe the company, or does it describe something that happened while running the company?”

If it describes what happened, it belongs in [OmniSeed](https://github.com/mikeajijola/omniseed), not Omniform.

If it is only about screens or Lily, it belongs in [OmniSeed OS](https://github.com/mikeajijola/omniseedos).

## A simple example

It is fine for Omniform to say:

> This company needs a public website and prefers Vercel for hosting.

It is not fine for Omniform to say:

> The website was deployed and is healthy.

Only OmniSeed can check and record that second statement.

## For maintainers

- Keep `schema/omniform.schema.json` as the one authority for file structure.
- Put cross-item meaning and reference checks in `src/validate.js`. Do not copy schema rules into code.
- Keep YAML and JSON format-neutral. They must load into the same JSON-compatible value.
- Treat Capability, resource, operation, and Provider IDs as stable audit identities.
- Keep the core schema Provider-neutral. Vendor settings may live inside Provider configuration or resource `spec`.
- Do not add Provider SDKs, credentials, network calls, runtime state, observations, plans, approvals, UI code, or model execution.
- A declared operation is a promise about an interface. It does not prove that working code exists.
- Company Search must keep company boundaries and result sources. It must remain replaceable.

The dependency direction is:

```text
omniform → omniseed → omniseedos
```

Never import either later project into Omniform. Production projects use versioned packages. Sibling folders are only a local development convenience.

When the schema, loaded object, meaning, or public exports change:

1. Add valid and invalid tests here.
2. Decide whether old company files still work.
3. Check OmniSeed's reading, planning, operation, and hash tests.
4. Check OmniSeed OS examples and package tests.
5. Write down any migration. Never quietly change the meaning of an old field.

Run `npm test` after every contract change. Keep the examples valid. Update [`docs/architecture.md`](docs/architecture.md) when a deep technical rule changes.
