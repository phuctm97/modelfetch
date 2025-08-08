import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { Config } from "./config.js";

import { loadConfig } from "c12";
import { watch } from "chokidar";
import { Command } from "commander";
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tsImport } from "tsx/esm/api";

import packageJson from "../package.json" with { type: "json" };

import { Transport } from "./transport.js";

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

async function detectDefaultServerFile(): Promise<string> {
  const serverFiles = [
    "src/server.ts",
    "src/server.js",
    "netlify/server.ts",
    "netlify/server.js",
    "app/[[...path]]/server.ts",
    "app/[[...path]]/server.js",
    "supabase/functions/mcp-server/server.ts",
    "supabase/functions/mcp-server/server.js",
  ];
  for (const serverFile of serverFiles) {
    try {
      await access(path.join(process.cwd(), serverFile));
      return serverFile;
    } catch {
      // Ignore
    }
  }
  return "";
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
      defaults: { server: await detectDefaultServerFile() },
    });
    if (!config.server) throw new Error("config.server is required");
    const transport = new Transport();
    const watcher = watch(config.server, { cwd: process.cwd() });
    let server: McpServer | undefined;
    for (const killSignal of killSignals) {
      process.once(killSignal, () => {
        transport.__modelfetch_closed__ = true;
        void watcher.close();
        if (server) void server.close();
        else void transport.close();
      });
    }
    const reload = async () => {
      watcher.unwatch("*");
      if (server) {
        const oldServer = server;
        server = undefined;
        await oldServer.close();
      }
      const { default: newServer } = (await tsImport(config.server, {
        parentURL: pathToFileURL(
          path.resolve(process.cwd(), `index${path.extname(config.server)}`),
        ).toString(),
        onImport: (url) => {
          watcher.add(fileURLToPath(url));
        },
      })) as { default?: unknown };
      if (!isMcpServer(newServer)) {
        throw new Error(
          `${config.server} must export a default McpServer instance`,
        );
      }
      server = newServer;
      await newServer.connect(transport);
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
      "node",
      [
        fileURLToPath(
          import.meta.resolve(
            "@modelcontextprotocol/inspector/cli/build/cli.js",
          ),
        ),
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
