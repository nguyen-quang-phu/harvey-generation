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
  DEFAULT_JS_CONFIG_FILE,
  EDITOR_CONFIG_FILE,
  JS_CONFIG_FILE,
  TEMPLATE_FOLDER,
} from "../constants";
const GenerateJsConfig = commands.registerCommand(
  "harvey-generation.generateJsConfig",
  () => {
    try {
      const wsedit = new WorkspaceEdit();
      const wsPath = workspace.workspaceFolders?.[0].uri.fsPath;
      const filePath = Uri.file(wsPath + `/${JS_CONFIG_FILE}`);
      const defaultTemplatePath = resolve(
        __dirname,
        `../${TEMPLATE_FOLDER}`,
        DEFAULT_JS_CONFIG_FILE
      );
      readFile(defaultTemplatePath, (err, data): void => {
        if (err) {
          throw err;
        } else {
          wsedit.deleteFile(filePath,{ignoreIfNotExists:true});
          wsedit.createFile(filePath, { ignoreIfExists: true });
          wsedit.insert(filePath, new Position(0, 0), data.toString());
          workspace.applyEdit(wsedit);
          workspace.saveAll(true);
          window.showInformationMessage(
            `Created a new file: ${JS_CONFIG_FILE}`
          );
        }
      });
    } catch (error) {
      window.showInformationMessage(error as string);
    }
  }
);

export default GenerateJsConfig;