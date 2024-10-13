import crypto from "crypto";
import fs from "fs";
import path from "path";

export const hashFile = (currentDir, fileName) => {
  const filePath = path.join(currentDir, fileName);
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(filePath);
    input.on("data", (chunk) => hash.update(chunk));
    input.on("end", () => console.log(`Hash: ${hash.digest("hex")}`));
  } else {
    console.log("File not found");
  }
};
