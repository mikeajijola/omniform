# Apply plan

Apply explicitly approved changes from the current plan through governed runtime and provider handlers.

- **Operation:** `apply_plan`
- **Semantic version:** `0.1.0`
- **Capability:** `company_governance`
- **Mutation:** yes
- **Approval:** `required`
- **Risk:** `high`
- **Permissions:** `apply_plan`
- **Interfaces:** `human`, `agent`, `cli`, `api`, `machine`
- **Evidence produced:** `apply_result`, `state_snapshot`
- **Events emitted:** `plan.approved`, `apply.started`, `state.updated`

## Input schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "planId",
    "approvedChangeIds",
    "authorization"
  ],
  "properties": {
    "planId": {
      "type": "string"
    },
    "approvedChangeIds": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "authorization": {
      "type": "object",
      "required": [
        "actorId",
        "permissions"
      ],
      "properties": {
        "actorId": {
          "type": "string"
        },
        "permissions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

## Output schema

```json
{
  "type": "object",
  "required": [
    "state",
    "results",
    "summary"
  ],
  "properties": {
    "state": {
      "type": "object"
    },
    "results": {
      "type": "array"
    },
    "summary": {
      "type": "object"
    }
  }
}
```

Generated from `contracts/core.operations.json`; do not edit manually.