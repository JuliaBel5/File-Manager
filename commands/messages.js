import { blue, orange, green, yellow, reset, lightMagenta } from "./index.js";
export const messages = {
  ERRORS: {
    INVALID_INPUT: "Invalid input: unknown command",
    MISSING_DIRECTORY_PATH: "Invalid input: missing directory path",
    MISSING_OS_ARGUMENT: "Invalid input: missing os argument",
    MISSING_FILE_PATH: "Invalid input: missing file path",
    MISSING_PATH_OR_DEST: "Invalid input: missing file path or destination",
    OPERATION_FAILED: "Operation failed",
    
  },
  PROMPTS: {
    WELCOME: (username) =>
      `${lightMagenta}Welcome to the File Manager, ${username}!${reset}`,
    GOODBYE: (username) =>
      `${orange}Thank you for using File Manager, ${username}, goodbye!${reset}`,
  },
};
