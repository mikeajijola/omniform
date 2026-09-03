import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("packed alpha contains the stewardship contract and release evidence", async () => {
  const destination = await mkdtemp(join(tmpdir(), "omniform-pack-"));
  try {
    const { stdout } = await execFileAsync("npm", ["pack", "--json", "--pack-destination", destination], {
      cwd: new URL("..", import.meta.url)
    });
    const [pack] = JSON.parse(stdout);
    assert.equal(pack.name, "@omniseed/omniform");
    assert.equal(pack.version, "1.0.0-alpha.7");
    const paths = new Set(pack.files.map(file => file.path));
    for (const required of [
      "schema/omniform.schema.json",
      "src/index.js",
      "src/validate.js",
      "docs/releases/1.0.0-alpha.7.md",
      "docs/releases/1.0.0-alpha.7.json"
    ]) assert.equal(paths.has(required), true, `packed artifact is missing ${required}`);

    const evidence = JSON.parse(await readFile(new URL("../docs/releases/1.0.0-alpha.7.json", import.meta.url)));
    assert.equal(evidence.version, pack.version);
    assert.equal(evidence.downstream.specifier, `${pack.name}@${pack.version}`);
    assert.equal(evidence.publication.status, "pending_post_merge");
  } finally {
    await rm(destination, { recursive: true, force: true });
  }
});
