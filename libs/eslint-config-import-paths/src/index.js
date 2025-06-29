import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

export default [
  {
    plugins: { "no-relative-import-paths": noRelativeImportPaths },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { prefix: "~", allowSameFolder: true },
      ],
    },
  },
  {
    files: ["", "lib/", "lib/.client/", "lib/.server/"].map(
      (prefix) => `${prefix}*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}`,
    ),
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { prefix: "~", allowSameFolder: false },
      ],
    },
  },
];
