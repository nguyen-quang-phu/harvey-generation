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
      console.log('🚀 ~ file: GenerateJsconfig.ts ~ line 25 ~ filePath', filePath);
      const defaultTemplatePath = resolve(
        __dirname,
        `../${TEMPLATE_FOLDER}`,
        DEFAULT_JS_CONFIG_FILE
      );
      console.log('🚀 ~ file: GenerateJsconfig.ts ~ line 31 ~ defaultTemplatePath', defaultTemplatePath);
      readFile(defaultTemplatePath, (err, data): void => {
        if (err) {
          console.log('🚀 ~ file: GenerateJsconfig.ts ~ line 34 ~ readFile ~ err', err);
          throw err;
        } else {
        console.log('🚀 ~ file: GenerateJsconfig.ts ~ line 33 ~ readFile ~ data', data);
          wsedit.createFile(filePath, { ignoreIfExists: true });
          console.log('🚀 ~ file: GenerateJsconfig.ts ~ line 38 ~ readFile ~ createFile');
          wsedit.insert(filePath, new Position(0, 0), data.toString());
          console.log('🚀 ~ file: GenerateJsconfig.ts ~ line 40 ~ readFile ~ insert');
          workspace.applyEdit(wsedit);
          workspace.saveAll(true);
          window.showInformationMessage(
            `Created a new file: ${JS_CONFIG_FILE}`
          );
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: GenerateJsconfig.ts ~ line 46 ~ error', error);
      window.showInformationMessage(error as string);
    }
  }
);

export default GenerateJsConfig;