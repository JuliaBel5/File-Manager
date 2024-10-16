import crypto from "crypto";
import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";
import { magenta, red, reset, resolvePath, doesFileExist } from "./index.js";

export const hashFile = (currentDir, filePath) => {
  return new Promise(async (resolve, reject) => {
    const fullPath = resolvePath(currentDir, filePath);

    try {
      const fileExists = await doesFileExist(fullPath);
      if (!fileExists) {
        console.log(`${red}Operation failed: File not found${reset}`);
        return reject(new Error("File not found"));
      }

      const stats = await fs.lstat(fullPath);
      if (!stats.isFile()) {
        console.log(`${red}Operation failed: not a file: ${fullPath}${reset}`);
        return reject(new Error("Not a file"));
      }

      const hash = crypto.createHash("sha256");
      const input = createReadStream(fullPath);

      input.on("data", (chunk) => hash.update(chunk));
      input.on("end", () => {
        const hashValue = hash.digest("hex");
        console.log(`${magenta}Hash: ${hashValue}${reset}`);
        resolve(hashValue);
      });

      input.on("error", (err) => {
        console.error(
          `${red}Operation failed: error reading file: ${err.message}${reset}`
        );
        reject(new Error(`Error reading file: ${err.message}`));
      });
    } catch (err) {
      console.error(`${red}Operation failed: ${err.message}${reset}`);
      reject(new Error(`Operation failed: ${err.message}`));
    }
  });
};
