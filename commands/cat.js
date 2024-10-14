import fs from "fs";
import path from "path";

export const cat = (filePath) => {
  try {
    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`Operation failed: No such file or directory: ${fullPath}`);
      return;
    }

    if (fs.lstatSync(fullPath).isDirectory()) {
      console.error(
        `Operation failed: ${fullPath} is a directory, not a file.`
      );
      return;
    }

    const readStream = fs.createReadStream(fullPath);

    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    readStream.on("error", (err) => {
      console.error(`Operation failed. Error reading file: ${err.message}`);
    });

    readStream.on("end", () => {
      console.log("\x1b[32m\nFile read complete.\x1b[0m");
    });
  } catch (err) {
    console.error(`Operation failed: ${err.message}`);
  }
};
