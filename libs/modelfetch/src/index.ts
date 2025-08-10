import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { Config } from "./config.js";

import { loadConfig } from "c12";
import { watch } from "chokidar";
import { Command } from "commander";
import { get as getRuntime } from "js-runtime";
import { spawn } from "node:child_process";
import { access, readdir } from "node:fs/promises";
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

async function detectDefaultServer(): Promise<string> {
  // Check static files
  const staticFiles = [
    "src/server.ts",
    "src/server.js",
    "netlify/server.ts",
    "netlify/server.js",
  ];
  for (const staticFile of staticFiles) {
    try {
      await access(path.join(process.cwd(), staticFile));
      return `./${staticFile}`;
    } catch {
      // Ignore
    }
  }
  // Check for Next.js dynamic routes
  try {
    const dirs = await readdir(path.join(process.cwd(), "app"));
    for (const dir of dirs) {
      if (dir.startsWith("[[...") && dir.endsWith("]]")) {
        for (const ext of ["ts", "js"]) {
          const serverPath = `app/${dir}/server.${ext}`;
          try {
            await access(path.join(process.cwd(), serverPath));
            return `./${serverPath}`;
          } catch {
            // Ignore
          }
        }
      }
    }
  } catch {
    // Ignore
  }
  // Check for Supabase functions
  try {
    const dirs = await readdir(
      path.join(process.cwd(), "supabase", "functions"),
    );
    for (const dir of dirs) {
      for (const ext of ["ts", "js"]) {
        const serverPath = `supabase/functions/${dir}/server.${ext}`;
        try {
          await access(path.join(process.cwd(), serverPath));
          return `./${serverPath}`;
        } catch {
          // Ignore
        }
      }
    }
  } catch {
    // Ignore
  }
  return "";
}

function detectRuntimeArgs(): string[] {
  const runtime = getRuntime();
  switch (runtime) {
    case "bun": {
      return ["bun", "run"];
    }
    case "deno": {
      return ["deno", "run", "-A"];
    }
    default: {
      return ["node"];
    }
  }
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
      defaults: { server: await detectDefaultServer() },
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
    const [command, ...args] = detectRuntimeArgs();
    const inspector = spawn(
      command,
      [
        ...args,
        fileURLToPath(
          import.meta.resolve(
            "@modelcontextprotocol/inspector/cli/build/cli.js",
          ),
        ),
        "--",
        command,
        ...args,
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
