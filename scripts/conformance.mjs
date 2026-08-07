import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const id = /^[a-z][a-z0-9_-]*$/;
function validate(document) {
  const errors = [];
  if (document?.omniform !== '0.1') errors.push('omniform must be 0.1');
  const company = document?.company;
  if (!company || !id.test(company.id || '') || !company.name || !company.purpose) errors.push('company identity, name, and purpose are required');
  if (!Array.isArray(company?.capabilities)) errors.push('capabilities must be an array');
  for (const capability of company?.capabilities || []) {
    if (!id.test(capability.id || '') || !capability.name || typeof capability.required !== 'boolean') errors.push(`invalid capability ${capability.id || '<unknown>'}`);
    if ('status' in capability) errors.push('desired capabilities cannot contain runtime status');
    const allowed = ['id','name','purpose','required','outcomes'];
    if (Object.keys(capability).some(key => !allowed.includes(key))) errors.push(`unknown capability property on ${capability.id}`);
  }
  for (const resource of company?.resources || []) {
    if (!['agent','person','team','workflow','connector','system','partner','entity'].includes(resource.category)) errors.push(`invalid resource category ${resource.category}`);
    if (!Array.isArray(resource.realises)) errors.push(`resource ${resource.id} must declare realises`);
  }
  return errors;
}
for (const relative of ['examples/minimal/company.json','examples/startup/company.json','examples/enterprise/company.json','conformance/valid/missing-required-capability.json']) {
  const errors = validate(read(relative));
  if (errors.length) throw new Error(`${relative}: ${errors.join('; ')}`);
}
for (const relative of ['conformance/invalid/runtime-state-in-desired.json']) {
  if (!validate(read(relative)).length) throw new Error(`${relative}: expected invalid fixture to fail`);
}
console.log('Validated 3 examples, 1 valid fixture, and 1 invalid fixture.');
