import type { Tree } from "@nx/devkit";
import type { SyncGeneratorResult } from "nx/src/utils/sync-generators";
import type { PackageJson } from "type-fest";

import {
  createProjectGraphAsync,
  formatFiles,
  readProjectsConfigurationFromProjectGraph,
  updateJson,
} from "@nx/devkit";

function updatePackageManifest(tree: Tree, projectRoot: string) {
  const packageJsonPath = `${projectRoot}/package.json`;
  if (!tree.exists(packageJsonPath)) return;
  updateJson<PackageJson, PackageJson>(tree, packageJsonPath, (json) => {
    if (!json.private) {
      json.repository = {
        type: "git",
        url: "git+https://github.com/phuctm97/modelfetch.git",
        directory: projectRoot,
      };
    }
    return json;
  });
}

export default async function updatePackageManifests(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const { projects } = readProjectsConfigurationFromProjectGraph(
    await createProjectGraphAsync(),
  );
  for (const project of Object.values(projects))
    updatePackageManifest(tree, project.root);
  await formatFiles(tree);
  return {
    outOfSyncMessage: "Some package.json files are out of sync.",
  };
}
