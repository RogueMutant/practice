import chalk from "chalk";
import { readData } from "../utils/fileHandler.js";

export const listTodos = async () => {
  try {
    const todos = await readData();
    console.log(chalk.green("Your Tasks:"));
    todos.forEach((element) => {
      console.log(element);
    });
    console.log(chalk.yellow("Total Tasks: "), todos.length);
  } catch (error) {
    console.error(chalk.redBright(`Error: ${error.message}`));
  }
};
