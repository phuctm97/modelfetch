import Link from "next/link";

import { CodeBlock } from "~/lib/code-block";
import { ThemeSwitch } from "~/lib/theme-switch";

import { Raining } from "./raining";
import { Typing } from "./typing";

import css from "./page.module.css";

export default function Page() {
  return (
    <>
      <main
        className={`relative z-10 min-h-screen bg-[#f0f0f0] dark:bg-[#0a0a0a] text-[#008f00] dark:text-[#00ff00] font-mono ${css.scanlines} ${css.techGrid} ${css.main}`}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Terminal Header */}
            <div className="mb-8 bg-white dark:bg-[#1a1a1a] rounded-t-lg border border-gray-300 dark:border-[#333] overflow-hidden shadow-lg dark:shadow-none">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] border-b border-gray-300 dark:border-[#333]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-500">
                    ModelFetch ~ %
                  </span>
                </div>
                <ThemeSwitch />
              </div>
            </div>

            {/* Hero Section */}
            <section className="text-center mb-16">
              <div className="inline-block mb-6">
                <pre className="text-[#008f00] dark:text-[#00ff00] text-xs leading-tight opacity-70 dark:opacity-50">
                  {`   __  __           _      _ _____    _       _
  |  \\/  |         | |    | |  ___|  | |     | |
  | .  . | ___   __| | ___| | |_ ___| |_ ___| |__
  | |\\/| |/ _ \\ / _\` |/ _ \\ |  _/ _ \\ __/ __| '_ \\
  | |  | | (_) | (_| |  __/ | ||  __/ || (__| | | |
  \\_|  |_/\\___/ \\__,_|\\___|_\\_| \\___|\\__\\___|_| |_|`}
                </pre>
              </div>

              <h1
                className={`text-5xl font-bold mb-6 text-[#008f00] dark:text-[#00ff00] drop-shadow-[0_0_20px_rgba(0,143,0,0.5)] dark:drop-shadow-[0_0_20px_rgba(0,255,0,0.5)] ${css.neonGlow}`}
              >
                <Typing>ModelFetch</Typing>
              </h1>

              <div className="mb-8">
                <span className="text-[#0099cc] dark:text-[#00ffff]">$</span>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  A TypeScript/JavaScript SDK for building MCP (Model Context
                  Protocol) servers with a delightful developer experience and
                  deploying them anywhere TypeScript/JavaScript runs.
                </span>
              </div>

              <div className="flex gap-4 justify-center">
                <Link
                  className={`inline-flex items-center px-6 py-3 bg-[#008f00] dark:bg-[#00ff00] text-white dark:text-black font-bold rounded hover:shadow-[0_0_20px_rgba(0,143,0,0.8)] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] transition-all hover:scale-105 ${css.glitch}`}
                  href="/docs/getting-started"
                >
                  <span className="mr-2">▶</span>Get Started
                </Link>
                <Link
                  className="inline-flex items-center px-6 py-3 border-2 border-[#0099cc] dark:border-[#00ffff] text-[#0099cc] dark:text-[#00ffff] rounded hover:bg-[#0099cc] dark:hover:bg-[#00ffff] hover:text-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,153,204,0.8)] dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all"
                  href="/docs"
                >
                  <span className="mr-2">◆</span>View Docs
                </Link>
              </div>
            </section>

            {/* Status Bar */}
            <div className="mb-12 text-center">
              <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded">
                {/* Mobile Layout (stacked) */}
                <div className="block sm:hidden text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#0099cc] dark:text-[#00ffff] animate-pulse">
                        ●
                      </span>
                      <span className="text-gray-700 dark:text-gray-400">
                        STATUS: ALPHA
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-gray-600 dark:text-gray-400">
                        v0.0.1
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
                <div className="hidden sm:flex sm:items-center sm:justify-center text-sm">
                  <span className="text-[#0099cc] dark:text-[#00ffff] animate-pulse">
                    ●
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-400">
                    STATUS: ALPHA
                  </span>
                  <span className="mx-4 text-gray-400 dark:text-gray-600">
                    |
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    VERSION: 0.0.1
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
              <h2 className="text-3xl font-bold mb-8 text-center text-[#0099cc] dark:text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">&gt;</span>Why ModelFetch?
              </h2>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] p-4 sm:p-6 rounded hover:border-[#008f00] dark:hover:border-[#00ff00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all group shadow-md dark:shadow-none">
                  <h3 className="text-xl font-semibold mb-3 text-[#008f00] dark:text-[#00ff00] group-hover:text-[#0099cc] dark:group-hover:text-[#00ffff] transition-colors">
                    <span className="mr-2">◈</span>Multi-Runtime
                  </h3>
                  <p className="text-gray-400">
                    Write your MCP servers once. Run them anywhere
                    TypeScript/JavaScript runs: Node.js, Bun, Deno, etc.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] p-4 sm:p-6 rounded hover:border-[#008f00] dark:hover:border-[#00ff00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all group shadow-md dark:shadow-none">
                  <h3 className="text-xl font-semibold mb-3 text-[#008f00] dark:text-[#00ff00] group-hover:text-[#0099cc] dark:group-hover:text-[#00ffff] transition-colors">
                    <span className="mr-2">◈</span>Delightful DX
                  </h3>
                  <p className="text-gray-400">
                    Build your MCP servers with tools designed for building MCP
                    servers: live reload, MCP Inspector, etc.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] p-4 sm:p-6 rounded hover:border-[#008f00] dark:hover:border-[#00ff00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all group shadow-md dark:shadow-none">
                  <h3 className="text-xl font-semibold mb-3 text-[#008f00] dark:text-[#00ff00] group-hover:text-[#0099cc] dark:group-hover:text-[#00ffff] transition-colors">
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
              <h2 className="text-3xl font-bold mb-8 text-center text-[#0099cc] dark:text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="mr-2">&gt;</span>Quick Start
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="mb-4 text-gray-400">
                    <span className="text-[#008f00] dark:text-[#00ff00]">
                      $
                    </span>{" "}
                    Install a ModelFetch runtime of your choice:
                  </p>
                  <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg overflow-hidden hover:border-[#008f00] dark:hover:border-[#00ff00] transition-colors shadow-md dark:shadow-none">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] border-b border-gray-300 dark:border-[#333] flex items-center justify-between">
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
deno add jsr:@modelfetch/deno`}
                        lang="bash"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-gray-400">
                    <span className="text-[#008f00] dark:text-[#00ff00]">
                      $
                    </span>{" "}
                    Create your MCP server with the official MCP TypeScript SDK:
                  </p>
                  <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg overflow-hidden hover:border-[#008f00] dark:hover:border-[#00ff00] transition-colors shadow-md dark:shadow-none">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] border-b border-gray-300 dark:border-[#333] flex items-center justify-between">
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
  name: "my-server",
  version: "1.0.0",
});

server.tool(
  "roll_dice",
  "Rolls an N-sided dice",
  { sides: z.number().int().min(2) },
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
                      $
                    </span>{" "}
                    Run your MCP server with the installed ModelFetch runtime:
                  </p>
                  <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg overflow-hidden hover:border-[#008f00] dark:hover:border-[#00ff00] transition-colors shadow-md dark:shadow-none">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] border-b border-gray-300 dark:border-[#333] flex items-center justify-between">
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
              <div className="inline-block px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg">
                <p className="text-gray-400 mb-4">
                  <span className="text-[#0099cc] dark:text-[#00ffff]">
                    [INFO]
                  </span>{" "}
                  ModelFetch is currently a work in progress. Join us in
                  building the world&apos;s most popular TypeScript/JavaScript
                  SDK for MCP servers.
                </p>
                <Link
                  className="text-[#008f00] dark:text-[#00ff00] hover:text-[#0099cc] dark:hover:text-[#00ffff] hover:underline transition-colors"
                  href="https://github.com/phuctm97/modelfetch"
                >
                  <span className="mr-2">◆</span>View on GitHub →
                </Link>
              </div>
            </section>

            {/* Footer Terminal */}
            <div className="mt-16 text-center text-xs text-gray-500 dark:text-gray-600">
              <div>
                <span className="text-[#008f00] dark:text-[#00ff00]">$</span>{" "}
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
