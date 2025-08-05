import type { Tree } from "@nx/devkit";
import type { SyncGeneratorResult } from "nx/src/utils/sync-generators";

import { formatFiles } from "@nx/devkit";

function getAllTemplateFiles(tree: Tree, path = "."): string[] {
  const templateFiles: string[] = [];
  for (const child of tree.children(path)) {
    const childPath = path === "." ? child : `${path}/${child}`;
    if (tree.isFile(childPath) && childPath.endsWith(".template"))
      templateFiles.push(childPath);
    else if (!tree.isFile(childPath))
      templateFiles.push(...getAllTemplateFiles(tree, childPath));
  }
  return templateFiles;
}

export default async function updateTemplateFiles(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const templateFiles = getAllTemplateFiles(tree);
  for (const filePath of templateFiles) {
    const content = tree.read(filePath, "utf8") ?? "";
    tree.write(filePath, content.replace(/\n*$/, "\n"));
  }
  await formatFiles(tree);
  return { outOfSyncMessage: "Some *.template files are out of sync." };
}
