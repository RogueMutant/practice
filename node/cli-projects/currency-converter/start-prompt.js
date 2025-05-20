import convertCurrency from "./converter.js";
import chalk from "chalk";
import inquirer from "inquirer";

const startPrompt = async () => {
  try {
    const { from, to, amount } = await inquirer.prompt([
      {
        type: "input",
        name: "from",
        message: "Base currency (e.g. USD):",
        validate: (input) => {
          if (input.length !== 3) {
            return "Please enter a valid three-letter currency code.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "to",
        message: "Target currency (e.g. EUR):",
        validate: (input) => {
          if (input.length !== 3) {
            return "Please enter a valid three-letter currency code.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "amount",
        message: "Amount to convert:",
        validate: (input) => {
          if (isNaN(input) || input <= 0) {
            return "Please enter a valid amount.";
          }
          return true;
        },
      },
    ]);
    console.log(from, to, amount);

    await convertCurrency(from, to, amount);
  } catch (error) {
    console.error(chalk.redBright(`Error:  ${error.message})`));
  }
};

export default startPrompt;
