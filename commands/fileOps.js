import fs from "fs/promises";
import path from "path";
import { resolvePath, doesFileExist, lightGreen, red, reset } from "./index.js";

export const up = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  return parentDir !== currentDir ? parentDir : currentDir;
};

export const cd = async (currentDir, targetDir) => {
  const newDir = resolvePath(currentDir, targetDir);

  try {
    const dirExists = await doesFileExist(newDir);
    const stats = await fs.lstat(newDir);
    if (dirExists && stats.isDirectory()) {
      return newDir;
    } else {
      console.log(`${red}Operation failed: directory does not exist${reset}`);
      return currentDir;
    }
  } catch (error) {
    console.log(`${red}Operation failed: ${error.message}${reset}`);
    return currentDir;
  }
};

export const ls = async (currentDir) => {
  try {
    const files = await fs.readdir(currentDir);

    const directories = [];
    const regularFiles = [];

    for (const file of files) {
      try {
        const fullPath = path.join(currentDir, file);
        const stats = await fs.lstat(fullPath);
        const type = stats.isDirectory() ? "directory" : "file";

        if (type === "directory") {
          directories.push({ Name: file, Type: type });
        } else {
          regularFiles.push({ Name: file, Type: type });
        }
      } catch (err) {
        console.error(
          `${red}Operation failed for ${file}: ${err.message}${reset}`
        );
      }
    }

    directories.sort((a, b) => a.Name.localeCompare(b.Name));
    regularFiles.sort((a, b) => a.Name.localeCompare(b.Name));

    const tableData = [...directories, ...regularFiles];

    console.table(tableData);
  } catch (err) {
    console.error(`${red}Operation failed: ${err.message}${reset}`);
  }
};
