export const printAvailableCommands = () => {
  console.log(`
Available commands:
- up: Go to the parent directory
- cd <path>: Change directory
- ls: List files in the current directory
- cat <file_path>: Read file content
- add <file_name>: Create an empty file
- rn <file_path> <new_name>: Rename a file
- cp <file_path> <new_directory>: Copy a file
- mv <file_path> <new_directory>: Move a file
- rm <file_path>: Delete a file
- os --EOL: Get the end-of-line character of the system
- os --cpus: Get information about CPUs
- os --homedir: Get the home directory
- os --username: Get the system username
- os --architecture: Get the system architecture
- hash <file_path>: Calculate the hash of a file
- compress <file_path> <destination>: Compress a file
- decompress <file_path> <destination>: Decompress a file
- .exit: Exit the program
`);
};
