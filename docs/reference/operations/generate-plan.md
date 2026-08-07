# Generate plan

Generate a proposed organisational change plan without authorizing execution.

- **Operation:** `generate_plan`
- **Semantic version:** `0.1.0`
- **Capability:** `company_planning`
- **Mutation:** no
- **Approval:** `none`
- **Risk:** `low`
- **Permissions:** `plan_company`
- **Interfaces:** `human`, `agent`, `cli`, `api`, `machine`
- **Evidence produced:** `plan`
- **Events emitted:** `plan.created`

## Input schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "definition": {
      "type": "object"
    }
  }
}
```

## Output schema

```json
{
  "type": "object",
  "required": [
    "id",
    "status",
    "changes"
  ],
  "properties": {
    "id": {
      "type": "string"
    },
    "status": {
      "type": "string"
    },
    "changes": {
      "type": "array"
    }
  }
}
```

Generated from `contracts/core.operations.json`; do not edit manually.