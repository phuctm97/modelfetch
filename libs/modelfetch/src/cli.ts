import type { Runtime } from "js-runtime";

import type { Config } from "./config.js";

import { loadConfig } from "c12";
import { Command } from "commander";
import getPort from "get-port";
import { get as detectRuntime } from "js-runtime";
import { exec as execCommand, spawn } from "node:child_process";
import { access, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

import packageJson from "../package.json" with { type: "json" };

const exec = promisify(execCommand);

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

function getRunArgs(runtime: Runtime): string[] {
  switch (runtime) {
    case "deno": {
      return ["deno", "run", "-Aq"];
    }
    default: {
      return ["bun", "run", "--silent", "--no-deprecation"];
    }
  }
}

function getHotReloadArgs(runtime: Runtime): string[] {
  const runArgs = getRunArgs(runtime);
  switch (runtime) {
    case "deno": {
      return [...runArgs, "--watch-hmr", "--no-clear-screen"];
    }
    default: {
      return [...runArgs, "--hot", "--no-clear-screen"];
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
  .command("dev")
  .description("start the MCP Inspector")
  .action(async () => {
    const { config } = await loadConfig<Config>({
      name: "modelfetch",
      defaults: { server: await detectDefaultServer() },
    });
    if (!config.server) throw new Error("config.server is required");
    const dotDir = path.join(process.cwd(), ".modelfetch");
    await mkdir(dotDir, { recursive: true });
    const runtime = detectRuntime();
    if (runtime === "node" || runtime === "jest") {
      try {
        await exec("bun --version");
      } catch {
        throw new Error("Bun (https://bun.com) is required");
      }
    }
    const serverPath = path.join(process.cwd(), config.server);
    const serverPort = await getPort({ port: 3000 });
    const mainPath = path.join(dotDir, `main${path.extname(config.server)}`);
    const mainContent = `
import handle from "modelfetch";
import serverInstance from "${pathToFileURL(serverPath).toString()}";
handle("${runtime}", serverInstance, ${serverPort});
`;
    await writeFile(mainPath, mainContent, "utf8");
    const configPath = path.join(dotDir, "main.json");
    const configContent = JSON.stringify({
      mcpServers: {
        "mcp-server": {
          type: "streamable-http",
          url: `http://localhost:${serverPort}/mcp`,
        },
      },
    });
    await writeFile(configPath, configContent, "utf8");
    const [hotReloadCommand, ...hotReloadArgs] = getHotReloadArgs(runtime);
    const server = spawn(hotReloadCommand, [...hotReloadArgs, mainPath], {
      stdio: ["ignore", "inherit", "inherit"],
    });
    server.once("exit", (code) => {
      process.exit(code);
    });
    const [runCommand, ...runArgs] = getRunArgs(runtime);
    const inspector = spawn(
      runCommand,
      [
        ...runArgs,
        fileURLToPath(
          import.meta.resolve(
            "@modelcontextprotocol/inspector/cli/build/cli.js",
          ),
        ),
        "--",
        "--config",
        configPath,
      ],
      { stdio: "inherit" },
    );
    inspector.once("exit", (code) => {
      process.exit(code);
    });
    for (const killSignal of killSignals) {
      process.once(killSignal, () => {
        server.kill(killSignal);
        inspector.kill(killSignal);
      });
    }
  });

await program.parseAsync(process.argv);
