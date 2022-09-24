import * as fs from 'fs';
import * as path from 'path';

export const getAllCommands = () => {

  const dictionary = path.resolve(__dirname, "../commands");
  const files = fs.readdirSync(dictionary, {
    withFileTypes: false,
  });

  const listCommand:{ dispose(): any }[] = [];

  files.forEach(async (file) => {
    const targetFile = file as string;
    const extension = path.extname(targetFile);
    if (extension === '.js') {
      listCommand.push(await import(path.join(dictionary, targetFile)));
    }
  });

  return listCommand;
};
