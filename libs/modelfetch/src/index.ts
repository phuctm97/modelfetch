import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { Config } from "./config.js";

import { loadConfig } from "c12";
import { watch } from "chokidar";
import { Command } from "commander";
import { get as getRuntime } from "js-runtime";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { appendFileSync } from "node:fs";
import { access, mkdir, readdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tsImport } from "tsx/esm/api";

import packageJson from "../package.json" with { type: "json" };

import { Transport } from "./transport.js";

const logDir = path.join(homedir(), ".modelfetch", "logs");

await mkdir(logDir, { recursive: true });

const logFile = path.join(logDir, `session-${randomUUID()}.log`);

function LOG(level: string, message: string): void {
  const timestamp = new Date().toISOString();
  appendFileSync(logFile, `[${timestamp}] [${level}] ${message}\n`, "utf8");
}

function SEP(): void {
  appendFileSync(logFile, "------------------------------------\n", "utf8");
}

function INFO(message: string): void {
  LOG("INFO", message);
}

function ERROR(message: string): void {
  LOG("ERROR", message);
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
  .version(packageJson.version)
  .hook("preAction", (thisCommand, actionCommand) => {
    SEP();
    INFO(`Command: ${actionCommand.name()} ${actionCommand.args.join(" ")}`);
    INFO(`Runtime: ${getRuntime()}`);
    INFO(`Working Directory: ${process.cwd()}`);
    INFO(`Environment Variables: ${Object.keys(process.env).sort().join(" ")}`);
    SEP();
  });

program
  .command("serve")
  .description("start the MCP server")
  .action(async () => {
    const { config } = await loadConfig<Config>({
      name: "modelfetch",
      defaults: { server: await detectDefaultServer() },
    });
    if (!config.server) throw new Error("config.server is required");
    const runtime = getRuntime();
    if (runtime === "deno") {
      const dotDir = path.join(process.cwd(), ".modelfetch");
      await mkdir(dotDir, { recursive: true });
      const serverPath = path.join(process.cwd(), config.server);
      const mainPath = path.join(dotDir, `main${path.extname(config.server)}`);
      const mainContent = `
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import server from "${pathToFileURL(serverPath).toString()}";

const transport = new StdioServerTransport();
await server.connect(transport);
`;
      await writeFile(mainPath, mainContent, "utf8");
      const deno = spawn("deno", ["run", "-A", "--watch-hmr", mainPath], {
        stdio: "inherit",
      });
      deno.once("exit", (code) => {
        process.exit(code);
      });
      for (const killSignal of killSignals) {
        process.once(killSignal, () => {
          deno.kill(killSignal);
        });
      }
    } else {
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
            path.join(process.cwd(), `index${path.extname(config.server)}`),
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
    }
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

process.on("uncaughtException", (error) => {
  ERROR(`Uncaught exception: ${error.message}`);
  ERROR(error.stack ?? "No stack trace");
});

process.on("unhandledRejection", (reason) => {
  ERROR(`Unhandled rejection: ${String(reason)}`);
  if (reason instanceof Error) ERROR(reason.stack ?? "No stack trace");
});

await program.parseAsync(process.argv);
