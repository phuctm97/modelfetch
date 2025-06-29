import type { Tree } from "@nx/devkit";
import type { TsConfigJson } from "type-fest";

import { updateJson } from "@nx/devkit";

export function addTsConfigReference(
  tree: Tree,
  tsConfigPath: string,
  projectPath: string,
) {
  updateJson<TsConfigJson, TsConfigJson>(tree, tsConfigPath, (json) => {
    if (!json.references?.some((ref) => ref.path === projectPath)) {
      json.references ??= [];
      json.references.push({ path: projectPath });
      json.references.sort((a, b) => a.path.localeCompare(b.path, "en"));
    }
    return json;
  });
}
