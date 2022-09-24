import { join, resolve } from "path";
import { mkdirSync, readFile } from "fs";
import { Uri, window, Position, workspace, WorkspaceEdit } from "vscode";
import { TEMPLATE_FOLDER, VSCODE_FOLDER } from "../constants";
import { pascalCase } from "change-case";

export const createFolder = (path: string): void => {
  mkdirSync(path, { recursive: true });
};

export const createCommands = (src: string, dst: string) => {
  try {
    const wsedit = new WorkspaceEdit();
    const wsPath = workspace.workspaceFolders?.[0].uri.fsPath;
    const filePath = Uri.file(resolve(wsPath as string, dst));
    const defaultTemplatePath = join(__dirname, `../${TEMPLATE_FOLDER}`, src);

    readFile(defaultTemplatePath, (err, data): void => {
      if (err) {
        throw err;
      } else {
        wsedit.deleteFile(filePath, { ignoreIfNotExists: true });
        wsedit.createFile(filePath, { ignoreIfExists: true });
        wsedit.insert(filePath, new Position(0, 0), data.toString());
        workspace.applyEdit(wsedit);
        workspace.saveAll(true);
        window.showInformationMessage(`Created a new file: ${src}`);
      }
    });
  } catch (error) {
    window.showInformationMessage(error as string);
  }
};

export const createCommandsWithInput = async () => {
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
};
