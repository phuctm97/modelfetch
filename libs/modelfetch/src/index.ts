import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadConfig } from "c12";
import { Command } from "commander";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tsImport } from "tsx/esm/api";

import packageJson from "../package.json" with { type: "json" };

interface Config {
  server: string;
}

function isMcpServer(server: unknown): server is McpServer {
  return (
    server !== null &&
    typeof server === "object" &&
    "connect" in server &&
    typeof server.connect === "function" &&
    "server" in server &&
    Boolean(server.server)
  );
}

const killSignals = ["SIGINT", "SIGTERM"] as const;

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("serve")
  .description("start the MCP server")
  .action(async () => {
    const { config } = await loadConfig<Config>({
      name: "modelfetch",
      defaults: { server: "./src/server.ts" },
    });
    const { default: server } = (await tsImport(config.server, {
      parentURL: pathToFileURL(
        path.resolve(process.cwd(), `index${path.extname(config.server)}`),
      ).toString(),
    })) as { default?: unknown };
    if (!isMcpServer(server)) {
      throw new Error(
        `${config.server} must export a default McpServer instance`,
      );
    }
    const transport = new StdioServerTransport();
    await server.connect(transport);
    const close = transport.onclose;
    transport.onclose = () => {
      close?.();
      process.exit();
    };
    for (const killSignal of killSignals)
      process.once(killSignal, () => void transport.close());
  });

program
  .command("dev")
  .description("start the MCP Inspector")
  .action(() => {
    const inspector = spawn("npx", [
      "-y",
      "@modelcontextprotocol/inspector@latest",
      "--",
      "node",
      fileURLToPath(import.meta.url),
      "serve",
    ]);
    inspector.once("exit", (code) => {
      process.exit(code);
    });
    for (const killSignal of killSignals) {
      process.once(killSignal, () => {
        inspector.kill(killSignal);
      });
    }
  });

await program.parseAsync(process.argv);
