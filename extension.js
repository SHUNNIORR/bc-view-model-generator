const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "bc-view-model-generator" is now active!');

    const disposable = vscode.commands.registerCommand('bc-view-model-generator.createViewModel', async (uri) => {
        const fileName = await vscode.window.showInputBox({
            placeHolder: "Enter the name for the view model file"
        });

        if (!fileName) {
            vscode.window.showErrorMessage("File name cannot be empty");
            return;
        }

        const folderPath = uri.fsPath;
        const fileExtension = 'view-model';
        const fullFileName = `${fileName}.${fileExtension}.ts`;
        const fullPath = path.join(folderPath, fullFileName);
        const testFullFileName = `${fileName}.${fileExtension}.spec.ts`;
        const testFullPath = path.join(folderPath, testFullFileName);
        const className = toCamelCase(fileName) + 'ViewModel';
        const content = generateViewModelContent(fileName, className, fileExtension);

        fs.writeFileSync(fullPath, content.viewModelContent);
        fs.writeFileSync(testFullPath, content.testViewModelContent);

        vscode.window.showInformationMessage(`Archivo ${fullFileName} y su archivo de prueba ${testFullFileName} generado exitosamente en ${folderPath}`);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

function toCamelCase(input) {
    return input
        .toLowerCase()
        .split(/[-.]/)  // Divide el nombre en palabras usando - y . como separadores
        .map((word, index) => index === 0 ? word : capitalizeFirstLetter(word))
        .join('');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateViewModelContent(fileName, className, fileExtension) {
    const camelCaseFileName = toCamelCase(fileName);
	const definitiveClassName = capitalizeFirstLetter(className);
    const viewModelContent = `
import { Injectable } from '@angular/core';

@Injectable()
export class ${definitiveClassName} {
  // Propiedades del ViewModel
  constructor() {
    // Inicialización de propiedades
  }
}
`;

    const testViewModelContent = `
import { TestBed } from '@angular/core/testing';

import { ${definitiveClassName} } from './${fileName}.${fileExtension}';

describe('${camelCaseFileName}ViewModel', () => {
    let viewModel: ${definitiveClassName};

    beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       ${definitiveClassName},
      ],
    });
    viewModel = TestBed.inject(${definitiveClassName});
  });

  it('should be created', () => {
    expect(viewModel).toBeTruthy();
  });
})
`;

    return {
        viewModelContent,
        testViewModelContent
    };
}

module.exports = {
    activate,
    deactivate
}
