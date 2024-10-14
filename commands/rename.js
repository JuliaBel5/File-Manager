import fs from "fs/promises";
import path from "path";
import {
  lightGreen,
  red,
  reset,
  orange,
  resolvePath,
  doesFileExist,
} from "./index.js";

export const renameFile = async (currentDir, oldFilePath, newFileName) => {
  const fullOldPath = resolvePath(currentDir, oldFilePath);

  const isNewFileNameAbsolute = path.isAbsolute(newFileName);
  const newFileNameOnly = isNewFileNameAbsolute
    ? path.basename(newFileName)
    : newFileName;

  const newFilePath = path.join(path.dirname(fullOldPath), newFileNameOnly);

  const fileExists = await doesFileExist(fullOldPath);

  if (fileExists) {
    try {
      await fs.rename(fullOldPath, newFilePath);
      console.log(`${lightGreen}File renamed to: ${newFilePath}${reset}`);
    } catch (err) {
      console.error(`${red}Operation failed: ${err.message}${reset}`);
    }
  } else {
    console.log(`${orange}Operation failed: File not found${reset}`);
  }
};
