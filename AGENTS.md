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
- Do not casually change IDs. Names can change, but IDs let us know that something is still the same thing.
- Search helps find company knowledge. Search is not the source of truth.
- If a change only belongs to OmniSeed or OmniSeed OS, do not put it here.

Use simple words in public docs. Explain a core product word the first time you use it.

Ask one question when adding a field: “Does this describe the company, or does it describe something that happened while running the company?”

If it describes what happened, it belongs in [OmniSeed](https://github.com/mikeajijola/omniseed), not Omniform.

If it is only about screens or Lily, it belongs in [OmniSeed OS](https://github.com/mikeajijola/omniseedos).

## A simple example

It is fine for Omniform to say:

> This company needs the ability to run a public website. For this company, Vercel is one chosen way to make that real.

The website need is the Capability. Vercel is only one possible realisation.

It is not fine for Omniform to say:

> The website was deployed and is healthy.

Only OmniSeed can check and record that second statement.

## How the code protects this

- Keep `schema/omniform.schema.json` as the one authority for file structure.
- Put cross-item meaning and reference checks in `src/validate.js`. Do not copy schema rules into code.
- Make YAML and JSON load as the same company.
- Keep vendor settings outside the shared language unless they sit inside a clearly Provider-specific area.
- Do not add Provider connections, secrets, live state, plans, approvals, or UI code here.
- A declared operation is a promise about an interface. It does not prove that working code exists.
- Company Search must stay inside one company and keep the source of each result. Its Provider must remain replaceable.
- Never make Omniform depend on OmniSeed or OmniSeed OS.

When the language or meaning changes:

1. Add valid and invalid tests here.
2. Decide whether old company files still work.
3. Check the affected OmniSeed and OmniSeed OS behavior.
4. Write down any needed migration. Never quietly change an old field's meaning.

Run `npm test` after every language change. Keep the examples valid. The exact file, package, and validation rules live in [`docs/architecture.md`](docs/architecture.md).
