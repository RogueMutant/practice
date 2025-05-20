import inquirer from "inquirer";
import chalk from "chalk";
import { Command } from "commander";
import { createTask } from "./commands/add.js";
import { listTodos } from "./commands/list.js";
import { updateTask } from "./commands/complete.js";
import { deleteTask } from "./commands/delete.js";

const program = new Command();

const todoPrompt = async () => {
  try {
    const { question } = await inquirer.prompt([
      {
        type: "list",
        name: "question",
        message: "What do you want to do?",
        choices: [
          "Create a new task",
          "Update a task",
          "Get all tasks",
          "Delete a task",
        ],
      },
    ]);
    console.log(question);

    switch (question) {
      case "Create a new task":
        let { taskName } = await inquirer.prompt([
          {
            type: "input",
            name: "taskName",
            message: "what task will you be creating?",
            validate: (input) => {
              if (input === "" || !isNaN(input)) {
                return "please enter a valid task name";
              }
              return true;
            },
          },
        ]);
        console.log(taskName);
        await createTask(taskName.toLowerCase());
        break;
      case "Update a task":
        let { updatedTask } = await inquirer.prompt([
          {
            type: "input",
            name: "updatedTask",
            message: "what task will you be updating?",
            validate: (input) => {
              if (input === "" || !isNaN(input)) {
                return "please enter a valid task name";
              }
              return true;
            },
          },
        ]);
        await updateTask(updatedTask.toLowerCase());
        break;
      case "Get all tasks":
        let { GetTasks } = await inquirer.prompt([
          {
            type: "confirm",
            name: "GetTasks",
            message: "Retrieve tasks",
            validate: (input) => {
              if (input.length > 1) {
                return "select yes or no";
              }
              return true;
            },
          },
        ]);
        await listTodos();
        break;
      case "Delete a task":
        let { deleteTask } = await inquirer.prompt([
          {
            type: "input",
            name: "deleteTask",
            message: "what task will you be deleting?",
            validate: (input) => {
              if (input === "" || !isNaN(input)) {
                return "please enter a valid task name";
              }
              return true;
            },
          },
        ]);
        await deleteTask(deleteTask.toLowerCase());
        break;
      default:
        console.log("select something");
        break;
    }
  } catch (error) {
    console.error(chalk.redBright(`Error: ${error}`));
  }
};

program
  .name("Todo")
  .description("A simple cli app to manage tasks")
  .version("1.0.0");

program
  .command("prompt")
  .description("A prompt command")
  .action(async () => {
    await todoPrompt();
  });

program
  .command("add <task>")
  .description("Command to create a task")
  .action(async (task) => {
    console.log(chalk.greenBright("Creating task..."));
    await createTask(task.toLowerCase());
  });

program
  .command("update <taskName")
  .description("A command to update a task")
  .action(async (taskName) => {
    console.log(chalk.greenBright("Updating task..."));
    await updateTask(taskName.toLowerCase());
  });

program
  .command("list")
  .description("Command to list all tasks")
  .action(async () => {
    console.log("Listing all tasks...");
    await listTodos();
  });

program
  .command("complete <taskName>")
  .description("Command to mark a task as completed")
  .action(async (taskName) => {
    console.log(chalk.greenBright("Updating task..."));
    await updateTask(taskName.toLowerCase());
  });

program
  .command("delete <taskName>")
  .description("Command to delete a task")
  .action(async (taskName) => {
    console.log(chalk.greenBright("deleting task..."));
    await deleteTask(taskName.toLowerCase());
  });

program.parse(process.argv);
