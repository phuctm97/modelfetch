import Link from "next/link";

import { CodeBlock } from "~/lib/code-block";

import styles from "./page.module.css";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with fade-in animation */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
        <div className="container mx-auto px-6 py-32 relative">
          <div className={`max-w-3xl mx-auto text-center ${styles.animateFadeIn}`}>
            <h1 className="text-6xl md:text-7xl font-thin tracking-tight text-gray-900 mb-8">
              Model<span className="font-normal">Fetch</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              A TypeScript/JavaScript SDK for building MCP servers with a delightful developer experience.
              Deploy anywhere TypeScript runs.
            </p>
            <div className="flex gap-6 justify-center">
              <Link
                className="group px-8 py-4 bg-gray-900 text-white font-medium rounded-none hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                href="/docs"
              >
                Get Started
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-none hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
                href="/docs/examples"
              >
                Examples
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with staggered animations */}
      <section className="py-32 bg-gray-50/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-4xl font-thin text-center text-gray-900 mb-20 ${styles.animateFadeInUp}`}>
              Why ModelFetch?
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className={`text-center ${styles.animateFadeInUp} ${styles.animationDelay100}`}>
                <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-8" />
                <h3 className="text-2xl font-light mb-4 text-gray-900">Runtime Agnostic</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Write once, run anywhere. Deploy your MCP servers on Node.js, Bun, or Deno with the same codebase.
                </p>
              </div>
              <div className={`text-center ${styles.animateFadeInUp} ${styles.animationDelay200}`}>
                <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-8" />
                <h3 className="text-2xl font-light mb-4 text-gray-900">Developer Experience</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Powerful CLI with live reload and MCP inspector integration for seamless development and debugging.
                </p>
              </div>
              <div className={`text-center ${styles.animateFadeInUp} ${styles.animationDelay300}`}>
                <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-8" />
                <h3 className="text-2xl font-light mb-4 text-gray-900">TypeScript First</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Full TypeScript support with type safety and excellent IDE integration out of the box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section with clean code blocks */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-thin text-center text-gray-900 mb-20 ${styles.animateFadeInUp}`}>
              Quick Start
            </h2>
            
            <div className={`space-y-16 ${styles.animateFadeInUp} ${styles.animationDelay100}`}>
              <div>
                <p className="text-gray-600 mb-6 font-light">
                  Install ModelFetch for your runtime:
                </p>
                <div className="shadow-sm hover:shadow-md transition-shadow duration-300">
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

              <div>
                <p className="text-gray-600 mb-6 font-light">
                  Create your MCP server:
                </p>
                <div className="shadow-sm hover:shadow-md transition-shadow duration-300">
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

              <div>
                <p className="text-gray-600 mb-6 font-light">
                  Run with ModelFetch:
                </p>
                <div className="shadow-sm hover:shadow-md transition-shadow duration-300">
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
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 mb-6 font-light">
            ModelFetch is currently a work in progress. Join us in building the world&apos;s most popular TypeScript/JavaScript SDK for MCP servers.
          </p>
          <Link
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium inline-flex items-center group"
            href="https://github.com/phuctm97/modelfetch"
          >
            View on GitHub
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}