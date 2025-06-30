import type { PackageJson } from "type-fest";

import { serve } from "@hono/node-server";
import { Command } from "commander";
import { createConsola } from "consola";
import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";
import { createApp } from "modelfetch";
import fsPromises from "node:fs/promises";
import path from "node:path";
import perfHooks from "node:perf_hooks";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

const packageJson = JSON.parse(
  await fsPromises.readFile(
    path.resolve(import.meta.dirname, "..", "package.json"),
    "utf8",
  ),
) as PackageJson;

const consola = createConsola({ defaults: { tag: packageJson.name } });

const program = new Command();

program
  .name(
    Object.keys(packageJson.bin ?? {}).find(Boolean) ?? packageJson.name ?? "",
  )
  .description("CLI for developing ModelFetch applications")
  .version(packageJson.version ?? "");

program
  .command("build")
  .description("Build a ModelFetch application")
  .action(async () => {
    const startTime = perfHooks.performance.now();
    const absWorkingDir = process.cwd();

    // Detect entry point
    let entryPoint: string | undefined;
    try {
      await fsPromises.access(path.join(absWorkingDir, "src/index.ts"));
      entryPoint = "src/index.ts";
    } catch {
      try {
        await fsPromises.access(path.join(absWorkingDir, "src/index.js"));
        entryPoint = "src/index.js";
      } catch {
        consola.error(
          "No entry point found - Expected src/index.ts or src/index.js",
        );
        process.exit(1);
      }
    }

    // Skip build for JavaScript projects
    if (entryPoint === "src/index.js") {
      consola.warn("Build skipped - JavaScript projects are kept as is");
      return;
    }

    // Clean output directory
    const outdir = "dist";
    const dst = path.resolve(absWorkingDir, outdir);
    await fsPromises.rm(dst, { recursive: true, force: true });
    await fsPromises.mkdir(dst, { recursive: true });

    // Build entry point
    consola.info(`Building ${entryPoint}...`);
    const result = await esbuild.build({
      absWorkingDir,
      outdir,
      entryPoints: [entryPoint],
      plugins: [nodeExternalsPlugin()],
      platform: "node",
      target: "node22",
      format: "esm",
      sourcemap: true,
      bundle: true,
      minify: true,
      metafile: true,
    });

    // Log build results
    const buildTime = perfHooks.performance.now() - startTime;
    consola.success(`Build completed in ${formatTime(buildTime)}`);

    // Prepare output files for display
    const outputs = Object.entries(result.metafile.outputs);
    const outputFiles: string[] = [];

    for (const [outputPath, output] of outputs) {
      const relativePath = path.relative(absWorkingDir, outputPath);
      const size = formatBytes(output.bytes);
      if (relativePath.endsWith(".js") || relativePath.endsWith(".js.map"))
        outputFiles.push(`${relativePath} (${size})`);
    }

    // Display output files in a consola box
    if (outputFiles.length > 0) {
      consola.box({
        title: "Build output files",
        message: outputFiles.join("\n"),
        style: { borderColor: "green" },
      });
    }
  });

program
  .command("start")
  .description("Start a ModelFetch application")
  .action(async () => {
    const hostname = "localhost";
    const port = 33_333;
    const app = await createApp();
    serve({ hostname, port, fetch: app.fetch });
    consola.success(
      `The ModelFetch application is running on http://${hostname}:${port}/mcp`,
    );
  });

await program.parseAsync();
