import createESLintConfig from "create-eslint-config";
import importPaths from "eslint-config-import-paths";
import react from "eslint-config-react";
import { flatConfig } from "@next/eslint-plugin-next";

const eslintConfig = createESLintConfig(
  importPaths,
  react,
  flatConfig.coreWebVitals,
  {
    rules: {
      "no-restricted-globals": "off",
    },
  },
);

export default eslintConfig;
