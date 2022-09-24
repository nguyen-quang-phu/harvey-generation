/* eslint-disable @typescript-eslint/naming-convention */
import { commands } from "vscode";
import { DEFAULT_RUCOBOP_FILE, RUBOCOP_FILE } from "../constants";
import { createCommands } from "../helpers/folder";

const GenerateRubocop = commands.registerCommand(
  "harvey-generation.generateRubocop",
  async () => {
    createCommands(DEFAULT_RUCOBOP_FILE, RUBOCOP_FILE);
  }
);

export default GenerateRubocop;
