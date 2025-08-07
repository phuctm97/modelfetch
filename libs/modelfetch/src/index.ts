import { loadConfig } from "c12";
import { Command } from "commander";

import packageJson from "../package.json" with { type: "json" };

interface Config {
  server: string;
}

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("dev")
  .description("start development server")
  .action(async () => {
    console.log("loading configuration…");
    const { config } = await loadConfig<Config>({
      name: "modelfetch",
      defaults: { server: "./server.ts" },
    });
    console.log(`starting ${config.server}`);
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  });

await program.parseAsync(process.argv);
