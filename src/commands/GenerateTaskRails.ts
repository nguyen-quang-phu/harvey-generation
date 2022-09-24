/* eslint-disable @typescript-eslint/naming-convention */
import { commands } from "vscode";
import { DEFAULT_RAILS_TASK_FILE, VSCODE_FOLDER } from "../constants";
import { createCommands } from "../helpers/folder";

const GenerateTaskRails = commands.registerCommand(
  "harvey-generation.generateTaskRails",
  async () => {
    createCommands(DEFAULT_RAILS_TASK_FILE, `/${VSCODE_FOLDER}/tasks.json`);
  }
);

export default GenerateTaskRails;
