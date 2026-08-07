import fs from 'node:fs';
const required = ['README.md','docs/index.md','spec/README.md','CONTRIBUTING.md'];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing ${file}`);
console.log(`Documentation entry points present (${required.length}).`);
