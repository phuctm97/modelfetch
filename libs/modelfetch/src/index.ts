import { Command } from "commander";

import packageJson from "../package.json" with { type: "json" };

const program = new Command();

program
  .name("modelfetch")
  .description("CLI for building MCP servers with ModelFetch")
  .version(packageJson.version);

program
  .command("dev")
  .description("Start development server")
  .action(async () => {
    console.log("TBD");

    // Wait for Ctrl+C to terminate
    await new Promise<void>((resolve) => {
      process.on("SIGINT", () => {
        console.log("\nShutting down...");
        resolve();
      });
    });
  });

await program.parseAsync(process.argv);
