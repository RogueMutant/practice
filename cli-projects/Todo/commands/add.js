import chalk from "chalk";
import { readData, writeToFile } from "../utils/fileHandler.js";

export const createTask = async (task) => {
  try {
    if (task === "" || !isNaN(task)) {
      console.log(chalk.red("❌ Task cannot be empty!"));
      return;
    }
    const newTask = { id: Date.now(), name: task, completed: false };
    console.log(chalk.green(`Task "${task}" ✅ created successfully!`));

    const data = await readData();
    const updated = newTask;

    await writeToFile(updated);
    console.log(chalk.blue("✅ Task saved to file successfully!"));
  } catch (error) {
    console.error(chalk.redBright(`Error: ${error.message}`));
  }
};
