import type { Tree } from "@nx/devkit";
import type { TsConfigJson } from "type-fest";

import { updateJson } from "@nx/devkit";

import { compareTsConfigReferences } from "./compare-tsconfig-references";

export function addTsConfigReferences(
  tree: Tree,
  tsConfigPath: string,
  projectPath: string,
) {
  updateJson<TsConfigJson, TsConfigJson>(tree, tsConfigPath, (json) => {
    if (!json.references?.some((ref) => ref.path === projectPath)) {
      json.references ??= [];
      json.references.push({ path: projectPath });
      json.references.sort(compareTsConfigReferences);
    }
    return json;
  });
}
