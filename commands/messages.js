import { blue, orange, lightBlue, reset, lightMagenta } from "./colors.js";

export const messages = {
  ERRORS: {
    INVALID_INPUT: `${lightBlue}Invalid input: unknown command${reset}`,
    MISSING_DIRECTORY_PATH: `${lightBlue}Invalid input: missing directory path${reset}`,
    MISSING_OS_ARGUMENT: `${lightBlue}Invalid input: missing os argument${reset}`,
    MISSING_FILE_PATH: `${lightBlue}Invalid input: missing file path${reset}`,
    MISSING_PATH_OR_DEST: `${lightBlue}Invalid input: missing file path or destination${reset}`,
    OPERATION_FAILED: `${lightBlue}Operation failed${reset}`,
  },

  PROMPTS: {
    WELCOME: (username) =>
      `${lightMagenta}Welcome to the File Manager, ${username}!${reset}`,
    GOODBYE: (username) =>
      `${orange}Thank you for using File Manager, ${username}, goodbye!${reset}`,
  },
};
