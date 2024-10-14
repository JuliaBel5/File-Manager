import fs from "fs";
import path from "path";
import { cyan, reset } from "./colors.js";

export const removeFile = (currentDir, filePath) => {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(currentDir, filePath);

  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(`Operation failed: ${err.message}`);
      } else {
        console.log(`${cyan}File deleted: ${fullPath}${reset}`);
      }
    });
  } else {
    console.log("File not found");
  }
};
