import { Command } from "commander";

const program = new Command();

program
  .name("modelfetch")
  .description("CLI to build ModelFetch applications")
  .version("0.0.1");

program
  .command("build")
  .description("Build a ModelFetch application")
  .action(() => {
    console.error("NOT_IMPLEMENTED");
  });

program.parse();
