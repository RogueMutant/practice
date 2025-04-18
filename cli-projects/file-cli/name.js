import { Command } from "commander";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

const program = new Command();

const baseDir = path.join(process.cwd(), "cli-projects", "file-cli");
const filePath = path.join(baseDir, "file.txt");

const readFile = async (path) => {
  try {
    const data = await fs.readFile(path, "utf8");
    console.log(chalk.blue("File content before:") + chalk.bgGray(data));
  } catch (err) {
    console.error(chalk.red("Error reading file:") + chalk.bold(err));
  }
};

const appendFile = async (path, content) => {
  try {
    await fs.appendFile(path, content, "utf8");
    console.log(chalk.green.bold("File content updated successfully"));
  } catch (error) {
    console.error(chalk.red("Error appending to file:") + chalk.bold(error));
  }
};

const makeDir = async (dirName) => {
  try {
    const newDirPath = path.join(baseDir, dirName);

    await fs.mkdir(newDirPath, { recursive: true });
    console.log(
      chalk.greenBright("Directory created successfully:") +
        chalk.redBright.bgBlue(newDirPath)
    );
  } catch (error) {
    console.error(
      chalk.red("Error creating directory:") + chalk.bold(error.message)
    );
  }
};

const copyContents = async (sourceFile, destinationFile, dir) => {
  try {
    const sourcePath = path.join(baseDir, sourceFile);
    const destinationPath = path.join(baseDir, `${dir}`, destinationFile);
    await fs.copyFile(sourcePath, destinationPath);
    console.log(
      chalk.blue.bgGray("File copied successfully:").bold(destinationPath)
    );
  } catch (error) {
    console.error(chalk.red("Error copying file:") + chalk.bold(error));
  }
};

program
  .option("-v, --verbose", "Enable verbose logging")
  .option("--dn, --dirName <dirName>", "Directory name to create");

const verboseLog = (message) => {
  if (program.opts().verbose) {
    console.log(chalk.blue(`[VERBOSE] ${message}`));
  }
};

program
  .name("filecli")
  .description("CLI for managing files and directories")
  .version("1.0.0");

program
  .command("read")
  .description("Read the contents of a file")
  .action(() => {
    readFile(filePath);
    verboseLog(chalk.greenBright("Read command executed"));
  });

program
  .command("append <content>")
  .description("Append content to a file")
  .action((contentt) => {
    appendFile(filePath, contentt);
    verboseLog(
      chalk.blueBright(`Append command executed with content: ${contentt}`)
    );
    verboseLog(chalk.greenBright("Append command executed"));
  });

program
  .command("makedir <dirName>")
  .description("Create a new directory")
  .action((dirName) => {
    verboseLog(chalk.greenBright("Make directory command executed"));
    makeDir(dirName);
  });

program
  .command("copy <sourceFile> <dir> <destinationFile>")
  .description("Copy a file to a new location")
  .action((sourceFile, dir, destinationFile) => {
    verboseLog(
      chalk.magenta(
        `Copy command executed with source: ${sourceFile} and destination: ${destinationFile}`
      )
    );
    copyContents(sourceFile, destinationFile, dir);
  });

program
  .command("run-all")
  .description("Read, append, and copy in one go")
  .action(async () => {
    const opts = program.opts();
    const dirName = opts.dirName || "new-dir-from-cli";
    if (opts.verbose)
      console.log(chalk.blue("[VERBOSE] Starting chained actions..."));

    await readFile(filePath);
    await appendFile(filePath, "Chained content from run-all");
    await makeDir(dirName);
    await copyContents("file.txt", "copied-from-chain.txt");

    if (opts.verbose)
      console.log(chalk.blue("[VERBOSE] All actions completed."));
  });

program.parse(process.argv);
