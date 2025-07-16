import createESLintConfig from "create-eslint-config";
import importPaths from "eslint-config-import-paths";
import react from "eslint-config-react";
import pkg from "@next/eslint-plugin-next";
const { flatConfig } = pkg;

const eslintConfig = createESLintConfig(
  importPaths,
  react,
  flatConfig.coreWebVitals,
);

export default eslintConfig;
