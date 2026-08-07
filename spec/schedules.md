# Schedules

A Schedule declares when an operation, workflow, observation, agent task, reconciliation, or plan refresh should be invoked. Cadence types initially include `cron`, `interval`, `calendar`, and `one-shot` and remain separate from scheduling implementation.

OmniSeed selects an implementation such as its local scheduler, Vercel Cron, GitHub Actions, a cloud timer, or another provider. A wait inside a workflow remains workflow semantics; recurring invocation of that workflow belongs to Schedule.
