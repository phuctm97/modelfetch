import * as p from "@clack/prompts";
import { capitalCase } from "change-case";
import ejs from "ejs";
import { exec } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import pc from "picocolors";
import validatePackageName from "validate-npm-package-name";

import packageJson from "../package.json" with { type: "json" };

const execAsync = promisify(exec);

// ASCII art logo
const asciiLogo = `   __  __           _      _ _____    _       _
  |  \\/  |         | |    | |  ___|  | |     | |
  | .  . | ___   __| | ___| | |_ ___| |_ ___| |__
  | |\\/| |/ _ \\ / _\` |/ _ \\ |  _/ _ \\ __/ __| '_ \\
  | |  | | (_) | (_| |  __/ | ||  __/ || (__| | | |
  \\_|  |_/\\___/ \\__,_|\\___|_\\_| \\___|\\__\\___|_| |_|`;

// Package versions
const packageVersions = {
  "@modelcontextprotocol/sdk": "1.15.0",
  "@modelfetch/node": packageJson.version,
  "@modelfetch/bun": packageJson.version,
  "@modelfetch/deno": packageJson.version,
  tslib: "2.8.1",
  zod: "3.25.74",
  tsx: "4.20.3",
  typescript: "5.8.3",
  "@types/bun": "1.2.18",
  "@types/node": "22.15.34",
};

type Runtime = "node" | "bun" | "deno";
type Language = "javascript" | "typescript";
type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

interface ProjectOptions {
  name: string;
  title: string;
  runtime: Runtime;
  language: Language;
  packageManager: PackageManager;
  installDeps: boolean;
}

function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.includes("pnpm")) return "pnpm";
    if (userAgent.includes("yarn")) return "yarn";
    if (userAgent.includes("bun")) return "bun";
  }

  return "npm";
}

function validateProjectName(name: string): string | undefined {
  if (name) {
    const validation = validatePackageName(name);
    if (!validation.validForNewPackages) {
      const issue = [
        ...(validation.errors ?? []),
        ...(validation.warnings ?? []),
      ].find(Boolean);
      return (issue ?? "") || "name is invalid";
    }
  }
}

function getStartCommand(
  runtime: Runtime,
  packageManager: PackageManager,
): string {
  switch (runtime) {
    case "deno": {
      return "deno task start";
    }
    default: {
      return `${packageManager} start`;
    }
  }
}

async function copyTemplate(
  templatePath: string,
  targetPath: string,
  options: ProjectOptions,
) {
  await fs.mkdir(targetPath, { recursive: true });

  const files = await fs.readdir(templatePath);

  // Prepare EJS data
  const ejsData = {
    projectName: options.name,
    projectTitle: options.title,
    runtime: options.runtime,
    language: options.language,
    packageManager: options.packageManager,
    versions: packageVersions,
  };

  for (const file of files) {
    const srcPath = path.join(templatePath, file);

    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      const destPath = path.join(targetPath, file);
      await copyTemplate(srcPath, destPath, options);
    } else if (file.endsWith(".template")) {
      // Process template files with EJS
      const content = await fs.readFile(srcPath, "utf8");
      const rendered = ejs.render(content, ejsData);

      // Remove .template extension from destination filename
      const destFileName = path.basename(file, ".template");
      const destPath = path.join(targetPath, destFileName);

      await fs.writeFile(destPath, rendered);
    } else {
      // Copy non-template files as-is
      const destPath = path.join(targetPath, file);
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  console.clear();

  // Display ASCII art logo
  console.log(pc.greenBright(asciiLogo));

  // Display hero title
  console.log();
  console.log(
    pc.gray("The delightful TypeScript/JavaScript SDK for MCP servers"),
  );
  console.log();

  p.intro(pc.bold("Let's scaffold your MCP server!"));

  const projectName = await p.text({
    message: "What is your MCP server name?",
    placeholder: "my-mcp-server",
    defaultValue: "my-mcp-server",
    validate: validateProjectName,
  });

  if (p.isCancel(projectName)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // Use placeholder value if user enters empty string
  const finalProjectName = projectName || "my-mcp-server";

  // Generate default title from project name
  const defaultTitle = capitalCase(finalProjectName);

  const projectTitle = await p.text({
    message: "What is your MCP server title?",
    placeholder: defaultTitle,
    defaultValue: defaultTitle,
  });

  if (p.isCancel(projectTitle)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // Use placeholder value if user enters empty string
  const finalProjectTitle = projectTitle || defaultTitle;

  const runtime = (await p.select({
    message: "Which runtime would you like to use?",
    options: [
      { value: "node", label: "Node.js" },
      { value: "bun", label: "Bun" },
      { value: "deno", label: "Deno" },
    ],
  })) as Runtime;

  if (p.isCancel(runtime)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const language = (await p.select({
    message: "Which language would you like to use?",
    options: [
      { value: "typescript", label: "TypeScript" },
      { value: "javascript", label: "JavaScript" },
    ],
  })) as Language;

  if (p.isCancel(language)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const detectedPM = detectPackageManager();
  let packageManager: PackageManager;
  let installDeps: boolean | undefined;

  // Handle package manager selection based on runtime
  switch (runtime) {
    case "bun": {
      packageManager = "bun";
      break;
    }
    case "deno": {
      packageManager = "npm";
      installDeps = false; // Deno doesn't need to install dependencies
      break;
    }
    default: {
      packageManager = (await p.select({
        message: "Which package manager would you like to use?",
        options: [
          { value: "npm", label: "npm" },
          { value: "pnpm", label: "pnpm" },
          { value: "bun", label: "bun" },
          { value: "yarn", label: "yarn" },
        ],
        initialValue: detectedPM,
      })) as PackageManager;

      if (p.isCancel(packageManager)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }
      break;
    }
  }

  // Ask about installing dependencies
  if (typeof installDeps !== "boolean") {
    const value = await p.confirm({
      message: "Would you like to install dependencies?",
      initialValue: true,
    });

    if (p.isCancel(value)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }

    installDeps = value;
  }

  const options: ProjectOptions = {
    name: finalProjectName,
    title: finalProjectTitle,
    runtime,
    language,
    packageManager,
    installDeps,
  };

  const targetDir = path.resolve(finalProjectName);
  const templateName = `${runtime}-${language === "javascript" ? "js" : "ts"}`;
  const templateDir = new URL(`../templates/${templateName}`, import.meta.url)
    .pathname;

  // Check if directory exists
  let shouldRemoveExisting = false;
  try {
    await fs.access(targetDir);
    const overwrite = await p.confirm({
      message: `Directory ${finalProjectName} already exists. Overwrite?`,
      initialValue: false,
    });

    if (!overwrite || p.isCancel(overwrite)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }

    shouldRemoveExisting = true;
  } catch {
    // Directory doesn't exist, proceed with creation
  }

  const s = p.spinner();

  try {
    s.start("Scaffolding project");

    // Remove existing directory if needed
    if (shouldRemoveExisting) await fs.rm(targetDir, { recursive: true });

    // Copy template
    await copyTemplate(templateDir, targetDir, options);

    s.stop("Project scaffolded!");

    // Install dependencies
    if (installDeps) {
      s.start("Installing dependencies");

      const installCommand = {
        npm: "npm install",
        pnpm: "pnpm install",
        yarn: "yarn install",
        bun: "bun install",
      }[packageManager];

      await execAsync(installCommand, { cwd: targetDir });

      s.stop("Dependencies installed!");
    }

    p.outro(pc.green("Your MCP server is ready!"));

    console.log();
    console.log(pc.bold("Next steps:"));
    console.log();
    console.log(pc.gray("  Navigate to your project:"));
    console.log(`  ${pc.cyan(`cd ${finalProjectName}`)}`);
    console.log();
    console.log(pc.gray("  Start the MCP server:"));
    console.log(`  ${pc.cyan(getStartCommand(runtime, packageManager))}`);
    console.log();
    console.log(pc.gray("  Test with MCP Inspector:"));
    console.log(`  ${pc.cyan("npx @modelcontextprotocol/inspector")}`);
    console.log();
    console.log(pc.gray("  Read the documentation:"));
    console.log(`  ${pc.cyan("https://preview.modelfetch.com/docs")}`);
    console.log();
  } catch (error) {
    s.stop("create-modelfetch CLI failed!");
    console.error(error);
    process.exit(1);
  }
}

try {
  await main();
} catch (error) {
  console.log(pc.red("create-modelfetch CLI failed!"));
  console.error(error);
  process.exit(1);
}
