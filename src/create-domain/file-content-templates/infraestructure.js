const { toCamelCase, capitalizeFirstLetter } = require("../../util/utils");

function generateInfraestructureGatewayFile(fileName) {
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ${camelCaseFileName}Gateway } from '../../domain/${fileName}/${fileName}.gateway';
import { Http${camelCaseFileName} } from './http-${fileName}.response';

@Injectable({
  providedIn: 'root',
})
export class Http${camelCaseFileName}Gateway implements ${camelCaseFileName}Gateway {
  private httpClient: HttpClient = inject(HttpClient);
  execute(): Observable<${camelCaseFileName}Gateway> {
    return this.httpClient
      .get<Http${camelCaseFileName}>(
       // set environment base url}
      )
  }
}
`;
}

function generateInfraestructureGatewayTestFile(fileName) {
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `import { TestBed } from '@angular/core/testing';

import { Http${camelCaseFileName}Gateway } from './http-${fileName}.gateway';

describe('Http${camelCaseFileName}', () => {
  let service: Http${camelCaseFileName}Gateway;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       Http${camelCaseFileName}Gateway,
      ],
    });
    service = TestBed.inject(Http${camelCaseFileName}Gateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})
`;
}

function generateInfraestructureResponseFile(fileName) {
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `export interface Http${camelCaseFileName} {
    name: string; // set your entity properties
  }`;
}

function generateInfraestructureMapperFile(fileName){
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `import { ${camelCaseFileName} } from '../../../domain/${fileName}/${fileName}.entity';
import { Http${camelCaseFileName} } from '../http-${fileName}.response';

  export class ${camelCaseFileName}Mapper {
    static mapTo(response: Http${camelCaseFileName}): ${camelCaseFileName} {}
  }`;
}

function generateInfraestructureMapperTestFile(fileName){
  const camelCaseFileName = capitalizeFirstLetter(toCamelCase(fileName));

  return `import { TestBed } from '@angular/core/testing';

import { ${camelCaseFileName}Mapper } from './http-${fileName}.mapper';

describe('${camelCaseFileName}Mapper', () => {
  let mapper: ${camelCaseFileName}Mapper;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       ${camelCaseFileName}Mapper,
      ],
    });
    mapper = TestBed.inject(${camelCaseFileName}Mapper);
  });

  it('should be created', () => {
    expect(mapper).toBeTruthy();
  });
})
`;
}

module.exports = {
  generateInfraestructureGatewayFile,
  generateInfraestructureGatewayTestFile,
  generateInfraestructureResponseFile,
  generateInfraestructureMapperFile,
  generateInfraestructureMapperTestFile
};
