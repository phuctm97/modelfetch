import type { ExecutorContext } from "@nx/devkit";
import type { PackageJson } from "type-fest";

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface JsrJson
  extends Pick<PackageJson, "name" | "version" | "license" | "exports"> {
  publish?: {
    include?: string[];
    exclude?: string[];
  };
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
  for (const key of ["scripts", "devDependencies"])
    if (key in packageJson) delete packageJson[key];
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
  const jsrJsonPath = path.join(context.root, project.root, "jsr.json");
  if (existsSync(jsrJsonPath)) {
    const jsrJson = JSON.parse(await readFile(jsrJsonPath, "utf8")) as JsrJson;
    jsrJson.name = packageJson.name;
    jsrJson.version = packageJson.version;
    jsrJson.license = packageJson.license;
    await writeFile(jsrJsonPath, JSON.stringify(jsrJson));
  }
  return { success: true };
}
