import os from "os";

export const osInfo = (option) => {
  switch (option) {
    case "--EOL":
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;
    case "--cpus":
      console.log(`CPUs: ${os.cpus().length}`);
      os.cpus().forEach((cpu, idx) =>
        console.log(`CPU ${idx + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`)
      );
      break;
    case "--homedir":
      console.log(`Home Directory: ${os.homedir()}`);
      break;
    case "--username":
      console.log(`Username: ${os.userInfo().username}`);
      break;
    case "--architecture":
      console.log(`Architecture: ${os.arch()}`);
      break;
    default:
      console.log("Invalid OS command");
  }
};
