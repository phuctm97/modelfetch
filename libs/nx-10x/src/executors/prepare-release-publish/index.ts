import type { ExecutorContext } from "@nx/devkit";
import type { PackageJson } from "type-fest";

import { existsSync } from "node:fs";
import { copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const workspaceVersionProtocol = "workspace:";

interface JsrJson
  extends Pick<PackageJson, "name" | "version" | "license" | "exports"> {
  publish?: {
    include?: string[];
    exclude?: string[];
  };
}

function updateJsrJsonFromPackageJson(
  jsrJson: JsrJson,
  packageJson: PackageJson,
): void {
  jsrJson.name = packageJson.name;
  jsrJson.version = packageJson.version;
  jsrJson.license = packageJson.license;
}

interface DenoJson extends JsrJson {
  imports?: Record<string, string>;
}

export default async function prepareReleasePublish(
  options: object,
  context: ExecutorContext,
): Promise<{ success: boolean }> {
  if (!context.projectName) return { success: false };
  const project = context.projectsConfigurations.projects[context.projectName];
  const packageJsonPath = path.join(context.root, project.root, "package.json");
  const packageJson = JSON.parse(
    await readFile(packageJsonPath, "utf8"),
  ) as PackageJson;
  if (packageJson.private) return { success: false };
  for (const key of [
    "scripts",
    "devDependencies",
    "bundleDependencies",
    "bundledDependencies",
  ])
    if (key in packageJson) delete packageJson[key];
  const denoImports: Record<string, string> = {};
  for (const depType of [
    "dependencies",
    "peerDependencies",
    "optionalDependencies",
  ] as const) {
    const deps = packageJson[depType];
    if (deps) {
      for (const [depName, depVersion] of Object.entries(deps)) {
        if (
          depName in context.projectsConfigurations.projects &&
          depVersion?.startsWith(workspaceVersionProtocol)
        ) {
          const depProject = context.projectsConfigurations.projects[depName];
          const depPackageJsonPath = path.join(
            context.root,
            depProject.root,
            "package.json",
          );
          if (existsSync(depPackageJsonPath)) {
            const depPackageJson = JSON.parse(
              await readFile(depPackageJsonPath, "utf8"),
            ) as PackageJson;
            if (depPackageJson.version) {
              const workspaceVersionRange = depVersion.slice(
                workspaceVersionProtocol.length,
              );
              switch (workspaceVersionRange) {
                case "*": {
                  // workspace:* -> exact version
                  deps[depName] = depPackageJson.version;
                  break;
                }
                case "~": {
                  // workspace:~ -> ~version
                  deps[depName] = `~${depPackageJson.version}`;
                  break;
                }
                case "^": {
                  // workspace:^ -> ^version
                  deps[depName] = `^${depPackageJson.version}`;
                  break;
                }
                default: {
                  // workspace:^1.5.0 -> use the range as-is
                  deps[depName] = workspaceVersionRange;
                  break;
                }
              }
            }
            if (depProject.tags?.includes("jsr"))
              denoImports[depName] = `jsr:${depName}@${deps[depName]}`;
          }
        }
      }
    }
  }
  const exportEntries = [packageJson.exports];
  while (exportEntries.length > 0) {
    const exportEntry = exportEntries.pop();
    if (exportEntry) {
      if (Array.isArray(exportEntry)) {
        exportEntries.push(...exportEntry);
      } else if (typeof exportEntry === "object") {
        if ("development" in exportEntry) delete exportEntry.development;
        exportEntries.push(...Object.values(exportEntry));
      }
    }
  }
  await writeFile(packageJsonPath, JSON.stringify(packageJson));
  if (project.tags?.includes("jsr")) {
    let isPublishingToJSR = false;
    let hasDenoJson = false;
    for (const name of ["jsr.json", "deno.json", "deno.jsonc"]) {
      const jsrJsonPath = path.join(context.root, project.root, name);
      if (existsSync(jsrJsonPath)) {
        isPublishingToJSR = true;
        if (name === "deno.json" || name === "deno.jsonc") hasDenoJson = true;
        const jsrJson = JSON.parse(
          await readFile(jsrJsonPath, "utf8"),
        ) as JsrJson;
        updateJsrJsonFromPackageJson(jsrJson, packageJson);
        await writeFile(jsrJsonPath, JSON.stringify(jsrJson));
      }
    }
    if (isPublishingToJSR) {
      if (Object.keys(denoImports).length > 0) {
        if (!hasDenoJson) {
          const denoJson: DenoJson = {};
          updateJsrJsonFromPackageJson(denoJson, packageJson);
          await writeFile(
            path.join(context.root, project.root, "deno.json"),
            JSON.stringify(denoJson),
          );
        }
        for (const name of ["deno.json", "deno.jsonc"]) {
          const denoJsonPath = path.join(context.root, project.root, name);
          if (existsSync(denoJsonPath)) {
            const denoJson = JSON.parse(
              await readFile(denoJsonPath, "utf8"),
            ) as DenoJson;
            updateJsrJsonFromPackageJson(denoJson, packageJson);
            denoJson.imports ??= {};
            for (const [depName, depImport] of Object.entries(denoImports))
              denoJson.imports[depName] ??= depImport;
            await writeFile(denoJsonPath, JSON.stringify(denoJson));
          }
        }
      }
      await copyFile(
        path.join(context.root, "LICENSE"),
        path.join(context.root, project.root, "LICENSE"),
      );
    }
  }
  return { success: true };
}
