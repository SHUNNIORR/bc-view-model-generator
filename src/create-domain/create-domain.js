const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const generateDomainFiles = require('./file-content-templates/domain')
const generateApplicationFile = require('./file-content-templates/application');
async function createDomain(uri) {
    const fileName = await vscode.window.showInputBox({
        placeHolder: "Enter the name for the domain file"
    });

    if (!fileName) {
        vscode.window.showErrorMessage("File name cannot be empty");
        return;
    }

    const folderPath = uri.fsPath;
    createDomainFiles(fileName, folderPath);
    createApplicationFiles(fileName, folderPath);
    createInfraestructureFiles(fileName, folderPath);
    vscode.window.showInformationMessage(`Carpeta y archivos para el dominio "${fileName}" creados exitosamente en ${folderPath}`);
}

async function createDomainFiles(fileName, folderPath){
    const domainFolderPath = path.join(folderPath, 'domain');

    if (!fs.existsSync(domainFolderPath)) {
        fs.mkdirSync(domainFolderPath);
    }

    const domainDir = path.join(domainFolderPath, fileName);
    if (!fs.existsSync(domainDir)) {
        fs.mkdirSync(domainDir);
    }

    try {
        const files = [
            { name: `${fileName}.gateway.ts`, content: generateDomainFiles.generateGatewayFile(fileName) },
            { name: `${fileName}.errors.ts`, content: generateDomainFiles.generateEntityErrorFile(fileName) },
            { name: `${fileName}.entity.ts`, content: generateDomainFiles.generateEntityDomainFile(fileName) } // Agrega el contenido de la entidad
        ];

        files.forEach(file => {
            const filePath = path.join(domainDir, file.name);
            fs.writeFileSync(filePath, file.content, 'utf8');
        });
    } catch (error) {
        console.error("Error creating domain files:", error);
        vscode.window.showErrorMessage("Failed to create domain files. Check the console for details.");
        return;
    }
}
function createApplicationFiles(domainName, folderPath) {
    const applicationFolderPath = path.join(folderPath, 'application');

    if (!fs.existsSync(applicationFolderPath)) {
        fs.mkdirSync(applicationFolderPath);
    }

    const domainDir = path.join(applicationFolderPath, domainName);
    if (!fs.existsSync(domainDir)) {
        fs.mkdirSync(domainDir);
    }

    try {
        const files = [
            { name: `${domainName}.usecase.ts`, content: generateApplicationFile.generateUseCaseFile(domainName) },
            { name: `${domainName}.usecase.spec.ts`, content: generateApplicationFile.generateUseCaseTestFile(domainName) },
        ];

        files.forEach(file => {
            const filePath = path.join(domainDir, file.name);
            fs.writeFileSync(filePath, file.content, 'utf8');
        });
    } catch (error) {
        console.error("Error creating domain files:", error);
        vscode.window.showErrorMessage("Failed to create domain files. Check the console for details.");
        return;
    }

}

function createInfraestructureFiles(domainName, folderPath) {
    const infraestructureFolderPath = path.join(folderPath, 'infraestructure');

    // Crear la carpeta 'infraestructure' si no existe
    if (!fs.existsSync(infraestructureFolderPath)) {
        fs.mkdirSync(infraestructureFolderPath);
    }

    // Crear la carpeta del dominio dentro de 'infraestructure'
    const domainDir = path.join(infraestructureFolderPath, domainName);
    if (!fs.existsSync(domainDir)) {
        fs.mkdirSync(domainDir);
    }

    // Crear los archivos dentro de la carpeta del dominio
    const files = ['gateway', 'gateway.spec'].map(type => `http-${domainName}.${type}.ts`);
    files.forEach(file => {
        const filePath = path.join(domainDir, file);
        fs.writeFileSync(filePath, '', 'utf8');
    });

    // Crear la subcarpeta 'mappers' dentro de la carpeta del dominio
    const mappersDir = path.join(domainDir, 'mappers');
    if (!fs.existsSync(mappersDir)) {
        fs.mkdirSync(mappersDir);
    }

    // Crear los archivos dentro de la subcarpeta 'mappers'
    const mapperFiles = ['mapper', 'mapper.spec'].map(type => `http-${domainName}.${type}.ts`);
    mapperFiles.forEach(file => {
        const filePath = path.join(mappersDir, file);
        fs.writeFileSync(filePath, '', 'utf8');
    });

}

module.exports={
    createDomain
}