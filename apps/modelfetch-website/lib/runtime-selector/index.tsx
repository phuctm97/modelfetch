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

interface SiProps {
  className?: string;
}

function SiAws(props: SiProps) {
  return (
    <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M180.4 203c-.7 22.7 10.6 32.7 10.9 39.1a8.2 8.2 0 01-4.1 6.3l-12.8 9a10.7 10.7 0 01-5.6 1.9c-.4 0-8.2 1.8-20.5-25.6a78.6 78.6 0 01-62.6 29.5c-16.3.9-60.4-9.2-58.1-56.2-1.6-38.3 34.1-62.1 70.9-60.1 7.1 0 21.6.4 47 6.3v-15.6c2.7-26.5-14.7-47-44.8-43.9-2.4 0-19.4-.5-45.8 10.1-7.4 3.4-8.3 2.8-10.8 2.8-7.4 0-4.4-21.5-2.9-24.2C46.4 76 77.1 64 107.1 64.2a76.9 76.9 0 0155.7 17.3 70.3 70.3 0 0117.7 52.4v69.3zM94 235.4c32.4-.5 46.2-20 49.3-30.5 2.5-10.1 2.1-16.4 2.1-27.4-9.7-2.3-23.6-4.9-39.6-4.9-15.2-1.1-42.8 5.6-41.7 32.3-1.2 16.8 11.1 31.4 30 30.5zm170.9 23.1c-7.9.7-11.5-4.9-12.7-10.4L202.4 83.4c-1-2.8-1.6-5.7-1.9-8.6a4.6 4.6 0 013.9-5.3h22.3c8.8-.9 11.6 6 12.6 10.4L275 220.7l33.2-140.8c.5-3.2 2.9-11.1 12.8-10.2h17.2c2.2-.2 11.1-.5 12.7 10.4l33.4 142.6L421 80.1c.5-2.2 2.7-11.4 12.7-10.4h19.7c.9-.1 6.2-.8 5.3 8.6-.4 1.9 3.4-10.7-52.8 169.9-1.2 5.5-4.8 11.1-12.7 10.4h-18.7c-10.9 1.2-12.5-9.7-12.7-10.8l-33.1-137.1-32.8 137c-.2 1.1-1.7 11.9-12.7 10.8h-18.3zm273.5 5.6c-5.9 0-33.9-.3-57.4-12.3a12.8 12.8 0 01-7.8-11.9v-10.8c0-8.5 6.2-6.9 8.8-5.9 10 4.1 16.5 7.1 28.8 9.6 36.7 7.5 52.8-2.3 56.7-4.5 13.2-7.8 14.2-25.7 5.3-35-10.5-8.8-15.5-9.1-53.1-21-4.6-1.3-43.7-13.6-43.8-52.4-.6-28.2 25.1-56.2 69.5-56 12.7 0 46.4 4.1 55.6 15.6 1.4 2.1 2 4.6 1.9 7v10.1c0 4.4-1.6 6.7-4.9 6.7-7.7-.9-21.4-11.2-49.2-10.8-6.9-.4-39.9.9-38.4 25-.4 19 26.6 26.1 29.7 26.9 36.5 11 48.7 12.8 63.1 29.6 17.1 22.3 7.9 48.3 4.4 55.4-19.1 37.5-68.4 34.4-69.3 34.4zM578.6 369c-70 51.7-171.7 79.3-258.5 79.3A469.1 469.1 0 012.8 327.5c-6.5-5.9-.8-14 7.2-9.5a637.4 637.4 0 00316.9 84.1 630.2 630.2 0 00241.6-49.6c11.8-5 21.8 7.8 10.1 16.4zm29.2-33.3c-9-11.5-59.3-5.4-81.8-2.7-6.8.8-7.9-5.1-1.8-9.5 40.1-28.2 105.9-20.1 113.4-10.6 7.6 9.5-2.1 75.4-39.6 106.9-5.8 4.9-11.3 2.3-8.7-4.1 8.4-21.3 27.4-68.5 18.4-80z" />
    </svg>
  );
}

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
  {
    id: "aws-lambda",
    name: "AWS Lambda",
    icon: SiAws,
    installCommand: "npm install @modelfetch/aws-lambda",
    codeExample: `import handle from "@modelfetch/aws-lambda";
import server from "./server";

export const handler: AWSLambda.LambdaFunctionURLHandler = handle(server);`,
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
