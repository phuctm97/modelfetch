"use client";

import {
  SiBun,
  SiCloudflare,
  SiDeno,
  SiNodedotjs,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { useState } from "react";

const runtimes = [
  {
    id: "node",
    name: "Node.js",
    icon: SiNodedotjs,
    installCommand: "npm install @modelfetch/node",
    codeExample: `import handle from "@modelfetch/node";
import server from "./server";

handle(server);`,
  },
  {
    id: "bun",
    name: "Bun",
    icon: SiBun,
    installCommand: "bun add @modelfetch/bun",
    codeExample: `import handle from "@modelfetch/bun";
import server from "./server.ts";

handle(server);`,
  },
  {
    id: "deno",
    name: "Deno",
    icon: SiDeno,
    installCommand: "deno add npm:@modelfetch/deno",
    codeExample: `import handle from "@modelfetch/deno";
import server from "./server.ts";

handle(server);`,
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    icon: SiCloudflare,
    installCommand: "npm install @modelfetch/cloudflare",
    codeExample: `import handle from "@modelfetch/cloudflare";
import server from "./server";

export default {
  fetch: handle(server),
} satisfies ExportedHandler<Env>;`,
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: SiVercel,
    installCommand: "npm install @modelfetch/vercel",
    codeExample: `import handle from "@modelfetch/vercel";
import server from "./server";

const handler = handle(server);

export const GET = handler;
export const POST = handler;
export const DELETE = handler;`,
  },
];

export function RuntimeSelector() {
  const [selectedRuntime, setSelectedRuntime] = useState(runtimes[0]);

  return (
    <div className="space-y-8">
      {/* Step 1: Create your MCP server */}
      <div>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          <span className="text-[#008f00] dark:text-[#00ff00]">~</span> Create
          your MCP server with the official MCP TypeScript SDK:
        </p>
        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-colors hover:border-[#008f00] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00]">
          <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#333] dark:bg-[#2a2a2a]">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              server.ts
            </span>
            <span className="text-xs text-[#008f00] dark:text-[#00ff00]">
              ◉ typescript
            </span>
          </div>
          <div className="p-3 sm:p-4">
            <DynamicCodeBlock
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

      {/* Step 2: Run your MCP server */}
      <div>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          <span className="text-[#008f00] dark:text-[#00ff00]">~</span> Run your
          MCP server with the ModelFetch runtime handler:
        </p>

        {/* Runtime selector */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {runtimes.map((runtime) => (
              <button
                key={runtime.id}
                className={`rounded border-2 px-4 py-2 font-mono text-sm transition-all ${
                  selectedRuntime.id === runtime.id
                    ? "border-[#008f00] bg-[#008f00] text-white shadow-[0_0_10px_rgba(0,143,0,0.5)] dark:border-[#00ff00] dark:bg-[#00ff00] dark:text-black dark:shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                    : "border-gray-300 bg-white text-gray-600 hover:border-[#008f00] dark:border-[#333] dark:bg-[#1a1a1a] dark:text-gray-400 dark:hover:border-[#00ff00]"
                }`}
                onClick={() => {
                  setSelectedRuntime(runtime);
                }}
              >
                <runtime.icon className="mr-2 inline h-4 w-4" />
                {runtime.name}
              </button>
            ))}
          </div>
        </div>

        {/* Install command */}
        <div className="mb-4">
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-colors hover:border-[#008f00] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00]">
            <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#333] dark:bg-[#2a2a2a]">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                install.sh
              </span>
              <span className="text-xs text-[#008f00] dark:text-[#00ff00]">
                ◉ bash
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <DynamicCodeBlock
                code={selectedRuntime.installCommand}
                lang="bash"
              />
            </div>
          </div>
        </div>

        {/* Code example */}
        <div>
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-colors hover:border-[#008f00] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00]">
            <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#333] dark:bg-[#2a2a2a]">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {selectedRuntime.id === "vercel"
                  ? "app/[[...path]]/route.ts"
                  : "src/index.ts"}
              </span>
              <span className="text-xs text-[#008f00] dark:text-[#00ff00]">
                ◉ typescript
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <DynamicCodeBlock
                code={selectedRuntime.codeExample}
                lang="typescript"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
