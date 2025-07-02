import "./terminal.css";

import Link from "next/link";

import { CodeBlock } from "~/lib/code-block";

import { HeroTitle } from "./hero-section";
import { TerminalAnimations } from "./terminal-animations";

export default function Page() {
  return (
    <TerminalAnimations>
      <main className="relative z-10 min-h-screen bg-[#0a0a0a] text-[#00ff00] font-mono scanlines tech-grid">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Terminal Header */}
            <div className="mb-8 bg-[#1a1a1a] rounded-t-lg border border-[#333] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] border-b border-[#333]">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500">
                  modelfetch@terminal ~ %
                </span>
              </div>
            </div>

            {/* Hero Section */}
            <section className="text-center mb-16">
              <div className="inline-block mb-6">
                <pre className="text-[#00ff00] text-xs leading-tight opacity-50">
                  {`   __  __           _      _ _____    _       _     
  |  \\/  |         | |    | |  ___|  | |     | |    
  | .  . | ___   __| | ___| | |_ ___| |_ ___| |__  
  | |\\/| |/ _ \\ / _\` |/ _ \\ |  _/ _ \\ __/ __| '_ \\ 
  | |  | | (_) | (_| |  __/ | ||  __/ || (__| | | |
  \\_|  |_/\\___/ \\__,_|\\___|_\\_| \\___|\\__\\___|_| |_|`}
                </pre>
              </div>

              <HeroTitle />

              <div className="mb-8">
                <span className="text-[#00ffff]">$</span>{" "}
                <span className="text-gray-400">
                  A TypeScript/JavaScript SDK for building MCP (Model Context
                  Protocol) servers with a delightful developer experience and
                  deploying them anywhere TypeScript/JavaScript runs.
                </span>
              </div>

              <div className="flex gap-4 justify-center">
                <Link
                  className="px-6 py-3 bg-[#00ff00] text-black font-bold rounded hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] transition-all hover:scale-105 cmd-button glitch"
                  href="/docs"
                >
                  <span className="mr-2">▶</span>Get Started
                </Link>
                <Link
                  className="px-6 py-3 border-2 border-[#00ffff] text-[#00ffff] rounded hover:bg-[#00ffff] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all cmd-button"
                  href="/docs/examples"
                >
                  <span className="mr-2">◆</span>View Examples
                </Link>
              </div>
            </section>

            {/* Status Bar */}
            <div className="mb-12 text-center">
              <div className="inline-block px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded">
                <span className="text-[#00ff00] animate-pulse">●</span>
                <span className="ml-2 text-gray-400">SYSTEM: ONLINE</span>
                <span className="mx-4 text-gray-600">|</span>
                <span className="text-gray-400">VERSION: 1.0.0</span>
                <span className="mx-4 text-gray-600">|</span>
                <span className="text-gray-400">STATUS: OPERATIONAL</span>
              </div>
            </div>

            {/* Features Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] matrix-text">
                <span className="mr-2">&gt;</span>Why ModelFetch?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded hover:border-[#00ff00] hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all group">
                  <h3 className="text-xl font-semibold mb-3 text-[#00ff00] group-hover:text-[#00ffff] transition-colors">
                    <span className="mr-2">◈</span>Runtime Agnostic
                  </h3>
                  <p className="text-gray-400">
                    Write once, run anywhere. Deploy your MCP servers on
                    Node.js, Bun, or Deno with the same codebase.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded hover:border-[#00ff00] hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all group">
                  <h3 className="text-xl font-semibold mb-3 text-[#00ff00] group-hover:text-[#00ffff] transition-colors">
                    <span className="mr-2">◈</span>Developer Experience
                  </h3>
                  <p className="text-gray-400">
                    Powerful CLI with live reload and MCP inspector integration
                    for seamless development and debugging.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded hover:border-[#00ff00] hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all group">
                  <h3 className="text-xl font-semibold mb-3 text-[#00ff00] group-hover:text-[#00ffff] transition-colors">
                    <span className="mr-2">◈</span>TypeScript First
                  </h3>
                  <p className="text-gray-400">
                    Full TypeScript support with type safety and excellent IDE
                    integration out of the box.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Start Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] matrix-text">
                <span className="mr-2">&gt;</span>Quick Start
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="mb-4 text-gray-400">
                    <span className="text-[#00ff00]">$</span> Install ModelFetch
                    for your runtime:
                  </p>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden hover:border-[#00ff00] transition-colors code-enhanced">
                    <div className="px-4 py-2 bg-[#2a2a2a] border-b border-[#333] flex items-center justify-between">
                      <span className="text-xs text-gray-500">bash</span>
                      <span className="text-xs text-[#00ff00]">◉ terminal</span>
                    </div>
                    <div className="p-4">
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
                    <span className="text-[#00ff00]">$</span> Create your MCP
                    server:
                  </p>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden hover:border-[#00ff00] transition-colors">
                    <div className="px-4 py-2 bg-[#2a2a2a] border-b border-[#333] flex items-center justify-between">
                      <span className="text-xs text-gray-500">server.ts</span>
                      <span className="text-xs text-[#00ff00]">
                        ◉ typescript
                      </span>
                    </div>
                    <div className="p-4">
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
                    <span className="text-[#00ff00]">$</span> Run with
                    ModelFetch:
                  </p>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden hover:border-[#00ff00] transition-colors">
                    <div className="px-4 py-2 bg-[#2a2a2a] border-b border-[#333] flex items-center justify-between">
                      <span className="text-xs text-gray-500">index.ts</span>
                      <span className="text-xs text-[#00ff00]">
                        ◉ typescript
                      </span>
                    </div>
                    <div className="p-4">
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
              <div className="inline-block px-6 py-4 bg-[#1a1a1a] border border-[#333] rounded-lg">
                <p className="text-gray-400 mb-4">
                  <span className="text-[#00ffff]">[INFO]</span> ModelFetch is
                  currently a work in progress. Join us in building the
                  world&apos;s most popular TypeScript/JavaScript SDK for MCP
                  servers.
                </p>
                <Link
                  className="text-[#00ff00] hover:text-[#00ffff] hover:underline transition-colors"
                  href="https://github.com/phuctm97/modelfetch"
                >
                  <span className="mr-2">◆</span>View on GitHub →
                </Link>
              </div>
            </section>

            {/* Footer Terminal */}
            <div className="mt-16 text-center text-xs text-gray-600">
              <div className="mb-2">
                <span className="text-[#00ff00]">$</span> echo &quot;Built with
                ❤️ by developers, for developers&quot;
              </div>
              <div>Built with ❤️ by developers, for developers</div>
              <div className="mt-2">
                <span className="text-[#00ff00]">$</span>{" "}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </TerminalAnimations>
  );
}
