<div align="center">
  <h1>ModelFetch</h1>

  <h3>Create, build, and deploy MCP servers anywhere TypeScript/JavaScript runs</h3>

  <p>A delightful TypeScript/JavaScript SDK for MCP servers</p>
</div>

---

## 🚀 Features

- **Multi-Runtime**: Write once, run anywhere: Node.js, Bun, Deno, Cloudflare Workers, Vercel, Netlify, etc.
- **Official SDK**: Built on top of the official MCP TypeScript SDK to avoid lock-in and ensure up-to-date implementation
- **Live Reload**: Development server with automatic reloading
- **MCP Inspector**: Built-in integration for testing and debugging
- **Modular Design**: Platform-specific packages for optimal performance

## 📦 Packages

ModelFetch provides runtime-specific packages for optimal performance:

| Package                                                | Description                | Status         |
| ------------------------------------------------------ | -------------------------- | -------------- |
| [`@modelfetch/node`](libs/modelfetch-node)             | Node.js runtime support    | ✅ Ready       |
| [`@modelfetch/bun`](libs/modelfetch-bun)               | Bun runtime support        | ✅ Ready       |
| [`@modelfetch/deno`](libs/modelfetch-deno)             | Deno runtime support       | ✅ Ready       |
| [`@modelfetch/cloudflare`](libs/modelfetch-cloudflare) | Cloudflare Workers support | 🚧 In Progress |
| [`@modelfetch/vercel`](libs/modelfetch-vercel)         | Vercel Functions support   | 🚧 In Progress |
| [`@modelfetch/netlify`](libs/modelfetch-netlify)       | Netlify Functions support  | 🚧 In Progress |
| [`modelfetch`](libs/modelfetch)                        | CLI tools for development  | 🚧 In Progress |

## 💻 Example

Here's a simple MCP server using ModelFetch:

```typescript
// server.ts
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

```typescript
// index.ts
import handle, { getEndpoint } from "@modelfetch/node";
import server from "./server";

handle(server, (address) => {
  console.log(`MCP server is available at ${getEndpoint(address)}`);
});
```

## 🛠️ Development

### Prerequisites

- Node.js 22+
- pnpm 10+

### Setup

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
pnpm exec nx dev @modelfetch/website

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
