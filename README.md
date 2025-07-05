<div align="center">
  <h1>ModelFetch</h1>

  <h3>Create, build, and deploy MCP servers anywhere TypeScript/JavaScript runs</h3>

  <p>A delightful TypeScript/JavaScript SDK for developing MCP servers</p>
</div>

---

## 🚀 Features

- **Runtime Agnostic**: Deploy to Node.js, Bun, Deno, Cloudflare Workers, Vercel, Netlify, and more
- **TypeScript First**: Built with TypeScript for excellent type safety and developer experience
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
  "hello",
  {
    title: "Say Hello",
    description: "Say hello to someone",
    inputSchema: { name: z.string() },
  },
  ({ name }) => ({
    content: [
      {
        type: "text",
        text: `Hello, ${name}! 👋`,
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

- Node.js 22.15+
- pnpm 10.12+

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/modelfetch/modelfetch.git
   cd modelfetch
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Verify all projects
   ```bash
   pnpm exec nx run-many -t typecheck lint build
   ```

### Common Commands

```bash
# Run development server for a project
pnpm exec nx dev @modelfetch/website

# Type check all projects
pnpm exec nx run-many -t typecheck

# Lint all projects
pnpm exec nx run-many -t lint --args=--fix

# Build all projects
pnpm exec nx run-many -t build

# Format code
pnpm -w format
```

## 📄 License

ModelFetch is [MIT licensed](LICENSE).

## Learn More

- [Model Context Protocol - Documentation](https://modelcontextprotocol.io)
- [Model Context Protocol - TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [ModelFetch - Website](https://preview.modelfetch.com)
- [ModelFetch - Documentation](https://preview.modelfetch.com/docs)
- [ModelFetch - GitHub](https://github.com/modelfetch/modelfetch)

---

<div align="center">
  <p>Built with ❤️ by the ModelFetch team</p>
</div>
