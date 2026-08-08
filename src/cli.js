#!/usr/bin/env node
import { loadOmniform } from "./io.js";

const [, , command, path = "omniform.yaml"] = process.argv;
if (command !== "validate") {
  console.error("Usage: omniform validate [omniform.yaml]");
  process.exitCode = 2;
} else {
  try {
    const declaration = await loadOmniform(path);
    console.log(`Valid company: ${declaration.metadata.name} (${declaration.metadata.id})`);
  } catch (error) {
    if (error.issues) error.issues.forEach(item => console.error(`${item.path}: ${item.message}`));
    else console.error(error.message);
    process.exitCode = 1;
  }
}
