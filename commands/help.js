import { orange, green, reset } from "./index.js";

export const printAvailableCommands = () => {
  const commands = [
    {
      Command: `${orange}up${reset}`,
      Description: "Go to the parent directory",
    },
    { Command: `${orange}cd <path>${reset}`, Description: "Change directory" },
    {
      Command: `${orange}ls${reset}`,
      Description: "List files in the current directory",
    },
    {
      Command: `${orange}cat <file_path>${reset}`,
      Description: "Read file content",
    },
    {
      Command: `${orange}add <file_name>${reset}`,
      Description: "Create an empty file",
    },
    {
      Command: `${orange}rn <file_path> <new_name>${reset}`,
      Description: "Rename a file",
    },
    {
      Command: `${orange}cp <file_path> <new_directory>${reset}`,
      Description: "Copy a file",
    },
    {
      Command: `${orange}mv <file_path> <new_directory>${reset}`,
      Description: "Move a file",
    },
    {
      Command: `${orange}rm <file_path>${reset}`,
      Description: "Delete a file",
    },
    {
      Command: `${orange}os --EOL${reset}`,
      Description: "Get the end-of-line character of the system",
    },
    {
      Command: `${orange}os --cpus${reset}`,
      Description: "Get information about CPUs",
    },
    {
      Command: `${orange}os --homedir${reset}`,
      Description: "Get the home directory",
    },
    {
      Command: `${orange}os --username${reset}`,
      Description: "Get the system username",
    },
    {
      Command: `${orange}os --architecture${reset}`,
      Description: "Get the system architecture",
    },
    {
      Command: `${orange}hash <file_path>${reset}`,
      Description: "Calculate the hash of a file",
    },
    {
      Command: `${orange}compress <file_path> <destination>${reset}`,
      Description: "Compress a file",
    },
    {
      Command: `${orange}decompress <file_path> <destination>${reset}`,
      Description: "Decompress a file",
    },
    { Command: `${orange}.exit${reset}`, Description: "Exit the program" },
  ];

  console.log(`${green}Available commands:${reset}`);

  const commandLength = Math.max(...commands.map((cmd) => cmd.Command.length));
  const descriptionLength = Math.max(
    ...commands.map((cmd) => cmd.Description.length)
  );

  commands.forEach(({ Command, Description }) => {
    console.log(`${Command.padEnd(commandLength)}  ${Description}`);
  });
};
