import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

import { CodeBlock } from "~/lib/code-block";
import { SearchButton } from "~/lib/search-button";
import { ThemeSwitch } from "~/lib/theme-switch";
import packageJson from "~/package.json";

import { Raining } from "./raining";
import { Typing } from "./typing";

import css from "./page.module.css";

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
                  Terminal % ~
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
                  {`   __  __           _      _ _____    _       _
  |  \\/  |         | |    | |  ___|  | |     | |
  | .  . | ___   __| | ___| | |_ ___| |_ ___| |__
  | |\\/| |/ _ \\ / _\` |/ _ \\ |  _/ _ \\ __/ __| '_ \\
  | |  | | (_) | (_| |  __/ | ||  __/ || (__| | | |
  \\_|  |_/\\___/ \\__,_|\\___|_\\_| \\___|\\__\\___|_| |_|`}
                </pre>
              </div>

              <h1
                className={`mb-6 text-5xl font-bold text-[#008f00] drop-shadow-[0_0_20px_rgba(0,143,0,0.5)] dark:text-[#00ff00] dark:drop-shadow-[0_0_20px_rgba(0,255,0,0.5)] ${css.neonGlow}`}
              >
                <Typing>ModelFetch</Typing>
              </h1>

              <div className="mb-8">
                <span className="text-[#0099cc] dark:text-[#00ffff]">%</span>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  A TypeScript/JavaScript SDK for building MCP (Model Context
                  Protocol) servers with a delightful developer experience and
                  deploying them anywhere TypeScript/JavaScript runs.
                </span>
              </div>

              <div className="flex justify-center gap-4">
                <Link
                  className={`inline-flex items-center rounded bg-[#008f00] px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,143,0,0.8)] dark:bg-[#00ff00] dark:text-black dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] ${css.glitch}`}
                  href="/docs/getting-started"
                >
                  <span className="mr-2">▶</span>Get Started
                </Link>
                <Link
                  className="inline-flex items-center rounded border-2 border-[#0099cc] px-6 py-3 text-[#0099cc] transition-all hover:bg-[#0099cc] hover:text-white hover:shadow-[0_0_20px_rgba(0,153,204,0.8)] dark:border-[#00ffff] dark:text-[#00ffff] dark:hover:bg-[#00ffff] dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
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
                <div className="block text-xs sm:hidden">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="animate-pulse text-[#0099cc] dark:text-[#00ffff]">
                        ●
                      </span>
                      <span className="text-gray-700 dark:text-gray-400">
                        STATUS: ALPHA
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-gray-600 dark:text-gray-400">
                        v{packageJson.version}
                      </span>
                      <span className="text-gray-400 dark:text-gray-600">
                        •
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        IN DEVELOPMENT
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
                    STATUS: ALPHA
                  </span>
                  <span className="mx-4 text-gray-400 dark:text-gray-600">
                    |
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    VERSION: {packageJson.version}
                  </span>
                  <span className="mx-4 text-gray-400 dark:text-gray-600">
                    |
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    IN DEVELOPMENT
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
                    Deno, Cloudflare, Vercel, Netlify, etc.
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
                    lock-in and ensure up-to-date capabilities.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Start Section */}
            <section className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">›</span>Quick Start
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="mb-4 text-gray-400">
                    <span className="text-[#008f00] dark:text-[#00ff00]">
                      ~
                    </span>{" "}
                    Install ModelFetch runtime for your environment:
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
                      <CodeBlock
                        code={`# For Node.js
npm install @modelfetch/node

# For Bun
bun add @modelfetch/bun

# For Deno
deno add npm:@modelfetch/deno

# For Cloudflare
npm install @modelfetch/cloudflare

# For Vercel
npm install @modelfetch/vercel

# For Netlify
npm install @modelfetch/netlify`}
                        lang="bash"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-gray-400">
                    <span className="text-[#008f00] dark:text-[#00ff00]">
                      ~
                    </span>{" "}
                    Create your MCP server with the official MCP TypeScript SDK:
                  </p>
                  <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-colors hover:border-[#008f00] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00]">
                    <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#333] dark:bg-[#2a2a2a]">
                      <span className="text-xs text-gray-600 dark:text-gray-500">
                        server.ts
                      </span>
                      <span className="text-xs text-[#008f00] dark:text-[#00ff00]">
                        ◉ typescript
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <CodeBlock
                        code={`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  title: "My MCP Server",
  name: "my-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "roll_dice",
  {
    title: "Roll Dice",
    description: "Rolls an N-sided dice",
    inputSchema: { sides: z.number().int().min(2) },
  },
  ({ sides }) => ({
    content: [
      {
        type: "text",
        text: \`🎲 You rolled a \${1 + Math.floor(Math.random() * sides)}!\`,
      },
    ],
  }),
);

export default server;`}
                        lang="typescript"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-gray-400">
                    <span className="text-[#008f00] dark:text-[#00ff00]">
                      ~
                    </span>{" "}
                    Run your MCP server with the installed ModelFetch runtime:
                  </p>
                  <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-colors hover:border-[#008f00] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00]">
                    <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#333] dark:bg-[#2a2a2a]">
                      <span className="text-xs text-gray-600 dark:text-gray-500">
                        index.ts
                      </span>
                      <span className="text-xs text-[#008f00] dark:text-[#00ff00]">
                        ◉ typescript
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <CodeBlock
                        code={`import handle from "@modelfetch/node";
import server from "./server";

handle(server);`}
                        lang="typescript"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Status Section */}
            <section className="text-center">
              <div className="inline-block rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 sm:px-6 sm:py-4 dark:border-[#333] dark:bg-[#1a1a1a]">
                <p className="mb-6 text-gray-400">
                  <span className="text-[#0099cc] dark:text-[#00ffff]">
                    [INFO]
                  </span>{" "}
                  ModelFetch is currently a work in progress. Join us in
                  building the world&apos;s most popular TypeScript/JavaScript
                  SDK for MCP servers.
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
