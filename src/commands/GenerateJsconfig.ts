/* eslint-disable @typescript-eslint/naming-convention */
import { commands } from "vscode";
import { DEFAULT_JS_CONFIG_FILE, JS_CONFIG_FILE } from "../constants";
import { createCommands } from "../helpers/folder";

const GenerateJsConfig = commands.registerCommand(
  "harvey-generation.generateJsConfig",
  () => {
    createCommands(DEFAULT_JS_CONFIG_FILE, JS_CONFIG_FILE);
  }
);

export default GenerateJsConfig;
