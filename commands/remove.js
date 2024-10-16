import fs from "fs/promises";

import {
  lightGreen,
  red,
  orange,
  reset,
  resolvePath,
  doesFileExist,
} from "./index.js";

export const removeFile = async (currentDir, filePath) => {
  const fullPath = resolvePath(currentDir, filePath);

  const fileExists = await doesFileExist(fullPath);
  if (fileExists) {
    try {
      await fs.unlink(fullPath);
      console.log(`${lightGreen}File deleted: ${fullPath}${reset}`);
    } catch (err) {
      console.error(`${red}Operation failed: ${err.message}${reset}`);
    }
  } else {
    console.log(`${orange}Operation failed: File not found${reset}`);
  }
};
