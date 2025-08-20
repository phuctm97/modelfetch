## 1.0.12 (2025-08-20)

### 🩹 Fixes

- Update Nx to 21.4.0 and various dependencies including @modelcontextprotocol/sdk, aws-cdk, and @types/node ([#106](https://github.com/phuctm97/modelfetch/pull/106))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.11 (2025-08-14)

### 🩹 Fixes

- Standardize MCP server script naming to use mcp-server across all create-modelfetch templates ([#105](https://github.com/phuctm97/modelfetch/pull/105))
- Refactor modelfetch CLI to use HTTP server with hot reload support instead of stdio transport ([#105](https://github.com/phuctm97/modelfetch/pull/105))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.10 (2025-08-13)

### 🩹 Fixes

- Add missing modelfetch package version to create-modelfetch CLI templates ([#103](https://github.com/phuctm97/modelfetch/pull/103))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.9 (2025-08-13)

### 🩹 Fixes

- Add modelfetch dev script to create-modelfetch templates that need local MCP development ([#102](https://github.com/phuctm97/modelfetch/pull/102))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.8 (2025-08-12)

### 🩹 Fixes

- Update Nx target naming conventions for improved clarity and organization ([362710e](https://github.com/phuctm97/modelfetch/commit/362710e))
- Add .modelfetch directory to gitignore patterns across the workspace ([362710e](https://github.com/phuctm97/modelfetch/commit/362710e))

### ❤️ Thank You

- phuctm97

## 1.0.7 (2025-08-11)

### 🩹 Fixes

- Remove CLI logs, use native hot reload support for Bun runtime, and surpress buggy stdio messages ([#99](https://github.com/phuctm97/modelfetch/pull/99))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.6 (2025-08-11)

### 🩹 Fixes

- Improve modelfetch CLI logging and Deno support with better runtime info and cleaner entry point ([#98](https://github.com/phuctm97/modelfetch/pull/98))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.5 (2025-08-11)

### 🩹 Fixes

- Add file-based logging to modelfetch CLI for debugging and monitoring sessions ([#97](https://github.com/phuctm97/modelfetch/pull/97))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.4 (2025-08-11)

### 🩹 Fixes

- Fix runtime detection in modelfetch CLI by using js-runtime package for accurate Bun/Deno/Node detection ([#96](https://github.com/phuctm97/modelfetch/pull/96))
- Fix Deno runtime support in modelfetch serve command by using native Deno watch-hmr instead of tsx ([#96](https://github.com/phuctm97/modelfetch/pull/96))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.3 (2025-08-09)

### 🩹 Fixes

- Update Bun documentation to use "fast" instead of "lightning-fast" and replace "live reload" with "hot reload" terminology ([652ce63](https://github.com/phuctm97/modelfetch/commit/652ce63))
- Add automatic runtime detection for Bun and Deno in modelfetch CLI serve command ([652ce63](https://github.com/phuctm97/modelfetch/commit/652ce63))
- Add Response.json() and AbortController polyfills to Gcore runtime for improved API compatibility ([652ce63](https://github.com/phuctm97/modelfetch/commit/652ce63))

### ❤️ Thank You

- phuctm97

## 1.0.2 (2025-08-08)

### 🩹 Fixes

- Add automatic server file detection to modelfetch CLI dev command ([772c172](https://github.com/phuctm97/modelfetch/commit/772c172))
- Add serve command with hot reload and configuration support to modelfetch CLI ([772c172](https://github.com/phuctm97/modelfetch/commit/772c172))

### ❤️ Thank You

- Minh-Phuc Tran

## 1.0.1 (2025-08-07)

### 🩹 Fixes

- Add best practices documentation for using top-level await in async/await patterns ([#87](https://github.com/phuctm97/modelfetch/pull/87))
- Add initial modelfetch CLI with serve and dev commands for running MCP servers ([#87](https://github.com/phuctm97/modelfetch/pull/87))

### ❤️ Thank You

- Minh-Phuc Tran

# 1.0.0 (2025-08-06)

### 🚀 Features

- ⚠️  Rename getEndpoint to getListeningAddress with improved implementation and documentation ([#83](https://github.com/phuctm97/modelfetch/pull/83))

### 🩹 Fixes

- Support dynamic base and MCP paths with improved documentation consistency across all runtime environments ([#83](https://github.com/phuctm97/modelfetch/pull/83))

### ⚠️  Breaking Changes

- ⚠️  Rename getEndpoint to getListeningAddress with improved implementation and documentation ([#83](https://github.com/phuctm97/modelfetch/pull/83))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.19.2 (2025-08-05)

### 🩹 Fixes

- Upgrade TypeScript from 5.8.3 to 5.9.2 ([#81](https://github.com/phuctm97/modelfetch/pull/81))
- Refactor and add Nx generators for TypeScript configs, Cloudflare worker types, and template files ([#81](https://github.com/phuctm97/modelfetch/pull/81))
- Add JSDoc documentation and JSR badges to ModelFetch runtime packages ([#81](https://github.com/phuctm97/modelfetch/pull/81))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.19.1 (2025-08-05)

### 🩹 Fixes

- Add comprehensive JSDoc documentation to @modelfetch/core module and update nx-10x README formatting ([#80](https://github.com/phuctm97/modelfetch/pull/80))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.19.0 (2025-08-05)

### 🚀 Features

- Add configurable path option to modelfetch-core for customizing MCP endpoint paths ([#79](https://github.com/phuctm97/modelfetch/pull/79))

### 🩹 Fixes

- Add Claude Code command to update dependencies ([#79](https://github.com/phuctm97/modelfetch/pull/79))
- Add Nx generator to automatically sync Supabase function imports with package.json versions ([#79](https://github.com/phuctm97/modelfetch/pull/79))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.18.1 (2025-08-04)

### 🩹 Fixes

- Improve opengraph image styling with better visual hierarchy and enhanced terminal aesthetics ([#75](https://github.com/phuctm97/modelfetch/pull/75))
- Update documentation to add supported platforms section and improve installation instructions ([#75](https://github.com/phuctm97/modelfetch/pull/75))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.18.0 (2025-08-03)

### 🚀 Features

- Add Supabase runtime support with @modelfetch/supabase package, example applications, and CLI templates ([#73](https://github.com/phuctm97/modelfetch/pull/73))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.17.0 (2025-08-01)

### 🚀 Features

- Add Gcore runtime support with @modelfetch/gcore package, example applications, and deployment executor ([9b1ac1e](https://github.com/phuctm97/modelfetch/commit/9b1ac1e))

### 🩹 Fixes

- Fix Gcore deployment URL output to include /mcp endpoint and update documentation ([9b1ac1e](https://github.com/phuctm97/modelfetch/commit/9b1ac1e))

### ❤️ Thank You

- phuctm97

## 0.16.1 (2025-07-31)

### 🩹 Fixes

- Update Node.js version to 22.17 and update project dependencies ([#70](https://github.com/phuctm97/modelfetch/pull/70))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.16.0 (2025-07-31)

### 🚀 Features

- Add base configuration option to customize MCP server base path ([#69](https://github.com/phuctm97/modelfetch/pull/69))

### 🩹 Fixes

- Add Node.js engine requirement (>=20.10) to create-modelfetch package ([#69](https://github.com/phuctm97/modelfetch/pull/69))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.15.2 (2025-07-28)

### 🩹 Fixes

- Fix template formatting by adding missing newlines and reorganizing entries ([#66](https://github.com/phuctm97/modelfetch/pull/66))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.15.1 (2025-07-28)

### 🩹 Fixes

- Add VSCode configuration and function ignore files for Azure Functions templates ([#65](https://github.com/phuctm97/modelfetch/pull/65))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.15.0 (2025-07-27)

### 🚀 Features

- Add Azure Functions runtime support with TypeScript and JavaScript examples ([#64](https://github.com/phuctm97/modelfetch/pull/64))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.14.1 (2025-07-25)

### 🩹 Fixes

- Add gitignore templates and fix deploy command for Fastly templates ([#62](https://github.com/phuctm97/modelfetch/pull/62))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.14.0 (2025-07-25)

### 🚀 Features

- Add Fastly runtime support with @modelfetch/fastly package and example applications ([#61](https://github.com/phuctm97/modelfetch/pull/61))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.14 (2025-07-21)

### 🩹 Fixes

- Update Deno package installation commands to use JSR registry instead of npm ([#60](https://github.com/phuctm97/modelfetch/pull/60))
- Migrate from jsr.json to deno.json configuration for better Deno ecosystem compatibility ([#60](https://github.com/phuctm97/modelfetch/pull/60))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.13 (2025-07-21)

### 🩹 Fixes

- Update JSR publishing configuration to use jsr.json instead of deno.json ([#59](https://github.com/phuctm97/modelfetch/pull/59))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.12 (2025-07-21)

### 🩹 Fixes

- Improve JSR publishing by adding nodeModulesDir configuration and proper task dependencies ([#58](https://github.com/phuctm97/modelfetch/pull/58))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.11 (2025-07-21)

### 🩹 Fixes

- Update Deno configuration from jsr.json to deno.json and simplify JSR publishing logic ([#57](https://github.com/phuctm97/modelfetch/pull/57))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.10 (2025-07-21)

### 🩹 Fixes

- Improve JSR publishing support by auto-generating deno.json imports and adding project tags ([#55](https://github.com/phuctm97/modelfetch/pull/55))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.9 (2025-07-21)

### 🩹 Fixes

- Fix Netlify templates to use esm.sh instead of npm: specifiers for compatibility with Netlify Edge Functions ([#54](https://github.com/phuctm97/modelfetch/pull/54))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.8 (2025-07-20)

### 🩹 Fixes

- Add shared next-config library to standardize Next.js configurations across all applications ([#53](https://github.com/phuctm97/modelfetch/pull/53))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.7 (2025-07-20)

### 🩹 Fixes

- Optimize build performance in CI and improve JSR publishing with --no-check flag ([#52](https://github.com/phuctm97/modelfetch/pull/52))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.6 (2025-07-20)

### 🩹 Fixes

- Change release commit message format from "Release" to "Publish" ([#51](https://github.com/phuctm97/modelfetch/pull/51))
- Increase Next.js build memory limit to prevent out-of-memory errors ([#51](https://github.com/phuctm97/modelfetch/pull/51))
- Add JSR support for @modelfetch/deno package ([#51](https://github.com/phuctm97/modelfetch/pull/51))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.5 (2025-07-20)

### 🩹 Fixes

- Add JSR publishing support for @modelfetch/netlify and fix workspace dependency resolution in release executor ([#50](https://github.com/phuctm97/modelfetch/pull/50))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.4 (2025-07-19)

### 🩹 Fixes

- Improve JSR publishing support with automatic LICENSE copying and enhanced configuration file handling ([#49](https://github.com/phuctm97/modelfetch/pull/49))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.3 (2025-07-19)

### 🩹 Fixes

- Update JSR configuration for modelfetch-core and simplify prepare-release-publish executor ([#48](https://github.com/phuctm97/modelfetch/pull/48))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.2 (2025-07-19)

### 🩹 Fixes

- Add JSR publishing support for `@modelfetch/core` package ([#47](https://github.com/phuctm97/modelfetch/pull/47))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.1 (2025-07-18)

### 🩹 Fixes

- Enable AWS Lambda streaming mode with response streaming support and update templates and documentation ([#45](https://github.com/phuctm97/modelfetch/pull/45))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.13.0 (2025-07-18)

### 🚀 Features

- Improve AWS Lambda runtime support with updated CDK configurations and enhanced documentation ([0e2b6f7](https://github.com/phuctm97/modelfetch/commit/0e2b6f7))

### ❤️ Thank You

- phuctm97

## 0.12.6 (2025-07-17)

### 🩹 Fixes

- Update documentation across website and runtime packages ([#43](https://github.com/phuctm97/modelfetch/pull/43))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.12.5 (2025-07-17)

### 🩹 Fixes

- Add Next.js templates to create-modelfetch CLI ([#42](https://github.com/phuctm97/modelfetch/pull/42))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.12.4 (2025-07-16)

### 🩹 Fixes

- Reorganize documentation structure ([#41](https://github.com/phuctm97/modelfetch/pull/41))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.12.3 (2025-07-13)

### 🩹 Fixes

- Add Next.js runtime adapter (alpha) ([#40](https://github.com/phuctm97/modelfetch/pull/40))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.12.2 (2025-07-12)

### 🩹 Fixes

- Fix import map syntax for Netlify templates to use correct npm: URL format ([306c2b3](https://github.com/phuctm97/modelfetch/commit/306c2b3))

### ❤️ Thank You

- phuctm97

## 0.12.1 (2025-07-12)

### 🩹 Fixes

- Fix Netlify templates and update runtime documentation for consistency ([#38](https://github.com/phuctm97/modelfetch/pull/38))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.12.0 (2025-07-12)

### 🚀 Features

- Add Netlify runtime support with @modelfetch/netlify package and example applications ([#37](https://github.com/phuctm97/modelfetch/pull/37))

### 🩹 Fixes

- Replace static opengraph images with dynamic Next.js OG image generation for better customization and maintainability ([#37](https://github.com/phuctm97/modelfetch/pull/37))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.11.0 (2025-07-11)

### 🚀 Features

- Add middleware support for authentication, logging, and other cross-cutting concerns in MCP servers ([acc0052](https://github.com/phuctm97/modelfetch/commit/acc0052))

### ❤️ Thank You

- phuctm97

## 0.10.1 (2025-07-10)

### 🩹 Fixes

- Fix AWS Lambda CDK entry paths and add gitignore templates ([#34](https://github.com/phuctm97/modelfetch/pull/34))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.10.0 (2025-07-10)

### 🚀 Features

- Add Cloudflare deployment and deletion support to nx-10x and create-modelfetch templates ([#33](https://github.com/phuctm97/modelfetch/pull/33))

### 🩹 Fixes

- Update runtime documentation for consistency and clarity across all packages ([#33](https://github.com/phuctm97/modelfetch/pull/33))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.9.0 (2025-07-10)

### 🚀 Features

- Add AWS Lambda runtime support with @modelfetch/aws-lambda package and example applications ([#31](https://github.com/phuctm97/modelfetch/pull/31))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.8.0 (2025-07-09)

### 🚀 Features

- Add example applications for Cloudflare Workers and Vercel Functions with both JavaScript and TypeScript variants ([#30](https://github.com/phuctm97/modelfetch/pull/30))

### 🩹 Fixes

- Add comprehensive README documentation for all packages and applications ([#30](https://github.com/phuctm97/modelfetch/pull/30))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.7.3 (2025-07-08)

### 🩹 Fixes

- Improve website UI/UX with enhanced visual effects and update SDK package documentation for clarity ([#28](https://github.com/phuctm97/modelfetch/pull/28))
- Add comprehensive README documentation for all example applications and improve website documentation ([#28](https://github.com/phuctm97/modelfetch/pull/28))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.7.2 (2025-07-08)

### 🩹 Fixes

- Improve documentation clarity and add enhanced Claude command for pull request creation ([#26](https://github.com/phuctm97/modelfetch/pull/26))
- Update README badges to use dynamic npm badges and improve documentation formatting across all packages ([#26](https://github.com/phuctm97/modelfetch/pull/26))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.7.1 (2025-07-08)

### 🩹 Fixes

- Add prepare-release-publish executor to clean package.json files before npm publishing ([#23](https://github.com/phuctm97/modelfetch/pull/23))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.7.0 (2025-07-07)

### 🚀 Features

- Improve documentation clarity and add interactive runtime selector to website ([#22](https://github.com/phuctm97/modelfetch/pull/22))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.6.1 (2025-07-06)

### 🩹 Fixes

- Improve documentation clarity by removing platform-specific details and updating package status ([#21](https://github.com/phuctm97/modelfetch/pull/21))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.6.0 (2025-07-06)

### 🚀 Features

- Add Vercel Functions runtime support to create-modelfetch CLI with JavaScript and TypeScript templates ([#20](https://github.com/phuctm97/modelfetch/pull/20))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.5.0 (2025-07-06)

### 🚀 Features

- Add Cloudflare Workers support to create-modelfetch CLI with JavaScript and TypeScript templates ([#19](https://github.com/phuctm97/modelfetch/pull/19))

### 🩹 Fixes

- Fix default port in Deno template READMEs from 3000 to 8000 ([#19](https://github.com/phuctm97/modelfetch/pull/19))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.4.4 (2025-07-06)

### 🩹 Fixes

- Improve documentation clarity and update Deno templates to use correct API ([#18](https://github.com/phuctm97/modelfetch/pull/18))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.4.3 (2025-07-06)

### 🩹 Fixes

- Improve create-modelfetch CLI with tslib dependency, yarn output fix, Deno runtime detection, and updated MCP Inspector command ([#17](https://github.com/phuctm97/modelfetch/pull/17))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.4.2 (2025-07-06)

### 🩹 Fixes

- Update all documentation URLs from preview.modelfetch.com to www.modelfetch.com ([#16](https://github.com/phuctm97/modelfetch/pull/16))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.4.1 (2025-07-05)

### 🩹 Fixes

- Fix bun template entry points and improve create-modelfetch CLI with smart runtime defaults ([#15](https://github.com/phuctm97/modelfetch/pull/15))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.4.0 (2025-07-05)

### 🚀 Features

- Improve create-modelfetch CLI user experience with better formatting, consistent capitalization, and updated documentation ([#14](https://github.com/phuctm97/modelfetch/pull/14))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.3.0 (2025-07-05)

### 🚀 Features

- Improve create-modelfetch CLI UX with better prompts, updated examples matching MCP SDK patterns, and enhanced documentation ([#13](https://github.com/phuctm97/modelfetch/pull/13))

### 🩹 Fixes

- Add repository README, package READMEs, and MIT license for better documentation and licensing ([#13](https://github.com/phuctm97/modelfetch/pull/13))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.2.0 (2025-07-05)

### 🚀 Features

- Update to MCP SDK 1.15.0 with breaking API changes for tool registration ([#12](https://github.com/phuctm97/modelfetch/pull/12))
- Enhance website UI with search functionality and improved landing page design ([#12](https://github.com/phuctm97/modelfetch/pull/12))

### ❤️ Thank You

- Minh-Phuc Tran

## 0.1.0 (2025-07-04)

### 🚀 Features

- Add create-modelfetch CLI and runtime adapters for Cloudflare, Vercel, and Netlify ([1faea80](https://github.com/phuctm97/modelfetch/commit/1faea80))

### ❤️ Thank You

- phuctm97

## 0.0.6 (2025-07-04)

### 🩹 Fixes

- Update Nx from 21.2.1 to 21.2.2 ([45b964b](https://github.com/phuctm97/modelfetch/commit/45b964b))
- Add README and descriptions for public npm packages ([45b964b](https://github.com/phuctm97/modelfetch/commit/45b964b))

### ❤️ Thank You

- phuctm97

## 0.0.5 (2025-07-03)

### 🩹 Fixes

- Add files field to package.json for proper npm publishing ([629d735](https://github.com/phuctm97/modelfetch/commit/629d735))

### ❤️ Thank You

- phuctm97

## 0.0.4 (2025-07-03)

### 🩹 Fixes

- This is for testing the release workflow only. There is no code changes. ([1276f2a](https://github.com/phuctm97/modelfetch/commit/1276f2a))

### ❤️ Thank You

- phuctm97