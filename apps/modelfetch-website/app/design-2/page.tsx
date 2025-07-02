import Link from "next/link";

import { CodeBlock } from "~/lib/code-block";

import styles from "./page.module.css";

export default function Page() {
  return (
    <>
      {/* Background animated gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 ${styles.animateGradientShift}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-tl from-blue-600/30 via-purple-600/30 to-pink-600/30 ${styles.animateGradientShiftReverse}`}
        />

        {/* Floating shapes */}
        <div
          className={`absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl ${styles.animateFloat}`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl ${styles.animateFloatDelayed}`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl ${styles.animatePulseSlow}`}
        />
      </div>

      <main className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1
              className={`text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent ${styles.animateTextShimmer}`}
            >
              ModelFetch 🚀
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium leading-relaxed">
              A TypeScript/JavaScript SDK for building MCP servers with a
              <span
                className={`inline-block mx-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-yellow-300 font-bold ${styles.animateBounceSlow}`}
              >
                ✨ delightful ✨
              </span>
              developer experience!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                className="group relative px-8 py-4 font-bold text-lg overflow-hidden rounded-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-1"
                href="/docs"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl" />
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl translate-y-1 group-hover:translate-y-0 transition-transform" />
                <span className="relative text-white">Get Started 🎯</span>
              </Link>
              <Link
                className="group relative px-8 py-4 font-bold text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl transform transition-all duration-300 hover:scale-110 hover:-rotate-1 hover:bg-white/20 hover:border-white/50"
                href="/docs/examples"
              >
                <span className="text-white">View Examples 💡</span>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h2
              className={`text-4xl font-black mb-12 text-center text-white ${styles.animatePulseSlow}`}
            >
              Why ModelFetch? 🤔
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-white/20">
                <div className={`text-5xl mb-4 ${styles.animateBounceSlow}`}>
                  🌍
                </div>
                <h3 className="text-2xl font-bold mb-3 text-yellow-300">
                  Runtime Agnostic
                </h3>
                <p className="text-white/90">
                  Write once, run anywhere! Deploy on Node.js, Bun, or Deno with
                  the same codebase.
                </p>
              </div>
              <div className="group text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-white/20">
                <div
                  className={`text-5xl mb-4 ${styles.animateBounceSlow} ${styles.animationDelay200}`}
                >
                  💖
                </div>
                <h3 className="text-2xl font-bold mb-3 text-pink-300">
                  Developer Experience
                </h3>
                <p className="text-white/90">
                  Powerful CLI with live reload and MCP inspector for seamless
                  debugging!
                </p>
              </div>
              <div className="group text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-white/20">
                <div
                  className={`text-5xl mb-4 ${styles.animateBounceSlow} ${styles.animationDelay400}`}
                >
                  ⚡
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-300">
                  TypeScript First
                </h3>
                <p className="text-white/90">
                  Full TypeScript support with type safety and excellent IDE
                  integration!
                </p>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-black mb-12 text-center text-white flex items-center justify-center gap-3">
              <span className={styles.animateSpinSlow}>⚡</span>
              Quick Start
              <span className={styles.animateSpinSlowReverse}>⚡</span>
            </h2>
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                <p className="mb-4 text-white/90 font-semibold text-lg flex items-center gap-2">
                  <span className="text-2xl">📦</span> Install ModelFetch for
                  your runtime:
                </p>
                <div className="overflow-hidden rounded-2xl">
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

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                <p className="mb-4 text-white/90 font-semibold text-lg flex items-center gap-2">
                  <span className="text-2xl">🛠️</span> Create your MCP server:
                </p>
                <div className="overflow-hidden rounded-2xl">
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
                    title="server.ts"
                  />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                <p className="mb-4 text-white/90 font-semibold text-lg flex items-center gap-2">
                  <span className="text-2xl">🚀</span> Run with ModelFetch:
                </p>
                <div className="overflow-hidden rounded-2xl">
                  <CodeBlock
                    code={`import handle from "@modelfetch/node";
import server from "./server";

handle(server);`}
                    lang="typescript"
                    title="index.ts"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Status Section */}
          <section className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12 transform transition-all duration-300 hover:scale-[1.02]">
            <p className="text-white/90 mb-6 text-lg font-medium">
              ModelFetch is currently a work in progress. Join us in building
              the world&apos;s most popular TypeScript/JavaScript SDK for MCP
              servers! 🌟
            </p>
            <Link
              className="inline-flex items-center gap-2 text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors group"
              href="https://github.com/phuctm97/modelfetch"
            >
              <span className="group-hover:animate-bounce">View on GitHub</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
