const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
function generateCleanArchitectureTemplate(uri) {
    const folderPath = uri.fsPath;
    const domainPath = path.join(folderPath, 'domain');
    const applicationPath = path.join(folderPath, 'application');
    const infrastructurePath = path.join(folderPath, 'infrastructure');

    fs.mkdirSync(domainPath, { recursive: true });
    fs.mkdirSync(applicationPath, { recursive: true });
    fs.mkdirSync(infrastructurePath, { recursive: true });

    vscode.window.showInformationMessage(`Carpetas 'domain', 'application', 'infrastructure' creadas en ${folderPath}`);
}

module.exports = {generateCleanArchitectureTemplate};