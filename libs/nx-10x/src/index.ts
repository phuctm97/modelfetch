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
        if (
          packageJson.main?.endsWith(".js") ||
          packageJson.main?.endsWith(".jsx") ||
          packageJson.main?.endsWith(".cjs") ||
          packageJson.main?.endsWith(".mjs")
        ) {
          targets.start = {
            command: "node .",
            options: { cwd: "{projectRoot}" },
            continuous: true,
            dependsOn: ["^build"],
          };
        }
        if (
          packageJson.main?.endsWith(".ts") ||
          packageJson.main?.endsWith(".tsx") ||
          packageJson.main?.endsWith(".cts") ||
          packageJson.main?.endsWith(".mts")
        ) {
          targets.start = {
            command: "tsx .",
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
