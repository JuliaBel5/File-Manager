import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { resolvePath, doesFileExist, lightGreen, red, reset } from "./index.js";

export const copyFile = async (currentDir, filePath, newDirectory) => {
  const fullPath = resolvePath(currentDir, filePath);
  const destinationPath = resolvePath(currentDir, newDirectory);

  const fileName = path.basename(fullPath);
  const newFilePath = path.join(destinationPath, fileName);

  const fileExists = await doesFileExist(fullPath);
  if (!fileExists) {
    console.log("Operation failed: source file not found");
    return;
  }

  const dirExists = await doesFileExist(destinationPath);
  if (!dirExists || !(await fsPromises.lstat(destinationPath)).isDirectory()) {
    console.log(
      `${red}Operation failed: destination directory does not exist: ${destinationPath}${reset}`
    );
    return;
  }

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(fullPath);
    const writeStream = fs.createWriteStream(newFilePath);

    readStream.on("error", (err) => {
      console.error(
        `${red}Operation failed: failed to read file: ${err.message}${reset}`
      );
      reject(err);
    });

    writeStream.on("error", (err) => {
      console.error(
        `${red}Operation failed: failed to write file: ${err.message}${reset}`
      );
      reject(err);
    });

    writeStream.on("finish", () => {
      console.log(
        `${lightGreen}File copied from ${fullPath} to ${newFilePath}${reset}`
      );
      resolve();
    });

    readStream.pipe(writeStream);
  });
};
