import type { ExecutorContext } from "@nx/devkit";
import type { PackageJson } from "type-fest";

import { existsSync } from "node:fs";
import { copyFile, readFile, writeFile } from "node:fs/promises";
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
  if (packageJson.private) return { success: false };
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
  let isPublishingToJSR = false;
  for (const name of ["jsr.json", "deno.json", "deno.jsonc"]) {
    const jsrJsonPath = path.join(context.root, project.root, name);
    if (existsSync(jsrJsonPath)) {
      isPublishingToJSR = true;
      const jsrJson = JSON.parse(
        await readFile(jsrJsonPath, "utf8"),
      ) as JsrJson;
      jsrJson.name = packageJson.name;
      jsrJson.version = packageJson.version;
      jsrJson.license = packageJson.license;
      await writeFile(jsrJsonPath, JSON.stringify(jsrJson));
    }
  }
  if (isPublishingToJSR) {
    await copyFile(
      path.join(context.root, "LICENSE"),
      path.join(context.root, project.root, "LICENSE"),
    );
  }
  return { success: true };
}
