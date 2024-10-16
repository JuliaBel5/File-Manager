import fs from "node:fs/promises";
import { resolvePath, doesFileExist, lightGreen, red, reset } from "./index.js";

export const add = async (fileName, currentDirectory) => {
  const fullPath = resolvePath(currentDirectory, fileName);

  try {
    const fileExists = await doesFileExist(fullPath);

    if (fileExists) {
      console.error(`Operation failed: ${fullPath} already exists.`);
      return;
    }

    await fs.writeFile(fullPath, "");
    console.log(`${lightGreen} ${fileName} created successfully.${reset}`);
  } catch (err) {
    console.error(`${red}Operation failed: ${err.message}${reset}`);
  }
};
