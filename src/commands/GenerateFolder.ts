/* eslint-disable @typescript-eslint/naming-convention */
import {
  commands,
  window,
  workspace,
  WorkspaceEdit,
  Uri,
  Position,
} from "vscode";
import { mkdirSync, readdirSync, readFile } from "fs";
import { resolve } from "path";
import {
  DEFAULT_EDITOR_CONFIG_FILE,
  EDITOR_CONFIG_FILE,
  TEMPLATE_FOLDER,
  VSCODE_FOLDER,
} from "../constants";
import { createFolder } from "../helpers/folder";
const GenerateFolder = commands.registerCommand(
  "harvey-generation.generateFolder",
  async() => {
    try {
      console.log("hello");
      const wsedit = new WorkspaceEdit();
      console.log("🚀 ~ file: GenerateFolder.ts ~ line 25 ~ wsedit", wsedit);
      const wsPath = workspace.workspaceFolders?.[0].uri.fsPath as string;
      console.log("🚀 ~ file: GenerateFolder.ts ~ line 27 ~ wsPath", wsPath);
      const filePath = Uri.file(
        wsPath + `/${VSCODE_FOLDER}/${EDITOR_CONFIG_FILE}`
      );
      console.log(
        "🚀 ~ file: GenerateFolder.ts ~ line 29 ~ filePath",
        filePath
      );
      const folderPath = `${wsPath}/${VSCODE_FOLDER}`;
      await createFolder(folderPath);
      console.log("before create file");
      wsedit.createFile(filePath, { ignoreIfExists: true });
      console.log("after create file");
      console.log(
        "🚀 ~ file: GenerateFolder.ts ~ line 31 ~ folderPath",
        folderPath
      );
      await wsedit.createFile(Uri.file(`${folderPath}/${"1.txt"}`));
      console.log(Uri.file(`${folderPath}/${"1.txt"}`));
      wsedit.createFile(Uri.file(`${folderPath}/${"2.txt"}`));
      wsedit.createFile(Uri.file(`${folderPath}/${"3.txt"}`));
      wsedit.createFile(Uri.file(`${folderPath}/${"4.txt"}`));
      wsedit.createFile(Uri.file(`${folderPath}/${"5.txt"}`));
      await workspace.applyEdit(wsedit);
      await workspace.saveAll(true);
      const listFile = readdirSync(folderPath);
      console.log(
        "🚀 ~ file: GenerateFolder.ts ~ line 34 ~ listFile",
        listFile
      );
    } catch (error) {
      console.log("🚀 ~ file: GenerateFolder.ts ~ line 42 ~ error", error);
      window.showInformationMessage(error as string);
    }
  }
);

export default GenerateFolder;
