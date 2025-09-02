import type { Tree } from "@nx/devkit";
import type { SyncGeneratorResult } from "nx/src/utils/sync-generators";

import { formatFiles, visitNotIgnoredFiles } from "@nx/devkit";

export default async function updateTemplateFiles(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const filePaths = new Set<string>();
  visitNotIgnoredFiles(tree, ".", (filePath) => {
    if (filePath.endsWith(".template")) filePaths.add(filePath);
  });
  for (const filePath of filePaths) {
    const content = tree.read(filePath, "utf8") ?? "";
    tree.write(filePath, content.replace(/\n*$/, "\n"));
  }
  await formatFiles(tree);
  return { outOfSyncMessage: "Some *.template files are out of sync." };
}
