---
description: Update all dependencies in the workspace
allowed-tools: Bash(pnpm -r up:*), Bash(pnpm -r outdated:*), Bash(pnpm list:*), Bash(pnpm view:*), Bash(pnpm exec nx migrate:*), MultiEdit(**/package.json), Edit(**/package.json), Edit(libs/create-modelfetch/src/index.ts)
---

Update all dependencies in the workspace.

Execute the following steps in order:

1. **Update all dependencies**: Run `pnpm -r up` to update all dependencies in all projects to their latest versions

2. **Check for outdated dependencies**: Run `pnpm -r outdated` to identify any dependencies that are still outdated

3. **Update Nx packages**: If any Nx packages (`nx` or `@nx/*`) are outdated:
   - Run `pnpm exec nx migrate latest` to update Nx and its plugins
   - Follow any migration instructions provided by the command

4. **Manually update exact versions**: For any remaining dependencies using exact versions that are outdated:
   - Read the relevant package.json files
   - Update the exact versions to the latest available versions
   - Apply the following exceptions:
     - `zod`: Keep at latest version 3.x.x (do not upgrade to version 4 or higher)
     - `typescript`: Keep at latest version 5.8.x (do not upgrade to 5.9 or higher)
     - `@types/node`: Keep at latest version 22.x.x (do not upgrade to 23 or higher)

5. **Update packageVersions in create-modelfetch**:
   - Read `libs/create-modelfetch/src/index.ts`
   - Check the current versions of all packages in the workspace by running `pnpm list --depth=0` in relevant project directories
   - Update the `packageVersions` object with the new exact versions that are installed
   - Make sure to respect the same exceptions (zod v3, typescript v5.8, @types/node v22)

6. **Install updated dependencies**: After manually updating any exact versions, run `pnpm install` to install the updated dependencies

7. **Verify updates**: Run `pnpm -r outdated` again to confirm all dependencies are up to date (except for the specified exceptions)

Important notes:
- For exact versions, update to the latest available version unless it conflicts with the exceptions
- The exceptions should use the latest patch/minor version within their specified major/minor constraints
- The packageVersions object in create-modelfetch should reflect the actual versions installed in the workspace
- If any dependency update causes conflicts, report them to the user for resolution
