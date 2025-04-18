import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

const createUrl = async (url) => {
  const response = await fetch("http://localhost:5000/urlSlicer/original", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl: url }),
  });
  const data = await response.json();
  if (data) {
    try {
      console.log(
        chalk.green("Shortened URL: "),
        chalk.greenBright(data.shorterUrl)
      );
      return;
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }
  }
};

const getUrl = async (shortUrl) => {
  const response = await fetch(`http://localhost:5000/urlSlicer/${shortUrl}`, {
    method: "GET",
  });
  const data = await response.json();
  if (data) {
    try {
      console.log(
        chalk.green("Original URL: "),
        chalk.greenBright(data.originalUrl)
      );
      return;
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }
  }
};

const getAllUrls = async () => {
  const reponse = await fetch("http://localhost:5000/urlSlicer/all-urls", {
    method: "GET",
  });
  const data = await reponse.json();
  if (data) {
    try {
      console.log(chalk.green("All URLs: "), data.urls);
      return;
    } catch (error) {
      console.log(chalk.red(`Error: ${error.message}`));
    }
  }
};

program
  .name("url-shortener")
  .description("CLI for URL Shortener")
  .version("1.0.0");

program.helpOption("-h, --HELP", "Display help for command");
program.on("--HELP", () => {
  console.log(chalk.blue("Examples:"));
  console.log(chalk.blue("  $ url-shortener shorten <url>"));
  console.log(chalk.blue("  $ url-shortener getUrl <shortenedUrl>"));
  console.log(chalk.blue("  $ url-shortener allUrls"));
});

program
  .command("shorten <url>")
  .description("Shorten a URL")
  .action(async (url) => {
    await createUrl(url);
  });

program
  .command("getUrl <url>")
  .description("Get the original URL from a shortened URL")
  .action(async (url) => {
    await getUrl(url);
  });

program.parse(process.argv);
