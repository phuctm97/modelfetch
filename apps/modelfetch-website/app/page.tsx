import type { PropsWithChildren } from "react";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import Link from "next/link";

import { RuntimeSelector } from "~/lib/runtime-selector";
import { SearchButton } from "~/lib/search-button";
import { ThemeSwitch } from "~/lib/theme-switch";
import packageJson from "~/package.json";

import { Raining } from "./raining";
import { Typing } from "./typing";

import css from "./page.module.css";

const asciiLogo = ` __  __           _      _ _____    _       _
|  \\/  |         | |    | |  ___|  | |     | |
| .  . | ___   __| | ___| | |_ ___| |_ ___| |__
| |\\/| |/ _ \\ / _\` |/ _ \\ |  _/ _ \\ __/ __| '_ \\
| |  | | (_) | (_| |  __/ | ||  __/ || (__| | | |
\\_|  |_/\\___/ \\__,_|\\___|_\\_| \\___|\\__\\___|_| |_|`;

function InlineBlock({ children }: PropsWithChildren) {
  return <span className="inline-block">{children}</span>;
}

export default function Page() {
  return (
    <>
      <main
        className={`relative z-10 min-h-screen bg-[#f0f0f0] font-mono text-[#008f00] dark:bg-[#0a0a0a] dark:text-[#00ff00] ${css.scanlines} ${css.techGrid} ${css.main}`}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            {/* Terminal Header */}
            <div className="mb-8 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 shadow-md dark:border-[#333] dark:bg-[#2a2a2a] dark:shadow-none">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                  terminal % ~
                </span>
              </div>
              <div className="flex items-center gap-3">
                <SearchButton />
                <ThemeSwitch />
              </div>
            </div>

            {/* Hero Section */}
            <section className="mb-16 text-center">
              <div className="mb-6 inline-block">
                <pre className="text-xs leading-tight text-[#008f00] opacity-70 dark:text-[#00ff00] dark:opacity-50">
                  {asciiLogo}
                </pre>
              </div>

              <h1
                className={`mb-6 text-5xl font-bold text-[#008f00] drop-shadow-[0_0_20px_rgba(0,143,0,0.5)] dark:text-[#00ff00] dark:drop-shadow-[0_0_20px_rgba(0,255,0,0.5)] ${css.neonGlow}`}
              >
                <Typing>ModelFetch</Typing>
              </h1>

              <div className="mb-8">
                <span className="text-[#0099cc] dark:text-[#00ffff]">
                  [INFO]
                </span>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  ModelFetch is a delightful TypeScript/JavaScript SDK for{" "}
                  <InlineBlock>building and deploying</InlineBlock>{" "}
                  <InlineBlock>MCP servers anywhere</InlineBlock>{" "}
                  <InlineBlock>TypeScript/JavaScript runs.</InlineBlock>
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  className={`inline-flex items-center justify-center rounded bg-[#008f00] px-4 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,143,0,0.8)] sm:px-6 dark:bg-[#00ff00] dark:text-black dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] ${css.glitch}`}
                  href="/docs/getting-started"
                >
                  <span className="mr-2">▶</span>Get Started
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded border-2 border-[#0099cc] px-4 py-3 text-[#0099cc] transition-all hover:bg-[#0099cc] hover:text-white hover:shadow-[0_0_20px_rgba(0,153,204,0.8)] sm:px-6 dark:border-[#00ffff] dark:text-[#00ffff] dark:hover:bg-[#00ffff] dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                  href="/docs"
                >
                  <span className="mr-2">◆</span>View Docs
                </Link>
              </div>

              <div className="mt-4 text-center">
                <Link
                  className="inline-flex items-center text-gray-600 underline decoration-gray-400 underline-offset-4 transition-all hover:text-gray-800 hover:decoration-gray-800 dark:text-gray-400 dark:decoration-gray-600 dark:hover:text-gray-200 dark:hover:decoration-gray-200"
                  href="https://github.com/phuctm97/modelfetch"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SiGithub className="mr-2 h-4 w-4" />
                  View on GitHub →
                </Link>
              </div>
            </section>

            {/* Status Bar */}
            <div className="mb-12 text-center">
              <div className="inline-block rounded border border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#333] dark:bg-[#1a1a1a]">
                {/* Mobile Layout (stacked) */}
                <div className="block text-sm sm:hidden">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="animate-pulse text-[#0099cc] dark:text-[#00ffff]">
                        ●
                      </span>
                      <span className="text-gray-700 dark:text-gray-400">
                        STATUS: BETA
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        v{packageJson.version}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout (full) */}
                <div className="hidden text-sm sm:flex sm:items-center sm:justify-center">
                  <span className="animate-pulse text-[#0099cc] dark:text-[#00ffff]">
                    ●
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-400">
                    STATUS: BETA
                  </span>
                  <span className="mx-4 text-gray-400 dark:text-gray-600">
                    |
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    VERSION: {packageJson.version}
                  </span>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <section className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">›</span>Why ModelFetch?
              </h2>
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="group rounded border border-gray-300 bg-white p-4 shadow-md transition-all hover:border-[#008f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  <h3 className="mb-3 text-xl font-semibold text-[#008f00] transition-colors group-hover:text-[#0099cc] dark:text-[#00ff00] dark:group-hover:text-[#00ffff]">
                    <span className="mr-2">◈</span>Multi-Runtime
                  </h3>
                  <p className="text-gray-400">
                    Write your MCP server once. Run it anywhere: Node.js, Bun,
                    Deno, Cloudflare Workers, Vercel Functions, etc.
                  </p>
                </div>
                <div className="group rounded border border-gray-300 bg-white p-4 shadow-md transition-all hover:border-[#008f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  <h3 className="mb-3 text-xl font-semibold text-[#008f00] transition-colors group-hover:text-[#0099cc] dark:text-[#00ff00] dark:group-hover:text-[#00ffff]">
                    <span className="mr-2">◈</span>Delightful DX
                  </h3>
                  <p className="text-gray-400">
                    Build your MCP server with tools designed for building MCP
                    servers: live reload, MCP Inspector, etc.
                  </p>
                </div>
                <div className="group rounded border border-gray-300 bg-white p-4 shadow-md transition-all hover:border-[#008f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  <h3 className="mb-3 text-xl font-semibold text-[#008f00] transition-colors group-hover:text-[#0099cc] dark:text-[#00ff00] dark:group-hover:text-[#00ffff]">
                    <span className="mr-2">◈</span>Official SDK
                  </h3>
                  <p className="text-gray-400">
                    Built on top of the official MCP TypeScript SDK to avoid
                    lock-in and ensure up-to-date implementation.
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">›</span>How It Works
              </h2>

              <RuntimeSelector />
            </section>

            {/* Quick Start Section */}
            <section className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">›</span>Quick Start
              </h2>

              <div className="space-y-8">
                <div className="mx-auto max-w-2xl">
                  <p className="mb-4 text-center text-gray-400">
                    <span className="text-[#008f00] dark:text-[#00ff00]">
                      ~
                    </span>{" "}
                    Get started with ModelFetch{" "}
                    <InlineBlock>in seconds</InlineBlock>{" "}
                    <InlineBlock>using our CLI:</InlineBlock>
                  </p>
                  <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-colors hover:border-[#008f00] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00]">
                    <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#333] dark:bg-[#2a2a2a]">
                      <span className="text-xs text-gray-600 dark:text-gray-500">
                        terminal
                      </span>
                      <span className="text-xs text-[#008f00] dark:text-[#00ff00]">
                        ◉ bash
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <DynamicCodeBlock
                        code="npx -y create-modelfetch@latest"
                        lang="bash"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Status Section */}
            <section className="text-center">
              <div className="inline-block rounded-lg border border-gray-300 bg-gray-100 p-4 sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a]">
                <p className="mb-6 text-gray-400">
                  <span className="text-[#0099cc] dark:text-[#00ffff]">
                    [INFO]
                  </span>{" "}
                  Join us in building the future of MCP servers!
                </p>
                <Link
                  className="inline-flex items-center rounded bg-gray-700 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-gray-800 hover:shadow-[0_0_20px_rgba(100,100,100,0.8)] dark:bg-gray-300 dark:text-black dark:hover:bg-gray-200 dark:hover:shadow-[0_0_20px_rgba(200,200,200,0.8)]"
                  href="https://github.com/phuctm97/modelfetch"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SiGithub className="mr-4 h-5 w-5" />
                  Star on GitHub →
                </Link>
              </div>
            </section>

            {/* Footer Terminal */}
            <div className="mt-16 text-center text-xs text-gray-500 dark:text-gray-600">
              <div>
                <span className="text-[#008f00] dark:text-[#00ff00]">~</span>{" "}
                echo &quot;Built with ❤️ by developers, for developers&quot;
              </div>
            </div>
          </div>
        </div>
      </main>
      <Raining />
    </>
  );
}
