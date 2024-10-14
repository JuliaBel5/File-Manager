import readline from "readline";
import os from "os";
import commandHandlers from "./commandHandlers.js";
import { messages, lightCyan, reset } from "./commands/index.js";

const homeDirectory = os.homedir();
let currentDirectory = homeDirectory;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printCurrentDirectory = (currentDirectory) => {
  console.log(`${lightCyan}You are currently in ${currentDirectory}${reset}`);
};

const startFileManager = (username) => {
  console.log(messages.PROMPTS.WELCOME(username));
  printCurrentDirectory(currentDirectory);

  rl.on("line", async (input) => {
    const [command, ...args] = input.split(" ");
    try {
      const handler = commandHandlers(
        currentDirectory,
        username,
        printCurrentDirectory,
        (newDir) => {
          currentDirectory = newDir;
        }
      );
      const exit = handler[command]
        ? await handler[command](args)
        : console.log(
            `${messages.ERRORS.INVALID_INPUT}, print help to see the list of available commands`
          );
      if (exit) return;
    } catch (err) {
      console.log(messages.ERRORS.OPERATION_FAILED, err);
    }
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
