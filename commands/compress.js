import fs from "fs";
import path from "path";
import zlib from "zlib";

export const compress = (currentDir, source, destination) => {
  const sourcePath = path.join(currentDir, source);
  const destPath = path.join(currentDir, destination);
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  readStream.pipe(zlib.createBrotliCompress()).pipe(writeStream);
  writeStream.on("finish", () =>
    console.log(`Compressed ${source} to ${destination}`)
  );
};

export const decompress = (currentDir, source, destination) => {
  const sourcePath = path.join(currentDir, source);
  const destPath = path.join(currentDir, destination);
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  readStream.pipe(zlib.createBrotliDecompress()).pipe(writeStream);
  writeStream.on("finish", () =>
    console.log(`Decompressed ${source} to ${destination}`)
  );
};
