import chalk from "chalk";
import fs from "node:fs/promises";
import path from "node:path";

const filePath = path.join(
  process.cwd(),
  "cli-projects",
  "Todo",
  "data",
  "todo.json"
);

// for writing a ssingle task
export const writeToFile = async (newTask) => {
  try {
    let tasks = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      tasks = JSON.parse(data);
    } catch (err) {
      tasks = [];
    }
    tasks.push(newTask);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    console.error(chalk.redBright(`Error: ${error.message}`));
  }
};

// for updating a task
export const overWrite = async (updatedTask) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(updatedTask, null, 2), "utf-8");
  } catch (error) {
    console.error(chalk.redBright(`Error: ${error.message}`));
  }
};

export const readData = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(chalk.redBright(`Error: ${error.message}`));
    return [];
  }
};
