import fs from "fs";
import path from "path";

export const copyFile = (currentDir, filePath, newDirectory) => {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(currentDir, filePath);

  const destinationPath = path.isAbsolute(newDirectory)
    ? newDirectory
    : path.join(currentDir, newDirectory);

  const fileName = path.basename(fullPath);

  const newFilePath = path.join(destinationPath, fileName);

  if (!fs.existsSync(fullPath)) {
    console.log("Operation failed: file not found");
    return;
  }

  if (!fs.existsSync(destinationPath)) {
    console.log(
      `Operation failed:  destination directory does not exist: ${destinationPath}`
    );
    return;
  }

  const readStream = fs.createReadStream(fullPath);
  const writeStream = fs.createWriteStream(newFilePath);

  readStream.on("error", (err) => {
    console.error(`Operation failed: failed to read file: ${err.message}`);
  });

  writeStream.on("error", (err) => {
    console.error(`Operation failed:  failed to write file: ${err.message}`);
  });

  writeStream.on("finish", () => {
    console.log(`File copied from ${fullPath} to ${newFilePath}`);
  });

  readStream.pipe(writeStream);
};
