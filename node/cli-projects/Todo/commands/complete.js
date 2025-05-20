import chalk from "chalk";
import { overWrite, readData, writeToFile } from "../utils/fileHandler.js";

export const updateTask = async (taskName) => {
  try {
    const todos = await readData();

    const taskExists = todos.some((todo) => todo.name === taskName);
    if (!taskExists) {
      console.log(chalk.red(`❌ Task "${taskName}" not found!`));
      return;
    }

    const updatedTodos = todos.map((todo) =>
      todo.name === taskName ? { ...todo, completed: true } : todo
    );

    await overWrite(updatedTodos);
    console.log(chalk.green(`✅ Task "${taskName}" marked as completed!`));
  } catch (error) {
    console.error(chalk.redBright(`🚨 Error: ${error.message}`));
  }
};
