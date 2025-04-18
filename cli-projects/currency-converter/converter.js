import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("Currency Converter")
  .description("A cli tool to convert currencies")
  .version("1.0.0");
