import {
  up,
  cd,
  ls,
  osInfo,
  hashFile,
  compress,
  decompress,
  messages,
  cat,
  add,
  removeFile,
  renameFile,
  moveFile,
  copyFile,
} from "./commands/index.js";

const trimArgs = (args) => {
  return args
    .map((arg) => arg.trim())
    .filter((arg) => arg.length > 0)
    .join(" ")
    .split(" ");
};

const commandHandlers = (
  currentDirectory,
  username,
  printCurrentDirectory,
  setCurrentDirectory
) => ({
  add: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length === 0) {
        console.log(messages.ERRORS.MISSING_FILE_PATH);
      } else {
        await add(trimmedArgs[0], currentDirectory);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  up: () => {
    const newDir = up(currentDirectory);
    setCurrentDirectory(newDir);
    printCurrentDirectory(newDir);
  },
  cd: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length === 0) {
        console.log(messages.ERRORS.MISSING_DIRECTORY_PATH);
      } else {
        const newDir = await cd(currentDirectory, trimmedArgs[0]);
        setCurrentDirectory(newDir);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  cp: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length < 2) {
        console.log(messages.ERRORS.MISSING_COPY_ARGUMENTS);
      } else {
        await copyFile(currentDirectory, trimmedArgs[0], trimmedArgs[1]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  ls: async () => {
    try {
      await ls(currentDirectory);
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  cat: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length === 0) {
        console.log(messages.ERRORS.MISSING_FILE_PATH);
      } else {
        const filePath = trimmedArgs.join(" ");
        await cat(currentDirectory, filePath);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  mv: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length < 2) {
        console.log(messages.ERRORS.MISSING_OS_ARGUMENT);
      } else {
        await moveFile(currentDirectory, trimmedArgs[0], trimmedArgs[1]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  rm: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length === 0) {
        console.log(messages.ERRORS.MISSING_FILE_PATH);
      } else {
        await removeFile(currentDirectory, trimmedArgs[0]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  rn: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length < 2) {
        console.log(messages.ERRORS.MISSING_RENAME_ARGUMENTS);
      } else {
        await renameFile(currentDirectory, trimmedArgs[0], trimmedArgs[1]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  os: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length === 0) {
        console.log(messages.ERRORS.MISSING_OS_ARGUMENT);
      } else {
        await osInfo(trimmedArgs[0]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  hash: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length === 0) {
        console.log(messages.ERRORS.MISSING_FILE_PATH);
      } else {
        await hashFile(currentDirectory, trimmedArgs[0]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  compress: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length < 2) {
        console.log(messages.ERRORS.MISSING_PATH_OR_DEST);
      } else {
        await compress(currentDirectory, trimmedArgs[0], trimmedArgs[1]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  decompress: async (args) => {
    try {
      const trimmedArgs = trimArgs(args);
      if (trimmedArgs.length < 2) {
        console.log(messages.ERRORS.MISSING_PATH_OR_DEST);
      } else {
        await decompress(currentDirectory, trimmedArgs[0], trimmedArgs[1]);
      }
    } finally {
      printCurrentDirectory(currentDirectory);
    }
  },
  ".exit": () => {
    console.log(messages.PROMPTS.GOODBYE(username));
    rl.close();
    return true;
  },
});

export default commandHandlers;
