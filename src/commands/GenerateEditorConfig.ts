/* eslint-disable @typescript-eslint/naming-convention */
import { commands } from "vscode";
import { DEFAULT_EDITOR_CONFIG_FILE, EDITOR_CONFIG_FILE } from "../constants";
import { createCommands } from "../helpers/folder";

const GenerateEditorConfig = commands.registerCommand(
  "harvey-generation.generateEditorConfig",
  () => {
    createCommands(DEFAULT_EDITOR_CONFIG_FILE, EDITOR_CONFIG_FILE);
  }
);

export default GenerateEditorConfig;
