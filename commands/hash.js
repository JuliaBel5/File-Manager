import crypto from "crypto";
import fs from "fs";
import path from "path";
import { magenta, reset } from "./index.js";

export const hashFile = (currentDir, filePath) => {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(currentDir, filePath);

  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(fullPath);

    input.on("data", (chunk) => hash.update(chunk));
    input.on("end", () => {
      const hashValue = hash.digest("hex");
      console.log(`${magenta}Hash: ${hashValue}${reset}`);
      console.log(`You are currently in ${currentDir}`);
    });
  } else {
    console.log("File not found");
  }
};
