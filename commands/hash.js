import crypto from "crypto";
import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";
import { magenta, red, reset, resolvePath, doesFileExist } from "./index.js";

export const hashFile = async (currentDir, filePath) => {
  const fullPath = resolvePath(currentDir, filePath);

  const fileExists = await doesFileExist(fullPath);
  if (!fileExists) {
    console.log(`${red}File not found${reset}`);
    return;
  }

  try {
    const stats = await fs.lstat(fullPath);
    if (!stats.isFile()) {
      console.log(`${red}Not a file: ${fullPath}${reset}`);
      return;
    }

    const hash = crypto.createHash("sha256");
    const input = createReadStream(fullPath);

    input.on("data", (chunk) => hash.update(chunk));
    input.on("end", () => {
      const hashValue = hash.digest("hex");
      console.log(`${magenta}Hash: ${hashValue}${reset}`);
    });

    input.on("error", (err) => {
      console.error(`${red}Error reading file: ${err.message}${reset}`);
    });
  } catch (err) {
    console.error(`${red}Operation failed: ${err.message}${reset}`);
  }
};
