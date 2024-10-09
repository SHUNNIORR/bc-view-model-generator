const {toCamelCase,capitalizeFirstLetter} = require("../../util/utils");

function generateUseCaseFile(fileName) {
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));;

  return `import { Injectable } from '@angular/core';

import { ${camelCaseFileName}Gateway } from '../../domain/${fileName}/${fileName}.gateway';

@Injectable({
  providedIn: 'root',
})
export class ${camelCaseFileName}Usecase {
  constructor(private gateway: ${camelCaseFileName}Gateway) {}

  execute() {
    return this.gateway.execute();
  }
}
`;
}

function generateUseCaseTestFile(fileName) {
    const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));;

    return`import { TestBed } from '@angular/core/testing';

import { ${camelCaseFileName}Usecase } from './${fileName}.usecase';

describe('${camelCaseFileName}Usecase', () => {
  let useCase: ${camelCaseFileName}Usecase;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       ${camelCaseFileName}UseCase,
      ],
    });
    useCase = TestBed.inject(${camelCaseFileName}UseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });
})
`;
}


module.exports = {generateUseCaseFile, generateUseCaseTestFile};
