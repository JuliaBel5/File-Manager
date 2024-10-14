import os from "os";
import { blue, orange, green, yellow, red, reset } from "./index.js";

export const osInfo = (option) => {
  switch (option) {
    case "--EOL":
      console.log(`${blue}EOL: ${JSON.stringify(os.EOL)}${reset}`);
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`${blue}CPUs: ${cpus.length}${reset}`);

      const tableData = cpus.map((cpu, idx) => ({
        Index: idx + 1,

        Model: cpu.model,

        Speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
      }));

      console.log(`${blue}CPU Information:${reset}`);

      console.table(
        tableData.map((row) => ({
          Index: row.Index,
          Model: row.Model,
          Speed: row.Speed,
        }))
      );
      break;
    case "--homedir":
      console.log(`${blue}Home Directory: ${os.homedir()}${reset}`);
      break;
    case "--username":
      console.log(`${blue}Username: ${os.userInfo().username}${reset}`);
      break;
    case "--architecture":
      console.log(`${orange}Architecture: ${os.arch()}${reset}`);
      break;
    default:
      console.log(`${red}Invalid OS command${reset}`);
  }
};
