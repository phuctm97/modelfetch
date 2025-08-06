import path from "node:path";
import ts from "typescript-eslint";
import js from "@eslint/js";
import esm from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-config-prettier";

export default function createESLintConfig(...configs) {
  return ts.config(
    {
      ignores: [
        "**/*.js",
        "**/*.jsx",
        "**/*.[cm]js",
        "**/.nx",
        "**/.conductor",
        "**/dist",
        "**/.source",
        "**/next-env.d.ts",
        "**/.next",
        "**/worker-configuration.d.ts",
        "**/.wrangler",
        "**/cdk.out",
        "**/.netlify",
        "**/.branches",
        "**/.temp",
      ],
    },
    js.configs.recommended,
    {
      rules: {
        "no-restricted-imports": ["error", { patterns: [{ regex: "\\.$" }] }],
        "no-restricted-globals": [
          "error",
          "window",
          "self",
          "global",
          "globalThis",
        ],
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "object-shorthand": "error",
        "arrow-body-style": "error",
      },
    },
    ts.configs.strictTypeChecked,
    ts.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: { projectService: true, tsconfigRootDir: process.cwd() },
      },
      rules: {
        "@typescript-eslint/no-dynamic-delete": "off",
        "@typescript-eslint/no-invalid-void-type": "off",
        "@typescript-eslint/no-unsafe-enum-comparison": "off",
        "@typescript-eslint/only-throw-error": "off",
        "@typescript-eslint/prefer-promise-reject-errors": "off",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-namespace": [
          "error",
          { allowDeclarations: true },
        ],
        "@typescript-eslint/no-empty-object-type": [
          "error",
          { allowObjectTypes: "always" },
        ],
        "@typescript-eslint/no-restricted-types": [
          "error",
          {
            types: {
              Omit: {
                message: "Use `Except` from `type-fest` instead",
                suggest: ["Except"],
              },
            },
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { ignoreRestSiblings: true },
        ],
        "@typescript-eslint/restrict-template-expressions": [
          "error",
          { allowNumber: true, allowBoolean: true },
        ],
        "@typescript-eslint/consistent-type-imports": "error",
      },
    },
    esm.flatConfigs.recommended,
    esm.flatConfigs.typescript,
    {
      languageOptions: { ecmaVersion: 2022 },
      settings: {
        "import/resolver": {
          typescript: {
            project: path.join(process.cwd(), "tsconfig.json"),
            conditionNames: [
              "development",
              "types",
              "import",
              "require",
              "default",
            ],
          },
        },
      },
      rules: {
        "import/no-cycle": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/namespace": ["error", { allowComputed: true }],
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      },
    },
    unicorn.configs.recommended,
    {
      rules: {
        "unicorn/no-null": "off",
        "unicorn/no-nested-ternary": "off",
        "unicorn/no-process-exit": "off",
        "unicorn/prefer-global-this": "off",
        "unicorn/prevent-abbreviations": "off",
      },
    },
    {
      plugins: { "simple-import-sort": simpleImportSort },
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^\\u0000[^\\.]"], // External side-effects
              ["^\\u0000\\$\\/"], // Generated side-effects
              ["^\\u0000~\\/"], // Internal side-effects
              ["^\\u0000\\.\\."], // Parent side-effects
              ["^\\u0000\\.[^\\.]"], // Relative side-effects
              ["\\u0000$"], // External types
              ["^\\$\\/.*\\u0000$"], // Generated types
              ["^~\\/.*\\u0000$"], // Internal types
              ["^\\.\\..*\\u0000$"], // Parent types
              ["^\\.[^\\.].*\\u0000$"], // Relative types
              ["^[^\\.]"], // External modules
              ["^\\$\\/"], // Generated modules
              ["^~\\/"], // Internal modules
              ["^\\.\\."], // Parent modules
              ["^\\.[^\\.]"], // Relative modules
              ["^\\..*\\.module\\.s?css$"], // Relative styles
            ],
          },
        ],
        "simple-import-sort/exports": "error",
      },
    },
    ...configs,
    prettier,
    {
      rules: {
        "lines-around-directive": "error",
        curly: ["error", "multi-or-nest", "consistent"],
        quotes: ["error", "double", { avoidEscape: true }],
      },
    },
  );
}
