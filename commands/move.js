import fs from "fs";
import path from "path";

export const moveFile = (currentDir, filePath, newDirectory) => {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(currentDir, filePath);
  const destinationPath = path.isAbsolute(newDirectory)
    ? newDirectory
    : path.join(currentDir, newDirectory);

  const fileName = path.basename(fullPath);
  const newFilePath = path.join(destinationPath, fileName);

  if (!fs.existsSync(fullPath)) {
    console.log("File not found");
    return;
  }

  const readStream = fs.createReadStream(fullPath);
  const writeStream = fs.createWriteStream(newFilePath);

  readStream.on("error", (err) => {
    console.error(`Failed to read file: ${err.message}`);
  });

  writeStream.on("error", (err) => {
    console.error(`Failed to write file: ${err.message}`);
  });

  writeStream.on("finish", () => {
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(`Failed to delete original file: ${err.message}`);
      } else {
        console.log(`File moved from ${fullPath} to ${newFilePath}`);
      }
    });
  });

  readStream.pipe(writeStream);
};
