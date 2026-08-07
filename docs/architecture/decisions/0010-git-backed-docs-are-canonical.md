# ADR 0010: Git-backed documentation is canonical

- Status: Accepted

## Context

Maintaining repository docs and a separate wiki creates drift.

## Decision

Keep documentation in `/docs`, validate it in pull requests, and publish it through lightweight GitHub Pages automation.

## Consequences

Every documentation change is reviewable and versioned. No canonical wiki-only pages are maintained.
