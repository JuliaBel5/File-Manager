import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { lightGreen, red, reset, resolvePath } from "./index.js";

export const cat = async (currentDir, filePath) => {
  try {
    const fullPath = resolvePath(currentDir, filePath);
    console.log(fullPath);
    const stats = await fsPromises.lstat(fullPath);

    if (stats.isDirectory()) {
      console.error(
        `${red}Operation failed: ${fullPath} is a directory, not a file.${reset}`
      );
      return;
    }

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(fullPath);

      readStream.on("data", (chunk) => {
        process.stdout.write(chunk);
      });

      readStream.on("error", (err) => {
        console.error(
          `${red}Operation failed. Error reading file: ${err.message}${reset}`
        );
        reject(err);
      });

      readStream.on("end", () => {
        console.log(`${lightGreen}\nFile read complete.${reset}`);
        resolve();
      });
    });
  } catch (err) {
    console.error(`${red}Operation failed: ${err.message}${reset}`);
  }
};
