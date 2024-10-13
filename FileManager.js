import {
  up,
  cd,
  ls,
  osInfo,
  hashFile,
  compress,
  decompress,
  printAvailableCommands,
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
  console.log(`Welcome to the File Manager, ${username}!`);
  printCurrentDirectory();
  printAvailableCommands();

  rl.on("line", (input) => {
    const [command, ...args] = input.split(" ");
    try {
      switch (command) {
        case "up":
          currentDirectory = up(currentDirectory);
          break;
        case "cd":
          currentDirectory = cd(currentDirectory, args[0]);
          break;
        case "ls":
          ls(currentDirectory);
          break;
        case "os":
          osInfo(args[0]);
          break;
        case "hash":
          hashFile(currentDirectory, args[0]);
          break;
        case "compress":
          compress(currentDirectory, args[0], args[1]);
          break;
        case "decompress":
          decompress(currentDirectory, args[0], args[1]);
          break;
        case ".exit":
          console.log(
            `Thank you for using File Manager, ${username}, goodbye!`
          );
          rl.close();
          return;
        default:
          console.log("Invalid input");
      }
    } catch (err) {
      console.log("Operation failed", err);
    }
    printCurrentDirectory();
    printAvailableCommands();
  });
};

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Guest";

startFileManager(username);

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
});
