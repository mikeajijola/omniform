# A minimal company

`examples/minimal/company.json` requires Customer Research and Customer Support. Only a Research Agent is desired and active, so a runtime should calculate Research as `realised` and Support as `missing`. The missing capability remains a valid definition and makes the next useful plan obvious: propose a Support Agent, review it, approve it, then apply it.

Run `npm test` to validate this example and all conformance cases.
