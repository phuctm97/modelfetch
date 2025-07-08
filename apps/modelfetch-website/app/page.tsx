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
        <div className="container mx-auto px-4 py-12">
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
            <section className="mb-12 text-center">
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
              <Link
                className="inline-block rounded border border-gray-300 bg-gray-100 px-4 py-2 text-sm transition-all hover:border-gray-400 hover:bg-gray-200 dark:border-[#333] dark:bg-[#1a1a1a] dark:hover:border-[#555] dark:hover:bg-[#2a2a2a]"
                href="https://github.com/phuctm97/modelfetch/releases/latest"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-pulse text-green-500">●</span>
                  <span className="text-gray-700 dark:text-gray-400">
                    LATEST RELEASE: v{packageJson.version}
                  </span>
                </div>
              </Link>
            </div>

            {/* Features Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">›</span>Why ModelFetch?
              </h2>
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="group rounded border border-gray-300 bg-white p-4 shadow-md transition-all hover:border-[#008f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  <h3 className="mb-3 text-xl font-semibold text-[#008f00] transition-colors group-hover:text-[#0099cc] dark:text-[#00ff00] dark:group-hover:text-[#00ffff]">
                    <span className="mr-2">◈</span>Multi-Runtime
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Write your MCP server once. Run it anywhere: Node.js, Bun,
                    Deno, Cloudflare Workers, Vercel Functions, etc.
                  </p>
                </div>
                <div className="group rounded border border-gray-300 bg-white p-4 shadow-md transition-all hover:border-[#008f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  <h3 className="mb-3 text-xl font-semibold text-[#008f00] transition-colors group-hover:text-[#0099cc] dark:text-[#00ff00] dark:group-hover:text-[#00ffff]">
                    <span className="mr-2">◈</span>Delightful DX
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Build your MCP server with tools designed for building MCP
                    servers: live reload, MCP Inspector, etc.
                  </p>
                </div>
                <div className="group rounded border border-gray-300 bg-white p-4 shadow-md transition-all hover:border-[#008f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  <h3 className="mb-3 text-xl font-semibold text-[#008f00] transition-colors group-hover:text-[#0099cc] dark:text-[#00ff00] dark:group-hover:text-[#00ffff]">
                    <span className="mr-2">◈</span>Official SDK
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Built on top of the official MCP TypeScript SDK to avoid
                    lock-in and ensure up-to-date implementation.
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">›</span>How It Works
              </h2>

              <RuntimeSelector />
            </section>

            {/* Quick Start Section */}
            <section className="mb-12">
              <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">›</span>Quick Start
              </h2>

              <div className="text-center">
                <div className="group relative mx-auto w-full sm:max-w-lg">
                  {/* Glowing box with matrix-style effects */}
                  <div className="relative overflow-hidden rounded-lg border-2 border-[#008f00] bg-gray-900 p-6 shadow-[0_0_30px_rgba(0,143,0,0.3)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,143,0,0.6)] dark:border-[#00ff00] dark:bg-black dark:shadow-[0_0_30px_rgba(0,255,0,0.3)] dark:group-hover:shadow-[0_0_50px_rgba(0,255,0,0.6)]">
                    {/* Animated scanning line */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#008f00] to-transparent opacity-0 transition-all duration-1000 group-hover:translate-y-[200px] group-hover:opacity-100 dark:via-[#00ff00]" />

                    {/* Matrix rain effect corners */}
                    <div className="pointer-events-none absolute -top-2 -left-2 text-xs text-[#00ff00]/20 transition-all duration-300 group-hover:text-[#00ff00]/60 dark:text-[#00ff00]/20 dark:group-hover:text-[#00ff00]/60">
                      10101
                      <br />
                      01010
                      <br />
                      11001
                    </div>
                    <div className="pointer-events-none absolute -top-2 -right-2 text-xs text-[#00ff00]/20 transition-all duration-300 group-hover:text-[#00ff00]/60 dark:text-[#00ff00]/20 dark:group-hover:text-[#00ff00]/60">
                      10101
                      <br />
                      01010
                      <br />
                      11001
                    </div>

                    {/* Glitch effect on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-[#008f00]/5 opacity-0 mix-blend-screen transition-opacity duration-100 group-hover:animate-pulse dark:bg-[#00ff00]/5" />

                    {/* Command prompt indicator */}
                    <div className="mb-2 flex items-center gap-2 text-xs text-[#00ff00]/60 transition-all duration-300 group-hover:text-[#00ff00] dark:text-[#00ff00]/60 dark:group-hover:text-[#00ff00]">
                      <span className="animate-pulse">▶</span>
                      <span>EXECUTE COMMAND</span>
                    </div>

                    <DynamicCodeBlock
                      code="npx -y create-modelfetch@latest"
                      lang="bash"
                    />
                  </div>
                </div>

                <p className="mt-6 text-gray-600 dark:text-gray-400">
                  That&apos;s it. You&apos;re ready to build.
                </p>
              </div>
            </section>

            {/* Status Section */}
            <section className="text-center">
              <div className="w-full rounded-lg border border-gray-300 bg-gray-100 p-4 sm:inline-block sm:w-auto sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a]">
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  <span className="text-[#0099cc] dark:text-[#00ffff]">
                    [INFO]
                  </span>{" "}
                  Join us in building the future of{" "}
                  <InlineBlock>MCP servers!</InlineBlock>
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
            <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-600">
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
