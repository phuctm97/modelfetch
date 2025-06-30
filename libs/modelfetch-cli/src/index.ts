import type { PackageJson } from "type-fest";

import { Command } from "commander";
import { createConsola } from "consola";
import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";
import fs from "node:fs/promises";
import path from "node:path";

const packageJson = JSON.parse(
  await fs.readFile(
    path.resolve(import.meta.dirname, "..", "package.json"),
    "utf8",
  ),
) as PackageJson;

const logger = createConsola({ defaults: { tag: packageJson.name } });

const program = new Command();

program
  .name(
    Object.keys(packageJson.bin ?? {}).find(Boolean) ?? packageJson.name ?? "",
  )
  .description("CLI to build ModelFetch applications")
  .version(packageJson.version ?? "");

program
  .command("build")
  .description("Build a ModelFetch application")
  .action(async () => {
    const absWorkingDir = process.cwd();
    let entryPoint: string | undefined;
    try {
      await fs.access(path.join(absWorkingDir, "src/index.ts"));
      entryPoint = "src/index.ts";
    } catch {
      try {
        await fs.access(path.join(absWorkingDir, "src/index.js"));
        entryPoint = "src/index.js";
      } catch {
        logger.error("No src/index.ts or src/index.js file found");
        process.exit(1);
      }
    }
    if (entryPoint === "src/index.js") {
      logger.warn("Build skipped (Reason: JavaScript entry point detected)");
      return;
    }
    const outdir = "dist";
    const dst = path.resolve(absWorkingDir, outdir);
    await fs.rm(dst, { recursive: true, force: true });
    await fs.mkdir(dst, { recursive: true });
    await esbuild.build({
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
    });
    logger.success(`Build completed (Output: ${outdir}/index.js)`);
  });

await program.parseAsync();
