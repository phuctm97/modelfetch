# Example Node.js MCP Server (TypeScript)

> [!NOTE]
> This is an internal example MCP server. To get started with [ModelFetch](https://www.modelfetch.com), please visit the [Getting Started documentation](https://www.modelfetch.com/docs/getting-started).

## Quick Start

### Running the MCP server

Start the MCP server:

```bash
pnpm exec nx start example-node-ts
```

### Testing with the MCP Inspector

In a separate terminal, run the MCP Inspector to test your server:

```bash
npx -y @modelcontextprotocol/inspector@latest
```

Then, connect to your server at `http://localhost:3000/mcp` (or the endpoint shown in your server output).

## Project Structure

```
example-node-ts/
├── src/
│   ├── index.ts      # Node.js entry point
│   └── server.ts     # MCP server implementation
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
