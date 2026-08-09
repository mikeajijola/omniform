# Deploying a company from Omniform

The deployment lifecycle is:

```text
company.omniform.yaml
→ omniseed bootstrap (validate, compile, resolve, persist plan)
→ owner reviews exact provider actions
→ owner approves selected action IDs
→ omniseed apply
→ providers adopt/provision resources
→ independent observation and evidence
→ reconciliation
→ the company's OmniSeed OS URL
```

YAML is the human-facing source. The equivalent JSON form proves serialization neutrality. Provider credentials are injected only at runtime; they never enter Omniform, plans, state, evidence, logs, or browser code.

See `examples/omniseed-company/company.omniform.yaml` for the first dogfood company.
