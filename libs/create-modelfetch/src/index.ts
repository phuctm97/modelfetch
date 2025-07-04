import * as p from "@clack/prompts";
import ejs from "ejs";
import { exec } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import pc from "picocolors";

const execAsync = promisify(exec);

// Package versions
const packageVersions = {
  "@modelcontextprotocol/sdk": "^1.13.3",
  "@modelfetch/node": "^0.0.1",
  tslib: "^2.8.1",
  zod: "^3.25.67",
  tsx: "^4.20.3",
};

type Runtime = "node" | "bun" | "deno";
type Language = "javascript" | "typescript";
type ServerType = "tools" | "resources" | "prompts" | "hybrid";
type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

interface ProjectOptions {
  name: string;
  title: string;
  runtime: Runtime;
  language: Language;
  serverType: ServerType;
  packageManager: PackageManager;
  installDeps: boolean;
}

async function detectPackageManager(): Promise<PackageManager> {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.includes("pnpm")) return "pnpm";
    if (userAgent.includes("yarn")) return "yarn";
    if (userAgent.includes("bun")) return "bun";
  }

  // Check for lock files
  try {
    await fs.access("pnpm-lock.yaml");
    return "pnpm";
  } catch {
    // Ignore error
  }

  try {
    await fs.access("yarn.lock");
    return "yarn";
  } catch {
    // Ignore error
  }

  try {
    await fs.access("bun.lockb");
    return "bun";
  } catch {
    // Ignore error
  }

  return "npm";
}

function validateProjectName(name: string): string | undefined {
  if (!name) return "Project name is required";
  if (!/^[a-z0-9-_.]+$/.test(name))
    return "Project name can only contain lowercase letters, numbers, hyphens, underscores, and dots";

  if (/^[._]/.test(name))
    return "Project name cannot start with a dot or underscore";

  return undefined;
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
    serverType: options.serverType,
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

  p.intro(pc.bgCyan(pc.black(" create-modelfetch ")));

  const projectName = await p.text({
    message: "What is your project named?",
    placeholder: "my-mcp-server",
    defaultValue: "my-mcp-server",
    validate: validateProjectName,
  });

  if (p.isCancel(projectName)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // Generate default title from project name
  const defaultTitle = projectName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const projectTitle = await p.text({
    message: "What is your project title?",
    placeholder: defaultTitle,
    defaultValue: defaultTitle,
  });

  if (p.isCancel(projectTitle)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const runtime = (await p.select({
    message: "Which runtime would you like to use?",
    options: [
      { value: "node", label: "Node.js", hint: "Universal JavaScript runtime" },
      {
        value: "bun",
        label: "Bun",
        hint: "Fast all-in-one JavaScript runtime",
      },
      {
        value: "deno",
        label: "Deno",
        hint: "Secure runtime for JavaScript and TypeScript",
      },
    ],
  })) as Runtime;

  if (p.isCancel(runtime)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const language = (await p.select({
    message: "Which language would you like to use?",
    options: [
      {
        value: "typescript",
        label: "TypeScript",
        hint: "Recommended for better type safety",
      },
      { value: "javascript", label: "JavaScript" },
    ],
  })) as Language;

  if (p.isCancel(language)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const serverType = (await p.select({
    message: "What type of MCP server would you like to create?",
    options: [
      {
        value: "tools",
        label: "Tools",
        hint: "Provide tools/functions to LLMs",
      },
      {
        value: "resources",
        label: "Resources",
        hint: "Expose data and content to LLMs",
      },
      {
        value: "prompts",
        label: "Prompts",
        hint: "Provide reusable prompts to LLMs",
      },
      {
        value: "hybrid",
        label: "Hybrid",
        hint: "Combine tools, resources, and prompts",
      },
    ],
  })) as ServerType;

  if (p.isCancel(serverType)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const detectedPM = await detectPackageManager();
  const packageManager = (await p.select({
    message: "Which package manager would you like to use?",
    options: [
      { value: "npm", label: "npm" },
      { value: "pnpm", label: "pnpm" },
      { value: "yarn", label: "yarn" },
      { value: "bun", label: "bun" },
    ],
    initialValue: detectedPM,
  })) as PackageManager;

  if (p.isCancel(packageManager)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const installDeps = await p.confirm({
    message: "Would you like to install dependencies?",
    initialValue: true,
  });

  if (p.isCancel(installDeps)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const options: ProjectOptions = {
    name: projectName,
    title: projectTitle,
    runtime,
    language,
    serverType,
    packageManager,
    installDeps,
  };

  const s = p.spinner();

  s.start("Creating your MCP server");

  const targetDir = path.resolve(projectName);
  const templateName = `${runtime}-${language === "javascript" ? "js" : "ts"}`;
  const templateDir = new URL(`../templates/${templateName}`, import.meta.url)
    .pathname;

  try {
    // Check if directory exists
    try {
      await fs.access(targetDir);
      const overwrite = await p.confirm({
        message: `Directory ${projectName} already exists. Overwrite?`,
        initialValue: false,
      });

      if (!overwrite || p.isCancel(overwrite)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }

      await fs.rm(targetDir, { recursive: true });
    } catch {
      // Directory doesn't exist, proceed with creation
    }

    // Copy template
    await copyTemplate(templateDir, targetDir, options);

    s.stop("Project created!");

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
    console.log(`  ${pc.cyan(`cd ${projectName}`)}`);
    console.log();
    console.log(pc.gray("  Start the MCP server:"));
    console.log(`  ${pc.cyan(`${packageManager} start`)}`);
    console.log();
    console.log(pc.gray("  Test with MCP Inspector:"));
    console.log(`  ${pc.cyan("npx @modelcontextprotocol/inspector")}`);
    console.log();
    console.log(pc.gray("  Read the documentation:"));
    console.log(`  ${pc.cyan("https://www.modelfetch.com/docs")}`);
    console.log();
  } catch (error) {
    s.stop("Failed to create project");
    console.error(pc.red("Error:"), error);
    process.exit(1);
  }
}

try {
  await main();
} catch (error: unknown) {
  console.error(pc.red("Unexpected error:"), error);
  process.exit(1);
}
