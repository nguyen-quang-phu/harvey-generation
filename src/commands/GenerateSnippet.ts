/* eslint-disable @typescript-eslint/naming-convention */
import {
  commands
} from "vscode";
import { createCommandsWithInput } from "../helpers/folder";

const GenerateSnippet = commands.registerCommand(
  "harvey-generation.generateSnippet",
  async () => {
    createCommandsWithInput();
  }
);

export default GenerateSnippet;
