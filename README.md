# Omniform

Omniform is a way to describe one company.

## The idea

A company should be something we can describe clearly. We should be able to write down what it is meant to be.

Omniform is the language for doing that.

It says what a company needs to be able to do. It may also say which Providers the company wants to use.

A **Capability** is something the company needs to be able to do. Customer Support is a Capability. Sending an invoice could be another one.

A **Provider** is a possible way to make part of the company real. A company can choose different Providers for different kinds of work.

Omniform does not run the company. It does not claim that something exists just because someone wrote it down.

When an authorised actor proposes changing the company, OmniSeed applies a deterministic change to the parsed Omniform object, validates the complete resulting company here, and governs whether that candidate becomes canonical. Omniform does not store proposals, approvals, or runtime history.

Omniform also stays neutral about Providers. Its core language does not belong to one vendor.

People can write Omniform in YAML. Software can also use JSON. Both formats mean the same thing.

## How it fits

Company as Code means a company can be described, created, checked, and changed through code.

A company should be able to run from that description. Its work may be done by people, software, AI agents, services, or machines. Where it is safe and useful, that work can be automated.

```text
Company as Code
      ↓
Omniform describes the company
      ↓
OmniSeed makes the company real
      ↓
OmniSeed OS is where the company is seen and operated
```

[OmniSeed](https://github.com/mikeajijola/omniseed) reads Omniform and works out what needs to happen.

[OmniSeed OS](https://github.com/mikeajijola/omniseedos) shows the company. Lily is the company's steward inside OmniSeed OS.

These are three parts of one system.

## A small example

Imagine a company needs Customer Support.

That Capability may need to:

- receive a customer message
- understand the problem
- look up customer information
- send a reply

Omniform can describe those needs. It can also name the Providers the company would like to use.

But the Omniform file does not send a reply. It does not prove that an inbox exists. OmniSeed must check what is real and do the work.

## What this project owns

Omniform owns the shared language for describing one company.

It owns:

- the shape of a company file
- the meaning of Capabilities, Providers, resources, and operations
- YAML and JSON loading
- checks that catch invalid company files

It does not own:

- live company state
- Provider connections or secrets
- plans, approvals, or changes to outside systems
- the user interface or Lily

Search can help people find company knowledge. Search is not the source of truth. The original company records still matter.

## Try it

You need Node.js 22 or newer.

```sh
npm install
npm test
npx omniform validate examples/company.omniform.yaml
```

Start with [`examples/company.omniform.yaml`](examples/company.omniform.yaml). Use YAML for a file that people will write. Use JSON when software creates the file.

## For developers

Read [`docs/architecture.md`](docs/architecture.md) for the exact Provider model, file rules, IDs, validation, resources, operations, and package boundary.

A change to the Omniform language can affect [OmniSeed](https://github.com/mikeajijola/omniseed) and [OmniSeed OS](https://github.com/mikeajijola/omniseedos). Check all three projects before releasing that kind of change.

## Project status

Omniform is in Generation 1 and early development.

Licensing has not been decided. The package does not declare a license yet.
