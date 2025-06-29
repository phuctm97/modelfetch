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

function getStartCommand(
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
  if (fs.existsSync(path.join(projectRoot, "bunfig.toml")))
    return `bun run ${entryPoint}`;
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
            syncGenerators: ["@nx/js:typescript-sync"],
          };
        }
        const startCommand = getStartCommand(projectRoot, packageJson);
        if (startCommand) {
          targets.start = {
            command: startCommand,
            options: { cwd: "{projectRoot}" },
            continuous: true,
            dependsOn: ["^build"],
          };
        }
        return { projects: { [projectRoot]: { projectType, targets } } };
      },
      packageJsonFilePaths,
      options,
      context,
    ),
];
