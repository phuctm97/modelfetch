"use client";

import {
  SiBun,
  SiCloudflare,
  SiDeno,
  SiFastly,
  SiGcore,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiSupabase,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { useState } from "react";

interface SiProps {
  className?: string;
}

function SiAws(props: SiProps) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4.51 7.687c0 .197.02.357.058.475.042.117.096.245.17.384a.233.233 0 01.037.123c0 .053-.032.107-.1.16l-.336.224a.255.255 0 01-.138.048c-.054 0-.107-.026-.16-.074a1.652 1.652 0 01-.192-.251 4.137 4.137 0 01-.164-.315c-.416.491-.937.737-1.565.737-.447 0-.804-.129-1.064-.385-.261-.256-.394-.598-.394-1.025 0-.454.16-.822.484-1.1.325-.278.756-.416 1.304-.416.18 0 .367.016.564.042.197.027.4.07.612.118v-.39c0-.406-.085-.689-.25-.854-.17-.166-.458-.246-.868-.246-.186 0-.377.022-.574.07a4.23 4.23 0 00-.575.181 1.525 1.525 0 01-.186.07.326.326 0 01-.085.016c-.075 0-.112-.054-.112-.166v-.262c0-.085.01-.15.037-.186a.399.399 0 01.15-.113c.185-.096.409-.176.67-.24.26-.07.537-.101.83-.101.633 0 1.096.144 1.394.432.293.288.442.726.442 1.314v1.73h.01zm-2.161.811c.175 0 .356-.032.548-.096.192-.064.362-.182.505-.342a.848.848 0 00.181-.341c.032-.129.054-.283.054-.465V7.03a4.43 4.43 0 00-.49-.09 3.996 3.996 0 00-.5-.033c-.357 0-.617.07-.793.214-.176.144-.26.347-.26.614 0 .25.063.437.196.566.128.133.314.197.559.197zm4.273.577c-.096 0-.16-.016-.202-.054-.043-.032-.08-.106-.112-.208l-1.25-4.127a.938.938 0 01-.048-.214c0-.085.042-.133.127-.133h.522c.1 0 .17.016.207.053.043.032.075.107.107.208l.894 3.535.83-3.535c.026-.106.058-.176.101-.208a.365.365 0 01.213-.053h.426c.1 0 .17.016.212.053.043.032.08.107.102.208l.84 3.578.92-3.578a.459.459 0 01.107-.208.347.347 0 01.208-.053h.495c.085 0 .133.043.133.133 0 .027-.006.054-.01.086a.768.768 0 01-.038.133l-1.283 4.127c-.031.107-.069.177-.111.209a.34.34 0 01-.203.053h-.457c-.101 0-.17-.016-.213-.053-.043-.038-.08-.107-.101-.214L8.213 5.37l-.82 3.439c-.026.107-.058.176-.1.213-.043.038-.118.054-.213.054h-.458zm6.838.144a3.51 3.51 0 01-.82-.096c-.266-.064-.473-.134-.612-.214-.085-.048-.143-.101-.165-.15a.38.38 0 01-.031-.149v-.272c0-.112.042-.166.122-.166a.3.3 0 01.096.016c.032.011.08.032.133.054.18.08.378.144.585.187.213.042.42.064.633.064.336 0 .596-.059.777-.176a.575.575 0 00.277-.508.52.52 0 00-.144-.373c-.095-.102-.276-.193-.537-.278l-.772-.24c-.388-.123-.676-.305-.851-.545a1.275 1.275 0 01-.266-.774c0-.224.048-.422.143-.593.096-.17.224-.32.384-.438a1.7 1.7 0 01.553-.277c.213-.064.436-.091.67-.091.118 0 .24.005.357.021a3.4 3.4 0 01.649.145c.096.032.17.064.224.096a.461.461 0 01.16.133.289.289 0 01.047.176v.251c0 .112-.042.171-.122.171a.552.552 0 01-.202-.064 2.428 2.428 0 00-1.022-.208c-.303 0-.543.048-.708.15-.165.1-.25.256-.25.475 0 .149.053.277.16.379.106.101.303.202.585.293l.756.24c.383.123.66.294.825.513.165.219.244.47.244.748 0 .23-.047.437-.138.619a1.435 1.435 0 01-.388.47c-.165.133-.362.23-.591.299a2.52 2.52 0 01-.761.112z" />
      <path d="M14.465 11.813c-1.75 1.297-4.294 1.986-6.481 1.986-3.065 0-5.827-1.137-7.913-3.027-.165-.15-.016-.353.18-.235 2.257 1.313 5.04 2.109 7.92 2.109 1.941 0 4.075-.406 6.039-1.239.293-.133.543.192.255.406z" />
      <path d="M15.194 10.98c-.223-.287-1.479-.138-2.048-.069-.17.022-.197-.128-.043-.24 1-.705 2.645-.502 2.836-.267.192.24-.053 1.89-.99 2.68-.143.123-.281.06-.217-.1.212-.53.686-1.72.462-2.003z" />
    </svg>
  );
}

function SiAzure(props: SiProps) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15.37 13.68l-4-12a1 1 0 00-1-.68H5.63a1 1 0 00-.95.68l-4.05 12a1 1 0 001 1.32h2.93a1 1 0 00.94-.68l.61-1.78 3 2.27a1 1 0 00.6.19h4.68a1 1 0 00.98-1.32zm-5.62.66a.32.32 0 01-.2-.07L3.9 10.08l-.09-.07h3l.08-.21 1-2.53 2.24 6.63a.34.34 0 01-.38.44zm4.67 0H10.7a1 1 0 000-.66l-4.05-12h3.72a.34.34 0 01.32.23l4.05 12a.34.34 0 01-.32.43z" />
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
    id: "next",
    name: "Next.js",
    icon: SiNextdotjs,
    installCommand: "npm install @modelfetch/next",
    codeExample: `import handle from "@modelfetch/next";
import server from "./server";

const handler = handle(server);

export const GET = handler;
export const POST = handler;
export const DELETE = handler;`,
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
    installCommand: "deno add jsr:@modelfetch/deno",
    codeExample: `import handle from "@modelfetch/deno";
import server from "./server.ts";

handle(server);`,
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
    id: "netlify",
    name: "Netlify",
    icon: SiNetlify,
    installCommand: "deno add jsr:@modelfetch/netlify",
    codeExample: `import handle from "@modelfetch/netlify";
import server from "../server.ts";

export default handle(server);`,
  },
  {
    id: "fastly",
    name: "Fastly",
    icon: SiFastly,
    installCommand: "npm install @modelfetch/fastly",
    codeExample: `import handle from "@modelfetch/fastly";
import server from "./server";

handle(server);`,
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: SiSupabase,
    installCommand: "deno add jsr:@modelfetch/supabase",
    codeExample: `import handle from "@modelfetch/supabase";
import server from "./server.ts";

handle("mcp-server", server);`,
  },
  {
    id: "gcore",
    name: "Gcore",
    icon: SiGcore,
    installCommand: "npm install @modelfetch/gcore",
    codeExample: `import handle from "@modelfetch/gcore";
import server from "./server";

handle(server);`,
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
  {
    id: "azure-functions",
    name: "Azure Functions",
    icon: SiAzure,
    installCommand: "npm install @modelfetch/azure-functions",
    codeExample: `import handle from "@modelfetch/azure-functions";
import server from "./server.js";

handle(server);`,
  },
];

function getEntryPointPath(runtimeId: string): string {
  switch (runtimeId) {
    case "next":
    case "vercel": {
      return "app/[[...path]]/route.ts";
    }
    case "netlify": {
      return "netlify/edge-functions/index.ts";
    }
    case "supabase": {
      return "supabase/functions/mcp-server/index.ts";
    }
    default: {
      return "src/index.ts";
    }
  }
}

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
                {getEntryPointPath(selectedRuntime.id)}
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
