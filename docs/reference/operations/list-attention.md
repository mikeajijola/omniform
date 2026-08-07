# List attention

List gaps, blocked work, approvals, findings, drift, and stale evidence requiring attention.

- **Operation:** `list_attention`
- **Semantic version:** `0.1.0`
- **Capability:** `company_inspection`
- **Mutation:** no
- **Approval:** `none`
- **Risk:** `none`
- **Permissions:** `read_company`
- **Interfaces:** `human`, `agent`, `cli`, `api`, `machine`
- **Evidence produced:** none
- **Events emitted:** none

## Input schema

```json
{
  "type": "object",
  "additionalProperties": false
}
```

## Output schema

```json
{
  "type": "array"
}
```

Generated from `contracts/core.operations.json`; do not edit manually.