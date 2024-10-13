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
  const files = fs.readdirSync(currentDir).sort();
  files.forEach((file) => {
    const type = fs.lstatSync(path.join(currentDir, file)).isDirectory()
      ? "directory"
      : "file";
    console.log(`${type}: ${file}`);
  });
};
