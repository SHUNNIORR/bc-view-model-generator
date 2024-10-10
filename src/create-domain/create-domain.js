const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const generateDomainFiles = require('./file-content-templates/domain')
const generateApplicationFile = require('./file-content-templates/application');
const generateInfraestructureFiles = require('./file-content-templates/infraestructure');
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
    try {
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
        const files = [
            {
                name: `http-${domainName}.gateway.ts`,
                content: generateInfraestructureFiles.generateInfraestructureGatewayFile(domainName),
            },
            {
                name: `http-${domainName}.gateway.spec.ts`,
                content: generateInfraestructureFiles.generateInfraestructureGatewayTestFile(domainName),
            },
            {
                name: `http-${domainName}.response.ts`,
                content: generateInfraestructureFiles.generateInfraestructureResponseFile(domainName),
            }
        ];

        createFiles(domainDir, files);

        // Crear la subcarpeta 'mappers' dentro de la carpeta del dominio
        const mappersDir = path.join(domainDir, 'mappers');
        if (!fs.existsSync(mappersDir)) {
            fs.mkdirSync(mappersDir);
        }

        // Crear los archivos dentro de la subcarpeta 'mappers'
        const mapperFiles = [
          {
            name: `http-${domainName}.mapper.ts`,
            content:
              generateInfraestructureFiles.generateInfraestructureMapperFile(
                domainName
              ),
          },
          {
            name: `http-${domainName}.mapper.spec.ts`,
            content:
              generateInfraestructureFiles.generateInfraestructureMapperTestFile(
                domainName
              ),
          },
        ];

        createFiles(mappersDir, mapperFiles);

        console.log(`Infrastructure files for domain "${domainName}" have been successfully created.`);
    } catch (error) {
        console.error(`Error creating infrastructure files: ${error.message}`);
        vscode.window.showErrorMessage("Failed to create infrastructure files. Check the console for details.");
    }
}

/**
 * Helper function to create multiple files with empty content in a given directory.
 * @param {string} directory - The directory where files should be created.
 * @param {string[]} files - Array of file names to create.
 */
function createFiles(directory, files) {
    files.forEach(({name,content}) => {
        const filePath = path.join(directory, name);
        fs.writeFileSync(filePath, content?content:'', 'utf8');
    });
}

module.exports={
    createDomain
}