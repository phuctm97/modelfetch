import type { ExecutorContext } from "@nx/devkit";
import type { PackageJson } from "type-fest";

import { existsSync } from "node:fs";
import { copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const workspaceVersionProtocol = "workspace:";

interface DenoJson
  extends Pick<PackageJson, "name" | "version" | "license" | "exports"> {
  imports?: Record<string, string>;
  publish?: { include?: string[]; exclude?: string[] };
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
              if (
                !depPackageJson.private &&
                existsSync(
                  path.join(context.root, depProject.root, "deno.json"),
                )
              )
                denoImports[depName] = `jsr:${depName}@${deps[depName]}`;
            }
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
  const denoJsonPath = path.join(context.root, project.root, "deno.json");
  if (existsSync(denoJsonPath)) {
    const denoJson = JSON.parse(
      await readFile(denoJsonPath, "utf8"),
    ) as DenoJson;
    denoJson.imports = denoImports;
    denoJson.name = packageJson.name;
    denoJson.version = packageJson.version;
    denoJson.license = packageJson.license;
    await writeFile(denoJsonPath, JSON.stringify(denoJson));
    await copyFile(
      path.join(context.root, "LICENSE"),
      path.join(context.root, project.root, "LICENSE"),
    );
  }
  return { success: true };
}
