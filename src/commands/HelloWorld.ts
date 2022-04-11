import * as vscode from 'vscode'
const HelloWorld = vscode.commands.registerCommand('harvey-generation.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from harvey-generation!');
});

export default HelloWorld;