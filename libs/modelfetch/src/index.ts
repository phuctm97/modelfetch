import { Command } from "commander";

import packageJson from "../package.json" with { type: "json" };

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("dev")
  .description("start development server")
  .action(async () => {
    console.log("Loading…");
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  });

await program.parseAsync(process.argv);
