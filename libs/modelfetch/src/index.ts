import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadConfig } from "c12";
import { watch } from "chokidar";
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
    const watcher = watch(config.server, { cwd: process.cwd() });
    let server: McpServer | undefined;
    for (const killSignal of killSignals) {
      process.once(killSignal, () => {
        void watcher.close();
        if (server) {
          const {
            server: { transport },
          } = server;
          server = undefined;
          void transport?.close();
        }
      });
    }
    const reload = async () => {
      watcher.unwatch("*");
      if (server) {
        const {
          server: { transport },
        } = server;
        server = undefined;
        await transport?.close();
      }
      const { default: loadedServer } = (await tsImport(config.server, {
        parentURL: pathToFileURL(
          path.resolve(process.cwd(), `index${path.extname(config.server)}`),
        ).toString(),
        onImport: (url) => {
          watcher.add(fileURLToPath(url));
        },
      })) as { default?: unknown };
      if (!isMcpServer(loadedServer)) {
        throw new Error(
          `${config.server} must export a default McpServer instance`,
        );
      }
      server = loadedServer;
      await server.connect(new StdioServerTransport());
    };
    watcher.on("change", () => {
      void reload();
    });
    await reload();
  });

program
  .command("dev")
  .description("start the MCP Inspector")
  .action(() => {
    const inspector = spawn(
      "npx",
      [
        "-y",
        "@modelcontextprotocol/inspector@latest",
        "--",
        "node",
        fileURLToPath(import.meta.url),
        "serve",
      ],
      { stdio: "inherit" },
    );
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
