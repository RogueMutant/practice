import chalk from "chalk";
import { readData, overWrite } from "../utils/fileHandler.js";

export const deleteTask = async (taskName) => {
  try {
    const todos = await readData();

    const taskExists = todos.some((todo) => todo.name === taskName);
    if (!taskExists) {
      console.log(chalk.red(`❌ Task "${taskName}" not found!`));
      return;
    }

    const remainingTasks = todos.filter((todo) => todo.name !== taskName);

    await overWrite(remainingTasks);
    console.log(chalk.green(`🗑️ Task "${taskName}" deleted successfully!`));
  } catch (error) {
    console.error(chalk.redBright(`🚨 Error: ${error.message}`));
  }
};
