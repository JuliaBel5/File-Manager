import {
  up,
  cd,
  ls,
  osInfo,
  hashFile,
  compress,
  decompress,
  messages,
} from "./commands/index.js";
import readline from "readline";
import os from "os";

const homeDirectory = os.homedir();
let currentDirectory = homeDirectory;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printCurrentDirectory = () => {
  console.log(`You are currently in ${currentDirectory}`);
};

const startFileManager = (username) => {
  console.log(messages.PROMPTS.WELCOME(username));
  printCurrentDirectory();

  rl.on("line", (input) => {
    const [command, ...args] = input.split(" ");
    try {
      switch (command) {
        case "up":
          currentDirectory = up(currentDirectory);
          break;
        case "cd":
          if (args.length === 0) {
            console.log(messages.ERRORS.MISSING_DIRECTORY_PATH);
          } else {
            currentDirectory = cd(currentDirectory, args[0]);
          }
          break;
        case "ls":
          ls(currentDirectory);
          break;
        case "os":
          if (args.length === 0) {
            console.log(messages.ERRORS.MISSING_OS_ARGUMENT);
          } else {
            osInfo(args[0]);
          }
          break;
        case "hash":
          if (args.length === 0) {
            console.log(messages.ERRORS.MISSING_FILE_PATH);
          } else {
            hashFile(currentDirectory, args[0]);
          }
          break;
        case "compress":
          if (args.length < 2) {
            console.log(messages.ERRORS.MISSING_PATH_OR_DEST);
          } else {
            compress(currentDirectory, args[0], args[1]);
          }
          break;
        case "decompress":
          if (args.length < 2) {
            console.log(messages.ERRORS.MISSING_PATH_OR_DEST);
          } else {
            decompress(currentDirectory, args[0], args[1]);
          }
          break;
        case ".exit":
          console.log(messages.PROMPTS.GOODBYE(username));
          rl.close();
          return;
        default:
          console.log(messages.ERRORS.INVALID_INPUT);
      }
    } catch (err) {
      console.log(messages.ERRORS.OPERATION_FAILED, err);
    }
    printCurrentDirectory();
  });
};

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Guest";

startFileManager(username);

rl.on("SIGINT", () => {
  console.log(messages.PROMPTS.GOODBYE(username));
  rl.close();
});
