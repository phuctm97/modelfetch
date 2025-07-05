import type { GeneratorCallback, Tree } from "@nx/devkit";
import type { PackageJson } from "type-fest";

import { formatFiles, generateFiles, getProjects, readJson } from "@nx/devkit";

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
  const packageJson = readJson<PackageJson>(tree, "libs/nx-10x/package.json");
  const version = (packageJson.version ?? "") || "0.1.0";
  generateFiles(tree, `${import.meta.dirname}/template`, root, {
    ...options,
    path,
    version,
  });
  addTsConfigReferences(tree, "tsconfig.json", `./${root}`);
  await formatFiles(tree);
  return () => {
    installTask(tree);
  };
}
