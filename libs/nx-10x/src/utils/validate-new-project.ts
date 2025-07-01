import type { ProjectConfiguration, Tree } from "@nx/devkit";

import { validateName } from "./validate-name";

export function validateNewProject(
  tree: Tree,
  projects: Map<string, ProjectConfiguration>,
  name: string,
  root: string,
) {
  validateName(name);
  if (projects.has(name)) throw new Error(`Project '${name}' already exists`);
  if (tree.exists(root)) throw new Error(`Path '${root}' already exists`);
}
