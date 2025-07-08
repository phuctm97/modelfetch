import type { ExecutorContext } from "@nx/devkit";
import type { PackageJson } from "type-fest";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export default async function prepareReleasePublish(
  options: object,
  context: ExecutorContext,
): Promise<{ success: boolean }> {
  if (!context.projectName) return { success: false };
  const project = context.projectsConfigurations.projects[context.projectName];
  const packageJson = JSON.parse(
    await readFile(
      path.join(context.root, project.root, "package.json"),
      "utf8",
    ),
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
  await writeFile(
    path.join(context.root, project.root, "package.json"),
    JSON.stringify(packageJson),
  );
  return { success: true };
}
