<div align="center">
  <h1>ModelFetch</h1>
  <p>ModelFetch is a delightful TypeScript/JavaScript SDK for building and deploying MCP servers anywhere TypeScript/JavaScript runs.</p>
  <p>
    <a href="https://github.com/phuctm97/modelfetch/releases/latest">
      <img src="https://img.shields.io/github/v/release/phuctm97/modelfetch" alt="Release">
    </a>
    <a href="https://github.com/phuctm97/modelfetch/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/phuctm97/modelfetch" alt="License">
    </a>
    <a href="https://www.modelfetch.com/docs">
      <img src="https://img.shields.io/badge/docs-modelfetch.com-blue" alt="Documentation">
    </a>
  </p>
</div>

---

## 🚀 Features

- **Multi-Runtime**: Write once, run anywhere: Node.js, Next.js, Bun, Deno, Vercel, Cloudflare, Netlify, Fastly, Supabase, Gcore, AWS Lambda, and Azure Functions
- **Official SDK**: Built on top of the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) to avoid lock-in, guarantee long-term support, and ensure up-to-date implementation
- **Hot Reload**: Development server with automatic reloading
- **MCP Inspector**: Built-in integration for testing and debugging
- **Modular Design**: Platform-specific package for optimal performance

## 🏁 Quick Start

Get started in seconds using our `create-modelfetch` CLI:

```bash
npx -y create-modelfetch@latest
```

## 🔧 How It Works

ModelFetch works with any [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk). Here's all it takes:

### Create your [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) with the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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
        text: `🎲 You rolled a ${1 + Math.floor(Math.random() * sides)}!`,
      },
    ],
  }),
);

export default server;
```

### Run it anywhere with ModelFetch's [`handle()`](https://www.modelfetch.com/docs#the-handle-function) function

#### Node.js

```typescript
import handle from "@modelfetch/node"; // Choose your runtime
import server from "./server"; // Import your server

handle(server); // That's it — ModelFetch handles all runtime-specific details
```

#### Next.js

```typescript
import handle from "@modelfetch/next"; // Choose your runtime
import server from "./server"; // Import your server

const handler = handle(server); // That's it — ModelFetch handles all runtime-specific details

export const GET = handler;
export const POST = handler;
export const DELETE = handler;
```

#### Bun

```typescript
import handle from "@modelfetch/bun"; // Choose your runtime
import server from "./server.ts"; // Import your server

handle(server); // That's it — ModelFetch handles all runtime-specific details
```

#### Deno

```typescript
import handle from "@modelfetch/deno"; // Choose your runtime
import server from "./server.ts"; // Import your server

handle(server); // That's it — ModelFetch handles all runtime-specific details
```

#### Vercel

```typescript
import handle from "@modelfetch/vercel"; // Choose your runtime
import server from "./server"; // Import your server

const handler = handle(server); // That's it — ModelFetch handles all runtime-specific details

export const GET = handler;
export const POST = handler;
export const DELETE = handler;
```

#### Cloudflare

```typescript
import handle from "@modelfetch/cloudflare"; // Choose your runtime
import server from "./server"; // Import your server

export default {
  fetch: handle(server), // That's it — ModelFetch handles all runtime-specific details
} satisfies ExportedHandler<Env>;
```

#### Netlify

```typescript
import handle from "@modelfetch/netlify"; // Choose your runtime
import server from "../server.ts"; // Import your server

export default handle(server); // That's it — ModelFetch handles all runtime-specific details
```

#### Fastly

```typescript
import handle from "@modelfetch/fastly"; // Choose your runtime
import server from "./server"; // Import your server

handle(server); // That's it — ModelFetch handles all runtime-specific details
```

#### Supabase

```typescript
import handle from "@modelfetch/supabase"; // Choose your runtime
import server from "./server.ts"; // Import your server

handle("mcp-server", server); // That's it — ModelFetch handles all runtime-specific details
```

#### Gcore

```typescript
import handle from "@modelfetch/gcore"; // Choose your runtime
import server from "./server"; // Import your server

handle(server); // That's it — ModelFetch handles all runtime-specific details
```

#### AWS Lambda

```typescript
import handle from "@modelfetch/aws-lambda"; // Choose your runtime
import server from "./server"; // Import your server

export const handler: AWSLambda.LambdaFunctionURLHandler = handle(server); // That's it — ModelFetch handles all runtime-specific details
```

#### Azure Functions

```typescript
import handle from "@modelfetch/azure-functions"; // Choose your runtime
import server from "./server.js"; // Import your server

handle(server); // That's it — ModelFetch handles all runtime-specific details
```

That's just a few lines of code to make your [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) work across all supported platforms.

## ⚡ The [`handle()`](https://www.modelfetch.com/docs#the-handle-function) Function

Every runtime package exports a default [`handle()`](https://www.modelfetch.com/docs#the-handle-function) function that takes an [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance as its first parameter and handles all runtime-specific details:

```typescript
import handle from "@modelfetch/node"; // Choose your runtime
import server from "./server"; // Import your server

handle(server); // That's it — ModelFetch handles all runtime-specific details
```

## 📦 Runtimes

ModelFetch provides runtime-specific packages that handle tedious platform differences while you focus on building your MCP server capabilities. Each package maintains a [consistent API](https://www.modelfetch.com/docs#the-handle-function) across different runtimes.

| Package                                                          | Description                           | Status   |
| ---------------------------------------------------------------- | ------------------------------------- | -------- |
| [`@modelfetch/node`](libs/modelfetch-node)                       | Run simple MCP servers with Node.js   | ✅ Ready |
| [`@modelfetch/next`](libs/modelfetch-next)                       | Run flexible MCP servers with Next.js | ✅ Ready |
| [`@modelfetch/bun`](libs/modelfetch-bun)                         | Run fast MCP servers with Bun         | ✅ Ready |
| [`@modelfetch/deno`](libs/modelfetch-deno)                       | Run secure MCP servers with Deno      | ✅ Ready |
| [`@modelfetch/vercel`](libs/modelfetch-vercel)                   | Deploy MCP servers to Vercel          | ✅ Ready |
| [`@modelfetch/cloudflare`](libs/modelfetch-cloudflare)           | Deploy MCP servers to Cloudflare      | ✅ Ready |
| [`@modelfetch/netlify`](libs/modelfetch-netlify)                 | Deploy MCP servers to Netlify         | ✅ Ready |
| [`@modelfetch/fastly`](libs/modelfetch-fastly)                   | Deploy MCP servers to Fastly          | ✅ Ready |
| [`@modelfetch/supabase`](libs/modelfetch-supabase)               | Deploy MCP servers to Supabase        | ✅ Ready |
| [`@modelfetch/gcore`](libs/modelfetch-gcore)                     | Deploy MCP servers to Gcore           | ✅ Ready |
| [`@modelfetch/aws-lambda`](libs/modelfetch-aws-lambda)           | Deploy MCP servers to AWS Lambda      | ✅ Ready |
| [`@modelfetch/azure-functions`](libs/modelfetch-azure-functions) | Deploy MCP servers to Azure Functions | ✅ Ready |

## 🛠️ Development

### Prerequisites

- Node.js 22+
- pnpm 10+

### Initial Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/phuctm97/modelfetch.git
   cd modelfetch
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Type check, lint, and build all projects
   ```bash
   pnpm exec nx run-many -t typecheck lint build
   ```

### Common Commands

```bash
# Run development server for a project
pnpm exec nx dev modelfetch-website

# Type check all projects
pnpm exec nx run-many -t typecheck

# Lint and auto-fix all projects
pnpm exec nx run-many -t lint --args=--fix

# Build all projects
pnpm exec nx run-many -t build

# Format code
pnpm -w format
```

## 📚 Documentation

- [Model Context Protocol - TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Model Context Protocol - Documentation](https://modelcontextprotocol.io)
- [ModelFetch - Website](https://www.modelfetch.com)
- [ModelFetch - Documentation](https://www.modelfetch.com/docs)

## 📄 License

ModelFetch is [MIT licensed](LICENSE).

---

<div align="center">
  <p>Built with ❤️ by <a href="https://x.com/phuctm97">Minh-Phuc Tran</a></p>
</div>
