# Get capability realisation

Inspect selected resources and requirement coverage for a company capability.

- **Operation:** `get_capability_realisation`
- **Semantic version:** `0.1.0`
- **Capability:** `capability_realisation`
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
  "type": [
    "object",
    "null"
  ]
}
```

Generated from `contracts/core.operations.json`; do not edit manually.