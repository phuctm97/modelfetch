import * as p from "@clack/prompts";
import { capitalCase, pascalCase } from "change-case";
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
  "@modelcontextprotocol/sdk": "1.17.2",
  zod: "3.25.76",
  tslib: "2.8.1",
  typescript: "5.9.2",
  "@modelfetch/node": packageJson.version,
  "@types/node": "22.17.1",
  tsx: "4.20.3",
  "@modelfetch/next": packageJson.version,
  "@modelfetch/bun": packageJson.version,
  "@types/bun": "1.2.20",
  "@modelfetch/deno": packageJson.version,
  "@modelfetch/aws-lambda": packageJson.version,
  "@types/aws-lambda": "8.10.152",
  "aws-cdk-lib": "2.210.0",
  "aws-cdk": "2.1024.0",
  esbuild: "0.25.8",
  "@modelfetch/vercel": packageJson.version,
  next: "15.4.6",
  react: "19.1.1",
  "@types/react": "19.1.10",
  "react-dom": "19.1.1",
  "@types/react-dom": "19.1.7",
  "@modelfetch/cloudflare": packageJson.version,
  wrangler: "4.28.1",
  "@modelfetch/netlify": packageJson.version,
  "@modelfetch/fastly": packageJson.version,
  "@fastly/js-compute": "3.34.0",
  "@modelfetch/gcore": packageJson.version,
  "@gcoredev/fastedge-sdk-js": "1.2.2",
  "@modelfetch/azure-functions": packageJson.version,
  "@azure/functions": "4.7.2-preview",
  "@modelfetch/supabase": packageJson.version,
};

// Cloudflare compatibility date
const cloudflareCompatibilityDate = "2025-06-17";

type Runtime =
  | "node"
  | "next"
  | "bun"
  | "deno"
  | "vercel"
  | "cloudflare"
  | "netlify"
  | "fastly"
  | "supabase"
  | "gcore"
  | "aws-lambda"
  | "azure-functions";
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

function detectRuntime(): Runtime {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.includes("bun")) return "bun";
    if (userAgent.includes("deno")) return "deno";
  }

  return "node";
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

function getProjectTitle(projectName: string): string {
  return capitalCase(projectName).replaceAll("Mcp", "MCP");
}

function getStartCommand(
  runtime: Runtime,
  packageManager: PackageManager,
): string {
  switch (runtime) {
    case "deno": {
      return "deno task start";
    }
    case "aws-lambda":
    case "gcore": {
      return `${packageManager} run deploy`;
    }
    case "next":
    case "vercel":
    case "cloudflare": {
      return `${packageManager} run dev`;
    }
    case "netlify": {
      return "deno task dev";
    }
    case "supabase": {
      return "supabase start";
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
    awsCdkStack: pascalCase(options.name) + "Stack",
    runtime: options.runtime,
    language: options.language,
    packageManager: options.packageManager,
    versions: packageVersions,
    cloudflareCompatibilityDate,
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
  // Detect package manager running the CLI
  const detectedPM = detectPackageManager();

  // Wait for yarn to finish outputting if detected
  if (detectedPM === "yarn")
    await new Promise((resolve) => setTimeout(resolve, 500));

  // Display ASCII art logo
  console.log(pc.greenBright(asciiLogo));

  // Display hero title
  console.log();
  console.log(
    pc.gray("A delightful TypeScript/JavaScript SDK for MCP servers"),
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
  const defaultTitle = getProjectTitle(finalProjectName);

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

  const detectedRuntime = detectRuntime();
  const runtime = (await p.select({
    message: "Which runtime would you like to use?",
    options: [
      { value: "node", label: "Node.js" },
      { value: "next", label: "Next.js" },
      { value: "bun", label: "Bun" },
      { value: "deno", label: "Deno" },
      { value: "vercel", label: "Vercel" },
      { value: "cloudflare", label: "Cloudflare" },
      { value: "netlify", label: "Netlify" },
      { value: "fastly", label: "Fastly" },
      { value: "supabase", label: "Supabase" },
      { value: "gcore", label: "Gcore" },
      { value: "aws-lambda", label: "AWS Lambda" },
      { value: "azure-functions", label: "Azure Functions" },
    ],
    initialValue: detectedRuntime,
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

  let packageManager: PackageManager;
  let installDeps: boolean | undefined;

  // Handle package manager selection based on runtime
  switch (runtime) {
    case "bun": {
      packageManager = "bun";
      break;
    }
    case "deno":
    case "netlify":
    case "supabase": {
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
    console.log(pc.gray("  Navigate to the project directory:"));
    console.log(`  ${pc.cyan(`cd ${finalProjectName}`)}`);
    console.log();
    console.log(pc.gray("  Start the MCP server:"));
    console.log(`  ${pc.cyan(getStartCommand(runtime, packageManager))}`);
    console.log();
    console.log(pc.gray("  Test with the MCP Inspector:"));
    console.log(
      `  ${pc.cyan("npx -y @modelcontextprotocol/inspector@latest")}`,
    );
    console.log();
    console.log(pc.gray("  Read the documentation:"));
    console.log(`  ${pc.cyan("https://www.modelfetch.com/docs")}`);
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
