import createESLintConfig from "create-eslint-config";
import importPaths from "eslint-config-import-paths";
import react from "eslint-config-react";
import next from "@next/eslint-plugin-next";

const eslintConfig = createESLintConfig(
  importPaths,
  react,
  next.flatConfig.coreWebVitals,
);

export default eslintConfig;
