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
  for (const observation of company?.observations || []) {
    if (!id.test(observation.id || '')) errors.push('observation id is invalid');
    if (!/^[a-z][a-z0-9-]*$/.test(observation.type || '')) errors.push(`observation ${observation.id} type is invalid`);
    if (!id.test(observation.capability || '')) errors.push(`observation ${observation.id} capability is invalid`);
    if (!observation.condition || typeof observation.condition !== 'object' || Array.isArray(observation.condition) || !Object.keys(observation.condition).length) errors.push(`observation ${observation.id} condition is required`);
  }
  return errors;
}
for (const relative of ['examples/minimal/company.json','examples/startup/company.json','examples/enterprise/company.json','examples/founding-saas/company.json','conformance/valid/missing-required-capability.json','conformance/valid/extensible-observation-type.json']) {
  const errors = validate(read(relative));
  if (errors.length) throw new Error(`${relative}: ${errors.join('; ')}`);
}
for (const relative of ['conformance/invalid/runtime-state-in-desired.json','conformance/invalid/observation-without-condition.json']) {
  if (!validate(read(relative)).length) throw new Error(`${relative}: expected invalid fixture to fail`);
}
console.log('Validated 4 examples, 2 valid fixtures, and 2 invalid fixtures.');
