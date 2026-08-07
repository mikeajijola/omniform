# Conformance

Schema conformance means a definition validates against `schemas/omniform.schema.json`. Semantic conformance additionally implements normative specification rules. Every mechanically enforceable rule should gain a valid and invalid fixture. Run `npm test`; filenames under `conformance/valid` must pass and those under `conformance/invalid` must fail.
