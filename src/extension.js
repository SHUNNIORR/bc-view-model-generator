const {createViewModel} = require('./new-view-model/new-view-model')
const {generateCleanArchitectureTemplate} = require('./generate-clean-architecture-template/generate-clean-architecture-template')
const {createDomain} = require('./create-domain/create-domain')
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    
    const disposable = vscode.commands.registerCommand('clean-arq-schematics.showOptions', async (uri) => {
        const options = ["New view-model", "Generate clean architecture template", "Create domain"];
        const selection = await vscode.window.showQuickPick(options, {
            placeHolder: "Select an option"
        });

        if (selection === "New view-model") {
            createViewModel(uri);
        } else if (selection === "Generate clean architecture template") {
            generateCleanArchitectureTemplate(uri);
        } else if (selection === "Create domain") {
            createDomain(uri)
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
