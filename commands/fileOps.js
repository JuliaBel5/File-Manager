import fs from "fs";
import path from "path";

export const up = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  return parentDir !== currentDir ? parentDir : currentDir;
};

export const cd = (currentDir, dir) => {
  const newPath = path.resolve(currentDir, dir);
  if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
    return newPath;
  } else {
    console.log("Invalid directory");
    return currentDir;
  }
};

export const ls = (currentDir) => {
  try {
    const files = fs.readdirSync(currentDir).sort();
    files.forEach((file) => {
      try {
        const fullPath = path.join(currentDir, file);
        const type = fs.lstatSync(fullPath).isDirectory()
          ? "directory"
          : "file";
        console.log(`${type}: ${file}`);
      } catch (err) {
        console.error(`Operation failed for ${file}: ${err.message}`);
      }
    });
  } catch (err) {
    console.error(`Operation failed: ${err.message}`);
  }
};
