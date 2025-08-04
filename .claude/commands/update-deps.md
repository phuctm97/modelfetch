---
description: Update all dependencies in the workspace following configured version ranges
allowed-tools: Bash(pnpm -r up:*), Bash(pnpm -r outdated:*), Bash(pnpm list:*), Bash(pnpm view:*), MultiEdit(**/package.json), Edit(**/package.json), Edit(libs/create-modelfetch/src/index.ts)
---

Update all dependencies in the workspace following configured version ranges and exact versions where needed.

Execute the following steps in order:

1. **Update dependencies following version ranges**: Run `pnpm -r up` to update all dependencies in all projects that follow configured version ranges (e.g., ^, ~, >=, etc.)

2. **Check for outdated dependencies**: Run `pnpm -r outdated` to identify any dependencies that are still outdated because they use exact version ranges

3. **Manually update exact versions**: For any dependencies using exact versions that are outdated:
   - Read the relevant package.json files
   - Update the exact versions to the latest available versions
   - Apply the following exceptions:
     - `zod`: Keep at latest version 3.x.x (do not upgrade to version 4 or higher)
     - `typescript`: Keep at latest version 5.8.x (do not upgrade to 5.9 or higher)
     - `@types/node`: Keep at latest version 22.x.x (do not upgrade to 23 or higher)

4. **Update packageVersions in create-modelfetch**:
   - Read `libs/create-modelfetch/src/index.ts`
   - Check the current versions of all packages in the workspace by running `pnpm list --depth=0` in relevant project directories
   - Update the `packageVersions` object (lines 24-57) with the new exact versions that are installed
   - Make sure to respect the same exceptions (zod v3, typescript v5.8, @types/node v22)

5. **Install updated dependencies**: After manually updating any exact versions, run `pnpm install` to install the updated dependencies

6. **Verify updates**: Run `pnpm -r outdated` again to confirm all dependencies are up to date (except for the specified exceptions)

Important notes:
- Respect the version range patterns already in use (don't change ^ to ~ or vice versa)
- For exact versions, update to the latest available version unless it conflicts with the exceptions
- The exceptions should use the latest patch/minor version within their specified major/minor constraints
- The packageVersions object in create-modelfetch should reflect the actual versions installed in the workspace
- If any dependency update causes conflicts, report them to the user for resolution
