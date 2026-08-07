# Resolve capability

Calculate coverage, gaps, and candidate realisations for a required company capability.

- **Operation:** `resolve_capability`
- **Semantic version:** `0.1.0`
- **Capability:** `capability_realisation`
- **Mutation:** no
- **Approval:** `none`
- **Risk:** `none`
- **Permissions:** `plan_company`
- **Interfaces:** `human`, `agent`, `cli`, `api`, `machine`
- **Evidence produced:** none
- **Events emitted:** none

## Input schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "capabilityId"
  ],
  "properties": {
    "capabilityId": {
      "type": "string"
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