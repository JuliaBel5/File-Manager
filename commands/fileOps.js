import fs from "fs";
import path from "path";

export const up = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  return parentDir !== currentDir ? parentDir : currentDir;
};

export const cd = (currentDir, targetDir) => {
  let newDir;

  if (path.isAbsolute(targetDir)) {
    newDir = targetDir;
  } else {
    newDir = path.join(currentDir, targetDir);
  }

  try {
    if (fs.existsSync(newDir) && fs.lstatSync(newDir).isDirectory()) {
      return newDir;
    } else {
      console.log("Operation failed: directory does not exist");
      return currentDir;
    }
  } catch (error) {
    console.log("Operation failed:", error.message);
    return currentDir;
  }
};

export const ls = (currentDir) => {
  try {
    const files = fs.readdirSync(currentDir);

    const directories = [];
    const regularFiles = [];

    files.forEach((file) => {
      try {
        const fullPath = path.join(currentDir, file);
        const type = fs.lstatSync(fullPath).isDirectory()
          ? "directory"
          : "file";

        if (type === "directory") {
          directories.push({ Name: file, Type: type });
        } else {
          regularFiles.push({ Name: file, Type: type });
        }
      } catch (err) {
        console.error(`Operation failed for ${file}: ${err.message}`);
      }
    });

    directories.sort((a, b) => a.Name.localeCompare(b.Name));
    regularFiles.sort((a, b) => a.Name.localeCompare(b.Name));

    const tableData = [...directories, ...regularFiles];

    console.table(tableData);
  } catch (err) {
    console.error(`Operation failed: ${err.message}`);
  }
};
