import type { GeneratorCallback, Tree } from "@nx/devkit";

import { formatFiles, generateFiles, getProjects } from "@nx/devkit";

import { addTsConfigReferences } from "../../utils/add-tsconfig-references";
import { getPackagePath } from "../../utils/get-package-path";
import { installTask } from "../../utils/install-task";
import { validateNewProject } from "../../utils/validate-new-project";

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
  addTsConfigReferences(tree, "tsconfig.json", `./${root}`);
  await formatFiles(tree);
  return () => {
    installTask(tree);
  };
}
