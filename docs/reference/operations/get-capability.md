# Get capability

Get the calculated state, realisations, gaps, and evidence for one capability.

- **Operation:** `get_capability`
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
  "additionalProperties": false,
  "required": [
    "id"
  ],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_-]*$"
    }
  }
}
```

## Output schema

```json
{
  "type": [
    "object",
    "null"
  ]
}
```

Generated from `contracts/core.operations.json`; do not edit manually.