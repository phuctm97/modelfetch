import type { Tree } from "@nx/devkit";
import type { SyncGeneratorResult } from "nx/src/utils/sync-generators";
import type { TsConfigJson } from "type-fest";

import {
  createProjectGraphAsync,
  formatFiles,
  readProjectsConfigurationFromProjectGraph,
  updateJson,
} from "@nx/devkit";

import { compareTsConfigReferences } from "../../compare-tsconfig-references";

function formatConfigs(tree: Tree, root?: string) {
  for (const ext of ["json", "lib.json", "app.json", "build.json"]) {
    const tsConfigPath = root ? `${root}/tsconfig.${ext}` : `tsconfig.${ext}`;
    if (!tree.exists(tsConfigPath)) continue;
    updateJson<TsConfigJson, TsConfigJson>(tree, tsConfigPath, (json) => {
      json.references?.sort(compareTsConfigReferences);
      if (
        (json.include && json.include.length > 0) ||
        (json.files && json.files.length > 0)
      ) {
        json.compilerOptions ??= {};
        json.compilerOptions.sourceRoot = `/${root ?? ""}`;
        if (json.compilerOptions.rootDir)
          json.compilerOptions.sourceRoot += `/${json.compilerOptions.rootDir}`;
      }
      return json;
    });
  }
}

export default async function formatTsConfigs(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const { projects } = readProjectsConfigurationFromProjectGraph(
    await createProjectGraphAsync(),
  );
  for (const project of Object.values(projects))
    formatConfigs(tree, project.root);
  formatConfigs(tree);
  await formatFiles(tree);
  return { outOfSyncMessage: "Some tsconfig.json files are unformatted." };
}
