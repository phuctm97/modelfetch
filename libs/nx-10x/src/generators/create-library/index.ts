import type { GeneratorCallback, Tree } from "@nx/devkit";

import { formatFiles, generateFiles, getProjects } from "@nx/devkit";

import { addTsConfigReference } from "../../add-tsconfig-reference";
import { getPackagePath } from "../../get-package-path";
import { installTask } from "../../install-task";
import { validateNewProject } from "../../validate-new-project";

interface Options {
  name: string;
}

export default async function createLibrary(
  tree: Tree,
  options: Options,
): Promise<void | GeneratorCallback> {
  const projects = getProjects(tree);
  const path = getPackagePath(options.name);
  const root = `libs/${path}`;
  validateNewProject(tree, projects, options.name, root);
  generateFiles(tree, `${import.meta.dirname}/template`, root, {
    ...options,
    path,
  });
  addTsConfigReference(tree, "tsconfig.json", `./${root}`);
  await formatFiles(tree);
  return () => {
    installTask(tree);
  };
}
