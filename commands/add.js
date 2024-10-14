import fs from "fs";
import path from "path";

export const add = (fileName, currentDirectory) => {
  const fullPath = path.join(currentDirectory, fileName);

  try {
    if (fs.existsSync(fullPath)) {
      console.error(`Operation failed: ${fullPath} already exists.`);
      return;
    }

    fs.writeFileSync(fullPath, "");
    console.log(`\x1b[32mFile ${fileName} created successfully.\x1b[0m`);
  } catch (err) {
    console.error(`Operation failed: ${err.message}`);
  }
};
