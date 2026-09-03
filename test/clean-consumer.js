import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = new URL("..", import.meta.url);
const workspace = await mkdtemp(join(tmpdir(), "omniform-consumer-"));
const packed = join(workspace, "packed");
const consumer = join(workspace, "consumer");

try {
  await mkdir(packed);
  await mkdir(consumer);
  const { stdout } = await execFileAsync("npm", ["pack", "--json", "--pack-destination", packed], { cwd: root });
  const [artifact] = JSON.parse(stdout);
  const tarball = join(packed, artifact.filename);
  await writeFile(join(consumer, "package.json"), JSON.stringify({ private: true, type: "module" }));
  await execFileAsync("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarball], { cwd: consumer });

  const installedPackage = JSON.parse(await readFile(join(consumer, "node_modules/@omniseed/omniform/package.json")));
  assert.equal(installedPackage.version, "1.0.0-alpha.7");
  const omniform = await import(pathToFileURL(join(consumer, "node_modules/@omniseed/omniform/src/index.js")));
  const declaration = omniform.parseOmniform(await readFile(new URL("../examples/stewardship.omniform.yaml", import.meta.url), "utf8"));
  assert.equal(omniform.validateStructure(declaration).valid, true);
  assert.equal(omniform.validateSemantics(declaration).valid, true);
  assert.equal(declaration.spec.stewardship.autonomy.mode, "autonomous_safe");
  process.stdout.write(`clean consumer validated ${artifact.name}@${artifact.version}\n`);
} finally {
  await rm(workspace, { recursive: true, force: true });
}
