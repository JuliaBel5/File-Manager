import fs from "fs";
import fsPromises from "fs/promises";
import zlib from "zlib";
import { resolvePath, doesFileExist, lightGreen, red, reset } from "./index.js";

export const compress = async (currentDir, source, destination) => {
  const sourcePath = resolvePath(currentDir, source);
  const destPath = resolvePath(currentDir, destination);

  const fileExists = await doesFileExist(sourcePath);
  if (!fileExists) {
    console.error(
      `${red}Operation failed: Source file ${sourcePath} does not exist.${reset}`
    );
    return;
  }

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.pipe(zlib.createBrotliCompress()).pipe(writeStream);

  writeStream.on("finish", () =>
    console.log(`${lightGreen}Compressed ${source} to ${destination}${reset}`)
  );

  writeStream.on("error", (err) =>
    console.error(`${red}Operation failed: ${err.message}${reset}`)
  );
};

export const decompress = async (currentDir, source, destination) => {
  const sourcePath = resolvePath(currentDir, source);
  const destPath = resolvePath(currentDir, destination);

  const fileExists = await doesFileExist(sourcePath);
  if (!fileExists) {
    console.error(
      `${red}Operation failed: Source file ${sourcePath} does not exist.${reset}`
    );
    return;
  }

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.pipe(zlib.createBrotliDecompress()).pipe(writeStream);

  writeStream.on("finish", () =>
    console.log(`${lightGreen}Decompressed ${source} to ${destination}${reset}`)
  );

  writeStream.on("error", (err) =>
    console.error(`${red}Operation failed: ${err.message}${reset}`)
  );
};
