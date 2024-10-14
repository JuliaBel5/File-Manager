import fs from "fs";
import path from "path";
import { lightGreen, reset } from "./colors.js";

export const renameFile = (currentDir, oldFilePath, newFileName) => {
  const fullOldPath = path.isAbsolute(oldFilePath)
    ? oldFilePath
    : path.join(currentDir, oldFilePath);

  const newFilePath = path.join(path.dirname(fullOldPath), newFileName);

  if (fs.existsSync(fullOldPath) && fs.lstatSync(fullOldPath).isFile()) {
    fs.rename(fullOldPath, newFilePath, (err) => {
      if (err) {
        console.error(`Operation failed: ${err.message}`);
      } else {
        console.log(`${lightGreen}File renamed to: ${newFilePath}${reset}`);
      }
    });
  } else {
    console.log("File not found");
  }
};
