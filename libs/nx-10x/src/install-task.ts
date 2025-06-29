import type { Tree } from "@nx/devkit";

import { installPackagesTask } from "@nx/devkit";

export function installTask(tree: Tree) {
  installPackagesTask(tree, true);
}
