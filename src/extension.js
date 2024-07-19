const {createViewModel} = require('./new-view-model/new-view-model')
const {generateCleanArchitectureTemplate} = require('./generate-clean-architecture-template/generate-clean-architecture-template')

const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "svp-schematics" is now active!');

    const disposable = vscode.commands.registerCommand('svp-schematics.showOptions', async (uri) => {
        const options = ["New view-model", "Generate clean architecture template"];
        const selection = await vscode.window.showQuickPick(options, {
            placeHolder: "Select an option"
        });

        if (selection === "New view-model") {
            createViewModel(uri);
        } else if (selection === "Generate clean architecture template") {
            generateCleanArchitectureTemplate(uri);
        }    
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
