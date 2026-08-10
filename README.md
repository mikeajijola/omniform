# Omniform

Omniform is a way to describe one company.

## The idea

A company should be something we can describe clearly.

Omniform is the language for doing that.

It says what a company needs to be able to do. It may also say which Providers the company wants to use.

A **Capability** is something the company needs to be able to do. Customer Support is a Capability. Sending an invoice could be another one.

A **Provider** is a possible way to make part of the company real. A company may choose one Provider for email and another for hosting.

Omniform does not run the company. It does not claim that something exists just because someone wrote it down.

Omniform also stays neutral about Providers. Its core language does not belong to one vendor.

People can write Omniform in YAML. Software can also use JSON. Both formats mean the same thing.

## How it fits

Company as Code means a company can be described, created, checked, and changed through code.

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

Omniform owns the shared language for describing a company.

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

The JSON Schema in [`schema/omniform.schema.json`](schema/omniform.schema.json) defines the file structure. Code adds checks for links between items.

Read [`docs/architecture.md`](docs/architecture.md) for technical rules about IDs, validation, resources, operations, Provider choice, and the line between requested and real state.

OmniSeed uses the versioned `@omniseed/omniform` package. A change to the schema or meaning of a field can affect [OmniSeed](https://github.com/mikeajijola/omniseed) and [OmniSeed OS](https://github.com/mikeajijola/omniseedos). Test all three before releasing a contract change.

## Project status

Omniform is in Generation 1 and early development.

Licensing has not been decided. The package does not declare a license yet.
