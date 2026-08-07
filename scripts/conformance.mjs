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
    const allowed = ['id','name','purpose','required','outcomes','operations','requirements','gapPolicy'];
    if (Object.keys(capability).some(key => !allowed.includes(key))) errors.push(`unknown capability property on ${capability.id}`);
  }
  for (const resource of company?.resources || []) {
    if (!['agent','person','team','workflow','connector','system','partner','entity','machine'].includes(resource.category)) errors.push(`invalid resource category ${resource.category}`);
    if (!Array.isArray(resource.realises)) errors.push(`resource ${resource.id} must declare realises`);
    if(resource.offers&&!Array.isArray(resource.offers))errors.push(`resource ${resource.id} offers must be an array`);
  }
  for (const observation of company?.observations || []) {
    if (!id.test(observation.id || '')) errors.push('observation id is invalid');
    if (!/^[a-z][a-z0-9-]*$/.test(observation.type || '')) errors.push(`observation ${observation.id} type is invalid`);
    if (!id.test(observation.capability || '')) errors.push(`observation ${observation.id} capability is invalid`);
    if (!observation.condition || typeof observation.condition !== 'object' || Array.isArray(observation.condition) || !Object.keys(observation.condition).length) errors.push(`observation ${observation.id} condition is required`);
  }
  for(const schedule of company?.schedules||[]){if(!id.test(schedule.id||'')||!['cron','interval','calendar','one-shot'].includes(schedule.cadence?.type)||Object.keys(schedule.invokes||{}).length!==1)errors.push(`invalid schedule ${schedule.id||'<unknown>'}`)}
  for(const realisation of company?.realisations||[]){if(!id.test(realisation.id||'')||!id.test(realisation.capability||'')||!Array.isArray(realisation.resources))errors.push(`invalid capability realisation ${realisation.id||'<unknown>'}`)}
  return errors;
}
function validateCatalog(catalog){
  const errors=[];const capabilityIds=new Set((catalog?.capabilities||[]).map(item=>item.id));const operationIds=new Set((catalog?.operations||[]).map(item=>item.id));
  if(catalog?.omniform!=='0.1'||!catalog?.catalogVersion)errors.push('operation catalog identity and version are required');
  for(const capability of catalog?.capabilities||[])for(const operation of capability.operations||[])if(!operationIds.has(operation))errors.push(`capability ${capability.id} references missing operation ${operation}`);
  for(const operation of catalog?.operations||[]){if(!id.test(operation.id||'')||!/^\d+\.\d+\.\d+$/.test(operation.version||''))errors.push(`operation ${operation.id||'<unknown>'} requires an id and semantic version`);if(!capabilityIds.has(operation.capability))errors.push(`operation ${operation.id} references missing capability ${operation.capability}`);if(typeof operation.mutation!=='boolean'||!operation.input||!operation.output||!Array.isArray(operation.permissions)||!operation.approval?.mode||!Array.isArray(operation.interfaces))errors.push(`operation ${operation.id} contract is incomplete`);}
  return errors;
}
for (const relative of ['examples/minimal/company.json','examples/startup/company.json','examples/enterprise/company.json','examples/founding-saas/company.json','examples/capability-realisation/company.json','conformance/valid/missing-required-capability.json','conformance/valid/extensible-observation-type.json']) {
  const errors = validate(read(relative));
  if (errors.length) throw new Error(`${relative}: ${errors.join('; ')}`);
}
for (const relative of ['conformance/invalid/runtime-state-in-desired.json','conformance/invalid/observation-without-condition.json']) {
  if (!validate(read(relative)).length) throw new Error(`${relative}: expected invalid fixture to fail`);
}
for(const relative of ['contracts/core.operations.json','conformance/valid/operation-catalog.json']){const errors=validateCatalog(read(relative));if(errors.length)throw new Error(`${relative}: ${errors.join('; ')}`)}
if(!validateCatalog(read('conformance/invalid/operation-without-capability.json')).length)throw new Error('invalid operation catalogue fixture must fail');
console.log('Validated 4 examples, company fixtures, and versioned operation catalogues.');
