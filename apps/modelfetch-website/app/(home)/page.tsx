import Link from "next/link";
import { CodeBlock } from "~/lib/code-block";

export default async function Page() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">ModelFetch</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A TypeScript/JavaScript SDK for building MCP (Model Context
            Protocol) servers with a delightful developer experience and
            deploying them anywhere TypeScript/JavaScript runs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/docs/examples"
              className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              View Examples
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why ModelFetch?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Runtime Agnostic</h3>
              <p className="text-muted-foreground">
                Write once, run anywhere. Deploy your MCP servers on Node.js,
                Bun, or Deno with the same codebase.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">
                Developer Experience
              </h3>
              <p className="text-muted-foreground">
                Powerful CLI with live reload and MCP inspector integration for
                seamless development and debugging.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">TypeScript First</h3>
              <p className="text-muted-foreground">
                Full TypeScript support with type safety and excellent IDE
                integration out of the box.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Start</h2>
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-muted-foreground">
                Install ModelFetch for your runtime:
              </p>
              <CodeBlock
                lang="bash"
                code={`# For Node.js
npm install @modelfetch/node

# For Bun
bun add @modelfetch/bun

# For Deno
deno add jsr:@modelfetch/deno`}
              />
            </div>

            <div>
              <p className="mb-4 text-muted-foreground">
                Create your MCP server (server.ts):
              </p>
              <CodeBlock
                lang="typescript"
                title="server.ts"
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
              />
            </div>

            <div>
              <p className="mb-4 text-muted-foreground">
                Run with ModelFetch (index.ts):
              </p>
              <CodeBlock
                lang="typescript"
                title="index.ts"
                code={`import handle from "@modelfetch/node";
import server from "./server";

handle(server);`}
              />
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="text-center">
          <p className="text-muted-foreground mb-4">
            ModelFetch is currently a work in progress. Join us in building the
            world's most popular TypeScript/JavaScript SDK for MCP servers.
          </p>
          <Link
            href="https://github.com/phuctm97/modelfetch"
            className="text-primary hover:underline"
          >
            View on GitHub →
          </Link>
        </section>
      </div>
    </main>
  );
}
