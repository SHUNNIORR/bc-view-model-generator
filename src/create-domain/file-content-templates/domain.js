const {toCamelCase,capitalizeFirstLetter} = require("../../util/utils");

function generateEntityDomainFile(fileName) {
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `export interface ${camelCaseFileName} {
  name: string; // set your entity properties
}`;
}

function generateEntityErrorFile(fileName) {
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `import { DefaultError } from 'infraestructure-svp';

export class ${camelCaseFileName}Error extends Error {
  title = DefaultError.title;
  code = DefaultError.code;
  description = DefaultError.description;
}`;
}

function generateGatewayFile(fileName) {
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `import { Observable } from 'rxjs';

export abstract class ${camelCaseFileName}Gateway {
  abstract execute(): Observable<any>;
};`
}

module.exports = {generateEntityDomainFile, generateGatewayFile, generateEntityErrorFile};
