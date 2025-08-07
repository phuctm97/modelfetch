import createESLintConfig from "create-eslint-config";

const eslintConfig = createESLintConfig({
  rules: {
    "unicorn/prefer-add-event-listener": [
      "error",
      { excludedPackages: ["@modelcontextprotocol/sdk/server/stdio.js"] },
    ],
  },
});

export default eslintConfig;
