import fs from "fs";
import path from "path";
import { green, red, reset } from "./colors.js";

export const cat = (currentDir, filePath) => {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(currentDir, filePath);

    if (!fs.existsSync(fullPath)) {
      console.error(
        `${red}Operation failed: No such file or directory: ${fullPath}${reset}`
      );
      return;
    }

    if (fs.lstatSync(fullPath).isDirectory()) {
      console.error(
        `${red}Operation failed: ${fullPath} is a directory, not a file.${reset}`
      );
      return;
    }

    const readStream = fs.createReadStream(fullPath);

    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    readStream.on("error", (err) => {
      console.error(
        `${red}Operation failed. Error reading file: ${err.message}${reset}`
      );
    });

    readStream.on("end", () => {
      console.log(`${green}\nFile read complete.${reset}`);
    });
  } catch (err) {
    console.error(`${red}Operation failed: ${err.message}${reset}`);
  }
};
