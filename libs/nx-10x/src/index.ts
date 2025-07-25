import type {
  CreateNodesV2,
  ProjectType,
  TargetConfiguration,
} from "@nx/devkit";
import type { PackageJson } from "type-fest";

import { createNodesFromFiles, readJsonFile } from "@nx/devkit";
import fs from "node:fs";
import path from "node:path";

function getProjectType(projectRoot: string): ProjectType | undefined {
  if (projectRoot.startsWith("apps")) return "application";
  if (projectRoot.startsWith("libs")) return "library";
}

function getUpCommands(
  projectRoot: string,
  packageJson: PackageJson,
): string[] {
  const commands: string[] = [];
  if (
    packageJson.dependencies?.["fumadocs-mdx"] ||
    packageJson.devDependencies?.["fumadocs-mdx"]
  )
    commands.push("fumadocs-mdx");
  if (
    (packageJson.dependencies?.wrangler ||
      packageJson.devDependencies?.wrangler) &&
    fs.existsSync(path.join(projectRoot, "tsconfig.json"))
  )
    commands.push("wrangler types");
  return commands;
}

function getDefaultStartCommand(
  projectRoot: string,
  packageJson: PackageJson,
): string | undefined {
  const entryPoint = packageJson.main;
  if (!entryPoint) return;
  const isTypeScript =
    entryPoint.endsWith(".ts") ||
    entryPoint.endsWith(".tsx") ||
    entryPoint.endsWith(".cts") ||
    entryPoint.endsWith(".mts");
  const isJavaScript =
    entryPoint.endsWith(".js") ||
    entryPoint.endsWith(".jsx") ||
    entryPoint.endsWith(".cjs") ||
    entryPoint.endsWith(".mjs");
  if (!isTypeScript && !isJavaScript) return;
  if (fs.existsSync(path.join(projectRoot, "deno.json")))
    return `deno run -A ${entryPoint}`;
  if (fs.existsSync(path.join(projectRoot, "bunfig.toml"))) return "bun .";
  if (packageJson.dependencies?.tsx || packageJson.devDependencies?.tsx)
    return "tsx .";
  if (isTypeScript) return "node --import=@swc-node/register/esm-register .";
  if (isJavaScript) return "node .";
}

export const createNodesV2: CreateNodesV2 = [
  "**/package.json",
  (packageJsonFilePaths, options, context) =>
    createNodesFromFiles(
      (packageJsonFilePath) => {
        const packageJson = readJsonFile<PackageJson>(packageJsonFilePath);
        if (!packageJson.name) return {};
        const projectRoot = path.dirname(packageJsonFilePath);
        const projectType = getProjectType(projectRoot);
        const targets: Record<string, TargetConfiguration> = {};
        const tags: string[] = [];
        if (fs.existsSync(path.join(projectRoot, "eslint.config.js"))) {
          targets.lint = {
            cache: true,
            command: "eslint --no-error-on-unmatched-pattern",
            options: { cwd: "{projectRoot}" },
            inputs: [
              "default",
              "^default",
              { externalDependencies: ["typescript", "eslint"] },
            ],
            dependsOn: ["build", "^typecheck"],
            syncGenerators: ["@nx/js:typescript-sync"],
          };
        }
        if (projectType === "application") {
          let useDefaultStartCommand = true;
          if (
            packageJson.dependencies?.next ||
            packageJson.devDependencies?.next
          ) {
            useDefaultStartCommand = false;
            if (fs.existsSync(path.join(projectRoot, "tsconfig.json"))) {
              targets.typecheck = {
                cache: true,
                command: "tsc --build",
                options: { cwd: "{projectRoot}" },
                inputs: [
                  "{projectRoot}/package.json",
                  "{workspaceRoot}/tsconfig.next.json",
                  "{workspaceRoot}/tsconfig.base.json",
                  "{projectRoot}/tsconfig.json",
                  ...[
                    "ts",
                    "tsx",
                    "d.ts",
                    "cts",
                    "d.cts",
                    "mts",
                    "d.mts",
                    "json",
                  ].map((ext) => `{projectRoot}/**/*.${ext}`),
                  { dependentTasksOutputFiles: "**/*.d.ts" },
                  { externalDependencies: ["typescript", "tslib"] },
                ],
                outputs: ["{projectRoot}/*.tsbuildinfo"],
                dependsOn: ["build", "^typecheck"],
                syncGenerators: ["@nx/js:typescript-sync"],
              };
            }
            targets.build = {
              cache: true,
              command: "next build",
              options: {
                cwd: "{projectRoot}",
                env: { NEXT_TELEMETRY_DISABLED: "1" },
              },
              inputs: [
                "production",
                "^production",
                { externalDependencies: ["typescript", "tslib"] },
              ],
              outputs: ["{projectRoot}/.next", "!{projectRoot}/.next/cache"],
              dependsOn: ["^build"],
              syncGenerators: ["@nx/js:typescript-sync"],
            };
            targets.dev = {
              command: "next dev",
              options: { cwd: "{projectRoot}" },
              continuous: true,
            };
            targets.start = {
              command: "next start",
              options: { cwd: "{projectRoot}" },
              continuous: true,
              dependsOn: ["build"],
            };
          }
          if (
            packageJson.dependencies?.wrangler ||
            packageJson.devDependencies?.wrangler
          ) {
            useDefaultStartCommand = false;
            targets.dev = {
              command: "wrangler dev",
              options: { cwd: "{projectRoot}" },
              continuous: true,
            };
            targets.deploy = {
              command: "wrangler deploy",
              options: { cwd: "{projectRoot}" },
              dependsOn: ["build", "^build"],
            };
            targets.delete = {
              command: "wrangler delete",
              options: { cwd: "{projectRoot}" },
            };
          }
          if (fs.existsSync(path.join(projectRoot, "netlify.toml"))) {
            useDefaultStartCommand = false;
            targets.dev = {
              command: "netlify dev",
              options: { cwd: "{projectRoot}" },
              continuous: true,
            };
          }
          if (fs.existsSync(path.join(projectRoot, "fastly.toml"))) {
            useDefaultStartCommand = false;
            targets.start = {
              command: "fastly compute serve",
              options: { cwd: "{projectRoot}" },
              continuous: true,
              dependsOn: ["build", "^build"],
            };
            targets.deploy = {
              command: "fastly compute publish",
              options: { cwd: "{projectRoot}" },
              dependsOn: ["build", "^build"],
            };
          }
          if (
            Boolean(
              (packageJson.dependencies?.["aws-cdk"] ?? "") ||
                (packageJson.devDependencies?.["aws-cdk"] ?? ""),
            ) &&
            Boolean(
              (packageJson.dependencies?.["aws-cdk-lib"] ?? "") ||
                (packageJson.devDependencies?.["aws-cdk-lib"] ?? ""),
            ) &&
            fs.existsSync(path.join(projectRoot, "cdk.json"))
          ) {
            useDefaultStartCommand = false;
            targets.deploy = {
              command: "cdk deploy",
              options: { cwd: "{projectRoot}" },
              dependsOn: ["build", "^build"],
            };
            targets.destroy = {
              command: "cdk destroy",
              options: { cwd: "{projectRoot}" },
            };
          }
          if (useDefaultStartCommand) {
            const defaultStartCommand = getDefaultStartCommand(
              projectRoot,
              packageJson,
            );
            if (defaultStartCommand) {
              targets.start = {
                command: defaultStartCommand,
                options: { cwd: "{projectRoot}" },
                continuous: true,
                dependsOn: ["build", "^build"],
              };
            }
          }
          const upCommands = getUpCommands(projectRoot, packageJson);
          if (upCommands.length > 0) {
            targets.up = {
              executor: "nx:run-commands",
              options: {
                cwd: "{projectRoot}",
                commands: upCommands,
                parallel: false,
              },
            };
          }
        }
        if (packageJson.bin) {
          const binEntries =
            typeof packageJson.bin === "string"
              ? { [packageJson.name]: packageJson.bin }
              : packageJson.bin;
          for (const [binName, binPath] of Object.entries(binEntries)) {
            targets[binName] = {
              command: `node ${binPath}`,
              options: { cwd: "{projectRoot}" },
              dependsOn: ["build", "^build"],
            };
          }
        }
        if (!packageJson.private) {
          targets["prepare-release-publish"] = {
            executor: "nx-10x:prepare-release-publish",
          };
          if (fs.existsSync(path.join(projectRoot, "deno.json"))) {
            targets["jsr-release-publish"] = {
              command:
                "deno publish --no-check --allow-dirty --allow-slow-types",
              options: { cwd: "{projectRoot}" },
              dependsOn: ["^jsr-release-publish"],
            };
          }
        }
        return { projects: { [projectRoot]: { projectType, targets, tags } } };
      },
      packageJsonFilePaths,
      options,
      context,
    ),
];
