import type { ProjectConfiguration, Tree } from "@nx/devkit";
import type { SyncGeneratorResult } from "nx/src/utils/sync-generators";
import type { PackageJson } from "type-fest";

import {
  createProjectGraphAsync,
  formatFiles,
  readJson,
  readProjectsConfigurationFromProjectGraph,
  writeJson,
} from "@nx/devkit";

interface DenoJson {
  imports?: Record<string, string>;
}

function update(
  tree: Tree,
  packageJson: PackageJson,
  projectConfigration: ProjectConfiguration,
) {
  const projectPackageJson = readJson<PackageJson>(
    tree,
    `${projectConfigration.root}/package.json`,
  );
  const functionsPath = `${projectConfigration.root}/supabase/functions`;
  if (!tree.exists(functionsPath)) return;
  for (const functionName of tree.children(functionsPath)) {
    const denoJsonPath = `${functionsPath}/${functionName}/deno.json`;
    if (!tree.exists(denoJsonPath)) continue;
    const denoJson = readJson<DenoJson>(tree, denoJsonPath);
    if (!denoJson.imports) continue;
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...projectPackageJson.dependencies,
      ...projectPackageJson.devDependencies,
    };
    const imports: Record<string, string> = { ...denoJson.imports };
    for (const [depName, depImport] of Object.entries(denoJson.imports)) {
      if (!depImport.startsWith("npm:")) continue;
      const packageName = depName.endsWith("/")
        ? depName.slice(0, -1)
        : depName;
      const packageVersion = deps[packageName];
      if (!packageVersion || packageVersion.startsWith("workspace:")) continue;
      imports[depName] = depName.endsWith("/")
        ? `npm:/${packageName}@${packageVersion}/`
        : `npm:${packageName}@${packageVersion}`;
    }
    denoJson.imports = imports;
    writeJson(tree, denoJsonPath, denoJson);
  }
}

export default async function updateSupabaseImports(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const { projects } = readProjectsConfigurationFromProjectGraph(
    await createProjectGraphAsync(),
  );
  const packageJson = readJson<PackageJson>(tree, "package.json");
  for (const [projectName, projectConfiguration] of Object.entries(projects)) {
    if (!projectName.startsWith("example-supabase-")) continue;
    update(tree, packageJson, projectConfiguration);
  }
  await formatFiles(tree);
  return { outOfSyncMessage: "Some Supabase imports are out of sync." };
}
