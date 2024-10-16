import fs from "fs/promises";
import path from "path";
import { resolvePath, doesFileExist } from "./utils.js";
import { lightGreen, red, reset, orange } from "./colors.js";

export const moveFile = async (currentDir, filePath, newDirectory) => {
  const fullPath = resolvePath(currentDir, filePath);
  const destinationPath = resolvePath(currentDir, newDirectory);

  const fileName = path.basename(fullPath);
  const newFilePath = path.join(destinationPath, fileName);

  const fileExists = await doesFileExist(fullPath);
  if (!fileExists) {
    console.log(`${orange}File not found${reset}`);
    return;
  }

  try {
    const dirExists = await doesFileExist(destinationPath);
    if (!dirExists) {
      console.log(
        `${red}Operation filed: destination directory not found: ${destinationPath}${reset}`
      );
      return;
    }

    await fs.rename(fullPath, newFilePath);
    console.log(
      `${lightGreen}File moved from ${fullPath} to ${newFilePath}${reset}`
    );
  } catch (err) {
    console.error(`${red}Operation failed: ${err.message}${reset}`);
  }
};
