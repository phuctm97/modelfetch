# Example Cloudflare MCP Server (TypeScript)

> [!NOTE]
> This is an internal example MCP server. To get started with [ModelFetch](https://www.modelfetch.com), please visit the [Quick Start documentation](https://www.modelfetch.com/docs/quick-start).

## Quick Start

### Running the MCP server

Run your MCP server locally:

```bash
pnpm exec nx dev example-cloudflare-ts
```

### Deploying the MCP server

Deploy your MCP server to Cloudflare:

```bash
pnpm exec nx deploy example-cloudflare-ts
```

### Deleting the MCP server

Delete your MCP server and all its Cloudflare resources:

```bash
pnpm exec nx delete example-cloudflare-ts
```

### Testing with the MCP Inspector

Run the MCP Inspector locally:

```bash
npx -y @modelcontextprotocol/inspector@latest
```

Then, connect to your MCP server using Streamable HTTP transport (default URL: `http://localhost:8787/mcp`).

## Project Structure

```
example-cloudflare-ts/
├── src/
│   ├── index.ts      # Cloudflare Worker entry point
│   └── server.ts     # MCP server implementation
├── wrangler.jsonc    # Cloudflare configuration
├── tsconfig.json
├── package.json
└── README.md
```

## Adding Features

### Tools

Tools provide executable functions to LLMs:

```typescript
server.registerTool(
  "my_tool",
  {
    title: "My Tool",
    description: "What this tool does",
    inputSchema: { param: z.string() },
  },
  ({ param }) => ({
    content: [
      {
        type: "text",
        text: `Result for ${param}`,
      },
    ],
  }),
);
```

### Resources

Resources expose data and content to LLMs:

```typescript
server.registerResource(
  "my_resource",
  "resource://my-resource",
  {
    title: "My Resource",
    description: "What this resource does",
    mimeType: "text/plain",
  },
  (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: "Content of my resource",
      },
    ],
  }),
);
```

### Prompts

Prompts are reusable templates for interacting with LLMs:

```typescript
server.registerPrompt(
  "my_prompt",
  {
    title: "My Prompt",
    description: "What this prompt does",
    argsSchema: { arg: z.string() },
  },
  ({ arg }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Prompt with ${arg}`,
        },
      },
    ],
  }),
);
```

## Reading Docs

- [Model Context Protocol - TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Model Context Protocol - Documentation](https://modelcontextprotocol.io)
- [ModelFetch - Website](https://www.modelfetch.com)
- [ModelFetch - Documentation](https://www.modelfetch.com/docs)
