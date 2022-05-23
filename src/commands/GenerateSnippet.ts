import {
  commands,
  window,
  workspace,
  WorkspaceEdit,
  Uri,
  Position,
} from "vscode";
import { readFile } from "fs";
import { resolve } from "path";
import {
  DEFAULT_EDITOR_CONFIG_FILE,
  EDITOR_CONFIG_FILE,
  TEMPLATE_FOLDER,
  VSCODE_FOLDER,
} from "../constants";
import { pascalCase } from "change-case";
const GenerateSnippet = commands.registerCommand(
  "harvey-generation.generateSnippet",
  async () => {
    try {
      const wsedit = new WorkspaceEdit();
      const wsPath = workspace.workspaceFolders?.[0].uri.fsPath;
      const fileName = await window.showInputBox({
        placeHolder: "Enter your snippet file name",
      });
      if (!fileName) {
        window.showInformationMessage("File name invalid");
      } else {
        const filePath = Uri.file(
          wsPath + `/${VSCODE_FOLDER}/${pascalCase(fileName)}.code-snippets`
        );
        wsedit.deleteFile(filePath, { ignoreIfNotExists: true });
        wsedit.createFile(filePath, { ignoreIfExists: true });
        wsedit.insert(filePath, new Position(0, 0), "{}");
        workspace.applyEdit(wsedit);
        workspace.saveAll(true);
        window.showInformationMessage(`Created a new file: ${filePath}`);
      }
    } catch (error) {
      window.showInformationMessage(error as string);
    }
  }
);

export default GenerateSnippet;
