import dotenv from "dotenv";
dotenv.config();
import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import startPrompt from "./start-prompt.js";

const apikey = process.env.CURRENCY_API_KEY;
const apiUrl = process.env.CURRENCY_API_URL;

const program = new Command();

const convertCurrency = async (from, to, amount) => {
  if (from.length > 3 || to.length > 3) {
    console.error(
      chalk.redBright("Error: We only support Three letter currency codes")
    );
    return;
  }

  try {
    const response = await fetch(
      `${apiUrl}/${apikey}/pair/${from}/${to}/${amount}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok || data.result === "error") {
      console.error(chalk.red("Error Type:"), data["error-type"]);
      return;
    }

    console.log(chalk.green("Converted Amount:"), data.conversion_result);
  } catch (error) {
    console.error(chalk.red("Network Error:"), error.message);
  }
};

const supportedCodes = async () => {
  try {
    const response = await fetch(`${apiUrl}/${apikey}/codes`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok || data.result === "error") {
      console.error(chalk.red("Error Type:"), data["error-type"]);
      return;
    }
    console.log(chalk.green("Supported Codes:"), data.supported_codes);
  } catch (error) {
    console.error(console.error(chalk.red("Network Error:"), error.message));
  }
};

program
  .name("Currency Converter")
  .description("A cli tool to convert currencies")
  .version("1.0.0");

program
  .command("convert <from> <to> <amount>")
  .description("A command that converts a pair a currency codes")
  .action(async (from, to, amount) => {
    await convertCurrency(from, to, amount);
  });

program
  .command("codes")
  .description("A command that lists all the supported currency codes")
  .action(async () => {
    await supportedCodes();
  });

program
  .command("prompt")
  .description("An interactive prompt for easier use of the cli tool")
  .action(async () => {
    await startPrompt();
  });

program.parse(process.argv);

export default convertCurrency;
