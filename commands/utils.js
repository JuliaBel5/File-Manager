import path from "path";
import { access } from "node:fs/promises";
import { constants } from "node:fs";

export const resolvePath = (currentDir, filePath) => {
  try {
    return path.isAbsolute(filePath)
      ? filePath
      : path.resolve(currentDir, filePath);
  } catch (error) {
    console.error(`Error resolving path: ${error.message}`);
    return currentDir;
  }
};

export const doesFileExist = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    } else {
      throw new Error(err.message);
    }
  }
};
