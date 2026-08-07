# Accept capability gap

Record an explicit governed decision to accept a currently unmet capability requirement.

- **Operation:** `accept_capability_gap`
- **Semantic version:** `0.1.0`
- **Capability:** `company_governance`
- **Mutation:** yes
- **Approval:** `required`
- **Risk:** `medium`
- **Permissions:** `govern_company`
- **Interfaces:** `human`, `agent`, `cli`, `api`, `machine`
- **Evidence produced:** `governance_decision`
- **Events emitted:** `capability.gap.accepted`

## Input schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "capabilityId",
    "reason",
    "authorization"
  ],
  "properties": {
    "capabilityId": {
      "type": "string"
    },
    "reason": {
      "type": "string"
    },
    "authorization": {
      "type": "object"
    }
  }
}
```

## Output schema

```json
{
  "type": "object"
}
```

Generated from `contracts/core.operations.json`; do not edit manually.